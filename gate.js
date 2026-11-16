// Password gate for the whole site.
// The trip details (data.js) are published only in encrypted form (data.enc.js, AES-256-GCM, key from
// PBKDF2-SHA256). This script asks for the password once per phone, saves it, decrypts the details
// and then starts the site. The password is the same as the expense trip code, so unlocking the
// site also unlocks The Damage. An invite link with #k=<password> unlocks without typing.
(function () {
  var E = window.TRIP_ENC, app = document.getElementById('app'), V = Math.floor(Date.now() / 60000);
  var lg = function (k) { try { return localStorage.getItem(k) } catch (e) { return null } };
  var ls = function (k, v) { try { v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v) } catch (e) {} };
  var b64 = function (s) { return Uint8Array.from(atob(s), function (c) { return c.charCodeAt(0) }) };
  var toB64 = function (buf) { return btoa(String.fromCharCode.apply(null, new Uint8Array(buf))) };
  var enc = new TextEncoder(), dec = new TextDecoder();
  // Change RESET to make every phone forget the saved password and ask for it again once.
  var RESET = '2026-11-16';
  if (lg('goa-gate') !== RESET) { ls('goa-code', null); ls('goa-key', null); }

  // After the trip details, start the site itself. (Pages load their other scripts, e.g. words.js, before this one.)
  var extra = ['app.js'];

  function start(plain) {
    var s = document.createElement('script'); s.textContent = plain; document.body.appendChild(s);
    (function next(i) {
      if (i >= extra.length) return;
      var t = document.createElement('script'); t.src = extra[i] + '?v=' + V; t.onload = function () { next(i + 1) };
      document.body.appendChild(t);
    })(0);
  }

  function keyFor(pw) {
    // A derived key is cached per phone so the slow PBKDF2 step runs only on the first unlock.
    var c = null; try { c = JSON.parse(lg('goa-key') || 'null') } catch (e) {}
    // Only reuse the cached key for the exact password that already unlocked this phone.
    if (c && c.salt === E.salt && c.iter === E.iter && pw === lg('goa-code')) {
      return crypto.subtle.importKey('raw', b64(c.k), 'AES-GCM', true, ['decrypt']);
    }
    return crypto.subtle.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveKey'])
      .then(function (base) {
        return crypto.subtle.deriveKey({ name: 'PBKDF2', salt: b64(E.salt), iterations: E.iter, hash: 'SHA-256' },
          base, { name: 'AES-GCM', length: 256 }, true, ['decrypt']);
      })
      .then(function (key) {
        return crypto.subtle.exportKey('raw', key).then(function (raw) {
          ls('goa-key', JSON.stringify({ salt: E.salt, iter: E.iter, k: toB64(raw) }));
          return key;
        });
      });
  }

  function tryPw(pw) {
    if (!pw) return Promise.reject(new Error('empty'));
    return keyFor(pw)
      .then(function (key) { return crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64(E.iv) }, key, b64(E.ct)) })
      .then(function (buf) { ls('goa-code', pw); ls('goa-gate', RESET); return dec.decode(buf) })
      .catch(function (e) { ls('goa-key', null); throw e });
  }

  function lockScreen(msg) {
    app.innerHTML =
      '<section class="wrap gate"><div class="card">' +
      '<div class="gate-ic">🌴🔒</div><h1>Goa Trip 2026</h1>' +
      '<p class="muted">This site is just for the crew. Enter the password once and this phone remembers it.</p>' +
      '<form id="gate-f" autocomplete="off"><input id="gate-pw" type="password" placeholder="Password" autocomplete="current-password" autocapitalize="none" spellcheck="false">' +
      '<button class="btn2" id="gate-b" type="submit">Unlock</button></form>' +
      '<p class="ferr" id="gate-e">' + (msg || '') + '</p>' +
      '<p class="muted" style="font-size:.8rem">Don\'t have it? Ask the trip planner for the password or the invite link.</p>' +
      '</div></section>';
    var f = document.getElementById('gate-f'), i = document.getElementById('gate-pw'), b = document.getElementById('gate-b'), er = document.getElementById('gate-e');
    i.focus();
    f.onsubmit = function (ev) {
      ev.preventDefault(); var pw = i.value.trim(); if (!pw) { er.textContent = 'Type the password first.'; return }
      b.disabled = true; b.textContent = 'Unlocking…'; er.textContent = '';
      tryPw(pw).then(function (plain) { app.innerHTML = ''; start(plain) })
        .catch(function () { b.disabled = false; b.textContent = 'Unlock'; er.textContent = 'That password is not right. Try again.'; i.select() });
    };
  }

  if (!E || !window.crypto || !crypto.subtle) {
    app.innerHTML = '<section class="wrap"><div class="card"><h3>🔒 This browser can\'t unlock the site</h3><p class="muted">Please open it in Safari or Chrome.</p></div></section>';
    return;
  }

  // Invite link: #k=<password>. Remove it from the address bar right away (keep any other part, e.g. #s=…).
  var m = location.hash.match(/(?:^#|&)k=([^&]{1,200})/), fromLink = '';
  if (m) {
    try { fromLink = decodeURIComponent(m[1]).trim() } catch (e) {}
    var rest = location.hash.replace(/^#/, '').split('&').filter(function (p) { return p.indexOf('k=') !== 0 }).join('&');
    history.replaceState(null, '', location.pathname + location.search + (rest ? '#' + rest : ''));
  }
  var saved = lg('goa-code') || '';
  app.innerHTML = '<section class="wrap gate"><p class="muted">Unlocking…</p></section>';
  tryPw(fromLink || saved)
    .catch(function () { return fromLink && saved && saved !== fromLink ? tryPw(saved) : Promise.reject() })
    .then(function (plain) { app.innerHTML = ''; start(plain) })
    .catch(function () {
      if (saved) ls('goa-code', null);
      lockScreen(fromLink || saved ? 'That password did not work. It may have changed. Please enter the new one.' : '');
    });
})();
