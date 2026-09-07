import { site, nav, pages, reviews } from './data.mjs';
import { icon } from './icons.mjs';

export { site, nav, pages, reviews, icon };

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
export { esc };

/* ------------------------------------------------------------------ helpers */
export const initials = (name) => name.split(/\s+/).map((w) => w[0]).join('').replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase();

export function photo({ src, alt = '', ar = '16 / 9', cls = '', sheet = false, label = 'Green Acres Bowl', loading = 'lazy', width, height }) {
  const dims = width && height ? ` width="${width}" height="${height}"` : '';
  return `<figure class="photo ${sheet ? 'photo--sheet' : 'photo--rays'} ${cls}" style="--ar:${ar}">
  <img src="${src}" alt="${esc(alt)}" loading="${loading}" decoding="async" data-fallback${dims}>
  <div class="photo__fallback" aria-hidden="true"><div><img src="assets/brand/gab-logo.png" alt="" loading="lazy"><span>${esc(label)}</span></div></div>
</figure>`;
}

export const fmtTime = (t) => t.replace(':00', '');
export function hoursList({ compact = false } = {}) {
  const dayIdx = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
  return `<ul class="hours" data-hours>
${site.hours.map(([d, o, c, limited]) => `  <li data-day="${dayIdx[d]}"><span class="hours__day">${compact ? d.slice(0, 3) : d}${limited ? ' <span class="hours__mark" title="' + esc(site.hoursNote) + '">*</span>' : ''}</span><span class="hours__time">${fmtTime(o)} – ${fmtTime(c)}</span></li>`).join('\n')}
</ul>
<p class="hours-note">* ${esc(site.hoursNote)}</p>`;
}

/* One consistent "find us" block used on Home, About and Rates: info · hours · map, equal heights. */
export function locationBlock({ eyebrow = 'Visit us', title = 'Come see us in Tyler.', lead = `${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip} · Open 7 days a week.`, titleId = 'visit-title' } = {}) {
  return `<section class="section section--silver" aria-labelledby="${titleId}">
  <div class="container">
    ${sectionHead({ eyebrow, title: `<span id="${titleId}">${title}</span>`, lead, center: true })}
    <div class="grid grid--3 location">
      <div class="card location__card" data-reveal><h3>Find us</h3>${infoList()}<div class="btn-row mt-2"><a class="btn btn--primary" href="${site.directionsUrl}" target="_blank" rel="noopener">${icon('car')} Get Directions</a></div></div>
      <div class="card location__card" data-reveal style="--i:1"><h3>Hours</h3>${hoursList()}</div>
      <div class="map-col" data-reveal style="--i:2">${mapEmbed({ height: 380 })}</div>
    </div>
  </div>
</section>`;
}

export function infoList({ dark = false } = {}) {
  const a = site.address;
  return `<ul class="info-list">
  <li>${icon('mapPin')}<div><strong>Address</strong><a href="${site.directionsUrl}" target="_blank" rel="noopener">${a.street}<br>${a.city}, ${a.state} ${a.zip}</a></div></li>
  <li>${icon('phone')}<div><strong>Phone</strong><a href="${site.phoneHref}">${site.phone}</a></div></li>
  <li>${icon('car')}<div><strong>Directions</strong><a href="${site.directionsUrl}" target="_blank" rel="noopener">Open in Google Maps</a></div></li>
  <li>${icon('facebook')}<div><strong>Facebook</strong><a href="${site.facebook}" target="_blank" rel="noopener">@GreenAcresBowlLP</a></div></li>
</ul>`;
}

export function mapEmbed({ height = 360 } = {}) {
  return `<div class="map" style="min-height:${height}px"><iframe src="${site.mapEmbed}" title="Map to Green Acres Bowl, ${site.address.street}, ${site.address.city}, ${site.address.state}" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" style="min-height:${height}px"></iframe></div>`;
}

export function reviewCard(r, i = 0) {
  return `<article class="card quote quote--clamp" data-reveal style="--i:${i % 3}">
  <div class="quote__mark">${icon('quote')}</div>
  <p class="quote__text">${esc(r.text)}</p>
  <button class="quote__more" type="button" aria-expanded="false"><span>Read more</span>${icon('chevronDown')}</button>
  <div class="quote__author"><span class="avatar" aria-hidden="true">${initials(r.name)}</span><div>${esc(r.name)}<div class="stars" role="img" aria-label="5 out of 5 stars">${icon('starFill').repeat(5)}</div></div></div>
</article>`;
}

export function sectionHead({ eyebrow, title, lead, center = false, reveal = true }) {
  return `<div class="section-head ${center ? 'section-head--center' : ''}" ${reveal ? 'data-reveal' : ''}>
  ${eyebrow ? `<span class="eyebrow">${esc(eyebrow)}</span>` : ''}
  <h2>${title}</h2>
  ${lead ? `<p class="lead">${lead}</p>` : ''}
</div>`;
}

export function crumbs(items) {
  return `<nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a>${items.map((c) => `${icon('chevronRight')}${c.href ? `<a href="${c.href}">${esc(c.label)}</a>` : `<span aria-current="page">${esc(c.label)}</span>`}`).join('')}</nav>`;
}

export function pageHero({ eyebrow, title, lead, crumbs: c = [], actions = '', dark = false, extra = '' }) {
  return `<section class="page-hero rays rays--light">
  <div class="container">
    ${c.length ? crumbs(c) : ''}
    ${eyebrow ? `<span class="eyebrow" data-reveal>${esc(eyebrow)}</span>` : ''}
    <h1 data-reveal style="--i:1">${title}</h1>
    ${lead ? `<p class="lead" data-reveal style="--i:2">${lead}</p>` : ''}
    ${actions ? `<div class="btn-row" data-reveal style="--i:3">${actions}</div>` : ''}
    ${extra}
  </div>
</section>`;
}

/* Form field helpers (Netlify Forms compatible; any endpoint via data-endpoint) */
export const field = ({ name, label, type = 'text', required = false, hint = '', placeholder = '', autocomplete = '', attrs = '', value = '' }) => `<div class="field">
  <label class="field__label" for="${name}">${esc(label)}${required ? '<span class="req" aria-hidden="true">*</span>' : ''}</label>
  <input class="input" type="${type}" id="${name}" name="${name}" ${required ? 'required' : ''} ${placeholder ? `placeholder="${esc(placeholder)}"` : ''} ${autocomplete ? `autocomplete="${autocomplete}"` : ''} ${value ? `value="${esc(value)}"` : ''} ${attrs}>
  ${hint ? `<span class="field__hint">${hint}</span>` : ''}
  <span class="field__error">Please complete this field.</span>
</div>`;
export const textarea = ({ name, label, required = false, hint = '', placeholder = '', rows = 5, attrs = '' }) => `<div class="field">
  <label class="field__label" for="${name}">${esc(label)}${required ? '<span class="req" aria-hidden="true">*</span>' : ''}</label>
  <textarea class="textarea" id="${name}" name="${name}" rows="${rows}" ${required ? 'required' : ''} ${placeholder ? `placeholder="${esc(placeholder)}"` : ''} ${attrs}></textarea>
  ${hint ? `<span class="field__hint">${hint}</span>` : ''}
  <span class="field__error">Please complete this field.</span>
</div>`;
export const select = ({ name, label, options, required = false, hint = '', placeholder = 'Select…', selected = '' }) => `<div class="field">
  <label class="field__label" for="${name}">${esc(label)}${required ? '<span class="req" aria-hidden="true">*</span>' : ''}</label>
  <div class="select-wrap"><select class="select" id="${name}" name="${name}" ${required ? 'required' : ''}>
    <option value="" ${selected ? '' : 'selected'} disabled>${esc(placeholder)}</option>
    ${options.map((o) => { const [v, t] = Array.isArray(o) ? o : [o, o]; return `<option value="${esc(v)}" ${v === selected ? 'selected' : ''}>${esc(t)}</option>`; }).join('')}
  </select>${icon('chevronDown')}</div>
  ${hint ? `<span class="field__hint">${hint}</span>` : ''}
  <span class="field__error">Please choose an option.</span>
</div>`;
export const choices = ({ name, label, options, type = 'radio', required = false, hint = '' }) => `<div class="field" role="group" aria-labelledby="${name}-label" ${required ? 'data-required aria-required="true"' : ''}>
  <span class="field__label" id="${name}-label">${esc(label)}${required ? '<span class="req" aria-hidden="true">*</span>' : ''}</span>
  <div class="choices">${options.map((o, i) => `<label class="choice"><input type="${type}" name="${name}${type === 'checkbox' ? '[]' : ''}" value="${esc(o)}" ${required && type === 'radio' ? 'required' : ''}><span>${esc(o)}</span></label>`).join('')}</div>
  ${hint ? `<span class="field__hint">${hint}</span>` : ''}
  <span class="field__error">Please make a selection.</span>
</div>`;
export const fileField = ({ name, label, hint = '', accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png' }) => `<div class="field">
  <label class="field__label" for="${name}">${esc(label)}</label>
  <input class="input" type="file" id="${name}" name="${name}" accept="${accept}">
  ${hint ? `<span class="field__hint">${hint}</span>` : ''}
</div>`;
export const securityCheck = () => `<label class="toggle"><input type="checkbox" name="human" value="yes" required><span class="toggle__switch" aria-hidden="true"></span><span class="toggle__text">${icon('shield')} Security check — I'm a real person</span></label>
<div class="hp" aria-hidden="true"><label>Leave this field empty <input type="text" name="bot-field" tabindex="-1" autocomplete="off"></label></div>`;
export const formOpen = ({ name, success = '', cls = '' }) => `<form class="form ${cls}" name="${name}" method="POST" action="/" data-form data-netlify="true" netlify-honeypot="bot-field" enctype="multipart/form-data" novalidate ${success ? `data-success="${esc(success)}"` : ''}>
<input type="hidden" name="form-name" value="${name}">`;
export const formClose = ({ label = 'Submit', note = 'We respond during business hours. For same-day requests, please call.' }) => `<div class="form__status" role="status" aria-live="polite"></div>
<div class="form__footer"><button class="btn btn--primary btn--lg" type="submit"><span class="spinner" aria-hidden="true"></span><span class="btn__label">${esc(label)}</span>${icon('arrowRight')}</button><span class="caption">${esc(note)}</span></div>
</form>`;

/* Reservation request form (used on Home + Reservations) */
export function reservationForm() {
  return `${formOpen({ name: 'reservation', success: 'Your reservation request is in! We’ll confirm by phone or email shortly.', cls: 'card' })}
<div class="form__row form__row--2">
  ${field({ name: 'first_name', label: 'First name', required: true, autocomplete: 'given-name' })}
  ${field({ name: 'last_name', label: 'Last name', required: true, autocomplete: 'family-name' })}
</div>
<div class="form__row form__row--2">
  ${field({ name: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email', placeholder: 'you@example.com' })}
  ${field({ name: 'phone', label: 'Phone', type: 'tel', required: true, autocomplete: 'tel', placeholder: '(903) 555-0100' })}
</div>
<div class="form__row form__row--3">
  ${field({ name: 'date', label: 'Date', type: 'date', required: true, attrs: 'data-min-today' })}
  ${field({ name: 'time', label: 'Arrival time', type: 'time', required: true })}
  ${field({ name: 'party_size', label: 'Guests', type: 'number', required: true, attrs: 'min="1" max="300" inputmode="numeric"', placeholder: '6' })}
</div>
<div class="form__row form__row--2">
  ${select({ name: 'occasion', label: 'Occasion', required: true, options: ['Open bowling', 'Birthday party', 'Corporate event', 'Team building', 'School event', 'Day care', 'Church event', 'College night', 'League practice', 'Full facility rental', 'Other'] })}
  ${field({ name: 'lanes', label: 'Lanes needed', type: 'number', attrs: 'min="1" max="32" inputmode="numeric"', placeholder: '1', hint: 'Up to 6 bowlers per lane works best.' })}
</div>
${textarea({ name: 'notes', label: 'Anything else?', placeholder: 'Shoe sizes, food & drink, decorations…', rows: 4 })}
${securityCheck()}
${formClose({ label: 'Request reservation', note: 'Requests are confirmed by our front desk. Prefer to book instantly? Use Book Now above.' })}`;
}

/* ----------------------------------------------------------------- shell */
const ICON_V = '4'; // bump to force phones/browsers to refetch home-screen icons
const splash = [
  [1320, 2868, 440, 956, 3], [1206, 2622, 402, 874, 3], [1290, 2796, 430, 932, 3], [1179, 2556, 393, 852, 3], [1284, 2778, 428, 926, 3], [1170, 2532, 390, 844, 3],
  [1125, 2436, 375, 812, 3], [1242, 2688, 414, 896, 3], [828, 1792, 414, 896, 2], [750, 1334, 375, 667, 2],
  [2048, 2732, 1024, 1366, 2], [1668, 2388, 834, 1194, 2], [1640, 2360, 820, 1180, 2], [1620, 2160, 810, 1080, 2],
];

function jsonLd(pageMeta) {
  const a = site.address;
  const dayMap = { Monday: 'Monday', Tuesday: 'Tuesday', Wednesday: 'Wednesday', Thursday: 'Thursday', Friday: 'Friday', Saturday: 'Saturday', Sunday: 'Sunday' };
  const to24 = (t) => { const m = /(\d+):(\d+)\s*(AM|PM)/i.exec(t); let h = +m[1] % 12; if (/pm/i.test(m[3])) h += 12; return `${String(h).padStart(2, '0')}:${m[2]}`; };
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BowlingAlley',
    name: site.name,
    legalName: site.legalName,
    url: site.website + pageMeta.path,
    telephone: '+1-903-561-2911',
    image: site.website + '/assets/icons/icon-512.png',
    logo: site.website + '/assets/brand/gab-logo.png',
    foundingDate: String(site.founded),
    address: { '@type': 'PostalAddress', streetAddress: a.street, addressLocality: a.city, addressRegion: a.state, postalCode: a.zip, addressCountry: 'US' },
    geo: { '@type': 'GeoCoordinates', latitude: 32.311016, longitude: -95.271607 },
    sameAs: [site.facebook],
    openingHoursSpecification: site.hours.map(([d, o, c]) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: dayMap[d], opens: to24(o), closes: to24(c) })),
    amenityFeature: ['32 bowling lanes', 'Snack bar with lane delivery', 'Arcade', 'Pool tables', '11th Frame Club', 'Pro shop', 'Leagues'].map((n) => ({ '@type': 'LocationFeatureSpecification', name: n, value: true })),
  });
}

function navItem(item, activeId) {
  const has = item.children && item.children.length;
  const active = item.id === activeId || (has && item.children.some((c) => c.id === activeId));
  const inner = `${esc(item.label)}${has ? icon('chevronDown') : ''}`;
  const trigger = has
    ? (item.href ? `<a class="primary-nav__link" href="${item.href}" aria-expanded="false">${inner}</a>` : `<button class="primary-nav__link" type="button" aria-expanded="false">${inner}</button>`)
    : `<a class="primary-nav__link" href="${item.href}" ${active ? 'aria-current="page"' : ''}>${inner}</a>`;
  const mega = has ? `<div class="mega" role="group" aria-label="${esc(item.label)}">${item.children.map((c) => `<a class="mega__item ${c.id === activeId ? 'is-active' : ''}" href="${c.href}"><span class="mega__icon">${icon(c.icon)}</span><span><span class="mega__title">${esc(c.label)}</span><br><span class="mega__desc">${esc(c.desc)}</span></span></a>`).join('')}</div>` : '';
  return `<li class="primary-nav__item ${has ? 'has-children' : ''} ${active ? 'is-active' : ''}">${trigger}${mega}</li>`;
}

function sheetGroup(item, activeId) {
  if (!item.children) return `<div class="sheet__group"><a class="sheet__link ${item.id === activeId ? 'is-active' : ''}" href="${item.href}">${icon(item.icon)}${esc(item.label)}</a></div>`;
  return `<div class="sheet__group"><div class="sheet__label">${icon(item.icon)}${esc(item.label)}</div><div class="sheet__links">${item.children.map((c) => `<a class="sheet__link sheet__link--sub ${c.id === activeId ? 'is-active' : ''}" href="${c.href}">${icon(c.icon)}${esc(c.label)}</a>`).join('')}</div></div>`;
}

export function reserveBand({ inPage = false } = {}) {
  return `<section id="reserve" class="section section--tight reserve" aria-labelledby="reserve-title">
  <div class="container">
    <div class="cta-band rays" data-reveal>
      <img class="cta-band__logo" src="assets/brand/gab-logo.png" alt="" aria-hidden="true" loading="lazy">
      <div>
        <span class="eyebrow">Reservations</span>
        <h2 id="reserve-title">Reserve your lane.</h2>
        <p>Bowling 7 days a week. Secure a lane ahead of time, or book a party, corporate outing or full-facility rental online.</p>
      </div>
      <div class="btn-row">
        <a class="btn btn--light btn--lg" href="reservations.html#reserve">${icon('calendar')} Reserve a Lane</a>
        <a class="btn btn--glass btn--lg" href="${site.phoneHref}">${icon('phone')} ${site.phone}</a>
      </div>
    </div>
  </div>
</section>`;
}

export function reserveSection({ eyebrow = 'Reservations', title = 'Reserve your lane.', intro } = {}) {
  return `<section id="reserve" class="section reserve section--tint rays rays--light" aria-labelledby="reserve-title">
  <div class="container">
    <div class="reserve__panel">
      <div class="reserve__aside" data-reveal>
        <span class="eyebrow">${esc(eyebrow)}</span>
        <h2 id="reserve-title">${title}</h2>
        <p class="lead">${intro || 'Planning an outing or party for a large group? Want to make sure you secure a lane ahead of time? Green Acres Bowl now takes online reservations. Fill out the form and we will take it from there — or book instantly below.'}</p>
        <ul class="check-list mt-2">
          <li>${icon('checkCircle')}<span>Instant online booking for lanes and parties</span></li>
          <li>${icon('checkCircle')}<span>Food and drinks delivered right to your lane</span></li>
          <li>${icon('checkCircle')}<span>Corporate, school, church and birthday packages</span></li>
        </ul>
        <div class="btn-row">
          <a class="btn btn--primary btn--lg" href="${site.booking}" target="_blank" rel="noopener">${icon('calendar')} Book Now ${icon('arrowUpRight')}</a>
          <a class="btn btn--ghost btn--lg" href="${site.phoneHref}">${icon('phone')} ${site.phone}</a>
        </div>
        <p class="caption mt-1">Feel free to call ${site.phone} if you have any questions.</p>
      </div>
      <div data-reveal style="--i:1">${reservationForm()}</div>
    </div>
  </div>
</section>`;
}

export function layout({ id, title, description, body, reserve = 'band', headExtra = '', bodyClass = '', baseHref = '' }) {
  const meta = pages.find((p) => p.id === id) || pages[0];
  const reserveHref = reserve === 'form' ? '#reserve' : 'reservations.html#reserve';
  const hoursData = esc(JSON.stringify(site.hours.map(([d, o, c]) => [['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(d), o, c])));
  return `<!DOCTYPE html>
<html lang="en" class="no-js" data-page="${id}">
<head>
<meta charset="utf-8">
${baseHref ? `<base href="${baseHref}">` : ''}
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${site.website}${meta.path}">
<meta name="theme-color" content="${site.themeColor}">
<meta name="color-scheme" content="light">
<meta name="format-detection" content="telephone=yes">
<link rel="manifest" href="manifest.webmanifest?v=${ICON_V}">
<link rel="icon" href="favicon.ico?v=${ICON_V}" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="assets/icons/favicon-32.png?v=${ICON_V}">
<link rel="icon" type="image/png" sizes="16x16" href="assets/icons/favicon-16.png?v=${ICON_V}">
<link rel="apple-touch-icon" sizes="180x180" href="assets/icons/apple-touch-icon.png?v=${ICON_V}">
<link rel="apple-touch-icon" sizes="167x167" href="assets/icons/apple-touch-icon-167.png?v=${ICON_V}">
<link rel="apple-touch-icon" sizes="152x152" href="assets/icons/apple-touch-icon-152.png?v=${ICON_V}">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="Green Acres">
<meta name="application-name" content="Green Acres Bowl">
${splash.map(([w, h, dw, dh, r]) => `<link rel="apple-touch-startup-image" href="assets/icons/splash-${w}x${h}.png" media="(device-width: ${dw}px) and (device-height: ${dh}px) and (-webkit-device-pixel-ratio: ${r}) and (orientation: portrait)">`).join('\n')}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${site.website}${meta.path}">
<meta property="og:image" content="${site.website}/assets/icons/icon-512.png">
<meta name="twitter:card" content="summary">
<link rel="preload" href="assets/fonts/InterVariable.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/site.css">
<script>document.documentElement.classList.remove('no-js')</script>
<script type="speculationrules">{"prefetch":[{"source":"document","where":{"and":[{"href_matches":"/*.html"},{"not":{"selector_matches":"[target=_blank]"}}]},"eagerness":"moderate"}]}</script>
<script type="application/ld+json">${jsonLd(meta)}</script>
${headExtra}
</head>
<body class="page page--${id} ${bodyClass}" data-hours="${hoursData}">
<a class="skip-link" href="#main">Skip to content</a>
<div class="topbar"><div class="container topbar__inner"><span class="topbar__full">${esc(site.announcement)}</span><span class="topbar__short">Ask about our specials &amp; events</span><a href="${site.phoneHref}">${icon('phone')} ${site.phone}</a></div></div>
<header class="site-header">
  <div class="container site-header__inner">
    <a class="brand" href="index.html" aria-label="${site.name} — home"><img class="brand__logo" src="assets/brand/gab-logo.png" alt="${site.name}" width="992" height="349" decoding="async" fetchpriority="high"></a>
    <nav class="primary-nav" aria-label="Primary">
      <ul class="primary-nav__list">${nav.map((n) => navItem(n, id)).join('')}</ul>
    </nav>
    <div class="header-actions">
      <span class="open-chip" hidden></span>
      <a class="btn btn--ghost" href="${site.phoneHref}">${icon('phone')} ${site.phone}</a>
      <a class="btn btn--primary" href="${reserveHref}">${icon('calendar')} Reserve a Lane</a>
      <button class="menu-btn" type="button" data-open-sheet aria-controls="mobile-sheet" aria-expanded="false" aria-label="Open menu">${icon('menu')}</button>
    </div>
  </div>
</header>

<main id="main">
${body}
${reserve === 'form' ? reserveSection() : reserve === 'band' ? reserveBand() : ''}
</main>

<footer class="site-footer rays">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <img src="assets/brand/gab-logo.png" alt="${site.name}" width="992" height="349" loading="lazy">
        <p>Family owned and operated in ${site.city} since ${site.founded}. ${site.lanes} lanes, food and drinks delivered to your lane, arcade, pool tables, the 11th Frame Club, leagues and a full pro shop.</p>
        <div class="footer-social">
          <a href="${site.facebook}" target="_blank" rel="noopener" aria-label="Green Acres Bowl on Facebook">${icon('facebook')}</a>
          <a href="${site.directionsUrl}" target="_blank" rel="noopener" aria-label="Directions on Google Maps">${icon('mapPin')}</a>
          <a href="${site.phoneHref}" aria-label="Call ${site.phone}">${icon('phone')}</a>
        </div>
        <a class="footer-review" href="${site.googleReview}" target="_blank" rel="noopener">${icon('google')} Leave us a Google review</a>
      </div>
      <div>
        <h2 class="footer-h">Explore</h2>
        <ul class="footer-links">${nav.flatMap((n) => (n.children ? n.children : [n])).map((n) => `<li><a href="${n.href}">${icon('chevronRight')}${esc(n.label)}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h2 class="footer-h">Hours</h2>
        ${hoursList({ compact: true })}
      </div>
      <div>
        <h2 class="footer-h">Visit</h2>
        <div class="card card--dark" style="padding:1.1rem 1.2rem">${infoList({ dark: true })}</div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>Copyright © ${new Date().getFullYear()} ${site.name}, all rights reserved. ${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip} · ${site.phonePretty}</span>
      <span class="footer-bottom__links"><a class="footer-pill" href="${site.facebook}" target="_blank" rel="noopener">${icon('facebook')} ${esc(site.managementNote)}</a><button class="footer-pill" type="button" data-install>${icon('install')} Install app</button><span class="footer-pill offline-badge">${icon('wifiOff')} Offline</span></span>
    </div>
  </div>
</footer>

<div class="dock">
  <div class="dock__pill">
    <a class="btn btn--primary" href="${reserveHref}">${icon('ball')} Reserve a Lane</a>
    <a class="btn btn--ghost" href="${site.phoneHref}">${icon('phone')} ${site.phone}</a>
    <a class="btn btn--ghost" href="${site.directionsUrl}" target="_blank" rel="noopener">${icon('mapPin')} Directions</a>
  </div>
  <nav class="tabbar" aria-label="Quick navigation">
    <a class="tab" data-page="home" href="index.html">${icon('house')}<span>Home</span></a>
    <a class="tab" data-page="rates" href="rates.html">${icon('ticket')}<span>Rates</span></a>
    <a class="tab tab--reserve" data-page="reservations" href="${reserveHref}" aria-label="Reserve a lane"><span class="tab__ball">${icon('ball')}</span><span>Reserve</span></a>
    <a class="tab" data-page="snack-bar" href="snack-bar-menu.html">${icon('forkKnife')}<span>Menu</span></a>
    <button class="tab" type="button" data-open-sheet aria-controls="mobile-sheet">${icon('ellipsis')}<span>More</span></button>
  </nav>
</div>

<div class="sheet" id="mobile-sheet" hidden role="dialog" aria-modal="true" aria-label="Menu">
  <div class="sheet__backdrop" data-close-sheet></div>
  <div class="sheet__panel">
    <div class="sheet__grip" aria-hidden="true"></div>
    <div class="sheet__head"><img class="brand__logo" src="assets/brand/gab-logo.png" alt="${site.name}" width="992" height="349"><button class="sheet__close" type="button" data-close-sheet aria-label="Close menu">${icon('xmark')}</button></div>
    <div class="sheet__actions">
      <a class="btn btn--primary btn--lg" href="${reserveHref}" data-close-sheet>${icon('calendar')} Reserve a Lane</a>
      <a class="btn btn--secondary" href="${site.phoneHref}">${icon('phone')} Call</a>
      <a class="btn btn--secondary" href="${site.directionsUrl}" target="_blank" rel="noopener">${icon('mapPin')} Directions</a>
    </div>
    ${nav.map((n) => sheetGroup(n, id)).join('')}
    <div class="sheet__foot"><a href="${site.facebook}" target="_blank" rel="noopener">${icon('facebook')} Follow us</a><button class="sheet__foot-btn" type="button" data-install>${icon('install')} Install app</button></div>
  </div>
</div>

<div class="sheet" id="ios-install" hidden role="dialog" aria-modal="true" aria-label="Add to Home Screen">
  <div class="sheet__backdrop" data-close-ios></div>
  <div class="sheet__panel">
    <div class="sheet__grip" aria-hidden="true"></div>
    <div class="sheet__head"><div><h3 style="margin:0">Add Green Acres to your Home Screen</h3><span class="caption">Works like an app — fast, full-screen, and available offline.</span></div><button class="sheet__close" type="button" data-close-ios aria-label="Close">${icon('xmark')}</button></div>
    <ol class="ios-steps">
      <li><span class="icon-badge">${icon('share')}</span><span>Tap the <strong>Share</strong> button in Safari's toolbar.</span></li>
      <li><span class="icon-badge">${icon('plusSquare')}</span><span>Scroll and choose <strong>Add to Home Screen</strong>.</span></li>
      <li><span class="icon-badge">${icon('checkCircle')}</span><span>Tap <strong>Add</strong>. The Green Acres icon appears on your Home Screen.</span></li>
    </ol>
    <p class="caption mt-1">On Android or desktop Chrome, use the browser menu and choose “Install app”.</p>
  </div>
</div>

<div class="install" id="install-banner" hidden role="dialog" aria-label="Install Green Acres Bowl">
  <img src="assets/icons/icon-96.png" alt="" width="46" height="46">
  <div><strong>Get the Green Acres app</strong><span>Reserve lanes, check rates and menus — even offline.</span></div>
  <div class="install__actions"><button class="btn btn--primary btn--sm" type="button" data-install>Install</button><button class="sheet__close" type="button" data-install-dismiss aria-label="Dismiss">${icon('xmark')}</button></div>
</div>

<div class="lightbox" id="lightbox" hidden role="dialog" aria-modal="true" aria-label="Photo viewer">
  <button class="lightbox__btn lightbox__close" type="button" aria-label="Close">${icon('xmark')}</button>
  <button class="lightbox__btn lightbox__prev" type="button" aria-label="Previous photo">${icon('chevronLeft')}</button>
  <img src="" alt="">
  <button class="lightbox__btn lightbox__next" type="button" aria-label="Next photo">${icon('chevronRight')}</button>
  <div class="lightbox__count"></div>
</div>

<div class="toast" id="toast" hidden role="status" aria-live="polite"></div>
<script src="assets/js/site.js" defer></script>
</body>
</html>
`;
}
