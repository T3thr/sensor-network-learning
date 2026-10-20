/* Paper III version switcher: shows the Version 1 (OmniLedger) or Version 2 (Raft-FL) panel on the
   same page, without changing directory.
   Choice order: ?v=1|2 in the URL, then the reader's last choice (localStorage), then the panel that
   holds the #hash target, then Version 2 (the paper being presented).
   Section links shared by both versions (for example #sec-rehearsal from the site header) are mapped
   to the matching section of the version on screen through data-p3-alias on <body>.
   Load this script right after the panels and before common.js, so the hidden panel is already
   hidden when the other page scripts initialise. A small inline script in <head> sets
   <html data-p3> from ?v or the saved choice before first paint, so the other panel never flashes. */
(function () {
  'use strict';
  const panels = {};
  document.querySelectorAll('.p3-panel[data-version]').forEach((p) => { panels[p.dataset.version] = p; });
  if (!panels.v1) return;

  const KEY = 'p3_version';
  const body = document.body;
  const titles = { v1: body.dataset.titleV1, v2: body.dataset.titleV2, v3: body.dataset.titleV3 };
  let alias = {};
  try { alias = JSON.parse(body.dataset.p3Alias || '{}'); } catch (e) { alias = {}; }
  const reverse = Object.fromEntries(Object.entries(alias).map(([k, v]) => [v, k]));
  const panelOf = (el) => (el ? el.closest('.p3-panel') : null);
  let current = null;

  function initial() {
    const q = new URLSearchParams(location.search).get('v');
    if (q === '1' || q === 'v1') return 'v1';
    if (q === '2' || q === 'v2') return 'v2';
    if (q === '3' || q === 'v3') return 'v3';
    try { const s = localStorage.getItem(KEY); if (s === 'v1' || s === 'v2' || s === 'v3') return s; } catch (e) { /* storage unavailable */ }
    const h = decodeURIComponent(location.hash.slice(1));
    const p = h && panelOf(document.getElementById(h));
    if (p) return p.dataset.version;
    return panels.v3 ? 'v3' : (panels.v2 ? 'v2' : 'v1');
  }

  function apply(v, opts = {}) {
    current = v;
    Object.entries(panels).forEach(([k, p]) => { p.hidden = k !== v; });
    document.querySelectorAll('[data-p3-select]').forEach((s) => { s.value = v; });
    document.querySelectorAll('[data-p3-tab]').forEach((b) => {
      const on = b.dataset.p3Tab === v;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    if (titles[v]) document.title = titles[v];
    body.dataset.p3Version = v;
    document.documentElement.dataset.p3 = v;
    try { localStorage.setItem(KEY, v); } catch (e) { /* storage unavailable */ }
    if (opts.url !== false) {
      const u = new URL(location.href);
      u.searchParams.set('v', v === 'v1' ? '1' : (v === 'v2' ? '2' : '3'));
      if (opts.clearHash) u.hash = '';
      history.replaceState(history.state, '', u);
    }
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('scroll'));
    document.dispatchEvent(new CustomEvent('p3:version', { detail: { version: v } }));
  }

  function resolveHash(e) {
    const h = decodeURIComponent(location.hash.slice(1));
    if (!h) return;
    let el = document.getElementById(h);
    const p = panelOf(el);
    if (p && p.dataset.version !== current) {
      // Version-prefixed twin first (sec-rehearsal -> v3-sec-rehearsal), then the explicit alias map.
      const twin = document.getElementById(`${current}-${h.replace(/^v[123]-/, '')}`);
      const mapped = twin && panelOf(twin) && panelOf(twin).dataset.version === current ? twin : document.getElementById(alias[h] || reverse[h] || '');
      if (mapped && panelOf(mapped) && panelOf(mapped).dataset.version === current) el = mapped;
      else apply(p.dataset.version);
    }
    if (!el) return;
    if (e) { requestAnimationFrame(() => el.scrollIntoView({ block: 'start' })); return; }
    // On page load: jump straight to the section, then line it up again once web fonts and images
    // have settled (they change the height of the content above), unless the reader has scrolled.
    const jump = () => el.scrollIntoView({ block: 'start', behavior: 'instant' });
    let touched = false;
    const stop = () => { touched = true; };
    ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach((t) => window.addEventListener(t, stop, { once: true, passive: true }));
    requestAnimationFrame(jump);
    const loaded = new Promise((r) => (document.readyState === 'complete' ? r() : window.addEventListener('load', r, { once: true })));
    Promise.all([loaded, document.fonts ? document.fonts.ready : null]).then(() => requestAnimationFrame(() => { if (!touched) jump(); }));
  }

  const choose = (v) => { apply(v, { clearHash: true }); window.scrollTo({ top: 0 }); };
  document.querySelectorAll('[data-p3-select]').forEach((s) => s.addEventListener('change', () => choose(s.value)));
  document.querySelectorAll('[data-p3-tab]').forEach((b) => b.addEventListener('click', () => choose(b.dataset.p3Tab)));
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-p3-switch]');
    if (!a) return;
    e.preventDefault();
    choose(a.dataset.p3Switch);
  });
  window.addEventListener('hashchange', (e) => resolveHash(e));

  apply(initial(), { url: false });
  if (location.hash) resolveHash(null);
  window.P3Version = { get: () => current, set: (v) => apply(v) };
})();
