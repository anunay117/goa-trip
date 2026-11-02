// Service worker for the Goa Trip home-screen app. It only handles notifications (no offline caching),
// so the site always loads fresh from GitHub Pages.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));

self.addEventListener("push", e => {
  let m = {};
  try { m = e.data ? e.data.json() : {}; } catch (x) { m = { body: e.data ? e.data.text() : "" }; }
  // iPhones require a visible notification for every push, so always show one.
  e.waitUntil(self.registration.showNotification(m.title || "💸 New Goa trip expense", {
    body: m.body || "Tap to see the latest expenses.",
    icon: "icons/icon-192.png",
    badge: "icons/badge-96.png",
    tag: m.tag || undefined,
    data: { url: m.url || "budget.html" }
  }));
});

self.addEventListener("notificationclick", e => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || "budget.html", self.registration.scope).href;
  e.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of all) { if ("focus" in c) { await c.focus(); if ("navigate" in c) { try { await c.navigate(url); } catch (x) {} } return; } }
    if (self.clients.openWindow) await self.clients.openWindow(url);
  })());
});
