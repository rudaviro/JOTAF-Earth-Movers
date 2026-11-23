import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { Script } from 'node:vm';

const files = ['index.html', 'services.html', 'privacy.html'];
const pages = Object.fromEntries(files.map((file) => [file, readFileSync(file, 'utf8')]));

for (const [file, html] of Object.entries(pages)) {
  assert.match(html, /<meta name="viewport"/, file + ': mobile viewport missing');
  assert.match(html, /<main(?:\s|>)/, file + ': main landmark missing');
  assert.match(html, /<title>[^<]+<\/title>/, file + ': title missing');
  for (const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
    new Script(match[1], { filename: file + ':inline-script' });
  }
  for (const match of html.matchAll(/\bhref="([^"]+)"/g)) {
    const url = match[1];
    if (/^(?:https?:|mailto:|tel:|#)/i.test(url)) continue;
    const target = url.split(/[?#]/)[0];
    if (!target) continue;
    assert.ok(existsSync(target), file + ': missing local link target ' + target);
  }
  assert.match(html, /prefers-reduced-motion|privacy notice/i, file + ': accessible motion or explanatory text missing');
}
const home = pages['index.html'];
assert.match(home, /name="jotaf-enquiry"[^>]*data-netlify="true"/);
assert.match(home, /name="form-name" value="jotaf-enquiry"/);
assert.match(home, /netlify-honeypot="bot-field"/);
for (const name of ['kind', 'name', 'phone', 'service', 'place', 'date', 'details']) {
  assert.match(home, new RegExp('name="' + name + '"'), 'form field missing: ' + name);
}
assert.match(home, /name="consent"[^>]*required/);
assert.match(home, /new URLSearchParams\(new FormData\(requestForm\)\)/);
assert.match(pages['services.html'], /index\.html\?service=/);
assert.match(home, /https:\/\/wa\.me\/263779724648/);
assert.match(home, /images are illustrative|Photography is illustrative/i);
const services = pages['services.html'];
for (const q of ['Excavation', 'Equipment hire', 'Tipper truck haulage']) {
  assert.ok(services.toLowerCase().includes(q.toLowerCase()), 'missing service: ' + q);
}
assert.match(services, /equipment, pricing and bookings require direct confirmation/i);
console.log('JOTAF static pages, scripts, form contract and local links verified.');
