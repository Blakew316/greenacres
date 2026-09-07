/* Green Acres Bowl — site behaviours
   Navigation · scroll animations · lane scene · lightbox · forms · hours · PWA */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);
  document.documentElement.classList.remove('no-js');
  if (isStandalone) document.documentElement.classList.add('is-standalone');

  /* ------------------------------------------------------------------ header */
  const header = $('.site-header');
  const onScrollHeader = () => header && header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* ----------------------------------------------------------- mega menus */
  const navItems = $$('.primary-nav__item.has-children');
  const closeAll = (except) => navItems.forEach((li) => { if (li !== except) { li.classList.remove('is-open'); const b = $('[aria-expanded]', li); if (b) b.setAttribute('aria-expanded', 'false'); } });
  navItems.forEach((li) => {
    const trigger = $('.primary-nav__link', li);
    let hoverTimer;
    const open = () => { closeAll(li); li.classList.add('is-open'); trigger.setAttribute('aria-expanded', 'true'); };
    const close = () => { li.classList.remove('is-open'); trigger.setAttribute('aria-expanded', 'false'); };
    li.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { clearTimeout(hoverTimer); open(); } });
    li.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { hoverTimer = setTimeout(close, 140); } });
    trigger.addEventListener('click', (e) => {
      // Parent links navigate on a second click (or on desktop pointer) — first tap opens the panel.
      const isOpen = li.classList.contains('is-open');
      if (trigger.tagName === 'BUTTON' || !isOpen) { e.preventDefault(); isOpen ? close() : open(); }
    });
    li.addEventListener('keydown', (e) => { if (e.key === 'Escape') { close(); trigger.focus(); } });
    li.addEventListener('focusout', (e) => { if (!li.contains(e.relatedTarget)) close(); });
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.primary-nav__item')) closeAll(); });

  /* ---------------------------------------------------------- mobile sheet */
  const sheet = $('#mobile-sheet');
  const menuBtn = $('.menu-btn');
  let lastFocus = null;
  const openSheet = () => {
    if (!sheet) return;
    lastFocus = document.activeElement;
    sheet.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => sheet.classList.add('is-open')));
    document.body.classList.add('sheet-open');
    menuBtn && menuBtn.setAttribute('aria-expanded', 'true');
    const first = $('.sheet__close', sheet); first && first.focus({ preventScroll: true });
  };
  const closeSheet = () => {
    if (!sheet || sheet.hidden) return;
    sheet.classList.remove('is-open');
    document.body.classList.remove('sheet-open');
    menuBtn && menuBtn.setAttribute('aria-expanded', 'false');
    setTimeout(() => { sheet.hidden = true; }, 420);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  };
  $$('[data-open-sheet]').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); openSheet(); }));
  $$('[data-close-sheet]').forEach((b) => b.addEventListener('click', closeSheet));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closeSheet(); closeLightbox(); closeIOSHint(); } });
  // swipe down to dismiss
  if (sheet) {
    let y0 = null;
    const panel = $('.sheet__panel', sheet);
    panel.addEventListener('touchstart', (e) => { y0 = panel.scrollTop <= 0 ? e.touches[0].clientY : null; }, { passive: true });
    panel.addEventListener('touchmove', (e) => { if (y0 !== null && e.touches[0].clientY - y0 > 90) { y0 = null; closeSheet(); } }, { passive: true });
  }

  /* ---------------------------------------------------------------- dock */
  const reserveSection = $('#reserve');
  if (reserveSection && 'IntersectionObserver' in window) {
    new IntersectionObserver((entries) => entries.forEach((en) => document.body.classList.toggle('dock-hidden', en.isIntersecting)), { threshold: 0.18 }).observe(reserveSection);
  }
  // Desktop pill stays out of the way while the hero (which has its own CTA) is on screen.
  const heroEl = $('.hero, .page-hero');
  if (heroEl && 'IntersectionObserver' in window) {
    new IntersectionObserver((entries) => entries.forEach((en) => document.body.classList.toggle('hero-in-view', en.isIntersecting && en.intersectionRatio > 0.3)), { threshold: [0, 0.3, 0.6] }).observe(heroEl);
  }

  /* -------------------------------------------------------------- reveal */
  const revealEls = $$('[data-reveal]');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach((el) => io.observe(el));
  }

  /* ------------------------------------------------------------ counters */
  const counters = $$('[data-count]');
  if (counters.length) {
    const fmt = (n, dec, plain) => dec ? n.toFixed(dec) : plain ? String(Math.round(n)) : Math.round(n).toLocaleString('en-US');
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const dec = (el.dataset.count.split('.')[1] || '').length; const plain = 'plain' in el.dataset;
      const dur = 1400; const t0 = performance.now();
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur); const e = 1 - Math.pow(1 - k, 3);
        el.textContent = fmt(target * e, dec, plain);
        if (k < 1) requestAnimationFrame(step);
      };
      if (reduceMotion) { el.textContent = fmt(target, dec, plain); return; }
      requestAnimationFrame(step);
    };
    const cio = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { run(en.target); cio.unobserve(en.target); } }), { threshold: 0.5 });
    counters.forEach((el) => cio.observe(el));
  }

  /* ---------------------------------------------- rays parallax + scroll var */
  const parallaxEls = $$('.hero__logo, [data-parallax]');
  if (!reduceMotion && parallaxEls.length) {
    let ticking = false;
    const update = () => { document.documentElement.style.setProperty('--scroll', String(window.scrollY)); ticking = false; };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------------------------------------------------------- lane scene */
  const scene = $('.lane-scene');
  if (scene) {
    const steps = $$('.lane-step', scene);
    const update = () => {
      if (reduceMotion) { scene.style.setProperty('--p', '1'); scene.classList.add('is-strike'); steps.forEach((s) => s.classList.add('is-active')); return; }
      const rect = scene.getBoundingClientRect();
      const total = scene.offsetHeight - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));
      scene.style.setProperty('--p', p.toFixed(4));
      scene.classList.toggle('is-strike', p > 0.86);
      const active = Math.min(steps.length - 1, Math.floor(p * steps.length * 1.02));
      steps.forEach((s, i) => s.classList.toggle('is-active', i <= active));
    };
    const lane = $('.lane', scene); const ball = $('.ball', scene); const pins = $('.pins', scene);
    const measure = () => { if (!lane || !ball) return; const travel = Math.max(120, (pins ? pins.getBoundingClientRect().left - lane.getBoundingClientRect().left : lane.clientWidth * 0.8) - ball.offsetLeft - ball.offsetWidth * 0.55); scene.style.setProperty('--travel', `${Math.round(travel)}px`); };
    let raf = false;
    const onScroll = () => { if (!raf) { raf = true; requestAnimationFrame(() => { update(); raf = false; }); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { measure(); onScroll(); });
    measure(); update();
  }

  /* --------------------------------------------------------------- hours */
  // Highlights today's row and shows an "Open now / Closed" chip. Times are Central Time.
  const parseTime = (s) => { const m = /(\d+):(\d+)\s*(AM|PM)/i.exec(s); if (!m) return null; let h = +m[1] % 12; if (/pm/i.test(m[3])) h += 12; return h * 60 + +m[2]; };
  const hoursLists = $$('.hours[data-hours]');
  const chip = $('.open-chip');
  try {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(new Date());
    const get = (t) => (parts.find((p) => p.type === t) || {}).value;
    const dayIdx = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
    const now = (+get('hour') % 24) * 60 + +get('minute');
    hoursLists.forEach((ul) => $$('li[data-day]', ul).forEach((li) => li.classList.toggle('is-today', +li.dataset.day === dayIdx)));
    const rows = JSON.parse(document.body.dataset.hours || '[]'); // [[day, open, close], ...] Sunday = 0
    if (chip && rows.length) {
      const today = rows.find((r) => r[0] === dayIdx); const yest = rows.find((r) => r[0] === (dayIdx + 6) % 7);
      let open = false, label = 'Closed now';
      if (today) {
        const o = parseTime(today[1]); let c = parseTime(today[2]); if (c <= o) c += 1440;
        if (now >= o && now < c) { open = true; label = `Open now · closes ${today[2]}`; }
        else if (now < o) label = `Opens today at ${today[1]}`;
      }
      if (!open && yest) { const o = parseTime(yest[1]); let c = parseTime(yest[2]); if (c <= o) { c -= 1440; if (now < c) { open = true; label = `Open now · closes ${yest[2]}`; } } }
      chip.textContent = label; chip.classList.toggle('is-closed', !open); chip.hidden = false;
    }
  } catch (e) { /* non-critical */ }

  let showToast = () => {};
  /* ------------------------------------------------------------- lightbox */
  const lightbox = $('#lightbox');
  const galleryLinks = $$('.gallery-grid__item');
  let lbIndex = 0;
  const showLB = (i) => {
    if (!lightbox || !galleryLinks.length) return;
    lbIndex = (i + galleryLinks.length) % galleryLinks.length;
    const a = galleryLinks[lbIndex];
    const img = $('img', lightbox);
    img.src = a.getAttribute('href'); img.alt = a.dataset.alt || '';
    $('.lightbox__count', lightbox).textContent = `${lbIndex + 1} / ${galleryLinks.length}`;
    lightbox.hidden = false; document.body.classList.add('sheet-open');
    $('.lightbox__close', lightbox).focus({ preventScroll: true });
  };
  const closeLightbox = () => { if (lightbox && !lightbox.hidden) { lightbox.hidden = true; document.body.classList.remove('sheet-open'); galleryLinks[lbIndex] && galleryLinks[lbIndex].focus({ preventScroll: true }); } };
  galleryLinks.forEach((a, i) => a.addEventListener('click', (e) => { e.preventDefault(); if ($('.photo.is-missing', a)) { showToast('This photo isn’t available yet.', null, null, 2500); return; } showLB(i); }));
  if (lightbox) {
    $('.lightbox__close', lightbox).addEventListener('click', closeLightbox);
    $('.lightbox__prev', lightbox).addEventListener('click', () => showLB(lbIndex - 1));
    $('.lightbox__next', lightbox).addEventListener('click', () => showLB(lbIndex + 1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => { if (lightbox.hidden) return; if (e.key === 'ArrowRight') showLB(lbIndex + 1); if (e.key === 'ArrowLeft') showLB(lbIndex - 1); });
    let x0 = null;
    lightbox.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', (e) => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) showLB(lbIndex + (dx < 0 ? 1 : -1)); x0 = null; });
  }

  /* --------------------------------------------------- photo fallbacks */
  $$('.photo img[data-fallback]').forEach((img) => {
    const mark = () => img.closest('.photo').classList.add('is-missing');
    if (img.complete && img.naturalWidth === 0) mark();
    img.addEventListener('error', mark);
  });

  /* ---------------------------------------------------------------- forms */
  $$('form[data-form]').forEach((form) => {
    const status = $('.form__status', form);
    const submitBtn = $('[type="submit"]', form);
    const loadedAt = Date.now();
    const setStatus = (type, html) => { if (!status) return; status.className = `form__status is-${type}`; status.innerHTML = html; status.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' }); };
    const markValidity = () => {
      let ok = true;
      $$('.field', form).forEach((f) => {
        const ctrl = $('input, select, textarea', f);
        if (!ctrl) return;
        const group = $$('input[type="radio"], input[type="checkbox"]', f);
        let valid = ctrl.checkValidity();
        if (group.length && group[0].required) valid = group.some((g) => g.checked);
        f.classList.toggle('is-invalid', !valid); if (!valid) ok = false;
      });
      return ok;
    };
    form.addEventListener('input', (e) => { const f = e.target.closest('.field'); if (f && f.classList.contains('is-invalid') && e.target.checkValidity()) f.classList.remove('is-invalid'); });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!markValidity() || !form.checkValidity()) { const bad = $('.field.is-invalid input, .field.is-invalid select, .field.is-invalid textarea', form); bad && bad.focus(); form.reportValidity(); return; }
      const hp = $('.hp input', form);
      if ((hp && hp.value) || Date.now() - loadedAt < 2500) { setStatus('success', successHTML(form)); form.classList.add('is-sent'); return; }
      submitBtn && submitBtn.classList.add('is-loading'); submitBtn && submitBtn.setAttribute('aria-disabled', 'true');
      const endpoint = form.dataset.endpoint || form.getAttribute('action') || window.location.pathname;
      const fd = new FormData(form);
      const hasFile = $$('input[type="file"]', form).some((i) => i.files && i.files.length);
      try {
        const res = await fetch(endpoint, { method: 'POST', body: hasFile ? fd : new URLSearchParams(fd), headers: hasFile ? {} : { 'Content-Type': 'application/x-www-form-urlencoded' } });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setStatus('success', successHTML(form)); form.classList.add('is-sent');
        try { localStorage.setItem('gab:lastSubmit', String(Date.now())); } catch (_) {}
      } catch (err) {
        setStatus('error', `<svg class="ic" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 8v5"/><circle cx="12" cy="16" r=".6" fill="currentColor"/></svg><div><strong>We couldn't send that just now.</strong><br>Please try again, or call us at <a href="tel:+19035612911">903-561-2911</a> and we'll take care of it right away.</div>`);
      } finally {
        submitBtn && submitBtn.classList.remove('is-loading'); submitBtn && submitBtn.removeAttribute('aria-disabled');
      }
    });
    // date inputs: today or later
    $$('input[type="date"][data-min-today]', form).forEach((d) => { d.min = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10); });
  });
  function successHTML(form) {
    const msg = form.dataset.success || "Thanks! We've received your message and will be in touch shortly.";
    return `<svg class="ic" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="m8.5 12.3 2.4 2.4L15.8 9.8"/></svg><div><strong>${msg}</strong><br>Need something sooner? Call <a href="tel:+19035612911">903-561-2911</a>.</div>`;
  }

  /* -------------------------------------------------------------- prefetch */
  const prefetched = new Set();
  const prefetch = (href) => {
    if (!href || prefetched.has(href)) return;
    const u = new URL(href, location.href); if (u.origin !== location.origin || u.pathname === location.pathname) return;
    prefetched.add(href);
    const l = document.createElement('link'); l.rel = 'prefetch'; l.href = u.href; l.as = 'document'; document.head.appendChild(l);
  };
  document.addEventListener('pointerover', (e) => { const a = e.target.closest('a[href]'); if (a) prefetch(a.getAttribute('href')); }, { passive: true });
  document.addEventListener('touchstart', (e) => { const a = e.target.closest('a[href]'); if (a) prefetch(a.getAttribute('href')); }, { passive: true });

  /* ---------------------------------------------------------------- PWA */
  const toast = $('#toast');
  showToast = (html, actionLabel, onAction, ms = 8000) => {
    if (!toast) return;
    toast.innerHTML = `<span>${html}</span>`;
    if (actionLabel) { const b = document.createElement('button'); b.className = 'btn btn--light'; b.textContent = actionLabel; b.addEventListener('click', () => { onAction && onAction(); toast.hidden = true; }); toast.appendChild(b); }
    toast.hidden = false;
    clearTimeout(showToast._t); if (ms) showToast._t = setTimeout(() => { toast.hidden = true; }, ms);
  };
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    window.addEventListener('load', async () => {
      try {
        const reg = await navigator.serviceWorker.register(new URL('sw.js', document.baseURI).pathname, { scope: new URL('./', document.baseURI).pathname });
        const promptUpdate = (sw) => showToast('A new version of the site is ready.', 'Refresh', () => sw.postMessage({ type: 'SKIP_WAITING' }), 0);
        if (reg.waiting && navigator.serviceWorker.controller) promptUpdate(reg.waiting);
        reg.addEventListener('updatefound', () => { const sw = reg.installing; sw && sw.addEventListener('statechange', () => { if (sw.state === 'installed' && navigator.serviceWorker.controller) promptUpdate(sw); }); });
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', () => { if (!refreshing) { refreshing = true; location.reload(); } });
      } catch (e) { /* SW unsupported or blocked */ }
    });
  }
  const setOnline = () => document.body.classList.toggle('is-offline', !navigator.onLine);
  window.addEventListener('online', () => { setOnline(); showToast('Back online.', null, null, 3000); });
  window.addEventListener('offline', () => { setOnline(); showToast("You're offline — saved pages still work.", null, null, 5000); });
  setOnline();

  // Install prompt (Android/desktop) + iOS "Add to Home Screen" guidance
  const banner = $('#install-banner');
  const iosHint = $('#ios-install');
  let deferredPrompt = null;
  const dismissedAt = (() => { try { return +localStorage.getItem('gab:installDismissed') || 0; } catch (_) { return 0; } })();
  const recentlyDismissed = Date.now() - dismissedAt < 14 * 864e5;
  const visits = (() => { try { const v = (+sessionStorage.getItem('gab:visits') || 0) + 1; sessionStorage.setItem('gab:visits', String(v)); return v; } catch (_) { return 1; } })();
  const openIOSHint = () => { if (!iosHint) return; iosHint.hidden = false; requestAnimationFrame(() => requestAnimationFrame(() => iosHint.classList.add('is-open'))); document.body.classList.add('sheet-open'); };
  const closeIOSHint = () => { if (!iosHint || iosHint.hidden) return; iosHint.classList.remove('is-open'); document.body.classList.remove('sheet-open'); setTimeout(() => { iosHint.hidden = true; }, 420); };
  $$('[data-close-ios]').forEach((b) => b.addEventListener('click', closeIOSHint));
  const showBanner = () => { if (banner && !isStandalone && !recentlyDismissed) banner.hidden = false; };
  const hideBanner = (remember) => { if (banner) banner.hidden = true; if (remember) { try { localStorage.setItem('gab:installDismissed', String(Date.now())); } catch (_) {} } };
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferredPrompt = e; if (visits >= 2) setTimeout(showBanner, 4000); });
  window.addEventListener('appinstalled', () => { hideBanner(true); showToast('Green Acres Bowl was added to your home screen.', null, null, 4000); });
  if (isIOS && isSafari && !isStandalone && visits >= 2 && !recentlyDismissed) setTimeout(showBanner, 6000);
  const install = async () => {
    if (deferredPrompt) { deferredPrompt.prompt(); const { outcome } = await deferredPrompt.userChoice; deferredPrompt = null; hideBanner(outcome === 'dismissed'); return; }
    if (isIOS || !('BeforeInstallPromptEvent' in window)) { hideBanner(false); openIOSHint(); return; }
    showToast('Use your browser menu and choose “Install app” or “Add to Home Screen”.', null, null, 6000);
  };
  $$('[data-install]').forEach((b) => b.addEventListener('click', (e) => { e.preventDefault(); install(); }));
  $$('[data-install-dismiss]').forEach((b) => b.addEventListener('click', () => hideBanner(true)));

  /* ------------------------------------------------ active tab (bottom bar) */
  const page = document.documentElement.dataset.page;
  $$('.tab[data-page]').forEach((t) => t.classList.toggle('is-active', t.dataset.page === page));
})();
