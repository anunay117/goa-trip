// Encrypts data.js -> data.enc.js with the site password (= the expense trip code).
// The password is read from .site-pass (on this Mac only, never committed).
// Usage: node tools/lock.mjs            (checks the password with the expense server first)
//        node tools/lock.mjs --offline  (skip that check)
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { webcrypto as C } from 'node:crypto';
const root = new URL('..', import.meta.url).pathname, P = f => root + f;
const ITER = 600000, b64 = b => Buffer.from(b).toString('base64'), unb64 = s => Uint8Array.from(Buffer.from(s, 'base64'));
const die = m => { console.error('lock: ' + m); process.exit(1); };
if (!existsSync(P('.site-pass'))) die('.site-pass is missing (the site password file).');
const pw = readFileSync(P('.site-pass'), 'utf8').trim();
if (!pw) die('.site-pass is empty.');
const plain = readFileSync(P('data.js'), 'utf8');
if (!/const TRIP\s*=/.test(plain)) die('data.js does not look like the trip data file.');

if (!process.argv.includes('--offline')) {
  const api = (plain.match(/expenseApi:\s*"([^"]+)"/) || [])[1];
  if (api) {
    const r = await fetch(api.replace(/\/$/, '') + '/expenses', { headers: { 'X-Trip-Code': pw } }).catch(() => null);
    if (!r) die('could not reach the expense server to check the password (use --offline to skip).');
    if (r.status === 401) die('the expense server says this is NOT the trip code. Nothing was changed.');
    if (!r.ok) die('expense server answered ' + r.status + ' (use --offline to skip the check).');
  }
}

const derive = async salt => {
  const base = await C.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']);
  return C.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: ITER, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
};
// Keep the same salt as before (so phones keep their cached key) unless the password changed.
let salt = C.getRandomValues(new Uint8Array(16)), key;
if (existsSync(P('data.enc.js'))) {
  try {
    const old = JSON.parse(readFileSync(P('data.enc.js'), 'utf8').replace(/^[^{]*/, '').replace(/;\s*$/, ''));
    const k = await derive(unb64(old.salt));
    const prev = new TextDecoder().decode(await C.subtle.decrypt({ name: 'AES-GCM', iv: unb64(old.iv) }, k, unb64(old.ct)));
    if (prev === plain && old.iter === ITER) { console.log('lock: data.enc.js is already up to date.'); process.exit(0); }
    salt = unb64(old.salt); key = k;
  } catch (e) { /* different password or new file: start fresh */ }
}
key = key || await derive(salt);
const iv = C.getRandomValues(new Uint8Array(12));
const ct = await C.subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(plain));
const out = { v: 1, iter: ITER, salt: b64(salt), iv: b64(iv), ct: b64(ct) };
// Self-test before writing.
const back = new TextDecoder().decode(await C.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct));
if (back !== plain) die('self-test failed, nothing written.');
writeFileSync(P('data.enc.js'), '// Encrypted trip details. Unlocked in the browser by gate.js.\nwindow.TRIP_ENC=' + JSON.stringify(out) + ';\n');
console.log('lock: data.enc.js updated (' + plain.length + ' chars encrypted).');
