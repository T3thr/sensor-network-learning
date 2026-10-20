/* Paper III Version 2 translation panel: reading modes and the page jump list.
   Modes: both (Compare View 50:50), th (Thai only), en (original only). The choice comes from
   ?view=compare|thai|paper (the same parameter as the Version 1 Compare View), then the saved choice. */
(function () {
  'use strict';
  const root = document.getElementById('v2-tr');
  if (!root) return;
  const KEY = 'raftfl_tr_mode';
  const MODES = ['both', 'th', 'en'];
  const FROM_VIEW = { compare: 'both', thai: 'th', paper: 'en' };
  const buttons = root.querySelectorAll('[data-tr-mode]');

  function set(mode, save) {
    if (!MODES.includes(mode)) mode = 'both';
    MODES.forEach((m) => root.classList.toggle('mode-' + m, m === mode));
    buttons.forEach((b) => {
      const on = b.dataset.trMode === mode;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    if (save) { try { localStorage.setItem(KEY, mode); } catch (e) { /* storage unavailable */ } }
    window.dispatchEvent(new Event('scroll'));
  }

  buttons.forEach((b) => b.addEventListener('click', () => set(b.dataset.trMode, true)));
  let start = FROM_VIEW[new URLSearchParams(location.search).get('view')];
  if (!start) { try { start = localStorage.getItem(KEY); } catch (e) { start = null; } }
  set(start || 'both', false);

  // page jump list, kept in step with the page the reader is on
  const jump = document.getElementById('v2-tr-jump');
  const pages = [...root.querySelectorAll('.tr-page[id]')];
  if (jump) {
    jump.addEventListener('change', () => {
      const target = document.getElementById(jump.value);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    const track = () => {
      if (root.offsetParent === null) return;
      const y = window.scrollY + 200;
      let current = pages[0];
      pages.forEach((p) => { if (p.getBoundingClientRect().top + window.scrollY <= y) current = p; });
      if (current && jump.value !== current.id) jump.value = current.id;
    };
    window.addEventListener('scroll', track, { passive: true });
    track();
  }
})();
