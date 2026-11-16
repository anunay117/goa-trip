// Rebuilds data.js from data.enc.js (local file, or the live site with --live) using .site-pass.
// Usage: node tools/unlock.mjs [--live] [--force]
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { webcrypto as C } from 'node:crypto';
const root = new URL('..', import.meta.url).pathname, P = f => root + f, unb64 = s => Uint8Array.from(Buffer.from(s, 'base64'));
const die = m => { console.error('unlock: ' + m); process.exit(1); };
if (existsSync(P('data.js')) && !process.argv.includes('--force')) die('data.js already exists (use --force to overwrite).');
const pw = readFileSync(P('.site-pass'), 'utf8').trim();
const txt = process.argv.includes('--live')
  ? await (await fetch('https://anunay117.github.io/goa-trip/data.enc.js?v=' + Date.now())).text()
  : readFileSync(P('data.enc.js'), 'utf8');
const E = JSON.parse(txt.replace(/^[^{]*/, '').replace(/;\s*$/, ''));
const base = await C.subtle.importKey('raw', new TextEncoder().encode(pw), 'PBKDF2', false, ['deriveKey']);
const key = await C.subtle.deriveKey({ name: 'PBKDF2', salt: unb64(E.salt), iterations: E.iter, hash: 'SHA-256' }, base, { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
const plain = new TextDecoder().decode(await C.subtle.decrypt({ name: 'AES-GCM', iv: unb64(E.iv) }, key, unb64(E.ct)).catch(() => die('wrong password in .site-pass.')));
writeFileSync(P('data.js'), plain); console.log('unlock: data.js rebuilt.');
