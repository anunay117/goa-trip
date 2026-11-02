// Web Push for the expense tracker, using only the WebCrypto API (works in Cloudflare Workers and Node 20+).
// Payload encryption follows RFC 8291 (aes128gcm, RFC 8188); sender identification follows RFC 8292 (VAPID).

const te = new TextEncoder();

export const b64u = {
  enc: buf => {
    const b = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
    let s = "";
    for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  },
  dec: str => {
    const s = String(str).replace(/\s+/g, "").replace(/-/g, "+").replace(/_/g, "/");
    const bin = atob(s + "===".slice((s.length + 3) % 4));
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
    return out;
  }
};

const concat = (...parts) => {
  const out = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
  let o = 0;
  for (const p of parts) { out.set(p, o); o += p.length; }
  return out;
};

const hmac = async (key, data) => {
  const k = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", k, data));
};

// A P-256 public key in uncompressed form (65 bytes: 0x04 || x || y) as a JWK, plus optional private part d.
const p256Jwk = (raw, d) => ({ kty: "EC", crv: "P-256", x: b64u.enc(raw.slice(1, 33)), y: b64u.enc(raw.slice(33, 65)), ...(d ? { d } : {}), ext: true });

// Encrypt one push message for a subscription (RFC 8291). `fixed` lets tests supply the salt and sender key pair.
export async function encryptPayload(uaPublicB64, authB64, plaintext, fixed) {
  const uaPublic = b64u.dec(uaPublicB64), authSecret = b64u.dec(authB64);
  if (uaPublic.length !== 65 || uaPublic[0] !== 4) throw new Error("bad p256dh key");
  const salt = fixed && fixed.salt ? b64u.dec(fixed.salt) : crypto.getRandomValues(new Uint8Array(16));

  let asPrivate, asPublic;
  if (fixed && fixed.asPublic) {
    asPublic = b64u.dec(fixed.asPublic);
    asPrivate = await crypto.subtle.importKey("jwk", p256Jwk(asPublic, fixed.asPrivate), { name: "ECDH", namedCurve: "P-256" }, false, ["deriveBits"]);
  } else {
    const kp = await crypto.subtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, true, ["deriveBits"]);
    asPrivate = kp.privateKey;
    asPublic = new Uint8Array(await crypto.subtle.exportKey("raw", kp.publicKey));
  }
  const uaKey = await crypto.subtle.importKey("raw", uaPublic, { name: "ECDH", namedCurve: "P-256" }, false, []);
  const ecdhSecret = new Uint8Array(await crypto.subtle.deriveBits({ name: "ECDH", public: uaKey }, asPrivate, 256));

  const prkKey = await hmac(authSecret, ecdhSecret);
  const keyInfo = concat(te.encode("WebPush: info\0"), uaPublic, asPublic);
  const ikm = await hmac(prkKey, concat(keyInfo, new Uint8Array([1])));
  const prk = await hmac(salt, ikm);
  const cek = (await hmac(prk, te.encode("Content-Encoding: aes128gcm\0\x01"))).slice(0, 16);
  const nonce = (await hmac(prk, te.encode("Content-Encoding: nonce\0\x01"))).slice(0, 12);

  const body = typeof plaintext === "string" ? te.encode(plaintext) : plaintext;
  const aes = await crypto.subtle.importKey("raw", cek, { name: "AES-GCM" }, false, ["encrypt"]);
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv: nonce, tagLength: 128 }, aes, concat(body, new Uint8Array([2]))));

  const header = new Uint8Array(21 + 65);
  header.set(salt, 0);
  new DataView(header.buffer).setUint32(16, 4096);
  header[20] = 65;
  header.set(asPublic, 21);
  return { body: concat(header, ct), debug: { ecdhSecret, prkKey, ikm, prk, cek, nonce, ct } };
}

// VAPID Authorization header value for a push endpoint (RFC 8292). Tokens are cached per push service for ~1 hour.
const jwtCache = new Map();
export async function vapidAuth(endpoint, vapidPublicB64, vapidPrivateJwk, subject) {
  const aud = new URL(endpoint).origin, now = Math.floor(Date.now() / 1000);
  const hit = jwtCache.get(aud);
  if (hit && hit.exp - now > 3600) return hit.value;
  const exp = now + 12 * 3600;
  const enc = o => b64u.enc(te.encode(JSON.stringify(o)));
  const unsigned = enc({ typ: "JWT", alg: "ES256" }) + "." + enc({ aud, exp, sub: subject });
  const key = await crypto.subtle.importKey("jwk", { ...vapidPrivateJwk, key_ops: ["sign"] }, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]);
  const sig = new Uint8Array(await crypto.subtle.sign({ name: "ECDSA", hash: "SHA-256" }, key, te.encode(unsigned)));
  const value = "vapid t=" + unsigned + "." + b64u.enc(sig) + ", k=" + vapidPublicB64;
  jwtCache.set(aud, { exp, value });
  return value;
}

// Push services we are willing to call (stops the server being used to fetch arbitrary URLs).
export const PUSH_HOSTS = [/^web\.push\.apple\.com$/, /^fcm\.googleapis\.com$/, /^updates\.push\.services\.mozilla\.com$/, /\.notify\.windows\.com$/];
export const okEndpoint = e => { try { const u = new URL(e); return u.protocol === "https:" && PUSH_HOSTS.some(r => r.test(u.hostname)); } catch { return false; } };

// Send one notification. Returns the push service HTTP status (201 = accepted; 404/410 = subscription gone).
export async function sendPush(sub, message, env) {
  const { body } = await encryptPayload(sub.p256dh, sub.auth, JSON.stringify(message));
  const r = await fetch(sub.endpoint, {
    method: "POST",
    headers: {
      Authorization: await vapidAuth(sub.endpoint, env.VAPID_PUBLIC, JSON.parse(env.VAPID_PRIVATE_JWK), env.VAPID_SUBJECT || "https://anunay117.github.io/goa-trip/"),
      "Content-Encoding": "aes128gcm",
      "Content-Type": "application/octet-stream",
      TTL: "86400",
      Urgency: "high"
    },
    body
  });
  return r.status;
}
