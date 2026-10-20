/**
 * 305432 เครือข่ายเซนเซอร์ (Sensor Networks)
 * Translation & Compare View Controller (Inspired by Electric-Machine Web App)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTranslationApp();
});

function initTranslationApp() {
  const urlParams = new URLSearchParams(window.location.search);
  // DOM Elements
  const compareGrid = document.getElementById('compare-grid');
  const maxPages = parseInt(compareGrid?.getAttribute('data-max-pages')) || 9;
  const paperLabel = compareGrid?.getAttribute('data-paper-label') || 'IEEE ICCAD 2020';
  const paperAlt = compareGrid?.getAttribute('data-paper-alt') || 'Paper I Page';
  const storagePrefix = compareGrid?.getAttribute('data-storage-prefix') || 'sn_paper1';

  let currentPage = parseInt(urlParams.get('page')) || 1;
  currentPage = Math.min(maxPages, Math.max(1, currentPage));
  // View and study modes are restored from the URL (?view=compare|thai|paper, ?study=summary|translation).
  let currentViewMode = ['compare', 'thai', 'paper'].includes(urlParams.get('view')) ? urlParams.get('view') : 'compare';
  let currentStudyMode = urlParams.get('study') === 'summary' ? 'summary' : 'translation';

  const paperImg = document.getElementById('compare-paper-img');
  const paperPageLabel = document.getElementById('compare-paper-page-label');
  const pageDropdown = document.getElementById('dock-page-select');
  const prevBtn = document.getElementById('dock-btn-prev');
  const nextBtn = document.getElementById('dock-btn-next');
  const dockPageText = document.getElementById('dock-current-page-text');

  // Mode buttons
  const viewCompareBtn = document.getElementById('view-mode-compare');
  const viewThaiBtn = document.getElementById('view-mode-thai');
  const viewPaperBtn = document.getElementById('view-mode-paper');

  const studySummaryBtn = document.getElementById('study-mode-summary');
  const studyTransBtn = document.getElementById('study-mode-trans');

  // Bookmark / Flag buttons
  const bookmarkBtn = document.getElementById('dock-btn-bookmark');
  const flagBtn = document.getElementById('dock-btn-flag');

  function updatePage(newPage, opts = {}) {
    currentPage = Math.min(maxPages, Math.max(1, newPage));

    // 1. Update Paper Image
    if (paperImg) {
      paperImg.src = `assets/pages/page-${currentPage}.png`;
      paperImg.alt = `${paperAlt} ${currentPage}`;
    }
    if (paperPageLabel) {
      paperPageLabel.innerText = `${paperLabel} · หน้า ${currentPage} จาก ${maxPages}`;
    }

    // 2. Update Thai Study Panels
    document.querySelectorAll('.thai-page-article').forEach(art => {
      const p = parseInt(art.getAttribute('data-page'));
      if (p === currentPage) {
        art.style.display = 'block';
      } else {
        art.style.display = 'none';
      }
    });

    // 3. Update Dropdown & Indicator
    if (pageDropdown) pageDropdown.value = currentPage;
    if (dockPageText) dockPageText.innerText = `หน้า ${currentPage} จาก ${maxPages}`;

    // 4. Update Prev / Next button disabled state
    if (prevBtn) prevBtn.disabled = (currentPage <= 1);
    if (nextBtn) nextBtn.disabled = (currentPage >= maxPages);

    // 5. Update Bookmarks & Flag state
    updateBookmarkUI();

    // 6. Update URL without reload
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('page', currentPage);
    window.history.replaceState({}, '', newUrl);

    // Scroll to top of translation pane (not on first load, so a #hash or another panel keeps its place)
    if (!opts.initial) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setViewMode(mode) {
    currentViewMode = mode;
    if (!compareGrid) return;

    compareGrid.classList.remove('mode-thai-only', 'mode-paper-only');
    [viewCompareBtn, viewThaiBtn, viewPaperBtn].forEach(b => b?.classList.remove('active'));

    const paperPane = document.getElementById('compare-paper-pane');
    const thaiPane = document.getElementById('compare-thai-pane');

    if (mode === 'thai') {
      compareGrid.classList.add('mode-thai-only');
      if (paperPane) paperPane.style.display = 'none';
      if (thaiPane) thaiPane.style.display = 'block';
      if (viewThaiBtn) viewThaiBtn.classList.add('active');
    } else if (mode === 'paper') {
      compareGrid.classList.add('mode-paper-only');
      if (thaiPane) thaiPane.style.display = 'none';
      if (paperPane) paperPane.style.display = 'block';
      if (viewPaperBtn) viewPaperBtn.classList.add('active');
    } else {
      // compare
      if (paperPane) paperPane.style.display = 'block';
      if (thaiPane) thaiPane.style.display = 'block';
      if (viewCompareBtn) viewCompareBtn.classList.add('active');
    }

    const newUrl = new URL(window.location);
    newUrl.searchParams.set('view', mode);
    window.history.replaceState({}, '', newUrl);
  }

  function setStudyMode(mode) {
    currentStudyMode = mode;
    [studySummaryBtn, studyTransBtn].forEach(b => b?.classList.remove('active'));

    const summaryBoxes = document.querySelectorAll('.thai-summary-box');
    const transBlocks = document.querySelectorAll('.thai-trans-block');

    if (mode === 'summary') {
      summaryBoxes.forEach(b => b.style.display = 'block');
      transBlocks.forEach(b => b.style.display = 'none');
      if (studySummaryBtn) studySummaryBtn.classList.add('active');
    } else {
      summaryBoxes.forEach(b => b.style.display = 'block'); // Keep summary as introductory overview
      transBlocks.forEach(b => b.style.display = 'block');
      if (studyTransBtn) studyTransBtn.classList.add('active');
    }

    const newUrl = new URL(window.location);
    newUrl.searchParams.set('study', mode);
    window.history.replaceState({}, '', newUrl);
  }

  function updateBookmarkUI() {
    const bookmarks = JSON.parse(localStorage.getItem(`${storagePrefix}_bookmarks`) || '[]');
    const flags = JSON.parse(localStorage.getItem(`${storagePrefix}_flags`) || '[]');

    if (bookmarkBtn) {
      if (bookmarks.includes(currentPage)) {
        bookmarkBtn.style.color = 'var(--accent)';
        bookmarkBtn.title = 'ยกเลิกบุ๊กมาร์กหน้านี้';
      } else {
        bookmarkBtn.style.color = 'var(--ink-soft)';
        bookmarkBtn.title = 'บุ๊กมาร์กหน้านี้';
      }
    }

    if (flagBtn) {
      if (flags.includes(currentPage)) {
        flagBtn.style.color = 'var(--red)';
        flagBtn.title = 'ยกเลิกการตั้งสถานะติดดาวทบทวน';
      } else {
        flagBtn.style.color = 'var(--ink-soft)';
        flagBtn.title = 'ทำเครื่องหมายว่าต้องทบทวนเพิ่ม';
      }
    }
  }

  // Event Listeners
  if (prevBtn) prevBtn.addEventListener('click', () => updatePage(currentPage - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => updatePage(currentPage + 1));
  if (pageDropdown) pageDropdown.addEventListener('change', (e) => updatePage(parseInt(e.target.value)));

  if (viewCompareBtn) viewCompareBtn.addEventListener('click', () => setViewMode('compare'));
  if (viewThaiBtn) viewThaiBtn.addEventListener('click', () => setViewMode('thai'));
  if (viewPaperBtn) viewPaperBtn.addEventListener('click', () => setViewMode('paper'));

  if (studySummaryBtn) studySummaryBtn.addEventListener('click', () => setStudyMode('summary'));
  if (studyTransBtn) studyTransBtn.addEventListener('click', () => setStudyMode('translation'));

  // Bookmark Toggle
  if (bookmarkBtn) {
    bookmarkBtn.addEventListener('click', () => {
      let bookmarks = JSON.parse(localStorage.getItem(`${storagePrefix}_bookmarks`) || '[]');
      if (bookmarks.includes(currentPage)) {
        bookmarks = bookmarks.filter(p => p !== currentPage);
      } else {
        bookmarks.push(currentPage);
      }
      localStorage.setItem(`${storagePrefix}_bookmarks`, JSON.stringify(bookmarks));
      updateBookmarkUI();
    });
  }

  // Flag Toggle
  if (flagBtn) {
    flagBtn.addEventListener('click', () => {
      let flags = JSON.parse(localStorage.getItem(`${storagePrefix}_flags`) || '[]');
      if (flags.includes(currentPage)) {
        flags = flags.filter(p => p !== currentPage);
      } else {
        flags.push(currentPage);
      }
      localStorage.setItem(`${storagePrefix}_flags`, JSON.stringify(flags));
      updateBookmarkUI();
    });
  }

  // Keyboard Navigation: ArrowLeft / ArrowRight
  document.addEventListener('keydown', (e) => {
    // Ignore if user is typing in an input
    if (['input', 'select', 'textarea'].includes(document.activeElement?.tagName?.toLowerCase())) return;
    // Ignore while the Compare View is hidden (for example Paper III with its Version 2 panel on screen)
    if (compareGrid && compareGrid.offsetParent === null) return;

    if (e.key === 'ArrowLeft' && currentPage > 1) {
      e.preventDefault();
      updatePage(currentPage - 1);
    } else if (e.key === 'ArrowRight' && currentPage < maxPages) {
      e.preventDefault();
      updatePage(currentPage + 1);
    }
  });

  // Initial Load
  updatePage(currentPage, { initial: true });
  setViewMode(currentViewMode);
  setStudyMode(currentStudyMode);
}
