// End-to-end checks: serves the site, crawls every internal link, verifies
// each page renders without console errors, that every navigation target
// resolves, the PWA manifest + service worker are valid, and takes screenshots.
import http from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = +(process.env.PORT || 4173);
const OUT = process.env.SHOTS || path.join(ROOT, 'tests', 'screenshots');
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.pdf': 'application/pdf', '.xml': 'application/xml', '.txt': 'text/plain' };

const server = http.createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (p.endsWith('/')) p += 'index.html';
    const file = path.join(ROOT, p);
    if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
    if (req.method === 'POST') { res.writeHead(200, { 'Content-Type': 'text/plain' }); return res.end('ok'); }
    const s = await stat(file);
    if (s.isDirectory()) { res.writeHead(301, { Location: p + '/' }); return res.end(); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(await readFile(file));
  } catch { res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('not found'); }
});
await new Promise((r) => server.listen(PORT, r));
const base = `http://127.0.0.1:${PORT}/`;

async function scrollThrough(page) {
  await page.evaluate(async () => {
    const h = () => document.documentElement.scrollHeight; const step = Math.max(300, window.innerHeight * 0.6);
    for (let y = 0; y < h(); y += step) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 70)); }
    window.scrollTo(0, 0); await new Promise((r) => setTimeout(r, 250));
  });
}
const problems = [];
const note = (m) => { problems.push(m); console.log('  ✗', m); };
const browser = await chromium.launch();
const start = ['index.html'];
const seen = new Set();
const queue = [...start];
const internal = (href) => { try { const u = new URL(href, base); return u.origin === new URL(base).origin ? u : null; } catch { return null; } };
await mkdir(OUT, { recursive: true });

while (queue.length) {
  const file = queue.shift();
  if (seen.has(file)) continue; seen.add(file);
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, serviceWorkers: 'block' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() !== 'error') return; const loc = (m.location() && m.location().url) || ''; if (/assets\/media\//.test(loc)) return; errors.push(m.text() + (loc ? ' @ ' + loc : '')); });
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('requestfailed', (r) => { const u = r.url(); if (u.startsWith(base) && !/assets\/media\//.test(u)) errors.push('request failed: ' + u); });
  const res = await page.goto(base + file, { waitUntil: 'networkidle', timeout: 30000 });
  console.log(`• ${file} → ${res.status()}`);
  if (res.status() !== 200) note(`${file} returned ${res.status()}`);
  errors.filter((e) => !/google|gstatic|favicon|maps/.test(e)).forEach((e) => note(`${file}: ${e}`));
  const title = await page.title(); if (!title) note(`${file}: missing <title>`);
  const h1s = await page.locator('h1').count(); if (h1s !== 1) note(`${file}: expected 1 <h1>, found ${h1s}`);
  const imgsNoAlt = await page.locator('img:not([alt])').count(); if (imgsNoAlt) note(`${file}: ${imgsNoAlt} images without alt`);
  // internal links must resolve
  const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
  for (const h of new Set(hrefs)) {
    if (!h || h.startsWith('#') || /^(tel|mailto|javascript):/.test(h)) continue;
    const u = internal(h); if (!u) continue;
    const target = u.pathname.replace(/^\//, '') || 'index.html';
    if (/assets\/media\//.test(target)) continue; // optional originals
    if (!existsSync(path.join(ROOT, target))) note(`${file}: broken link ${h}`);
    else if (target.endsWith('.html') && !seen.has(target)) queue.push(target);
    if (u.hash) { const id = u.hash.slice(1); const targetFile = target === file ? null : target; if (!targetFile) { const ok = await page.locator(`#${CSS.escape ? id : id}`).count(); if (!ok) note(`${file}: missing anchor ${u.hash}`); } else { const html = await readFile(path.join(ROOT, targetFile), 'utf8'); if (!html.includes(`id="${id}"`)) note(`${file}: ${h} anchor #${id} not found in ${targetFile}`); } }
  }
  await scrollThrough(page);
  await page.screenshot({ path: path.join(OUT, `${file.replace('.html', '')}-desktop.png`), fullPage: true });
  await ctx.close();
  // mobile pass
  const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
  const mp = await mctx.newPage();
  await mp.goto(base + file, { waitUntil: 'networkidle', timeout: 30000 });
  const overflow = await mp.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  if (overflow) note(`${file}: horizontal overflow on mobile`);
  await scrollThrough(mp);
  await mp.screenshot({ path: path.join(OUT, `${file.replace('.html', '')}-mobile.png`), fullPage: true });
  await mctx.close();
}

// Manifest + service worker sanity
const manifest = JSON.parse(await readFile(path.join(ROOT, 'manifest.webmanifest'), 'utf8'));
for (const i of manifest.icons) if (!existsSync(path.join(ROOT, i.src))) note(`manifest icon missing: ${i.src}`);
if (!manifest.icons.some((i) => (i.purpose || '').includes('maskable'))) note('manifest has no maskable icon');
if (!manifest.icons.some((i) => i.sizes === '512x512')) note('manifest has no 512px icon');
const sw = await readFile(path.join(ROOT, 'sw.js'), 'utf8');
const pre = JSON.parse(sw.match(/const PRECACHE = (\[[\s\S]*?\]);/)[1]);
for (const p of pre) if (p !== './' && !existsSync(path.join(ROOT, p))) note(`precache entry missing: ${p}`);
console.log(`\nChecked ${seen.size} pages, ${pre.length} precache entries.`);

// Form behaviour + install/menus on mobile (index)
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, serviceWorkers: 'block' });
  const page = await ctx.newPage();
  await page.goto(base + 'contact-us.html', { waitUntil: 'networkidle' });
  await page.click('.tabbar [data-open-sheet]');
  await page.waitForSelector('#mobile-sheet.is-open');
  const links = await page.locator('#mobile-sheet a.sheet__link').count();
  if (links < 13) note(`mobile sheet lists only ${links} links`);
  await page.screenshot({ path: path.join(OUT, 'menu-mobile.png') });
  await page.click('#mobile-sheet [data-close-sheet].sheet__close');
  // validation: submit empty
  await page.locator('form[name="contact"] button[type=submit]').click();
  const invalid = await page.locator('form[name="contact"] .field.is-invalid').count();
  if (!invalid) note('contact form: empty submit did not flag invalid fields');
  await ctx.close();
}
await browser.close();
server.close();
if (problems.length) { console.log(`\n${problems.length} problem(s) found.`); process.exit(1); }
console.log('All checks passed.');
