import { site, icon, photo, pageHero, sectionHead } from '../layout.mjs';
import { originals, eventTypes } from '../data.mjs';

const eventIcons = { 'Corporate event': 'building', 'School event': 'school', 'Day care': 'sun', 'Team building': 'users', 'Church event': 'church', 'Birthday party': 'cake', 'College night': 'moon' };

export default {
  id: 'events',
  title: 'Parties and Events | Green Acres Bowl',
  description: 'Plan your party or event at Green Acres Bowl in Tyler, TX — corporate events, school outings, day care, team building, church events, birthday parties and college nights. Family Fun Night and College Night specials every week.',
  body: () => `
${pageHero({ eyebrow: 'Plan Your Event', title: "Okay, we'll spare you the terrible bowling jokes…", lead: "But not the fun! Make memories you'll never forget at Green Acres Bowl.", crumbs: [{ label: 'Plan Your Event' }], actions: `<a class="btn btn--primary" href="reservations.html#reserve">${icon('calendar')} Reserve Now</a><a class="btn btn--ghost" href="contact-us.html">${icon('envelope')} Contact Us</a>` })}

<section class="section section--flush-top">
  <div class="container">
    <div class="split split--60">
      <div class="prose" data-reveal>
        <p class="lead">With ${site.lanes} lanes, two snack and drink bars offering both alcoholic and non-alcoholic beverages, pool tables, arcade games and TVs to watch your favorite sports, Green Acres Bowl is changing what Tyler residents think of bowling alleys.</p>
        <p>We've been providing hours of entertainment to Texas families for more than five decades and have revamped our facility to give you an updated bowling experience.</p>
        <p>Besides offering numerous ways to keep your family, employees or colleagues entertained, Green Acres Bowl also holds regular events and specials including <strong>Family Fun Night every Monday, Wednesday and Friday</strong>, as well as <strong>College Night every Tuesday and Thursday</strong>.</p>
        <p>Find a bowling league to call your own or rent our entire facility for a massive party your guests will never forget! Whichever night or event you choose, you won't regret bringing your family and friends to Green Acres Bowl in Tyler, TX.</p>
      </div>
      <div class="sticky-col" data-reveal="right">${photo({ src: originals.events, alt: "Okay, We'll Spare You the Terrible Bowling Jokes...", ar: '4 / 3', label: 'Parties & Events' })}</div>
    </div>
  </div>
</section>

<section class="section section--tint" aria-labelledby="bring-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Perfect for', title: '<span id="bring-title">Green Acres Bowl is the perfect place to bring your:</span>', center: true })}
    <div class="grid grid--4">
      ${eventTypes.map((t, i) => `<div class="card card--hover" data-reveal style="--i:${i % 4}"><span class="icon-badge">${icon(eventIcons[t])}</span><h3>${t}</h3></div>`).join('')}
      <a class="card card--hover card--dark" href="reservations.html#reserve" data-reveal style="--i:3"><span class="icon-badge icon-badge--onDark">${icon('sparkles')}</span><h3>Full facility rental</h3><p class="muted mb-0">Rent our entire facility for a massive party. ${icon('arrowRight', { size: 14 })}</p></a>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="weekly-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Every week', title: '<span id="weekly-title">Regular events and specials</span>' })}
    <div class="grid grid--3">
      <div class="card" data-reveal><span class="icon-badge">${icon('users')}</span><h3>Family Fun Night</h3><p class="muted mb-0">Every Monday, Wednesday and Friday.</p></div>
      <div class="card" data-reveal style="--i:1"><span class="icon-badge">${icon('moon')}</span><h3>College Night</h3><p class="muted mb-0">Every Tuesday and Thursday — plus $12 unlimited bowling from 9 PM to midnight. <a href="rates.html">See rates ${icon('arrowRight', { size: 14 })}</a></p></div>
      <div class="card" data-reveal style="--i:2"><span class="icon-badge">${icon('trophy')}</span><h3>League nights</h3><p class="muted mb-0">Find a bowling league to call your own. <a href="leagues.html">See leagues ${icon('arrowRight', { size: 14 })}</a></p></div>
    </div>
  </div>
</section>
`,
};
