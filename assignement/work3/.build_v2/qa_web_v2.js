// Playwright QA for the unified Paper III pages (Version 1 OmniLedger and Version 2 Raft-FL on the
// same page, switched by assets/p3-version.js).
//
//   NODE_PATH=../../work1/.build/node_modules node qa_web_v2.js
//
// Checks: no console/page errors, unique ids, every local link and image resolves, the version
// switcher (dropdown, tabs, sidebar cards, ?v=, hash aliases, saved choice), header links that follow
// the version, the Version 2 widgets (simulator, studio, slide viewer, Q&A, quiz, copy button,
// calculators), the Version 2 translation (modes, 50:50 on desktop and one column on tablet and
// mobile, page jump, analysis blocks), Version 1 regressions (Compare View, keyboard isolation),
// the redirect stubs in paper-3/v2/, no horizontal scroll at 1440, 768 and 390 px, and dark mode.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const SITE = path.resolve(__dirname, '..', '..', '..');
const url = (p) => 'file://' + path.join(SITE, p);
const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok: !!ok, detail }); };
const WIDTHS = [1440, 768, 390];

async function open(browser, rel, opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: opts.w || 1440, height: opts.h || 900 }, colorScheme: opts.dark ? 'dark' : 'light' });
  if (opts.dark) await ctx.addInitScript(() => { try { localStorage.setItem('sn_theme', 'dark'); } catch (e) {} });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(url(rel), { waitUntil: 'load' });
  await page.waitForTimeout(350);
  return { page, ctx, errors };
}

async function localRefs(page) {
  return page.evaluate(() => [...document.querySelectorAll('a[href], img[src], link[href], script[src]')]
    .map((e) => e.getAttribute('href') || e.getAttribute('src'))
    .filter((h) => h && !/^(https?:|mailto:|#|data:|javascript:|\?)/.test(h) && !h.includes('${'))
    .map((h) => new URL(h, location.href).pathname));
}

const state = (page) => page.evaluate(() => ({
  v: document.body.dataset.p3Version,
  v1: getComputedStyle(document.getElementById('p3-panel-v1')).display !== 'none',
  v2: getComputedStyle(document.getElementById('p3-panel-v2')).display !== 'none',
  search: location.search,
  title: document.title,
}));
const noHScroll = (page) => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1);
const dupIds = (page) => page.evaluate(() => {
  const ids = [...document.querySelectorAll('[id]')].map((e) => e.id);
  return [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
});

(async () => {
  const browser = await chromium.launch();

  // ---------- lesson page: default, links, switcher ----------
  {
    const { page, ctx, errors } = await open(browser, 'paper-3/index.html?v=2');
    let s = await state(page);
    check('default without ?v or saved choice is Version 3', await (async () => { const o = await open(browser, 'paper-3/index.html'); const v = await o.page.evaluate(() => document.documentElement.dataset.p3); await o.ctx.close(); return v === 'v3'; })());
    check('lesson: ?v=2 opens Version 2', s.v === 'v2' && s.v2 && !s.v1, JSON.stringify(s));
    check('lesson: Version 2 title', s.title.includes('Raft-FL'), s.title);
    check('lesson: no console errors', errors.length === 0, errors.join(' | '));
    const dup = await dupIds(page);
    check('lesson: ids are unique across both panels', dup.length === 0, dup.join(', '));
    const refs = await localRefs(page);
    const missing = [...new Set(refs)].filter((p) => !fs.existsSync(decodeURIComponent(p)));
    check(`lesson: ${new Set(refs).size} local links/images resolve`, missing.length === 0, missing.join(', '));
    check('lesson: no links to the old v2/ folder', await page.evaluate(() => ![...document.querySelectorAll('a[href]')].some((a) => /(^|\/)v2\/(index|translation)\.html/.test(a.getAttribute('href')))));

    let hdr = await page.evaluate(() => [...document.querySelectorAll('site-header .nav-menu a')].map((a) => a.getAttribute('href')));
    check('header on v2: rehearsal/simulator/Q&A carry ?v=2', ['#sec-rehearsal', '#sec-simulator', '#sec-qna'].every((h) => hdr.includes('../paper-3/index.html?v=2' + h)), hdr.join(' '));
    check('header on v2: read link -> translation.html?v=2', hdr.includes('../paper-3/translation.html?v=2'));
    check('header on v2: v2 dropdown item active', await page.$eval('site-header .dropdown-item[data-item="paper-3@v2"]', (a) => a.classList.contains('active')));

    await page.selectOption('#p3-version-select', 'v1'); await page.waitForTimeout(150);
    s = await state(page);
    check('switcher: dropdown shows Version 1', s.v === 'v1' && s.v1 && !s.v2 && s.search === '?v=1' && s.title.includes('OmniLedger'), JSON.stringify(s));
    hdr = await page.evaluate(() => [...document.querySelectorAll('site-header .nav-menu a')].map((a) => a.getAttribute('href')));
    check('header follows the switch to ?v=1', hdr.includes('../paper-3/index.html?v=1#sec-rehearsal') && hdr.includes('../paper-3/translation.html?v=1'), hdr.join(' '));
    check('header read label follows the version', await page.$eval('site-header [data-p3-read-label]', (e) => e.textContent.includes('16')));
    await page.click('[data-p3-tab="v2"]'); await page.waitForTimeout(150);
    s = await state(page);
    check('switcher: tab shows Version 2', s.v === 'v2' && s.v2 && s.search === '?v=2', JSON.stringify(s));
    check('switcher: tab state follows', await page.$eval('[data-p3-tab="v2"]', (b) => b.classList.contains('active') && b.getAttribute('aria-pressed') === 'true'));
    await page.click('#p3-panel-v2 [data-p3-switch="v1"]'); await page.waitForTimeout(150);
    check('switcher: v2 sidebar card switches to Version 1', (await state(page)).v === 'v1');
    await page.click('#p3-panel-v1 [data-p3-switch="v2"]'); await page.waitForTimeout(150);
    check('switcher: v1 sidebar card switches to Version 2', (await state(page)).v === 'v2');
    const active = await page.evaluate(() => [...document.querySelectorAll('.sidebar-link.active')].filter((l) => l.offsetParent !== null).map((l) => l.getAttribute('href')));
    check('scroll spy: one active link, on the visible sidebar', active.length === 1 && active[0].startsWith('#v2-'), active.join(','));
    await ctx.close();
  }

  // ---------- lesson page: ?v, saved choice, hash aliases ----------
  {
    const { page, ctx } = await open(browser, 'paper-3/index.html?v=1');
    check('?v=1 opens Version 1', (await state(page)).v === 'v1');
    await page.goto(url('paper-3/index.html')); await page.waitForTimeout(250);
    check('saved choice: reopening without ?v keeps Version 1', (await state(page)).v === 'v1');
    await page.goto(url('paper-3/index.html?v=2#sec-rehearsal')); await page.waitForTimeout(1200);
    const inView = await page.evaluate(() => { const r = document.getElementById('v2-sec-rehearsal').getBoundingClientRect(); return r.top > -5 && r.top < innerHeight / 2; });
    check('hash alias: ?v=2#sec-rehearsal lands on the Version 2 rehearsal', (await state(page)).v === 'v2' && inView);
    await page.goto(url('paper-3/index.html?v=1#sec-rehearsal')); await page.waitForTimeout(1200);
    const inView1 = await page.evaluate(() => { const r = document.getElementById('sec-rehearsal').getBoundingClientRect(); return r.top > -5 && r.top < innerHeight / 2; });
    check('hash: ?v=1#sec-rehearsal lands on the Version 1 rehearsal', (await state(page)).v === 'v1' && inView1);
    await page.goto(url('paper-3/index.html?v=1#v2-sec-qna')); await page.waitForTimeout(400);
    check('hash: ?v=1 with a shared section (#v2-sec-qna) stays on Version 1 and maps to its Q&A', (await state(page)).v === 'v1');
    await page.goto(url('paper-3/index.html?v=1#v2-sec-raft')); await page.waitForTimeout(400);
    check('hash: a Version 2 only anchor (#v2-sec-raft) switches to Version 2', (await state(page)).v === 'v2');
    await ctx.close();
  }

  // ---------- Version 2 widgets ----------
  {
    const { page, ctx, errors } = await open(browser, 'paper-3/index.html?v=2');
    const P = '#p3-panel-v2 ';
    const sim = await page.evaluate(() => {
      const S = window.RAFTFL_SIM; S.init(5); S.step(1500); const a = S.state();
      S.crashLeader(); S.step(1500); const b = S.state();
      S.init(5); S.step(1000); const l = S.state().leader; [1, 2, 3, 4, 5].filter((i) => i !== l).slice(0, 2).forEach((i) => S.crash(i)); S.crash(l); S.step(2000); const c = S.state();
      S.init(2); S.step(1000); const l2 = S.state().leader; if (l2) S.crash(l2); S.step(2000); const d = S.state();
      return { a, b, c, d };
    });
    check('simulator: elects a leader and commits rounds', sim.a.leader && sim.a.committed > 0, JSON.stringify(sim.a));
    check('simulator: failover to a new leader, training continues', sim.b.leader && sim.b.leader !== sim.a.leader && sim.b.committed > sim.a.committed && sim.b.lastFailover > 0, JSON.stringify(sim.b));
    check('simulator: 2 of 5 alive -> no leader', sim.c.leader === null && sim.c.alive === 2, JSON.stringify(sim.c));
    check('simulator: N = 2 cannot re-elect after 1 crash', sim.d.leader === null, JSON.stringify(sim.d));
    check('simulator: SVG drawn in the Version 2 panel', await page.$eval('#v2-sim-svg', (e) => e.childElementCount > 0));
    check('Q&A: 15 items', (await page.$$(P + '.qa-item')).length === 15);
    await page.click(P + '.qa-filter[data-cat="critique"]');
    const vis = await page.$$eval(P + '.qa-item', (els) => els.filter((e) => e.style.display !== 'none').length);
    check('Q&A: category filter works', vis > 0 && vis < 15, `${vis} visible`);
    await page.click(P + '.qa-filter[data-cat="all"]');
    await page.fill('#v2-qa-search', 'quorum');
    const vis2 = await page.$$eval(P + '.qa-item', (els) => els.filter((e) => e.style.display !== 'none').length);
    check('Q&A: search works', vis2 >= 1 && vis2 < 15, `${vis2} visible`);
    await page.click('#v2-qa-drill-btn');
    check('Q&A: drill opens', await page.$eval('#v2-qa-drill', (e) => e.classList.contains('show')));
    check('quiz: 5 cards, 4 options each', await page.$$eval('#v2-quiz-v2 .quiz-card', (c) => c.length === 5 && c.every((x) => x.querySelectorAll('.quiz-option').length === 4)));
    await page.click('#v2-quiz-v2 .quiz-card:nth-child(3) .quiz-option:nth-child(3)');
    check('quiz: correct answer shows feedback', await page.$eval('#v2-quiz-v2 .quiz-card:nth-child(3) .quiz-feedback', (e) => getComputedStyle(e).display === 'block' && e.textContent.includes('ถูกต้อง')));
    check('BibTeX: copy button carries the IEEE Doc ID', await page.$eval('#v2-bibtex-copy', (b) => (b.getAttribute('data-copy') || '').includes('10556381')));
    await page.click('#v2-st-start'); await page.waitForTimeout(1200); await page.click('#v2-st-start');
    check('studio: timer runs', await page.$eval('#v2-st-clock', (e) => e.textContent !== '0:00'));
    await page.click(P + '.st-seg[data-i="4"]');
    check('studio: timeline jumps to slide 5 (light deck)', await page.$eval('#v2-st-img', (e) => e.getAttribute('src') === 'assets/v2/slides/slide-5.png' && e.naturalWidth > 0));
    check('studio: teleprompter shows stage 5', await page.$eval('#v2-st-prompter', (e) => e.textContent.includes('3.76')));
    await page.click('#v2-sv-next'); await page.click('#v2-sv-next');
    check('slide viewer: next moves to slide 3', await page.$eval('#v2-sv-img', (e) => e.getAttribute('src').endsWith('slide-3.png')) && await page.$eval('#v2-sv-label', (e) => e.textContent.includes('3 / 7')));
    const thumbs = await page.$$eval('#v2-sv-thumbs img', (i) => i.map((x) => x.naturalWidth));
    check('slide viewer: 7 thumbnails load', thumbs.length === 7 && thumbs.every((w) => w > 0), thumbs.join(','));
    await page.click(P + '.v2-page-btn[data-page="9"]');
    check('paper viewer: jump to page 118', await page.$eval('#v2-pv-img', (e) => e.getAttribute('src').endsWith('page-9.png')));
    await page.fill('#v2-t-w', '5'); await page.dispatchEvent('#v2-t-w', 'input');
    check('traffic calculator: 5 workers -> 3.19x', await page.$eval('#v2-t-out', (e) => e.textContent.includes('3.19')));
    await page.fill('#v2-q-n', '11'); await page.dispatchEvent('#v2-q-n', 'input');
    check('quorum calculator: N = 11 -> Q = 6, f = 5', await page.$eval('#v2-q-out', (e) => /6/.test(e.textContent) && /5/.test(e.textContent)));
    // keyboard isolation: Space in the Version 2 rehearsal must not start the Version 1 studio
    const v1Before = await page.evaluate(() => (document.querySelector('#p3-panel-v1 .studio-clock, #p3-panel-v1 [id*="clock"]') || {}).textContent || '');
    await page.evaluate(() => document.getElementById('v2-sec-rehearsal').scrollIntoView());
    await page.keyboard.press('Space'); await page.waitForTimeout(900); await page.keyboard.press('Space');
    const v1After = await page.evaluate(() => (document.querySelector('#p3-panel-v1 .studio-clock, #p3-panel-v1 [id*="clock"]') || {}).textContent || '');
    check('keyboard: Space drives only the Version 2 studio', v1Before === v1After, `${v1Before} -> ${v1After}`);
    check('Version 2 widgets: no console errors', errors.length === 0, errors.join(' | '));
    await ctx.close();
  }

  // ---------- Version 1 regression on the unified page ----------
  {
    const { page, ctx, errors } = await open(browser, 'paper-3/index.html?v=1');
    check('Version 1: 11 sidebar sections visible', await page.$$eval('#p3-panel-v1 .sidebar-link', (l) => l.filter((x) => x.offsetParent !== null).length === 11));
    check('Version 1: no emoji or old v2 banner', await page.evaluate(() => !/[\u{1F300}-\u{1FAFF}⭐]/u.test(document.getElementById('p3-panel-v1').textContent) && !document.body.textContent.includes('ข้อมูลเวอร์ชัน:')));
    check('Version 1: Q&A and quiz rendered', await page.evaluate(() => document.querySelectorAll('#sec-qna .qna-item, #sec-qna details, #sec-qna .qa-item, #sec-qna [class*="qna"]').length > 0));
    check('Version 1: no console errors', errors.length === 0, errors.join(' | '));
    await ctx.close();
  }

  // ---------- translation page ----------
  {
    const { page, ctx, errors } = await open(browser, 'paper-3/translation.html?v=2');
    let s = await state(page);
    check('translation: ?v=2 opens Version 2', s.v === 'v2' && s.v2 && !s.v1, JSON.stringify(s));
    check('translation: no console errors', errors.length === 0, errors.join(' | '));
    const dup = await dupIds(page);
    check('translation: ids are unique across both panels', dup.length === 0, dup.join(', '));
    const refs = await localRefs(page);
    const missing = [...new Set(refs)].filter((p) => !fs.existsSync(decodeURIComponent(p)));
    check(`translation: ${new Set(refs).size} local links/images resolve`, missing.length === 0, missing.join(', '));
    const counts = await page.evaluate(() => {
      const r = document.getElementById('v2-tr');
      return { rows: r.querySelectorAll('.tr-row').length, pages: r.querySelectorAll('.tr-page').length, figs: [...r.querySelectorAll('.tr-fig img')].map((i) => +i.getAttribute('width')), analysis: r.querySelectorAll('.tr-analysis').length, tables: r.querySelectorAll('.tr-table table').length, refs: r.querySelectorAll('.tr-refs li').length, jump: document.querySelectorAll('#v2-tr-jump option').length };
    });
    check('translation: all rows present', counts.rows >= 100, JSON.stringify(counts));
    check('translation: page markers 110-119 and 120-121', counts.pages === 11 && counts.jump === 11);
    check('translation: 4 sized figures, 1 table, 35 references', counts.figs.length === 4 && counts.figs.every((w) => w > 0) && counts.tables === 1 && counts.refs === 35, JSON.stringify(counts));
    check('translation: 5 analysis blocks (Table 1, Figs 1-4)', counts.analysis === 5);
    const cols = async () => page.$eval('#v2-tr .tr-p', (e) => getComputedStyle(e).gridTemplateColumns.split(' ').length);
    check('translation: Compare View 50:50 at 1440', (await cols()) === 2);
    const widths = await page.$eval('#v2-tr .tr-p', (e) => [e.children[0].getBoundingClientRect().width, e.children[1].getBoundingClientRect().width]);
    check('translation: both columns equal width', Math.abs(widths[0] - widths[1]) < 2, widths.join(' vs '));
    await page.click('#v2-tr [data-tr-mode="th"]');
    check('translation: Thai only hides the English', await page.$eval('#v2-tr .tr-p .tr-en', (e) => getComputedStyle(e).display === 'none') && (await cols()) === 1);
    await page.click('#v2-tr [data-tr-mode="en"]');
    check('translation: original only hides Thai and analysis', await page.$eval('#v2-tr .tr-p .tr-th', (e) => getComputedStyle(e).display === 'none') && await page.$eval('#v2-tr .tr-analysis', (e) => getComputedStyle(e).display === 'none'));
    await page.click('#v2-tr [data-tr-mode="both"]');
    await page.evaluate(() => document.fonts.ready);
    await page.selectOption('#v2-tr-jump', 'v2-page-118'); await page.waitForTimeout(2500);
    const jumpTop = await page.evaluate(() => Math.round(document.getElementById('v2-page-118').getBoundingClientRect().top));
    const barBottom = await page.evaluate(() => Math.round(document.querySelector('#v2-tr .tr-controls').getBoundingClientRect().bottom));
    check('translation: page jump lands page 118 just below the sticky mode bar', jumpTop >= barBottom && jumpTop < barBottom + 60, `top ${jumpTop}, bar ends ${barBottom}`);
    const pageParam = await page.evaluate(() => new URLSearchParams(location.search).get('page'));
    await page.keyboard.press('ArrowRight'); await page.waitForTimeout(200);
    const pageParam2 = await page.evaluate(() => new URLSearchParams(location.search).get('page'));
    const y = await page.evaluate(() => scrollY);
    check('translation: arrow keys do not drive the hidden Version 1 Compare View', pageParam === pageParam2 && y > 1000, `${pageParam} -> ${pageParam2}, y=${y}`);
    const hdr = await page.evaluate(() => [...document.querySelectorAll('site-header a.nav-link-accent')].map((a) => a.getAttribute('href') + ' ' + a.className));
    check('translation header: read link active with ?v=2', hdr.some((h) => h.includes('paper-3/translation.html?v=2') && h.includes('active')), hdr.join(' | '));
    await page.selectOption('#p3-version-select', 'v1'); await page.waitForTimeout(200);
    s = await state(page);
    check('translation: switch to Version 1 Compare View', s.v === 'v1' && s.v1 && !s.v2, JSON.stringify(s));
    await page.click('#dock-btn-next'); await page.waitForTimeout(200);
    check('translation Version 1: dock moves to page 2', await page.$eval('#dock-current-page-text', (e) => e.textContent.includes('2 จาก 16')));
    await ctx.close();
  }
  {
    const { page, ctx, errors } = await open(browser, 'paper-3/translation.html?v=1&page=5&view=thai');
    check('translation ?v=1&page=5&view=thai: Version 1 page 5 in Thai view', (await state(page)).v === 'v1' && await page.$eval('#dock-current-page-text', (e) => e.textContent.includes('5 จาก 16')));
    check('translation Version 1: no console errors', errors.length === 0, errors.join(' | '));
    await page.goto(url('paper-3/translation.html?v=2&view=paper')); await page.waitForTimeout(300);
    check('translation ?v=2&view=paper: Version 2 original-only mode', await page.$eval('#v2-tr', (e) => e.classList.contains('mode-en')));
    await ctx.close();
  }

  // ---------- responsive: no horizontal scroll, one column below 1024 ----------
  for (const w of WIDTHS) {
    for (const rel of ['paper-3/index.html?v=2', 'paper-3/index.html?v=1', 'paper-3/translation.html?v=2', 'paper-3/translation.html?v=1']) {
      const { page, ctx } = await open(browser, rel, { w, h: w < 500 ? 844 : 900 });
      check(`${rel} at ${w}px: no horizontal scroll`, await noHScroll(page), String(await page.evaluate(() => document.documentElement.scrollWidth)));
      if (rel === 'paper-3/translation.html?v=2' && w < 1024) {
        const n = await page.$eval('#v2-tr .tr-p', (e) => getComputedStyle(e).gridTemplateColumns.split(' ').length);
        check(`translation at ${w}px: one column`, n === 1);
      }
      if (rel === 'paper-3/index.html?v=2' && w === 390) await page.screenshot({ path: path.join(__dirname, 'qa-p3-mobile.png') });
      await ctx.close();
    }
  }

  // ---------- dark mode ----------
  for (const rel of ['paper-3/index.html?v=2', 'paper-3/translation.html?v=2']) {
    const { page, ctx, errors } = await open(browser, rel, { dark: true });
    const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    check(`${rel} dark: theme applied, no errors`, theme === 'dark' && errors.length === 0, `${theme} ${errors.join(' | ')}`);
    await page.screenshot({ path: path.join(__dirname, rel.includes('translation') ? 'qa-p3-translation-dark.png' : 'qa-p3-dark.png') });
    await ctx.close();
  }

  // ---------- redirect stubs ----------
  for (const [rel, want] of [['paper-3/v2/index.html#sec-rehearsal', '/paper-3/index.html?v=2#v2-sec-rehearsal'], ['paper-3/v2/translation.html', '/paper-3/translation.html?v=2']]) {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto(url(rel)); await page.waitForTimeout(600);
    const u = new URL(page.url());
    const w = new URL('file://' + want);
    check(`redirect ${rel}`, u.pathname.endsWith(w.pathname) && u.searchParams.get('v') === '2' && u.hash === w.hash, page.url());
    await ctx.close();
  }

  // ---------- portal and other pages that share common.js, translation.js and the header ----------
  for (const rel of ['index.html', 'paper-1/index.html', 'paper-1/translation.html', 'paper-2/index.html', 'paper-2/translation.html']) {
    const { page, ctx, errors } = await open(browser, rel);
    check(`${rel}: no console errors`, errors.length === 0, errors.slice(0, 3).join(' | '));
    if (rel === 'index.html') {
      const refs = await page.evaluate(() => [...document.querySelectorAll('a[href*="paper-3/"]')].map((a) => a.getAttribute('href')));
      check('portal: Paper III links use the unified pages', refs.length > 0 && refs.every((h) => !/paper-3\/v2\//.test(h)), refs.join(' '));
      await page.click('#p3-tab-v1');
      check('portal: switch to v1 card', await page.$eval('#p3-v1-callout', (e) => getComputedStyle(e).display !== 'none'));
      await page.click('#p3-tab-v2');
      check('portal: switch back to v2 card', await page.$eval('#p3-v2-callout', (e) => getComputedStyle(e).display !== 'none'));
    }
    if (rel.endsWith('translation.html')) {
      await page.click('#dock-btn-next'); await page.waitForTimeout(200);
      check(`${rel}: dock next page works`, await page.$eval('#dock-current-page-text', (e) => /หน้า 2 จาก/.test(e.textContent)));
    }
    await ctx.close();
  }

  await browser.close();
  const pass = results.filter((r) => r.ok).length;
  results.forEach((r) => console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok || !r.detail ? '' : '  -> ' + r.detail}`));
  console.log(`\n${pass}/${results.length} checks passed`);
  fs.writeFileSync(path.join(__dirname, 'qa_web_v2_result.json'), JSON.stringify({ date: new Date().toISOString(), pass, total: results.length, results }, null, 1));
  if (pass !== results.length) process.exitCode = 1;
})();
