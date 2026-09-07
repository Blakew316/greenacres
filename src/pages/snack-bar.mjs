import { site, icon, photo, pageHero, sectionHead } from '../layout.mjs';
import { originals } from '../data.mjs';

export default {
  id: 'snack-bar',
  title: 'Snack Bar Menu | Green Acres Bowl',
  description: 'Snack bar menu and hours at Green Acres Bowl in Tyler, TX. Full-service food and beverage bars with delivery right to your lane.',
  body: () => `
${pageHero({ eyebrow: 'Amenities · Snack Bar', title: 'Snack Bar Menu', lead: 'Full-service food and beverage bars — with delivery straight to your lane. Two snack and drink bars offer both alcoholic and non-alcoholic beverages.', crumbs: [{ label: 'Amenities' }, { label: 'Snack Bar Menu' }], actions: `<a class="btn btn--primary" href="${originals.snackBarMenuPdf}" target="_blank" rel="noopener">${icon('download')} Download the menu (PDF)</a><a class="btn btn--ghost" href="${site.phoneHref}">${icon('phone')} ${site.phone}</a>` })}

<section class="section section--flush-top">
  <div class="container">
    <div class="grid grid--3 mb-2">
      ${[['forkKnife', 'Lane delivery', 'Order from your lane and we bring it to you.'], ['pizza', 'Fresh & affordable', 'Guests rave about the pizzas — and the prices.'], ['beer', 'Two bars', 'Alcoholic and non-alcoholic drinks, plus specials in the bar.']].map(([ic, t, d], i) => `<div class="card" data-reveal style="--i:${i}"><div class="feature-row"><span class="icon-badge">${icon(ic)}</span><div class="feature"><h3>${t}</h3><p>${d}</p></div></div></div>`).join('')}
    </div>
    <div class="split" style="align-items:start">
      <div data-reveal>
        ${sectionHead({ eyebrow: 'The menu', title: 'What\'s cooking', lead: 'Tap to enlarge. Prices and items are subject to change — ask at the snack bar for today\'s specials.', reveal: false })}
        <a href="${originals.snackBarMenu}" target="_blank" rel="noopener">${photo({ src: originals.snackBarMenu, alt: 'Green Acres Bowl snack bar menu', sheet: true, label: 'Snack Bar Menu' })}</a>
        <div class="btn-row mt-1"><a class="btn btn--secondary" href="${originals.snackBarMenuPdf}" target="_blank" rel="noopener">${icon('doc')} Menu PDF</a></div>
      </div>
      <div data-reveal="right">
        ${sectionHead({ eyebrow: 'Snack bar hours', title: 'When we\'re serving', lead: 'The snack bar keeps its own hours alongside the lanes. See the current hours sheet below, or call ahead.', reveal: false })}
        <a href="${originals.snackBarHours}" target="_blank" rel="noopener">${photo({ src: originals.snackBarHours, alt: 'Snack bar hours', sheet: true, label: 'Snack Bar Hours' })}</a>
        <div class="card card--tint mt-1"><div class="feature-row"><span class="icon-badge">${icon('martini')}</span><div class="feature"><h3>Looking for the bar?</h3><p>The 11th Frame Club has a full bar, dance floor, pool tables and live music. <a href="11th-frame-club.html">Explore the club ${icon('arrowRight', { size: 14 })}</a></p></div></div></div>
      </div>
    </div>
  </div>
</section>
`,
};
