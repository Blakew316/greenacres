// Single source of truth for site-wide content.
// Every value here was carried over from the original greenacresbowl.com capture.

export const site = {
  name: 'Green Acres Bowl',
  legalName: 'Green Acres Bowl, LP',
  fullName: 'Green Acres Bowling Alley',
  city: 'Tyler, TX',
  phone: '903-561-2911',
  phonePretty: '(903) 561-2911',
  phoneHref: 'tel:+19035612911',
  address: {
    street: '2311 E SE Loop 323',
    city: 'Tyler',
    state: 'TX',
    zip: '75701',
  },
  directionsUrl: 'https://maps.google.com/maps?daddr=2311+E+SE+Loop+323,+Tyler,+TX+75701',
  mapsShort: 'https://goo.gl/maps/WpwpMtXEXbiSVktCA',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3372.0311932314594!2d-95.27379568482975!3d32.31101568111523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8649cc431e089a49%3A0xea30b9b2eeb8c3e9!2sGreen%20Acres%20Bowl!5e0!3m2!1sen!2sus!4v1594733699162!5m2!1sen!2sus',
  facebook: 'https://www.facebook.com/GreenAcresBowlLP',
  facebookTimeline: 'https://www.facebook.com/GreenAcresBowlLP/timeline',
  facebookReviews: 'https://www.facebook.com/GreenAcresBowlLP/reviews/?ref=page_internal',
  googleReview:
    'https://www.google.com/search?q=Green+Acres+Bowl,+2311+E+SE+Loop+323,+Tyler,+TX+75703&ludocid=16875191981917651945#lrd=0x8649cc431e089a49:0xea30b9b2eeb8c3e9,1',
  booking: 'https://us.partywirks.com/storefront_express/main/vendor/green_acres_bowl/12/337',
  website: 'https://greenacresbowlingtyler.com',
  domain: 'greenacresbowlingtyler.com',
  legacyWebsite: 'https://greenacresbowl.com',
  founded: 1957,
  lanes: 32,
  announcement: 'Call about our upcoming specials & events!',
  themeColor: '#205878',
  // Hours: [day, open, close, limited-by-league-play]
  hours: [
    ['Monday', '9:00 AM', '10:00 PM', true],
    ['Tuesday', '10:00 AM', '12:00 AM', true],
    ['Wednesday', '9:00 AM', '10:00 PM', true],
    ['Thursday', '10:00 AM', '12:00 AM', true],
    ['Friday', '9:00 AM', '12:00 AM', true],
    ['Saturday', '10:00 AM', '1:00 AM', false],
    ['Sunday', '12:00 PM', '10:00 PM', false],
  ],
  hoursNote: 'Limited availability due to league play',
  proShopHours: [
    ['Monday – Friday', '9:00 AM – 5:00 PM'],
    ['Saturday', 'By appointment only (must be made 48 hrs in advance)'],
    ['Sunday', 'Closed'],
  ],
  managementNote: 'Green Acres Bowling Center – New Management',
};

// Primary navigation. Mirrors the original menu hierarchy exactly:
// Home · About Us ▾ (Employment Opportunities) · Reviews · Amenities ▾ (Snack Bar Menu,
// 11th Frame Club, Leagues, Pro Shop) · Plan Your Event ▾ (Reservations, Rates, Gallery) · Contact Us
export const nav = [
  { id: 'home', label: 'Home', href: 'index.html', icon: 'house' },
  {
    id: 'about',
    label: 'About Us',
    href: 'about.html',
    icon: 'info',
    children: [
      { id: 'about', label: 'About Green Acres', href: 'about.html', icon: 'info', desc: 'Generations of bowling fun in Tyler since 1957' },
      { id: 'employment', label: 'Employment Opportunities', href: 'employment-opportunities.html', icon: 'badge', desc: 'Front desk, grill and mechanics helper positions' },
    ],
  },
  { id: 'reviews', label: 'Reviews', href: 'reviews.html', icon: 'star' },
  {
    id: 'amenities',
    label: 'Amenities',
    href: null,
    icon: 'sparkles',
    children: [
      { id: 'snack-bar', label: 'Snack Bar Menu', href: 'snack-bar-menu.html', icon: 'forkKnife', desc: 'Full-service food & drinks with lane delivery' },
      { id: 'club', label: '11th Frame Club', href: '11th-frame-club.html', icon: 'martini', desc: 'Private club, full bar, live music and karaoke' },
      { id: 'leagues', label: 'Leagues', href: 'leagues.html', icon: 'trophy', desc: 'Schedules and online league sign-up' },
      { id: 'pro-shop', label: 'Pro Shop', href: 'pro-shop.html', icon: 'bag', desc: 'Balls, shoes, drilling and accessories' },
    ],
  },
  {
    id: 'events',
    label: 'Plan Your Event',
    href: 'specials-and-events.html',
    icon: 'party',
    children: [
      { id: 'events', label: 'Parties & Events', href: 'specials-and-events.html', icon: 'party', desc: 'Birthdays, corporate, school and church events' },
      { id: 'reservations', label: 'Reservations', href: 'reservations.html', icon: 'calendar', desc: 'Reserve a lane or book your party online' },
      { id: 'rates', label: 'Rates', href: 'rates.html', icon: 'ticket', desc: 'Bowling prices and weekly specials' },
      { id: 'gallery', label: 'Gallery', href: 'gallery.html', icon: 'photo', desc: 'A look inside Green Acres Bowl' },
    ],
  },
  { id: 'contact', label: 'Contact Us', href: 'contact-us.html', icon: 'envelope' },
];

// Flat list of every page for the sitemap, service-worker precache and link checks.
export const pages = [
  { id: 'home', file: 'index.html', title: 'Green Acres Bowl | Tyler, TX', path: '/' },
  { id: 'about', file: 'about.html', title: 'About | Green Acres Bowl', path: '/about/' },
  { id: 'employment', file: 'employment-opportunities.html', title: 'Employment Opportunities | Green Acres Bowl', path: '/employment-opportunities/' },
  { id: 'reviews', file: 'reviews.html', title: 'Reviews | Green Acres Bowl', path: '/reviews/' },
  { id: 'snack-bar', file: 'snack-bar-menu.html', title: 'Snack Bar Menu | Green Acres Bowl', path: '/snack-bar-menu/' },
  { id: 'club', file: '11th-frame-club.html', title: '11th Frame Club | Green Acres Bowl', path: '/11th-frame-club/' },
  { id: 'leagues', file: 'leagues.html', title: 'Leagues | Green Acres Bowl', path: '/leagues/' },
  { id: 'pro-shop', file: 'pro-shop.html', title: 'Pro Shop | Green Acres Bowl', path: '/pro-shop/' },
  { id: 'events', file: 'specials-and-events.html', title: 'Parties and Events | Green Acres Bowl', path: '/specials-and-events/' },
  { id: 'reservations', file: 'reservations.html', title: 'Reservations | Green Acres Bowl', path: '/reservations/' },
  { id: 'rates', file: 'rates.html', title: 'Rates | Green Acres Bowl', path: '/rates/' },
  { id: 'gallery', file: 'gallery.html', title: 'Gallery | Green Acres Bowl', path: '/gallery/' },
  { id: 'contact', file: 'contact-us.html', title: 'Contact Us | Green Acres Bowl', path: '/contact-us/' },
];

export const reviews = [
  { name: 'James T.', text: `If it's been a while since you've been in here, try it out again. The new manager has really cleaned the place up. TVs out on the lanes now to where you can watch your favorite sporting event while you bowl. Also drink specials in the bar and better service at the front desk. Glow bowling on Thursday, Friday and Saturday night. And the best thing Thursdays from 9 to midnight, 10$ per person all you can bowl. I've grown up in this place and seen good times and then bad times. In my opinion, this place is better than it ever has been and they seem to be doing updates and maintenance every time I go in there now! Newly remodeled flooring and lane machines that are working VERY WELL!` },
  { name: 'Shayla M.', text: `Customer service exceeded expectations. Environment is worn, but cared for. Props to the new management.` },
  { name: 'Carrie M.', text: `The new manager has done some amazing things up here! The environment is more up to date and fun! The new TVs and floor work looks awesome no the old outdated look.. and you can't forget the bar.. Super fun and inviting place where you are guaranteed to have lots of fun!! Seriously if you haven't been in awhile go check it out and give them another try! Way to go Green Acres Bowl and staff!` },
  { name: 'Rule S.', text: `Any league bowler that has bowled here for years (as I have) would know that things have improved greatly and it is apparent during league nights. It has become a MUCH more enjoyable experience. New score monitors, new TV's staggered throughout, and more importantly, FAR fewer breakdowns occur because of preventative maintenance and there are now FAR fewer calls to the back. Off spot pins have now become a thing of the past and those used to drive me crazy! The shot has become consistent, predictable, AND high scoring (as the scores posted in this house reflect this). Lanes 1 thru 12 are synthetic, 13 thru 32 are wood. This place really needs to become all synthetic one day, but since things have so vastly improved there, that is now its only major drawback in my opinion. Kudos to Green Acres Bowl from your regular bowlers for the improvements.` },
  { name: 'Marsha P.', text: `Green Acres Bowl is a fun place to go bowl and hang out with your friends. They have something for everyone. They have a full service snack bar with friendly faces and delicious pizzas. They have a game room for the kids with a air hockey machine and a photo booth to make your bowling experience a memorable one. They also have a full service bar with pool tables and karaoke on Friday nights. The people are nice, friendly and helpful. The place is clean and well maintained. Anyway enough about that, its a great place to take the whole family.` },
  { name: 'Sandra F.', text: `New management has made several improvements. New staff is friendly. A great place to take the family!` },
  { name: 'Maria F.', text: `We had a great time like always. It was very nice and clean. The staff was very helpful and nice. The food was delicious and fresh.` },
  { name: 'Gypsy B.', text: `This place is the best addition Tyler has made in a very long time! My family & I love going bowling and playing in the arcade! The food that you get in the bowling alley is amazing and affordable. We also love that if we decide to see a movie we just have to walk across the entrance. A great time for all involved!` },
  { name: 'Kinze W.', text: `Very fun! Nice staff! Cheap prices! Yummy food! Nice arcade! Who wouldn't wanna enjoy a weekend here with their family? Way better than Grand Slam for sure!` },
  { name: 'Michael A.', text: `Awesome place, it was very clean. Everyone was polite and helpful.` },
];

export const leagues = [
  'Monday Morning Seniors',
  'Big Money League',
  'Ladies Petroleum',
  'Maple League',
  'Cinderella League',
  "NO-Tap (9 counts as 'X')",
  'Bill Hicks Memorial',
  'Medical Center',
  'Thursday Night Mixed',
  'Golden Oldies',
  'S.M.A.R.T. Youth Scholarship',
];

export const eventTypes = [
  'Corporate event',
  'School event',
  'Day care',
  'Team building',
  'Church event',
  'Birthday party',
  'College night',
];

// Photos from the original site. They are downloaded into assets/media by
// scripts/fetch-original-assets.sh (see scripts/assets-manifest.json).
export const gallery = [
  '282240722_7502444796493341_8367383920149319809_n.jpg',
  '288883301_7637881836282969_6938983516640600142_n.jpg',
  '11110229_887487971322423_5883618262232842010_n.jpg',
  '11227650_934623129942240_3019255350629917102_n.jpg',
  '10991338_828778893859998_6383350235506625895_n.jpg',
  '11151043_872536486150905_1006821938539295817_n.jpg',
  '10390951_690874700983752_2851133672791437410_n.jpg',
  '12247145_964097123661507_5091811195456284885_n.jpg',
  '10386276_719452794792609_8169912996257286663_n.jpg',
  '10993487_828778797193341_5400615034978757498_n.jpg',
  '11141136_872536666150887_500573742292125841_n.jpg',
  '37733381_2122594097811798_7922573382317506560_n.jpg',
  '38404940_2145287785542429_5831028646806028288_n.jpg',
  '38448628_2145277608876780_5212891374403190784_n.jpg',
].map((f, i) => ({ src: `assets/media/gallery/${String(i + 1).padStart(2, '0')}.jpg`, original: `/files/${i < 2 ? '2022/07' : i < 8 ? '2021/11' : '2021/10'}/${f}`, alt: `Green Acres Bowl photo ${i + 1}` }));

export const originals = {
  heroReservations: 'assets/media/originals/green-acres-7f2.jpg',
  heroArcade: 'assets/media/originals/green-acres-arcade.jpg',
  heroSevenDays: 'assets/media/originals/dl-2.jpg',
  heroProShop: 'assets/media/originals/ProShop.jpg',
  tileAbout: 'assets/media/originals/aboutus.png',
  tileRates: 'assets/media/originals/rates.png',
  tileReviews: 'assets/media/originals/reviews.png',
  tileContact: 'assets/media/originals/contact.png',
  arcade: 'assets/media/originals/Arcade.jpg',
  proShop: 'assets/media/originals/DSC01658.jpg',
  events: 'assets/media/originals/image.jpeg',
  rates: 'assets/media/originals/Bowling-prices-march-2024-opt.jpg',
  snackBarHours: 'assets/media/originals/SNACK_BAR_HOURS.jpg',
  snackBarMenu: 'assets/media/originals/white_Snack_Bar_Menu_page-0001.jpg',
  snackBarMenuPdf: 'assets/media/docs/white_Snack_Bar_Menu.pdf',
  clubHours: 'assets/media/originals/11TH_FRAME_CLUB_HOURS.jpg',
  clubMenu: 'assets/media/originals/Copy_of_11th_Frame_Menu_page-0001.jpg',
  clubMenuPdf: 'assets/media/docs/Copy-of-11th-Frame-Menu.pdf',
  leagueSchedule: 'assets/media/originals/2024-2025_Fall_League_Schedule.jpg',
  googleReviewButton: 'assets/media/originals/click-to-leave-review-small.png',
  facebookReviewButton: 'assets/media/originals/facebook_review_button_2019.png',
};
