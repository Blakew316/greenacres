# Green Acres Bowl — website & PWA

A complete redesign of [greenacresbowl.com](https://greenacresbowl.com) (Tyler, TX): a fast, installable, static site themed entirely around the Green Acres Bowl logo — navy and steel-blue hues, silver and white — with Apple-style typography, line icons, and bowling-themed scroll animations.

## What's here

| Page | File | Carried over from the original site |
| --- | --- | --- |
| Home | `index.html` | Hero slides (reservations, arcade, 7 days a week, pro shop), hiring callout, "Turkey" story copy, quick tiles, hours, Google review button, reservation form |
| About Us | `about.html` | Full copy, amenity list, location block, map |
| Employment Opportunities | `employment-opportunities.html` | Complete employment application (personal info, 3 positions, education, references, applicant statement, resume upload) |
| Reviews | `reviews.html` | All 10 reviews, Google + Facebook review buttons |
| Snack Bar Menu | `snack-bar-menu.html` | Hours sheet, menu image, menu PDF |
| 11th Frame Club | `11th-frame-club.html` | Membership rules, weekly events, hours sheet, menu image + "Downloadable Version" PDF |
| Leagues | `leagues.html` | Schedule image/PDF link, all 11 leagues, full sign-up form |
| Pro Shop | `pro-shop.html` | Copy, photo, pro shop hours |
| Plan Your Event | `specials-and-events.html` | Copy, event types, Family Fun Night / College Night |
| Reservations | `reservations.html` | Partywirks "Book Now" link + in-site reservation request form |
| Rates | `rates.html` | Specials ($12 unlimited, $2.50 USBC games), price sheet, party CTA, location + map |
| Gallery | `gallery.html` | 14 photos with lightbox ("Click to Enlarge") |
| Contact Us | `contact-us.html` | Contact form (name, email, phone, date, note, file upload, security check), address, hours, directions, map, Facebook |

Also: `offline.html`, `404.html`, `sitemap.xml`, `robots.txt`, `_redirects` (old `/about/` style URLs → new pages), `manifest.webmanifest`, `sw.js`.

## Develop

```bash
npm run build     # regenerate all pages from src/ (layout + page modules + data)
npm run dev       # serve locally at http://localhost:8080
npm run check     # crawl every page/link, console errors, mobile overflow, PWA sanity, screenshots
npm run icons     # regenerate favicons, PWA icons and iOS splash screens from assets/brand/gab-logo.png
npm run assets    # download the original site's photos/menus/PDFs into assets/ (needs internet)
```

Content lives in `src/data.mjs` (hours, address, nav, reviews, leagues) and `src/pages/*.mjs`. The shared shell (header, mega-menu, mobile sheet, bottom reservation dock/tab bar, footer, PWA tags) is in `src/layout.mjs`. Styles: `assets/css/site.css`. Behaviour: `assets/js/site.js`.

## Original images

The source capture only contained HTML; the photos, menus, price sheet and PDFs are still hosted on the old site. Run `npm run assets` from any machine with internet access to download them into `assets/img/` and `assets/docs/` (see `scripts/assets-manifest.json` for the full list and where each is used). Until then every image slot shows a branded placeholder, so nothing looks broken.

## Forms

All forms (reservation, contact, league sign-up, employment application) are static-host friendly:

- On **Netlify** they work out of the box (`data-netlify="true"`, honeypot, file uploads).
- Anywhere else, set `data-endpoint="https://…"` on a `<form>` (Formspree, Basin, your own API) — submissions POST there as form data.
- Client-side validation, a "security check" toggle, honeypot + timing bot protection, and success/error states are built in. Errors always fall back to the phone number.

## PWA

- Installable on iOS (Add to Home Screen), Android and desktop; icons use the logo with "Green Acres Bowling Alley" beneath it, plus a maskable variant and iOS splash screens.
- The service worker precaches every page and the app shell, refreshes pages network-first, and serves `offline.html` when needed. An in-page toast offers "Refresh" when a new version is deployed.
- App shortcuts: Reserve a Lane, Rates, Snack Bar Menu, Contact.
- Cross-document view transitions and link prefetching make page-to-page navigation feel instant.

## Deploy

Static files at the repo root — deploy to Netlify (`netlify.toml` included), GitHub Pages, Vercel, Cloudflare Pages or any web server. Serve `sw.js` with `Cache-Control: no-cache`.
