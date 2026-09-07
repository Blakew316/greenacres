import { site, icon, pageHero, sectionHead, hoursList, infoList, mapEmbed, field, textarea, fileField, securityCheck, formOpen, formClose } from '../layout.mjs';

export default {
  id: 'contact',
  title: 'Contact Us | Green Acres Bowl',
  description: 'Contact Green Acres Bowl in Tyler, TX — 2311 E SE Loop 323, Tyler, TX 75701. Call 903-561-2911, get directions, see hours, or send us a message online.',
  body: () => `
${pageHero({ eyebrow: 'Contact Us', title: 'Come bowl with us at Green Acres!', lead: 'If you are looking for fun for all ages in Tyler, TX, Green Acres Bowl is the place! Give us a call, use the online reservation form, or send us a message below.', crumbs: [{ label: 'Contact Us' }], actions: `<a class="btn btn--primary" href="${site.phoneHref}">${icon('phone')} Call ${site.phone}</a><a class="btn btn--ghost" href="${site.directionsUrl}" target="_blank" rel="noopener">${icon('car')} Get Directions</a><a class="btn btn--ghost" href="reservations.html#reserve">${icon('calendar')} Reservations</a>` })}

<section class="section section--flush-top">
  <div class="container">
    <div class="reserve__panel">
      <div class="reserve__aside stack" data-reveal>
        <div class="card"><span class="eyebrow">${site.name}</span><h2 style="font-size:var(--fs-h3)">${site.address.street}<br>${site.address.city}, ${site.address.state} ${site.address.zip}</h2>${infoList()}<div class="btn-row mt-2"><a class="btn btn--primary" href="${site.directionsUrl}" target="_blank" rel="noopener">${icon('car')} GET DIRECTIONS</a></div></div>
        <div class="card"><h3>Hours</h3>${hoursList()}</div>
      </div>
      <div data-reveal style="--i:1">
        <div class="section-head"><span class="eyebrow">Send a message</span><h2>We look forward to hearing from you!</h2><p class="lead">You may use this form to request more information about our products and services, and to provide feedback about this website. Click <strong>Submit</strong> when you are ready to send your message.</p></div>
        ${formOpen({ name: 'contact', success: 'Thanks! Your message is on its way to our front desk.', cls: 'card' })}
        <div class="form__row form__row--2">${field({ name: 'first_name', label: 'First name', required: true, autocomplete: 'given-name' })}${field({ name: 'last_name', label: 'Last name', required: true, autocomplete: 'family-name' })}</div>
        <div class="form__row form__row--2">${field({ name: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' })}${field({ name: 'phone', label: 'Phone', type: 'tel', autocomplete: 'tel' })}</div>
        ${field({ name: 'date', label: 'Date', type: 'date', hint: 'If your message is about a specific visit or event date.' })}
        ${textarea({ name: 'note', label: 'Note', placeholder: 'How can we help?', rows: 5 })}
        ${fileField({ name: 'attachment', label: 'File Upload', hint: 'Need to attach a document? Add it here!' })}
        ${securityCheck()}
        ${formClose({ label: 'Submit', note: 'We respond during business hours. For same-day help, call ' + site.phone + '.' })}
      </div>
    </div>
  </div>
</section>

<section class="section section--silver" aria-label="Map">
  <div class="container">
    <div data-reveal>${mapEmbed({ height: 440 })}</div>
    <p class="caption mt-2" data-reveal>${site.managementNote}</p>
    <div class="btn-row mt-1" data-reveal><a class="btn btn--secondary" href="${site.facebook}" target="_blank" rel="noopener">${icon('facebook')} Follow us on Facebook</a><a class="btn btn--ghost" href="${site.mapsShort}" target="_blank" rel="noopener">${icon('mapPin')} Open in Google Maps</a></div>
  </div>
</section>
`,
};
