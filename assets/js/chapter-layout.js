/* ═══════════════════════════════════════════════════════════════════
   305432 Chapter Layout Runtime
   Scrollspy algorithm ported from iot/ch01.html (top <= 120)
   + Sticky Sidebar pin + Checklist toggle
   ใช้ร่วมกับ datacom/chXX.html และ iot/chXX.html
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // Canonical threshold: 140px offset for real-time header alignment
  var SCROLLSPY_TOP_OFFSET = 140;

  function initScrollspy() {
    var links = Array.prototype.slice.call(document.querySelectorAll('.sidebar-link'));
    if (!links.length) return;

    var pin = document.getElementById('sidebar-live-section');
    var sections = links
      .map(function (a) {
        var href = a.getAttribute('href') || '';
        if (href.charAt(0) !== '#') return null;
        return document.getElementById(href.slice(1));
      })
      .filter(Boolean);

    if (!sections.length) return;

    function setActive(id) {
      links.forEach(function (a) {
        var match = a.getAttribute('href') === '#' + id;
        if (match) {
          a.classList.add('active');
          if (pin) pin.textContent = (a.textContent || '').trim();
          if (window.matchMedia('(max-width: 768px)').matches && a.scrollIntoView) {
            a.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
          }
        } else {
          a.classList.remove('active');
        }
      });
    }

    // Real-time position tracking: last section whose top is <= 140px wins
    function onScroll() {
      var current = sections[0];
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top <= SCROLLSPY_TOP_OFFSET) {
          current = sections[i];
        }
      }
      // Handle page bottom scroll
      if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60)) {
        current = sections[sections.length - 1];
      }
      if (current) setActive(current.id);
    }

    links.forEach(function (a) {
      a.addEventListener('click', function () {
        var href = a.getAttribute('href') || '';
        if (href.charAt(0) === '#') setActive(href.slice(1));
      });
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }

  function initChecklist() {
    if (typeof window.toggleCheck !== 'function') {
      window.toggleCheck = function (item) {
        if (!item) return;
        var box = item.querySelector('.checklist-checkbox');
        if (box) box.checked = !box.checked;
        item.classList.toggle('checked', !!(box && box.checked));
      };
    }
  }

  function initSmoothOffset() {
    document.documentElement.style.scrollPaddingTop =
      'calc(var(--site-header-offset) + 20px)';
  }

  function boot() {
    initChecklist();
    initScrollspy();
    initSmoothOffset();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
