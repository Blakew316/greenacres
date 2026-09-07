import { site, icon, photo, pageHero, sectionHead } from '../layout.mjs';
import { originals } from '../data.mjs';

export default {
  id: 'pro-shop',
  title: 'Pro Shop | Green Acres Bowl',
  description: 'The brand new Pro Shop at Green Acres Bowl in Tyler, TX — bowling balls, shoes, drilling, upkeep tools and accessories. Open Monday–Friday 9am–5pm, Saturday by appointment.',
  body: () => `
${pageHero({ eyebrow: 'Amenities · Pro Shop', title: 'Check Out Our Brand New Pro Shop in Tyler, TX!', lead: 'Need new bowling shoes to show off at your league championship? Looking for tools for your bowling ball upkeep? Our new and improved pro shop provides equipment and accessories to take your bowling game to the next level.', crumbs: [{ label: 'Amenities' }, { label: 'Pro Shop' }], actions: `<a class="btn btn--primary" href="${site.phoneHref}">${icon('phone')} Call ${site.phone}</a><a class="btn btn--ghost" href="${site.directionsUrl}" target="_blank" rel="noopener">${icon('car')} Get Directions</a>` })}

<section class="section section--flush-top">
  <div class="container">
    <h2 class="visually-hidden">About the Pro Shop</h2>
    <div class="split split--60">
      <div data-reveal>${photo({ src: originals.proShop, alt: 'Check Out Our Brand New Pro Shop in Tyler, TX!', ar: '3 / 2', label: 'Pro Shop' })}</div>
      <div class="stack" data-reveal="right">
        <div class="prose"><p class="lead">Green Acres' Pro Shop keeps you from having to search around town for a shop that you can trust.</p><p><strong>Stop by our store at Green Acres Bowl today!</strong></p></div>
        <div class="card card--dark rays">
          <span class="eyebrow">Pro Shop Hours</span>
          <ul class="hours hours--free">${site.proShopHours.map(([d, t]) => `<li><span class="hours__day">${d}</span><span class="hours__time">${t}</span></li>`).join('')}</ul>
        </div>
      </div>
    </div>
    <div class="grid grid--4 mt-3">
      ${[['ball', 'Bowling balls', 'Buy, fit and accessorize your ball.'], ['shoe', 'Shoes', 'Show off at your league championship.'], ['wrench', 'Upkeep & repair', 'Tools and service for your ball.'], ['bag', 'Accessories', 'Bags, tape, towels and more.']].map(([ic, t, d], i) => `<div class="card" data-reveal style="--i:${i}"><span class="icon-badge">${icon(ic)}</span><h3>${t}</h3><p class="muted mb-0">${d}</p></div>`).join('')}
    </div>
  </div>
</section>
`,
};
