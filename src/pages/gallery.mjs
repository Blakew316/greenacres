import { site, icon, pageHero, sectionHead, esc } from '../layout.mjs';
import { gallery } from '../data.mjs';

export default {
  id: 'gallery',
  title: 'Gallery | Green Acres Bowl',
  description: 'Photos from Green Acres Bowl in Tyler, TX — the lanes, arcade, snack bar, 11th Frame Club and events. Click to enlarge.',
  body: () => `
${pageHero({ eyebrow: 'Plan Your Event · Gallery', title: 'Gallery', lead: 'A look inside Green Acres Bowl. Click to enlarge.', crumbs: [{ label: 'Plan Your Event', href: 'specials-and-events.html' }, { label: 'Gallery' }], actions: `<a class="btn btn--primary" href="contact-us.html">${icon('envelope')} Contact Us</a><a class="btn btn--ghost" href="${site.facebook}" target="_blank" rel="noopener">${icon('facebook')} More on Facebook</a>` })}

<section class="section section--flush-top">
  <div class="container">
    <h2 class="visually-hidden">Click to Enlarge</h2>
    <div class="gallery-grid">
      ${gallery.map((g, i) => `<a class="gallery-grid__item" href="${g.src}" data-alt="${esc(g.alt)}" data-reveal="scale" style="--i:${i % 4}"><figure class="photo photo--rays" style="margin:0"><img src="${g.src}" alt="${esc(g.alt)}" loading="lazy" decoding="async" data-fallback><div class="photo__fallback" aria-hidden="true"><div><img src="assets/brand/gab-logo.png" alt="" loading="lazy"><span>Photo</span></div></div></figure></a>`).join('')}
    </div>
    <div class="btn-row btn-row--center mt-3" data-reveal><a class="btn btn--secondary" href="contact-us.html">Contact Us ${icon('arrowRight')}</a></div>
  </div>
</section>
`,
};
