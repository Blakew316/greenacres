import { site, icon, photo, hoursList, infoList, mapEmbed, pageHero, sectionHead } from '../layout.mjs';
import { originals } from '../data.mjs';

const features = [['lanes', '32 lanes'], ['forkKnife', 'Full service food and beverage bars, with lane delivery'], ['pool', 'Pool tables'], ['doc', 'Updated menus'], ['sparkles', 'Specials and events'], ['tv', 'TVs to watch sporting events'], ['gamepad', 'Arcade games']];

export default {
  id: 'about',
  title: 'About | Green Acres Bowl',
  description: 'Providing Tyler, TX, with generations of bowling fun since 1957. See the facelift at Green Acres Bowl: 32 lanes, full-service bars with lane delivery, pool tables, arcade games and more.',
  body: () => `
${pageHero({ eyebrow: 'About Us', title: 'Providing Tyler, TX, with generations of bowling fun!', lead: 'Come see the facelift at Green Acres Bowl.', crumbs: [{ label: 'About Us' }], actions: `<a class="btn btn--primary" href="reservations.html#reserve">${icon('calendar')} Reserve a Lane</a><a class="btn btn--ghost" href="employment-opportunities.html">${icon('badge')} Employment Opportunities</a>` })}

<section class="section section--flush-top">
  <div class="container">
    <div class="split split--60">
      <div class="prose" data-reveal>
        <p class="lead">When Green Acres Bowl opened in ${site.founded}, we set out to be the source in Tyler, TX, for an exceptional place to enjoy hours of family-friendly entertainment. Now, after five decades, we've decided to move up with the times and revamped our interior to bring you an improved bowling experience.</p>
        <p>Instead of going to the same place you always do for quality fun, come to Green Acres Bowl to take your night out to a whole new level. Because we want to be your source for exciting entertainment, the improved Green Acres Bowl now features:</p>
        <ul class="check-list mb-2">${features.map(([ic, t]) => `<li>${icon(ic)}<span>${t}</span></li>`).join('')}</ul>
        <p>Whether you want to hold a bowling event for your school or you're interested in joining one of our leagues, you'll find everything for family-friendly entertainment at Green Acres Bowl in Tyler.</p>
        <p>Our interior overhauls go above and beyond to ensure you have quality lanes, food and surroundings to enjoy a night out. We've also revamped our staff to provide you with a superior level of care that you've been hard pressed to find before.</p>
        <p>Come to Green Acres Bowl if you're ready for quality entertainment in Texas at a place that offers something for everyone.</p>
        <div class="btn-row mt-2"><a class="btn btn--secondary" href="specials-and-events.html">Plan Your Event ${icon('arrowRight')}</a><a class="btn btn--ghost" href="leagues.html">Join a League</a></div>
      </div>
      <div class="stack" data-reveal="right">
        ${photo({ src: originals.arcade, alt: 'The arcade at Green Acres Bowl', ar: '4 / 3', label: 'Arcade' })}
        <div class="card card--dark rays">
          <span class="eyebrow">Since ${site.founded}</span>
          <h3>Family owned and operated for more than five decades.</h3>
          <p class="muted mb-0">A newly revamped space to bring your family and friends — with a team that's here to take care of you.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--silver" aria-labelledby="loc-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Location', title: `<span id="loc-title">${site.name}</span>`, lead: `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}` })}
    <div class="grid grid--3">
      <div class="card" data-reveal>${infoList()}<div class="btn-row mt-2"><a class="btn btn--primary" href="${site.directionsUrl}" target="_blank" rel="noopener">${icon('car')} Get Directions</a><a class="btn btn--ghost" href="${site.phoneHref}">${icon('phone')} Call Us</a></div></div>
      <div class="card" data-reveal style="--i:1"><h3>Hours</h3>${hoursList()}</div>
      <div data-reveal style="--i:2">${mapEmbed({ height: 380 })}</div>
    </div>
  </div>
</section>
`,
};
