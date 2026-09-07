import { site, icon, photo, pageHero, sectionHead, field, choices, select, fileField, securityCheck, formOpen, formClose } from '../layout.mjs';
import { originals, leagues } from '../data.mjs';

export default {
  id: 'leagues',
  title: 'Leagues | Green Acres Bowl',
  description: 'Bowling leagues at Green Acres Bowl in Tyler, TX — seniors, mixed, no-tap, youth scholarship and more. See the league schedule and sign up online.',
  body: () => `
${pageHero({ eyebrow: 'Amenities · Leagues', title: 'League Schedule', lead: 'All are welcome! Sign up using the form on this page, or come in and grab a sign-up sheet! Leagues are currently in process, therefore availability is limited.', crumbs: [{ label: 'Amenities' }, { label: 'Leagues' }], actions: `<a class="btn btn--primary" href="#signup">${icon('trophy')} Sign up for a league</a><a class="btn btn--ghost" href="${originals.leagueSchedule}" target="_blank" rel="noopener">${icon('doc')} PDF Schedule</a><a class="btn btn--ghost" href="contact-us.html">${icon('envelope')} Contact Us</a>` })}

<section class="section section--flush-top">
  <div class="container">
    <div class="split split--40">
      <div class="stack" data-reveal>
        ${sectionHead({ eyebrow: 'Our leagues', title: 'Find a league to call your own.', lead: 'From Monday morning seniors to Thursday night mixed and a youth scholarship league — there\'s a spot for every bowler.', reveal: false })}
        <ul class="pill-list pill-list--grid">${leagues.map((l) => `<li>${icon('trophy')} ${l}</li>`).join('')}</ul>
        <div class="card card--tint"><div class="feature-row"><span class="icon-badge">${icon('ticket')}</span><div class="feature"><h3>Local USBC members bowl $2.50 games</h3><p>See all rates and specials on the <a href="rates.html">Rates page ${icon('arrowRight', { size: 14 })}</a></p></div></div></div>
      </div>
      <div class="stack" data-reveal="right">
        ${sectionHead({ eyebrow: 'Schedule', title: 'This season\'s schedule', lead: 'Tap to enlarge, or download the PDF.', reveal: false })}
        <a href="${originals.leagueSchedule}" target="_blank" rel="noopener">${photo({ src: originals.leagueSchedule, alt: 'League schedule', sheet: true, label: 'League Schedule' })}</a>
        <div class="btn-row"><a class="btn btn--secondary" href="${originals.leagueSchedule}" target="_blank" rel="noopener">${icon('download')} PDF Schedule</a></div>
      </div>
    </div>
  </div>
</section>

<section class="section section--tint" id="signup" aria-labelledby="signup-title">
  <div class="container">
    <div class="reserve__panel">
      <div class="reserve__aside" data-reveal>
        <span class="eyebrow">League Sign-Up</span>
        <h2 id="signup-title">Sign Up for a League</h2>
        <p class="lead">Fill out the form and we'll get you on the roster. Bring your team, your partner, or just yourself — we'll find you a spot.</p>
        <div class="card mt-2">
          <strong>${site.legalName}</strong><br>
          <span class="muted">${site.address.street}, ${site.address.city}, ${site.address.state} ${site.address.zip}</span><br>
          <a href="${site.phoneHref}">${site.phone}</a><br>
          <a href="${site.website}" target="_blank" rel="noopener">${site.domain}</a><br>
          <a href="${site.facebook}" target="_blank" rel="noopener">www.facebook.com/greenacresbowllp</a>
        </div>
      </div>
      <div data-reveal style="--i:1">
        ${formOpen({ name: 'league-signup', success: 'You’re signed up! We’ll confirm your league placement by phone or email.', cls: 'card' })}
        <div class="form__row form__row--2">${field({ name: 'first_name', label: 'First name', required: true, autocomplete: 'given-name' })}${field({ name: 'last_name', label: 'Last name', required: true, autocomplete: 'family-name' })}</div>
        <div class="form__row form__row--2">${field({ name: 'phone', label: 'Phone', type: 'tel', required: true, autocomplete: 'tel' })}${field({ name: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' })}</div>
        ${field({ name: 'street', label: 'Street Address', required: true, autocomplete: 'street-address' })}
        <div class="form__row form__row--3">${field({ name: 'city', label: 'City', required: true, autocomplete: 'address-level2' })}${field({ name: 'state', label: 'State / Province', required: true, value: 'Texas', autocomplete: 'address-level1' })}${field({ name: 'zip', label: 'ZIP / Postal Code', required: true, autocomplete: 'postal-code', attrs: 'inputmode="numeric"' })}</div>
        ${field({ name: 'usbc', label: 'USBC # (optional)', placeholder: 'Your USBC membership number' })}
        ${select({ name: 'league', label: 'League Choice', options: leagues, required: true, placeholder: 'Choose a league…' })}
        ${choices({ name: 'team_configuration', label: 'Team Configuration', options: ['Individual', 'Couple', 'Full Team'], required: true })}
        <div class="form__section"><h3>Team members</h3><p>Give USBC # if applicable.</p>
          ${field({ name: 'member_1', label: 'Team Member #1', required: true, hint: 'Give USBC # if applicable.' })}
          <div class="form__row form__row--2">${field({ name: 'member_2', label: 'Team Member #2 (optional)', hint: 'Give USBC # if applicable.' })}${field({ name: 'member_3', label: 'Team Member #3 (optional)', hint: 'Give USBC # if applicable.' })}</div>
          <div class="form__row form__row--2">${field({ name: 'member_4', label: 'Team Member #4 (optional)', hint: 'Give USBC # if applicable.' })}${field({ name: 'member_5', label: 'Team Member #5 (optional)', hint: 'Give USBC # if applicable.' })}</div>
        </div>
        ${fileField({ name: 'attachment', label: 'File Attachment', hint: 'Optional — roster, averages or a completed sign-up sheet.' })}
        ${securityCheck()}
        ${formClose({ label: 'Submit sign-up', note: 'Leagues are currently in process — availability is limited, so we’ll confirm your spot.' })}
      </div>
    </div>
  </div>
</section>
`,
};
