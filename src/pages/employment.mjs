import { site, icon, pageHero, field, textarea, choices, fileField, securityCheck, formOpen, formClose, esc } from '../layout.mjs';

const yesNo = (name, label) => choices({ name, label, options: ['Yes', 'No'], required: true });
const list = (prefix, title, cols, required = false) => `<h4>${esc(title)}</h4><div class="form__row form__row--${Math.min(cols.length, 3)}">${cols.map((c) => field({ name: `${prefix}_${c.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`, label: c, required })).join('')}</div>`;
const job = (n, required) => `<div class="fieldset-wrap mt-1"><fieldset class="fieldset"><legend>Employment Position ${n}${required ? '' : ' (optional)'}</legend>
<div class="form__row form__row--3">${field({ name: `job${n}_employer`, label: 'Previous Employer', required })}${field({ name: `job${n}_address`, label: 'Address', required })}${field({ name: `job${n}_telephone`, label: 'Telephone', type: 'tel', required })}</div>
<div class="form__row form__row--3">${field({ name: `job${n}_start`, label: 'Start Date', required })}${field({ name: `job${n}_end`, label: 'Termination Date', required })}${field({ name: `job${n}_pay`, label: 'Rate of Pay', required })}</div>
<div class="form__row form__row--2">${field({ name: `job${n}_title`, label: 'Job Title', required })}${field({ name: `job${n}_supervisor`, label: "Supervisor's Name", required })}</div>
<div class="form__row form__row--2">${field({ name: `job${n}_reason`, label: 'Reason for Leaving', required })}${field({ name: `job${n}_contact`, label: 'May we Contact?', required, placeholder: 'Yes / No' })}</div>
${textarea({ name: `job${n}_duties`, label: 'Brief Description of Duties', required, rows: 3 })}
</fieldset></div>`;
const school = (key, title) => `<fieldset class="fieldset"><legend>${esc(title)}</legend><div class="form__row form__row--3">${field({ name: `${key}_school`, label: 'Name and Location of School' })}${field({ name: `${key}_degree`, label: 'Degree Earned? Y/N', placeholder: 'Y / N' })}${field({ name: `${key}_major`, label: 'Major/Minor Field of Study' })}</div></fieldset>`;
const ref = (n) => `<fieldset class="fieldset"><legend>Reference ${n}</legend><div class="form__row form__row--4">${field({ name: `ref${n}_name`, label: 'Name', required: true })}${field({ name: `ref${n}_telephone`, label: 'Telephone', type: 'tel', required: true })}${field({ name: `ref${n}_address`, label: 'Address', required: true })}${field({ name: `ref${n}_relationship`, label: 'Relationship', required: true })}</div></fieldset>`;

export default {
  id: 'employment',
  title: 'Employment Opportunities | Green Acres Bowl',
  description: 'Join the Green Acres Bowl team in Tyler, TX. Positions for the front desk, the grill and a mechanics helper. Apply online with our employment application.',
  body: () => `
${pageHero({ eyebrow: 'Employment Opportunities', title: 'Work somewhere fun.', lead: "Apply now — we're looking for enthusiastic, friendly people to work in a fun environment. We have positions for the front desk, the grill, and for a mechanics helper!", crumbs: [{ label: 'About Us', href: 'about.html' }, { label: 'Employment Opportunities' }], actions: `<a class="btn btn--primary" href="#application">${icon('badge')} Start your application</a><a class="btn btn--ghost" href="${site.phoneHref}">${icon('phone')} ${site.phone}</a>`, dark: true })}

<section class="section">
  <div class="container">
    <div class="grid grid--3 mb-2">
      ${[['person', 'Front Desk', 'Welcome guests, set up lanes and keep the floor running smoothly.'], ['forkKnife', 'The Grill', 'Prepare our snack bar menu and deliver food and drinks to the lanes.'], ['wrench', 'Mechanics Helper', 'Help keep 32 lanes of pinsetters and scoring in top shape.']].map(([ic, t, d], i) => `<div class="card" data-reveal style="--i:${i}"><span class="icon-badge">${icon(ic)}</span><h3>${t}</h3><p class="muted mb-0">${d}</p></div>`).join('')}
    </div>

    <div class="container--narrow mx-auto" id="application">
      <div class="section-head" data-reveal>
        <span class="eyebrow">Employment Application</span>
        <h2>Tell us about yourself.</h2>
        <p class="lead">All questions must be answered completely. If you have a resume, please attach it to your application.</p>
      </div>

      ${formOpen({ name: 'employment-application', success: 'Your application has been submitted. Thank you — we’ll be in touch soon!', cls: 'card' })}
      ${field({ name: 'date', label: 'Date', type: 'date', required: true, value: '' })}

      <div class="form__section"><h3>Personal Information</h3><p>All questions must be answered completely. If you have a resume, please attach to application.</p>
        <div class="form__row form__row--2">${field({ name: 'first_name', label: 'First name', required: true, autocomplete: 'given-name' })}${field({ name: 'last_name', label: 'Last name', required: true, autocomplete: 'family-name' })}</div>
        ${field({ name: 'street', label: 'Street Address', required: true, autocomplete: 'street-address' })}
        <div class="form__row form__row--3">${field({ name: 'city', label: 'City', required: true, autocomplete: 'address-level2' })}${field({ name: 'state', label: 'State / Province', required: true, value: 'Texas', autocomplete: 'address-level1' })}${field({ name: 'zip', label: 'ZIP / Postal Code', required: true, autocomplete: 'postal-code', attrs: 'inputmode="numeric"' })}</div>
        <div class="form__row form__row--2">${field({ name: 'phone', label: 'Phone', type: 'tel', required: true, autocomplete: 'tel' })}${field({ name: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' })}</div>
        <div class="form__row form__row--2">${field({ name: 'position', label: 'Position Desired', required: true, placeholder: 'Front desk, grill, mechanics helper…' })}${field({ name: 'salary', label: 'Salary Desired', required: true })}</div>
        ${choices({ name: 'employment_type', label: 'Check Employment Desired', options: ['Full Time', 'Part Time', 'Temporary'], type: 'checkbox', required: true })}
        ${choices({ name: 'days_available', label: 'Check Days Available', options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], type: 'checkbox' })}
        ${field({ name: 'hours_available', label: 'Hours Available', placeholder: 'e.g. 4pm – close' })}
        ${yesNo('overtime', 'Willing to work overtime?')}
        ${yesNo('over_18', 'Are you over the age of 18?')}
        ${yesNo('job_functions', 'Are you able to perform all job functions with or without reasonable accommodations?')}
        ${yesNo('previous_applicant', 'Are you a previous applicant?')}
        ${yesNo('drugs_ever', 'Have you ever used illegal drugs?')}
        ${yesNo('drugs_6mo', 'Have you used illegal drugs in the last 6 months?')}
        ${yesNo('felony', 'Have you ever been convicted of a felony or pled nolo contendere to a felony?')}
        ${textarea({ name: 'felony_conditions', label: 'If yes, describe conditions:', rows: 3, placeholder: 'Write “N/A” if not applicable' })}
      </div>

      <div class="form__section"><h3>Work Experience</h3><p>Please start with your most recent employment.</p>
        ${job(1, true)}${job(2, false)}${job(3, false)}
      </div>

      <div class="form__section"><h3>Education and Training</h3><p>List the schools you have attended.</p>
        <div class="stack">${school('highschool', 'High School/Trade School')}${school('business', 'Business/Technical School')}${school('college', 'College')}</div>
        ${textarea({ name: 'other_training', label: 'Other Training (Explain)', rows: 3 })}
      </div>

      <div class="form__section"><h3>References</h3><p>Please provide three references.</p>
        <div class="stack">${ref(1)}${ref(2)}${ref(3)}</div>
      </div>

      <div class="form__section"><h3>Applicant's Statement</h3>
        <div class="card card--tint small" style="line-height:1.6">
          <p>The facts contained in this application are true and complete to the best of my knowledge, and I have not withheld any fact or circumstances which could, if disclosed, affect my application unfavorably. I understand that any false or misleading statement or any material omission in the applications will be ground for rejection of my application or (if I have been hired) for my immediate dismissal.</p>
          <p>I authorize investigation of all statements contained in this application and other submitted biographical information, information concerning my previous employment and other information, personal or otherwise. I understand that I have the right to make a written request within a reasonable period of time to receive additional information about the nature and scope of any such investigation report that is made. I release and indemnify ${site.name} against any liability that may result from making such an investigation.</p>
          <p>If hired, an employment relationship is established, I understand that I have the right to terminate my employment at any time and that ${site.name} retains a similar right. I confirm that no promise regarding employment (or terms and benefits thereof) has been made to me and I understand that no such promise or commitment will be binding upon any part(s) herein unless it is made in writing and signed by the General Manager or owner of ${site.name}.</p>
          <p class="mb-0"><strong>MY SIGNATURE BELOW INDICATES THAT I HAVE READ, UNDERSTAND, AND AGREE TO THE ABOVE STATEMENTS.</strong></p>
        </div>
        <div class="mt-1">${field({ name: 'signature', label: 'Applicant Signature', required: true, hint: 'Please type your full name.', placeholder: 'Full legal name' })}</div>
        ${fileField({ name: 'resume', label: 'Resume', hint: 'PDF, Word document or image — optional but recommended.' })}
        ${securityCheck()}
      </div>
      ${formClose({ label: 'Submit application', note: 'Questions about a position? Call the front desk at ' + site.phone + '.' })}
    </div>
  </div>
</section>
`,
};
