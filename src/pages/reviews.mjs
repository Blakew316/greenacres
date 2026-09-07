import { site, icon, pageHero, reviewCard, reviews } from '../layout.mjs';

export default {
  id: 'reviews',
  title: 'Reviews | Green Acres Bowl',
  description: 'Read why Green Acres Bowl is the best bowling alley in Tyler, TX — reviews from league bowlers, families and first-time visitors. Leave us a review on Google or Facebook.',
  body: () => `
${pageHero({ eyebrow: 'Reviews', title: 'Read why Green Acres Bowl is the best bowling alley in Tyler, TX!', lead: 'New management, new TVs on the lanes, new score monitors and a team that goes the extra mile. Here\'s what our guests say.', crumbs: [{ label: 'Reviews' }], actions: `<a class="btn btn--primary" href="${site.googleReview}" target="_blank" rel="noopener">${icon('google')} Leave us a Google review</a><a class="btn btn--ghost" href="${site.facebookReviews}" target="_blank" rel="noopener">${icon('facebook')} Review us on Facebook</a>` })}

<section class="section section--flush-top">
  <div class="container">
    <div class="masonry">
      ${reviews.map((r, i) => reviewCard(r, i)).join('')}
    </div>
    <div class="card card--dark rays mt-3" data-reveal>
      <div class="split split--center">
        <div><span class="eyebrow">Leave us a Review!</span><h2>Been in lately? Tell Tyler about it.</h2><p class="muted mb-0">If it's been a while since you've been in here, try it out again — then let us know how we did.</p></div>
        <div class="btn-row" style="justify-content:flex-end"><a class="btn btn--light btn--lg" href="${site.googleReview}" target="_blank" rel="noopener">${icon('google')} Google review</a><a class="btn btn--glass btn--lg" href="${site.facebookReviews}" target="_blank" rel="noopener">${icon('facebook')} Facebook review</a></div>
      </div>
    </div>
  </div>
</section>
`,
};
