import { site, icon, photo, pageHero, sectionHead } from '../layout.mjs';
import { originals } from '../data.mjs';

export default {
  id: 'club',
  title: '11th Frame Club | Green Acres Bowl',
  description: "Green Acres Bowl's 11th Frame Club, Inc. — private club memberships with a full bar, dance floor, pool tables, TVs, live music and karaoke. 21 and up, non-smoking, open 7 days a week.",
  body: () => `
${pageHero({ eyebrow: 'Amenities · 11th Frame Club', title: "Check out Green Acres Bowl's 11th Frame Club, Inc.!", lead: 'The 11th Frame Club offers private club memberships to enjoy all of our incredible amenities! From a full bar and dance floor to pool tables and several TVs (including a 72" TV!), you don\'t want to miss out!', crumbs: [{ label: 'Amenities' }, { label: '11th Frame Club' }], actions: `<a class="btn btn--primary" href="contact-us.html">${icon('envelope')} Contact Us</a><a class="btn btn--ghost" href="${originals.clubMenuPdf}" target="_blank" rel="noopener">${icon('download')} Downloadable Version (menu)</a>` })}

<section class="section section--flush-top">
  <div class="container">
    <div class="grid grid--4 mb-2">
      ${[['martini', 'Full bar', 'Drink specials and a dance floor.'], ['pool', 'Pool tables', 'Rack one up between frames.'], ['tv', 'Several TVs', 'Including a 72" screen for game day.'], ['cake', 'Private parties', 'Seasonal and birthday parties — booking is free of charge.']].map(([ic, t, d], i) => `<div class="card" data-reveal style="--i:${i}"><span class="icon-badge">${icon(ic)}</span><h3>${t}</h3><p class="muted mb-0">${d}</p></div>`).join('')}
    </div>

    <div class="split split--60">
      <div data-reveal>
        ${sectionHead({ eyebrow: 'Membership', title: 'How to join', reveal: false })}
        <ul class="check-list mb-2">
          <li>${icon('badge')}<span>You must be <strong>21 or older</strong> to join, with a valid photo ID (driver's license, Military ID, or a passport).</span></li>
          <li>${icon('shield')}<span>The club is <strong>non-smoking</strong>.</span></li>
          <li>${icon('clock')}<span>Open <strong>7 days a week</strong>.</span></li>
          <li>${icon('party')}<span>Available for seasonal parties and birthday parties — <strong>booking is free of charge!</strong></span></li>
        </ul>
        ${sectionHead({ eyebrow: 'Weekly events', title: 'Live at the 11th Frame', reveal: false })}
        <div class="schedule">
          <div class="schedule__item"><span class="schedule__time">8:30 PM</span><div><div class="schedule__title">${icon('music', { size: 16 })} Lynn Groom — Vocalist and Pianist</div><div class="schedule__meta">Music of all sorts · Tuesday, Thursday and Saturday</div></div></div>
          <div class="schedule__item"><span class="schedule__time">9 PM – 12 AM</span><div><div class="schedule__title">${icon('mic', { size: 16 })} Karaoke</div><div class="schedule__meta">Hosted by Aubrey Moss</div></div></div>
        </div>
        <div class="btn-row mt-2"><a class="btn btn--primary" href="contact-us.html">${icon('envelope')} Contact Us</a><a class="btn btn--ghost" href="${site.phoneHref}">${icon('phone')} ${site.phone}</a></div>
      </div>
      <div class="stack" data-reveal="right">
        <div><span class="eyebrow">Club hours</span><a href="${originals.clubHours}" target="_blank" rel="noopener">${photo({ src: originals.clubHours, alt: '11th Frame Club hours', sheet: true, label: '11th Frame Club Hours' })}</a></div>
        <div><span class="eyebrow">Club menu</span><a href="${originals.clubMenu}" target="_blank" rel="noopener">${photo({ src: originals.clubMenu, alt: '11th Frame Club menu', sheet: true, label: '11th Frame Club Menu' })}</a>
        <div class="btn-row mt-1"><a class="btn btn--secondary" href="${originals.clubMenuPdf}" target="_blank" rel="noopener">${icon('doc')} Downloadable Version</a></div></div>
      </div>
    </div>
  </div>
</section>
`,
};
