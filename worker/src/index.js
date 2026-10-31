// Goa trip shared expense log: a tiny JSON API on Cloudflare Workers + D1.
// Reads and writes need the shared trip code (header X-Trip-Code), so the data is private to the group.
const NAMES = ["Anunay", "Shruti", "Akriti", "Deepak", "Sarvpriya", "Abhishek"];
const CATS = ["Food", "Drinks", "Travel", "Stay", "Activity", "Shopping", "Other"];
const MAX_ROWS = 5000;

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
  async fetch(req, env) {
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
      await env.DB.prepare("INSERT OR IGNORE INTO expenses (id, ts, paid_by, amount, category, note, split, added_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
        .bind(id, ts, b.paid_by, Math.round(amount * 100) / 100, category, clean(b.note, 80), JSON.stringify(split), NAMES.includes(b.added_by) ? b.added_by : "").run();
      return json({ ok: true, id }, 201, req, env);
    }

    const m = url.pathname.match(/^\/expenses\/([\w-]{1,64})$/);
    if (m && req.method === "DELETE") {
      await env.DB.prepare("UPDATE expenses SET deleted = 1 WHERE id = ?").bind(m[1]).run();
      return json({ ok: true }, 200, req, env);
    }
    return json({ error: "not found" }, 404, req, env);
  }
};
