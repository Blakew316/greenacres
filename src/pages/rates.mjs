import { site, icon, photo, pageHero, sectionHead, hoursList, infoList, mapEmbed } from '../layout.mjs';
import { originals } from '../data.mjs';

export default {
  id: 'rates',
  title: 'Rates | Green Acres Bowl',
  description: 'Bowling rates and specials at Green Acres Bowl in Tyler, TX. $12 per person unlimited bowling Tuesdays and Thursdays 9pm–midnight, $2.50 games for local USBC members. Book your next party online.',
  body: () => `
${pageHero({ eyebrow: 'Plan Your Event · Rates', title: 'Rates & Specials', lead: 'Bowling 7 days a week. Here are our current prices and weekly specials — book your next party online or call ahead.', crumbs: [{ label: 'Plan Your Event', href: 'specials-and-events.html' }, { label: 'Rates' }], actions: `<a class="btn btn--primary" href="reservations.html#reserve">${icon('calendar')} Make your online reservation</a><a class="btn btn--ghost" href="${site.phoneHref}">${icon('phone')} ${site.phone}</a>` })}

<section class="section section--flush-top" aria-labelledby="specials-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Specials', title: '<span id="specials-title">Unlimited bowling nights and member games.</span>' })}
    <div class="grid grid--2">
      <div class="card card--dark rays" data-reveal>
        <span class="badge badge--dark">${icon('glowing')} Tuesdays &amp; Thursdays</span>
        <div class="price mt-1" style="color:#fff">$12<small style="color:rgba(255,255,255,.6)">/ person</small></div>
        <h3 class="mt-1">UNLIMITED Bowling — shoes included</h3>
        <p class="muted">Tuesdays &amp; Thursdays from 9:00 PM – Midnight.</p>
        <p class="caption mb-0" style="color:rgba(255,255,255,.55)">Minimum 3 person charge per lane.</p>
      </div>
      <div class="card card--tint" data-reveal style="--i:1">
        <span class="badge">${icon('trophy')} Local USBC members</span>
        <div class="price mt-1">$2.50<small>/ game</small></div>
        <h3 class="mt-1">Member games</h3>
        <p class="muted">Local USBC members bowl $2.50 games. Bring your membership card.</p>
        <p class="mb-0"><a class="link" href="leagues.html">Join a league ${icon('arrowRight')}</a></p>
      </div>
    </div>
  </div>
</section>

<section class="section section--silver" aria-labelledby="prices-title">
  <div class="container">
    <div class="split split--40" style="align-items:start">
      <div data-reveal>
        ${sectionHead({ eyebrow: 'Price sheet', title: '<span id="prices-title">Current bowling prices</span>', lead: 'Tap to enlarge the full price sheet. Prices are subject to change — call the front desk for today\'s rates.', reveal: false })}
        <div class="card card--dark rays">
          <span class="eyebrow">Book your next Party!</span>
          <h3>Make your online reservations today!</h3>
          <div class="btn-row mt-1"><a class="btn btn--light" href="reservations.html#reserve">${icon('calendar')} Reserve Now</a><a class="btn btn--glass" href="${site.booking}" target="_blank" rel="noopener">Book Now ${icon('arrowUpRight')}</a></div>
        </div>
      </div>
      <div data-reveal="right"><a href="${originals.rates}" target="_blank" rel="noopener">${photo({ src: originals.rates, alt: 'Green Acres Bowl bowling prices', sheet: true, label: 'Bowling Prices' })}</a></div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="rates-loc-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Location & hours', title: `<span id="rates-loc-title">${site.name}</span>`, lead: `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}` })}
    <div class="grid grid--3">
      <div class="card" data-reveal>${infoList()}<div class="btn-row mt-2"><a class="btn btn--primary" href="${site.directionsUrl}" target="_blank" rel="noopener">${icon('car')} Get Directions</a></div></div>
      <div class="card" data-reveal style="--i:1"><h3>Hours</h3>${hoursList()}</div>
      <div data-reveal style="--i:2">${mapEmbed({ height: 380 })}</div>
    </div>
  </div>
</section>
`,
};
