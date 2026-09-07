import { site, icon, photo, reviewCard, sectionHead, reviews, esc, locationBlock } from '../layout.mjs';
import { originals } from '../data.mjs';

const pinSVG = `<svg viewBox="0 0 30 86" aria-hidden="true"><path d="M15 2c-5 0-7.5 3.6-7.5 8 0 4.2 2.2 7 2.2 11.4 0 5.2-7 9.5-7 19.8C2.7 52.6 5.7 84 15 84s12.3-31.4 12.3-42.8c0-10.3-7-14.6-7-19.8 0-4.4 2.2-7.2 2.2-11.4C22.5 5.6 20 2 15 2z" fill="#fff" stroke="#c8d3da" stroke-width="1.5"/><path d="M8.6 26h12.8M8.2 31h13.6" stroke="#205878" stroke-width="2.4" stroke-linecap="round"/></svg>`;

const highlights = [
  { title: 'Now taking online reservations!', text: 'Secure a lane ahead of time or book your party in a few taps.', cta: 'Reserve Now', href: 'reservations.html', img: originals.heroReservations, kicker: 'Reservations', icon: 'calendar', span: 'span-4' },
  { title: 'Play all of the Classics in our Arcade!', text: 'With renovations, new menus and other changes, Green Acres Bowl is now better than ever!', cta: 'More Specials', href: 'specials-and-events.html', img: originals.heroArcade, kicker: 'Arcade & events', icon: 'gamepad', span: 'span-2' },
  { title: 'Bowling 7 Days a Week!', text: 'Open every day, with weekly specials for families, college nights and leagues.', cta: 'Check Out Our Rates', href: 'rates.html', img: originals.heroSevenDays, kicker: 'Rates', icon: 'ticket', span: 'span-2' },
  { title: 'Check out our Pro Shop for all of your bowling needs!', text: 'Buy, fix and accessorize your bowling ball and gear.', cta: 'Our Pro Shop', href: 'pro-shop.html', img: originals.heroProShop, kicker: 'Pro Shop', icon: 'bag', span: 'span-4' },
];

const amenities = ['32 Lanes', 'Food & Drinks Delivered to Your Lane', 'Full-Service Bars', 'Pool Tables', 'Arcade Games', 'TVs for Every Game', 'Live Music', 'Karaoke', 'Dance Lessons', 'League Nights', 'Pro Shop', 'Birthday Parties', 'Corporate Events'];
const amenityIcons = ['lanes', 'forkKnife', 'martini', 'pool', 'gamepad', 'tv', 'music', 'mic', 'sparkles', 'trophy', 'bag', 'cake', 'building'];

const quick = [
  { label: 'About Us', href: 'about.html', icon: 'info', text: 'Generations of bowling fun since 1957.' },
  { label: 'Rates', href: 'rates.html', icon: 'ticket', text: 'Prices, specials and USBC member games.' },
  { label: 'Reviews', href: 'reviews.html', icon: 'star', text: 'What Tyler says about the new Green Acres.' },
  { label: 'Contact Us', href: 'contact-us.html', icon: 'envelope', text: 'Directions, hours and a quick message form.' },
];

export default {
  id: 'home',
  title: 'Green Acres Bowl | Tyler, TX',
  description: 'Green Acres Bowl in Tyler, TX — 32 lanes, snack bar with lane delivery, arcade, pool tables, the 11th Frame Club, leagues and a pro shop. Family owned since 1957. Now taking online reservations.',
  reserve: 'form',
  body: () => `
<section class="hero section--dark rays" aria-labelledby="hero-title">
  <div class="container">
    <img class="hero__logo" src="assets/brand/gab-logo.png" alt="" aria-hidden="true" width="992" height="349" fetchpriority="high" decoding="async">
    <span class="eyebrow eyebrow--center" data-reveal>Tyler, Texas · Family owned since ${site.founded}</span>
    <h1 id="hero-title" data-reveal style="--i:1">Make memories you'll never forget.</h1>
    <p class="lead" data-reveal style="--i:2">Where can you go in Texas to have a striking good time, filled with countless hours of entertainment, games, music and laughter? The improved Green Acres Bowl in Tyler, of course!</p>
    <div class="btn-row btn-row--center" data-reveal style="--i:3">
      <a class="btn btn--light btn--lg" href="#reserve">${icon('calendar')} Reserve a Lane</a>
      <a class="btn btn--glass btn--lg" href="rates.html">${icon('ticket')} See Rates & Specials</a>
    </div>
    <div class="hero__chips" data-reveal style="--i:4">
      <span class="chip">${icon('clock')} Bowling 7 days a week</span>
      <span class="chip">${icon('lanes')} ${site.lanes} lanes</span>
      <span class="chip">${icon('forkKnife')} Lane-side food &amp; drinks</span>
      <span class="chip">${icon('calendar')} Now taking online reservations</span>
    </div>
  </div>
  <a class="hero__scroll" href="#highlights" aria-label="Scroll to highlights"><span>Scroll</span>${icon('arrowDown')}</a>
</section>

<section id="highlights" class="section" aria-labelledby="highlights-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'What’s new', title: '<span id="highlights-title">Better than ever.</span>', lead: 'Renovated lanes, new menus, new score monitors and a team that goes above and beyond.', center: true })}
    <div class="bento">
      ${highlights.map((h, i) => `<a class="tile" href="${h.href}" data-reveal style="--i:${i}">
        <div class="tile__media">${photo({ src: h.img, alt: h.title, label: h.kicker })}</div>
        <div class="tile__body"><span class="tile__kicker">${icon(h.icon)} ${esc(h.kicker)}</span><h3>${esc(h.title)}</h3><p>${esc(h.text)}</p><span class="link">${esc(h.cta)} ${icon('arrowRight')}</span></div>
      </a>`).join('')}
    </div>
  </div>
</section>

<section class="lane-scene section--silver" aria-label="A night at Green Acres, step by step">
  <div class="lane-scene__sticky">
    <div class="container">
      <div class="lane-scene__head">
        <span class="eyebrow eyebrow--center">A night at Green Acres</span>
        <h2>Line it up. Let it roll.</h2>
      </div>
      <div class="lane" aria-hidden="true">
        <div class="lane__board">
          <div class="lane__gutter lane__gutter--top"></div>
          <div class="lane__foul"></div>
          <div class="lane__arrows"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
          <div class="pins">${[1, 2, 3, 4].map((n, c) => `<div class="pins__col">${Array.from({ length: n }, (_, r) => `<div class="pinv" style="--i:${c * 3 + r}">${pinSVG}</div>`).join('')}</div>`).join('')}</div>
          <div class="strike-flash">STRIKE!</div>
          <div class="lane__gutter lane__gutter--bottom"></div>
        </div>
        <div class="ball"><i></i></div>
      </div>
      <ol class="lane-steps">
        <li class="lane-step"><span class="lane-step__n">FRAME 1</span><h3>Reserve your lane</h3><p>Book online in seconds, or walk in — we're open 7 days a week.</p></li>
        <li class="lane-step"><span class="lane-step__n">FRAME 2</span><h3>Order to your lane</h3><p>Full-service snack and drink bars deliver right to you.</p></li>
        <li class="lane-step"><span class="lane-step__n">FRAME 3</span><h3>Play the classics</h3><p>Arcade games, pool tables and TVs for every big game.</p></li>
        <li class="lane-step"><span class="lane-step__n">FRAME 10</span><h3>Meet at the 11th Frame</h3><p>Live music, karaoke and a full bar in our private club.</p></li>
      </ol>
    </div>
  </div>
</section>

<section class="section section--dark rays" aria-labelledby="score-title">
  <div class="container">
    <div class="ribbon" data-reveal="scale" aria-hidden="true">
      <svg viewBox="0 0 360 74" fill="none"><path d="M40 20 6 34l34 14v-8h8V28h-8z" fill="#c9ced2"/><path d="M320 20l34 14-34 14v-8h-8V28h8z" fill="#c9ced2"/><path d="M44 12h272l8 8v30l-8 8H44l-8-8V20z" fill="url(#rg)"/><path d="M44 12h272l8 8v30l-8 8H44l-8-8V20z" stroke="#d6dbdf" stroke-width="1.5"/><defs><linearGradient id="rg" x1="0" y1="12" x2="0" y2="58" gradientUnits="userSpaceOnUse"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#e6e9ec"/></linearGradient></defs></svg>
      <span class="ribbon__text">Since ${site.founded}</span>
    </div>
    <div class="section-head section-head--center mt-2" data-reveal>
      <span class="eyebrow">The scoreboard</span>
      <h2 id="score-title">Family owned and operated for more than five decades.</h2>
      <p class="lead">A completely renovated facility with additional offerings you won't find anywhere else in Tyler.</p>
    </div>
    <div class="scoreboard" data-reveal style="--i:1">
      <div class="stat"><div class="stat__value"><span data-count="${site.lanes}">0</span></div><div class="stat__label">Lanes</div></div>
      <div class="stat"><div class="stat__value"><span data-count="${site.founded}" data-plain>0</span></div><div class="stat__label">Serving Tyler since</div></div>
      <div class="stat"><div class="stat__value"><span data-count="7">0</span></div><div class="stat__label">Days open every week</div></div>
      <div class="stat"><div class="stat__value"><span data-count="2">0</span></div><div class="stat__label">Snack &amp; drink bars</div></div>
    </div>
    <div class="mt-3" data-reveal style="--i:2"><div class="frames" aria-hidden="true">${Array.from({ length: 10 }, (_, i) => `<span style="--i:${i}"></span>`).join('')}</div></div>
  </div>
</section>

<section class="section" aria-labelledby="story-title">
  <div class="container">
    <div class="split split--60">
      <div class="prose" data-reveal>
        <span class="eyebrow">It doesn't have to be Thanksgiving to get a turkey</span>
        <h2 id="story-title">Make memories you'll never forget in Tyler at Green Acres Bowl</h2>
        <p class="lead">Since ${site.founded}, we've been the go-to bowling alley for fun and we have worked hard to provide you with a newly revamped space to bring your family and friends. Whether you want to enjoy the night watching your favorite sports team on one of our TVs or you want to hold a bowling event for your group, you won't regret choosing Green Acres Bowl.</p>
        <h3>Belly the ball down the lane at our revamped bowling alley!</h3>
        <p>At Green Acres Bowl, we understand you want a fun and exciting place to lay down your bowling moves. That's why we've stepped up our game and are offering Tyler residents a completely renovated facility with additional offerings you won't find anywhere else.</p>
        <p>Family owned and operated for more than five decades, Green Acres Bowl offers ${site.lanes}-lanes and a fully stocked snack and drink bar so your family can replenish during a fierce game of tenpins. Not only do we have food, drinks, games and entertainment you can enjoy for hours, we also have a pro shop for your bowling needs.</p>
        <p>Buy, fix and accessorize your bowling ball and other gear at Green Acres Bowl and take your game to a whole new level. Instead of going to the same place you always do for a night of fun, try our improved alley for food, drinks and entertainment you'll remember for years to come.</p>
        <h3>Our upgrades offer something for everyone</h3>
        <p>When we say hours of entertainment, we're not just talking about our incredible, improved lanes. Once you're done practicing your arm swing, you can try your luck at one of our pool tables or grab a beer while watching your favorite sports game.</p>
        <p>Green Acres Bowl also features live music, league nights and offers dance lessons for anyone wanting to add some moves to their repertoire.</p>
        <p>Whatever your idea for a good time in Tyler, TX, you'll find everything you need for fun at Green Acres Bowl. Call <a href="${site.phoneHref}">${site.phone}</a> to reserve your lane for your next corporate event, school outing or birthday bash!</p>
      </div>
      <div class="stack" style="--stack:1rem" data-reveal="right">
        ${photo({ src: originals.arcade, alt: 'Inside Green Acres Bowl', ar: '4 / 3', label: 'Green Acres Bowl' })}
        <div class="grid grid--2">
          ${[['lanes', '32 lanes', 'Renovated, improved lanes'], ['forkKnife', 'Lane delivery', 'Food and drinks to you'], ['pool', 'Pool tables', 'Plus arcade classics'], ['tv', 'Sports on TV', 'Watch every big game']].map(([ic, t, d], i) => `<div class="card"><div class="feature-row"><span class="icon-badge">${icon(ic)}</span><div class="feature"><h3>${t}</h3><p>${d}</p></div></div></div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section section--flush-top" aria-label="Amenities">
  <div class="marquee" data-reveal>
    <div class="marquee__track">${[0, 1].map((copy) => `<ul class="pill-list marquee__group" ${copy ? 'aria-hidden="true"' : ''}>${amenities.map((a, i) => `<li>${icon(amenityIcons[i])} ${a}</li>`).join('')}</ul>`).join('')}</div>
  </div>
</section>

<section class="section section--tint" aria-labelledby="quick-title">
  <div class="container">
    ${sectionHead({ eyebrow: 'Find your way', title: '<span id="quick-title">Everything you need, one tap away.</span>', center: true })}
    <div class="grid grid--4">
      ${quick.map((q, i) => `<a class="card card--hover" href="${q.href}" data-reveal style="--i:${i}"><span class="card__arrow">${icon('arrowUpRight')}</span><span class="icon-badge">${icon(q.icon)}</span><h3>${q.label}</h3><p class="muted">${q.text}</p></a>`).join('')}
    </div>
    <div class="card card--dark rays mt-2" data-reveal>
      <div class="split split--center" style="--gap:1rem">
        <div>
          <span class="badge badge--dark">${icon('badge')} We're hiring</span>
          <h3 class="mt-1">Apply now — we're looking for enthusiastic, friendly people to work in a fun environment.</h3>
          <p class="muted">We have positions for the front desk, the grill, and for a mechanics helper!</p>
        </div>
        <div class="btn-row" style="justify-content:flex-end"><a class="btn btn--light btn--lg" href="employment-opportunities.html">Learn More ${icon('arrowRight')}</a></div>
      </div>
    </div>
  </div>
</section>

<section class="section" aria-labelledby="reviews-title">
  <div class="container">
    <div class="section-head section-head--center" data-reveal>
      <span class="eyebrow">Reviews</span>
      <h2 id="reviews-title">Read why Green Acres Bowl is the best bowling alley in Tyler, TX.</h2>
    </div>
    <div class="grid grid--3">
      ${[reviews[1], reviews[6], reviews[9]].map((r, i) => reviewCard(r, i)).join('')}
    </div>
    <div class="btn-row btn-row--center mt-2" data-reveal>
      <a class="btn btn--secondary" href="reviews.html">Read all reviews ${icon('arrowRight')}</a>
      <a class="btn btn--ghost" href="${site.googleReview}" target="_blank" rel="noopener">${icon('google')} Leave us a Google review</a>
    </div>
  </div>
</section>

${locationBlock()}
`,
};
