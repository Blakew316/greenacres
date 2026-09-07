import { readdir, readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { layout, site, pages } from './layout.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const version = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 12);

async function build() {
  const dir = path.join(__dirname, 'pages');
  const files = (await readdir(dir)).filter((f) => f.endsWith('.mjs')).sort();
  const built = [];
  for (const f of files) {
    const mod = (await import(path.join(dir, f))).default;
    const meta = pages.find((p) => p.id === mod.id);
    if (!meta) throw new Error(`Page ${f} has unknown id ${mod.id}`);
    const html = layout({ id: mod.id, title: mod.title || meta.title, description: mod.description, body: mod.body(), reserve: mod.reserve ?? 'band', headExtra: mod.headExtra || '', bodyClass: mod.bodyClass || '' });
    await writeFile(path.join(ROOT, meta.file), html);
    built.push(meta.file);
    console.log('wrote', meta.file, `${(html.length / 1024).toFixed(1)}kb`);
  }
  const missing = pages.filter((p) => !built.includes(p.file));
  if (missing.length) throw new Error('Pages without a source module: ' + missing.map((m) => m.file).join(', '));

  // Offline + 404 pages (minimal shell, no reserve band)
  const simple = (id, title, h1, text, extra = '') => layout({
    id, title, description: text, reserve: 'none',
    body: `<section class="section rays rays--light" style="min-height:60vh;display:grid;align-content:center"><div class="container container--narrow center">
<div class="icon-badge icon-badge--lg mx-auto">${extra}</div>
<h1>${h1}</h1><p class="lead">${text}</p>
<div class="btn-row btn-row--center mt-2"><a class="btn btn--primary" href="index.html">Go to the home page</a><a class="btn btn--ghost" href="${site.phoneHref}">Call ${site.phone}</a></div>
</div></section>`,
  });
  const { icon } = await import('./icons.mjs');
  await writeFile(path.join(ROOT, 'offline.html'), simple('home', 'Offline | Green Acres Bowl', "You're offline.", 'This page isn\'t saved on your device yet. Pages you\'ve already visited are still available, and you can always call us.', icon('wifiOff', { size: 30 })));
  await writeFile(path.join(ROOT, '404.html'), simple('home', 'Page not found | Green Acres Bowl', 'That lane is closed.', 'We couldn\'t find the page you were looking for. Try the menu, or head back to the home page.', icon('pin', { size: 30 })));

  // Sitemap
  const today = new Date().toISOString().slice(0, 10);
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `  <url><loc>${site.website}/${p.file === 'index.html' ? '' : p.file}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${p.id === 'home' ? '1.0' : '0.8'}</priority></url>`).join('\n')}\n</urlset>\n`;
  await writeFile(path.join(ROOT, 'sitemap.xml'), sitemap);

  // Service worker with precache manifest
  const iconsDir = path.join(ROOT, 'assets/icons');
  const iconFiles = existsSync(iconsDir) ? (await readdir(iconsDir)).filter((f) => /^(icon-(192|512)|icon-maskable-512|apple-touch-icon|favicon-32|icon-96)\.png$/.test(f)).map((f) => `assets/icons/${f}`) : [];
  const precache = [
    './', ...pages.map((p) => p.file), 'offline.html', 'manifest.webmanifest', 'favicon.ico',
    'assets/css/site.css', 'assets/js/site.js', 'assets/fonts/InterVariable.woff2', 'assets/brand/gab-logo.png', ...iconFiles,
  ];
  const tpl = await readFile(path.join(__dirname, 'sw.template.js'), 'utf8');
  await writeFile(path.join(ROOT, 'sw.js'), tpl.replace('__VERSION__', version).replace('__PRECACHE__', JSON.stringify(precache, null, 2)));
  console.log(`built ${built.length} pages, sw ${version}, ${precache.length} precached assets`);
}

build().catch((e) => { console.error(e); process.exit(1); });
