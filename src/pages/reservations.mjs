import { site, icon, pageHero, sectionHead } from '../layout.mjs';
import { eventTypes } from '../data.mjs';

export default {
  id: 'reservations',
  title: 'Reservations | Green Acres Bowl',
  description: 'Green Acres Bowl now takes online reservations. Reserve a lane, book a party or plan a large-group outing in Tyler, TX — or call 903-561-2911.',
  reserve: 'form',
  body: () => `
${pageHero({ eyebrow: 'Plan Your Event · Reservations', title: 'Reservations', lead: 'Planning an outing or party for a large group? Want to make sure you secure a lane ahead of time? Green Acres Bowl now takes online reservations! Select the option that pertains to your needs, fill out the form, and we will take it from there!', crumbs: [{ label: 'Plan Your Event', href: 'specials-and-events.html' }, { label: 'Reservations' }], actions: `<a class="btn btn--primary btn--lg" href="${site.booking}" target="_blank" rel="noopener">${icon('calendar')} Book Now ${icon('arrowUpRight')}</a><a class="btn btn--ghost btn--lg" href="#reserve">${icon('doc')} Request a reservation</a><a class="btn btn--ghost btn--lg" href="${site.phoneHref}">${icon('phone')} ${site.phone}</a>` })}

<section class="section section--flush-top">
  <div class="container">
    ${sectionHead({ eyebrow: 'Two ways to book', title: 'Instant booking, or send us a request.' })}
    <div class="grid grid--2">
      <a class="card card--hover card--dark rays" href="${site.booking}" target="_blank" rel="noopener" data-reveal>
        <span class="card__arrow" style="color:#fff">${icon('arrowUpRight')}</span>
        <span class="icon-badge icon-badge--onDark">${icon('calendar')}</span>
        <h3>Book Now — online reservations</h3>
        <p class="muted">Pick your date, time and package and reserve instantly through our online booking partner.</p>
        <span class="btn btn--light">Book Now ${icon('arrowUpRight')}</span>
      </a>
      <a class="card card--hover" href="#reserve" data-reveal style="--i:1">
        <span class="card__arrow">${icon('arrowDown')}</span>
        <span class="icon-badge">${icon('envelope')}</span>
        <h3>Request a reservation</h3>
        <p class="muted">Tell us about your group and occasion below. Our front desk confirms by phone or email.</p>
        <span class="btn btn--secondary">Go to the form ${icon('arrowDown')}</span>
      </a>
    </div>
    <p class="caption mt-2" data-reveal>Feel free to call <a href="${site.phoneHref}">${site.phone}</a> if you have any questions.</p>
  </div>
</section>

<section class="section section--silver" aria-labelledby="book-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'What you can book', title: '<span id="book-title">Lanes, parties and the whole place.</span>', lead: 'Green Acres Bowl is the perfect place to bring your group of any size.' })}
    <ul class="pill-list" data-reveal>${['Open bowling', ...eventTypes, 'Full facility rental', 'League practice'].map((t) => `<li>${icon('checkCircle')} ${t}</li>`).join('')}</ul>
  </div>
</section>
`,
};
