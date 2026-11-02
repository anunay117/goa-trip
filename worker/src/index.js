// Goa trip shared expense log: a tiny JSON API on Cloudflare Workers + D1.
// Reads and writes need the shared trip code (header X-Trip-Code), so the data is private to the group.
import { sendPush, okEndpoint } from "./push.js";

const NAMES = ["Anunay", "Shruti", "Akriti", "Deepak", "Sarvpriya", "Abhishek"];
const CATS = ["Food", "Drinks", "Travel", "Stay", "Activity", "Shopping", "Other"];
const MAX_ROWS = 5000;
const MAX_SUBS = 40;
const inr = n => "₹" + Math.round(n).toLocaleString("en-IN");

// Notify every subscribed phone except the one that added the expense. Gone subscriptions (404/410) are removed.
async function notifyAll(env, msg, skipEndpoint) {
  if (!env.VAPID_PRIVATE_JWK || !env.VAPID_PUBLIC) return;
  const { results } = await env.DB.prepare("SELECT * FROM subs").all();
  await Promise.all(results.filter(s => s.endpoint !== skipEndpoint).map(async s => {
    try {
      const st = await sendPush(s, msg, env);
      if (st === 404 || st === 410) await env.DB.prepare("DELETE FROM subs WHERE endpoint = ?").bind(s.endpoint).run();
      else if (st >= 300) console.log("push failed", st, new URL(s.endpoint).hostname);
    } catch (e) { console.log("push error", String(e)); }
  }));
}

const cors = (req, env) => {
  const allowed = String(env.ALLOWED_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
  const o = req.headers.get("Origin");
  const h = {
    "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Trip-Code",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
  if (o && allowed.includes(o)) h["Access-Control-Allow-Origin"] = o;
  return h;
};
const json = (data, status, req, env) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...cors(req, env) } });

const safeEqual = (a, b) => {
  a = String(a || ""); b = String(b || "");
  let d = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) d |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  return d === 0;
};
const clean = (s, n) => String(s == null ? "" : s).replace(/[\u0000-\u001f<>]/g, " ").trim().slice(0, n);
const row = r => ({ id: r.id, ts: r.ts, paid_by: r.paid_by, amount: r.amount, category: r.category, note: r.note, split: JSON.parse(r.split), added_by: r.added_by });

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: cors(req, env) });
    if (url.pathname === "/health") return json({ ok: true }, 200, req, env);

    if (!env.TRIP_CODE) return json({ error: "server not configured" }, 500, req, env);
    if (!safeEqual(req.headers.get("X-Trip-Code"), env.TRIP_CODE)) return json({ error: "wrong trip code" }, 401, req, env);

    if (url.pathname === "/expenses" && req.method === "GET") {
      const { results } = await env.DB.prepare("SELECT * FROM expenses WHERE deleted = 0 ORDER BY ts DESC LIMIT ?").bind(MAX_ROWS).all();
      return json({ now: Date.now(), entries: results.map(row) }, 200, req, env);
    }

    if (url.pathname === "/expenses" && req.method === "POST") {
      let b; try { b = await req.json(); } catch { return json({ error: "bad json" }, 400, req, env); }
      const amount = Number(b.amount);
      if (!(amount > 0 && amount <= 1000000)) return json({ error: "amount must be between 0 and 10,00,000" }, 400, req, env);
      if (!NAMES.includes(b.paid_by)) return json({ error: "unknown payer" }, 400, req, env);
      const category = CATS.includes(b.category) ? b.category : "Other";
      const split = Array.isArray(b.split) ? [...new Set(b.split.filter(n => NAMES.includes(n)))] : [];
      if (!split.length) return json({ error: "pick at least one person to split with" }, 400, req, env);
      const id = clean(b.id, 64) || crypto.randomUUID();
      const count = await env.DB.prepare("SELECT COUNT(*) AS c FROM expenses").first();
      if (count.c >= MAX_ROWS) return json({ error: "too many entries" }, 400, req, env);
      const ts = Number.isFinite(Number(b.ts)) && Number(b.ts) > 1.6e12 && Number(b.ts) <= Date.now() + 864e5 ? Number(b.ts) : Date.now();
      const ins = await env.DB.prepare("INSERT OR IGNORE INTO expenses (id, ts, paid_by, amount, category, note, split, added_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
        .bind(id, ts, b.paid_by, Math.round(amount * 100) / 100, category, clean(b.note, 80), JSON.stringify(split), NAMES.includes(b.added_by) ? b.added_by : "").run();
      if (ins.meta && ins.meta.changes > 0) {   // only for a genuinely new entry (offline re-sends are ignored)
        const note = clean(b.note, 80), who = split.length === NAMES.length ? "everyone" : split.join(", ");
        ctx.waitUntil(notifyAll(env, {
          title: "💸 " + inr(amount) + (note ? " · " + note : " · " + category),
          body: b.paid_by + " paid · split " + who + ". Tap to see the balances.",
          tag: id, url: "budget.html"
        }, typeof b.skip === "string" ? b.skip : ""));
      }
      return json({ ok: true, id }, 201, req, env);
    }

    if (url.pathname === "/subscribe" && req.method === "POST") {
      let b; try { b = await req.json(); } catch { return json({ error: "bad json" }, 400, req, env); }
      const s = b && b.subscription, k = s && s.keys;
      if (!s || !okEndpoint(s.endpoint) || !k || typeof k.p256dh !== "string" || typeof k.auth !== "string" || k.p256dh.length > 200 || k.auth.length > 100)
        return json({ error: "bad subscription" }, 400, req, env);
      const n = await env.DB.prepare("SELECT COUNT(*) AS c FROM subs").first();
      if (n.c >= MAX_SUBS) return json({ error: "too many phones subscribed" }, 400, req, env);
      await env.DB.prepare("INSERT INTO subs (endpoint, p256dh, auth, name, created) VALUES (?, ?, ?, ?, ?) ON CONFLICT(endpoint) DO UPDATE SET p256dh = excluded.p256dh, auth = excluded.auth, name = excluded.name")
        .bind(s.endpoint, k.p256dh, k.auth, NAMES.includes(b.name) ? b.name : "", Date.now()).run();
      return json({ ok: true }, 201, req, env);
    }
    if ((url.pathname === "/unsubscribe" || url.pathname === "/test-push") && req.method === "POST") {
      let b; try { b = await req.json(); } catch { return json({ error: "bad json" }, 400, req, env); }
      const ep = b && typeof b.endpoint === "string" ? b.endpoint : "";
      if (url.pathname === "/unsubscribe") { await env.DB.prepare("DELETE FROM subs WHERE endpoint = ?").bind(ep).run(); return json({ ok: true }, 200, req, env); }
      const s = await env.DB.prepare("SELECT * FROM subs WHERE endpoint = ?").bind(ep).first();
      if (!s) return json({ error: "this phone is not subscribed" }, 404, req, env);
      const st = await sendPush(s, { title: "🔔 Notifications are on", body: "You'll get a ping like this whenever someone logs a Goa trip expense.", tag: "test", url: "budget.html" }, env);
      if (st === 404 || st === 410) await env.DB.prepare("DELETE FROM subs WHERE endpoint = ?").bind(ep).run();
      return json({ ok: st < 300, status: st }, st < 300 ? 200 : 502, req, env);
    }

    const m = url.pathname.match(/^\/expenses\/([\w-]{1,64})$/);
    if (m && req.method === "DELETE") {
      await env.DB.prepare("UPDATE expenses SET deleted = 1 WHERE id = ?").bind(m[1]).run();
      return json({ ok: true }, 200, req, env);
    }
    return json({ error: "not found" }, 404, req, env);
  }
};
