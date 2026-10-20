// Browser QA for the course site after adding Paper III.
//
//   NODE_PATH=../../work1/.build/node_modules node qa_web.js
//
// Loads the portal, paper-1, paper-2 and paper-3 over file://, records console errors and
// failed requests, exercises every interactive part of paper-3 (studio, simulator, Q&A,
// quiz, PDF modal, theme toggle, scrollspy), checks every local href/src on paper-3 exists,
// and writes screenshots to .build/qa-shots/.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const SITE = path.resolve(__dirname, '..', '..', '..');
const SHOTS = path.join(__dirname, 'qa-shots');
fs.mkdirSync(SHOTS, { recursive: true });
const url = (rel) => 'file://' + path.join(SITE, rel);
const results = [];
const pdfAborts = [];
const check = (name, ok, detail = '') => { results.push({ name, ok: !!ok, detail }); };

async function openPage(browser, rel, opts = {}) {
  const context = await browser.newContext({ viewport: opts.viewport || { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('requestfailed', (r) => {
    const u = r.url();
    const why = (r.failure() || {}).errorText;
    if (u.startsWith('about:')) return;
    // Headless Chromium has no PDF viewer, so a PDF in an iframe is always aborted. Count it
    // as fine when the file exists on disk; anything else is a real failure.
    if (/\.pdf(#.*)?$/i.test(u) && why === 'net::ERR_ABORTED' && u.startsWith('file://') && fs.existsSync(decodeURIComponent(u.replace('file://', '').split('#')[0]))) {
      pdfAborts.push(u);
      return;
    }
    errors.push('requestfailed: ' + u + ' ' + why);
  });
  await page.goto(url(rel), { waitUntil: 'load' });
  await page.waitForTimeout(400);
  return { context, page, errors };
}

async function main() {
  let browser;
  try { browser = await chromium.launch(); } catch (e) { browser = await chromium.launch({ channel: 'chrome' }); }

  // ── Regression: portal, paper-1, paper-2 ──────────────────────────────────
  for (const rel of ['index.html', 'paper-1/index.html', 'paper-2/index.html']) {
    const { context, page, errors } = await openPage(browser, rel);
    check(`${rel}: no console errors`, errors.length === 0, errors.slice(0, 5).join(' | '));
    if (rel === 'index.html') {
      const status = await page.locator('text=เสร็จสมบูรณ์พร้อมใช้งาน').count();
      check('portal: Paper III shows เสร็จสมบูรณ์พร้อมใช้งาน', status >= 2, `matches=${status}`);
    }
    if (rel === 'paper-2/index.html') {
      await page.locator('.paper-ref-pill').first().click();
      await page.waitForTimeout(300);
      const badge = await page.locator('.pdf-modal-title .badge').innerText();
      check('paper-2: modal badge names Paper II', badge.includes('Paper II'), badge);
      const img = await page.locator('#modal-page-img').getAttribute('src');
      check('paper-2: modal still shows its own pages', /assets\/pages\/page-\d+\.png$/.test(img), img);
      await page.keyboard.press('Escape');
      const nav = await page.locator('site-header a.nav-link', { hasText: 'ห้องซ้อมบท' }).getAttribute('href');
      check('paper-2: header rehearsal link unchanged', nav === '../paper-2/index.html#sec-rehearsal', nav);
    }
    if (rel === 'paper-1/index.html') {
      const nav = await page.locator('site-header a.nav-link', { hasText: 'ห้องซ้อมบท' }).getAttribute('href');
      check('paper-1: header rehearsal link unchanged', nav === '../paper-1/index.html#sec-rehearsal', nav);
    }
    await page.screenshot({ path: path.join(SHOTS, rel.replace(/\//g, '_').replace('.html', '') + '.png') });
    await context.close();
  }

  // ── Paper III ─────────────────────────────────────────────────────────────
  const { context, page, errors } = await openPage(browser, 'paper-3/index.html');
  await page.screenshot({ path: path.join(SHOTS, 'p3-01-top-light.png') });

  // Studio
  const st = await page.evaluate(() => ({ paper: window.presentationStudio && window.presentationStudio.activePaper, total: window.presentationStudio && window.presentationStudio.totalDuration, timer: document.getElementById('studio-timer').innerText, stages: window.presentationStudio && window.presentationStudio.stages.length, script: document.querySelectorAll('#teleprompter-content .script-section').length, concept: document.getElementById('concept-content').innerText.slice(0, 40) }));
  check('studio: omniledger data active', st.paper === 'omniledger' && st.stages === 7 && st.script === 7, JSON.stringify(st));
  check('studio: countdown starts at 05:00', st.total === 300 && st.timer === '05:00', `${st.total} ${st.timer}`);
  check('studio: concept explainer rendered', st.concept.length > 10, st.concept);
  await page.locator('#sec-rehearsal').scrollIntoViewIfNeeded();
  await page.click('#studio-play-btn');
  await page.waitForTimeout(2300);
  const running = await page.evaluate(() => ({ timer: document.getElementById('studio-timer').innerText, pace: document.getElementById('p3-pace-now').innerText, summary: document.getElementById('p3-pace-summary').innerText }));
  check('studio: timer counts down', /^04:5[6-8]$/.test(running.timer), running.timer);
  check('studio: pace panel follows the timer', running.pace.includes('คำที่') && running.summary.includes('821'), `${running.pace} | ${running.summary}`);
  await page.click('#studio-play-btn');
  await page.click('#p3-log-btn');
  const logRows = await page.locator('#p3-rehearsal-log .p3-log-row').count();
  check('studio: rehearsal log records a run', logRows >= 1, `rows=${logRows}`);
  await page.locator('.timeline-segment').nth(4).click();
  await page.waitForTimeout(300);
  const s5 = await page.evaluate(() => ({ src: document.getElementById('slide-real-img').getAttribute('src'), badge: document.getElementById('slide-num-badge').innerText, concept: document.getElementById('concept-content').innerText, timer: document.getElementById('studio-timer').innerText }));
  check('studio: timeline jumps to slide 5', s5.src === 'assets/slides/slide-5.png' && s5.badge === 'สไลด์ 5 / 7' && s5.timer === '02:20', JSON.stringify({ src: s5.src, badge: s5.badge, timer: s5.timer }));
  check('studio: concept card follows slide', s5.concept.includes('Fig. 6'), s5.concept.slice(0, 60));
  await page.click('#slide-next-btn');
  await page.waitForTimeout(200);
  check('studio: next slide button', (await page.getAttribute('#slide-real-img', 'src')) === 'assets/slides/slide-6.png');
  await page.screenshot({ path: path.join(SHOTS, 'p3-02-studio-light.png') });
  await page.click('#studio-reset-btn');
  check('studio: reset returns to 05:00', (await page.innerText('#studio-timer')) === '05:00');

  // Simulator A
  await page.locator('#sec-simulator').scrollIntoViewIfNeeded();
  const a0 = await page.evaluate(() => ({ tiles: document.querySelectorAll('#simA-grid .p3-shard').length, stats: document.getElementById('simA-stats').innerText }));
  check('sim A: default 1,800 validators in 25 shards', a0.tiles === 25 && a0.stats.includes('2.2 × 10'), `tiles=${a0.tiles}`);
  check('sim A: printed Eq. (1) sums to 1', a0.stats.includes('1.000000'));
  await page.click('[data-sima-preset="1800,4,0.01"]');
  const a1 = await page.evaluate(() => ({ tiles: document.querySelectorAll('#simA-grid .p3-shard').length, compact: document.getElementById('simA-grid').classList.contains('compact'), stats: document.getElementById('simA-stats').innerText }));
  check('sim A: [4, 1%] gives 450 shards and 5.9e-4', a1.tiles === 450 && a1.compact && a1.stats.includes('5.9 × 10'), `tiles=${a1.tiles}`);
  await page.click('#simA-mc');
  await page.waitForFunction(() => document.getElementById('simA-mc-out').innerText.includes('epoch ('), null, { timeout: 15000 });
  const mc = await page.innerText('#simA-mc-out');
  const mcPct = parseFloat((mc.match(/\(([\d.]+)%\)/) || [])[1]);
  check('sim A: Monte Carlo for [4, 1%] near 20 to 27 percent', mcPct > 15 && mcPct < 32, mc.slice(0, 120));
  await page.click('[data-sima-preset="1120,70,0.125"]');
  const a2 = await page.innerText('#simA-stats');
  check('sim A: 16 shards x 70 epoch bound 4.6e-5', a2.includes('4.6 × 10'), a2.slice(0, 200));
  await page.screenshot({ path: path.join(SHOTS, 'p3-03-simA-light.png') });

  // Simulator B
  await page.click('.p3-sim-tab[data-pane="simB"]');
  const b0 = await page.innerText('#simB-stats');
  check('sim B: 4 UTXO, 4 shards gives 1.56 and 1.46', b0.includes('1.56 เท่า') && b0.includes('1.46 เท่า'), b0.slice(0, 160));
  await page.evaluate(() => { const r = document.getElementById('simB-u'); r.value = '3'; r.dispatchEvent(new Event('input')); });
  const b1 = await page.innerText('#simB-stats');
  check('sim B: 3 UTXO gives 1.88 and 1.73', b1.includes('1.88 เท่า') && b1.includes('1.73 เท่า'), b1.slice(0, 160));
  check('sim B: printed Eq. (3) does not sum to 1', /ตามที่พิมพ์ \(m − k\)\/m\s*0\.\d+/.test(b1) && !/ตามที่พิมพ์ \(m − k\)\/m\s*1\.0000/.test(b1));
  await page.evaluate(() => { const r = document.getElementById('simB-m'); r.value = '3'; r.dispatchEvent(new Event('input')); });
  const b2 = await page.innerText('#simB-stats');
  check('sim B: 3 UTXO in 3 shards is 11.1% intra-shard', b2.includes('11.1%'), b2.slice(0, 80));
  await page.screenshot({ path: path.join(SHOTS, 'p3-04-simB-light.png') });

  // Simulator C
  await page.click('.p3-sim-tab[data-pane="simC"]');
  for (let i = 0; i < 3; i++) await page.click('#simC-next');
  check('sim C: honest path commits', (await page.innerText('#simC-log')).includes('commit สำเร็จ'));
  await page.check('#simC-double');
  for (let i = 0; i < 3; i++) await page.click('#simC-next');
  const c1 = await page.innerText('#simC-log');
  check('sim C: double spend aborts and restores A', c1.includes('abort') && c1.includes('ปลดล็อก A'));
  await page.uncheck('#simC-double');
  await page.check('#simC-crash');
  for (let i = 0; i < 3; i++) { if (await page.isEnabled('#simC-next')) await page.click('#simC-next'); }
  const rescueEnabled = await page.isEnabled('#simC-rescue');
  await page.click('#simC-rescue');
  check('sim C: crashed client can be rescued by a validator', rescueEnabled && (await page.innerText('#simC-log')).includes('ทำแทน client'));
  await page.screenshot({ path: path.join(SHOTS, 'p3-05-simC-light.png') });

  // Q&A
  await page.locator('#sec-qna').scrollIntoViewIfNeeded();
  const qCount = await page.locator('.qna-card').count();
  await page.locator('.qna-card .qna-question-btn').first().click();
  const qOpen = await page.evaluate(() => { const c = document.querySelector('.qna-card'); return c.classList.contains('open') && getComputedStyle(c.querySelector('.qna-answer-pane')).display !== 'none'; });
  const hiddenBefore = await page.evaluate(() => getComputedStyle(document.querySelectorAll('.qna-card')[1].querySelector('.qna-answer-pane')).display);
  check('Q&A: 15 cards, accordion opens and others stay closed', qCount === 15 && qOpen && hiddenBefore === 'none', `count=${qCount}`);
  await page.click('.btn-filter[data-category="math"]');
  const visibleMath = await page.evaluate(() => [...document.querySelectorAll('.qna-card')].filter((c) => c.style.display !== 'none').length);
  check('Q&A: category filter (math = 2)', visibleMath === 2, `visible=${visibleMath}`);
  await page.click('.btn-filter[data-category="all"]');
  await page.click('#qna-random-btn');
  const opened = await page.locator('.qna-card.open').count();
  check('Q&A: random question opens one card', opened >= 1);
  await page.screenshot({ path: path.join(SHOTS, 'p3-06-qna-light.png') });

  // Quiz
  await page.locator('#sec10').scrollIntoViewIfNeeded();
  await page.locator('.quiz-card[data-quiz-id="1"] .quiz-option[data-correct="true"]').click();
  const fb1 = await page.innerText('.quiz-card[data-quiz-id="1"] .quiz-feedback');
  await page.locator('.quiz-card[data-quiz-id="2"] .quiz-option').first().click();
  const fb2 = await page.innerText('.quiz-card[data-quiz-id="2"] .quiz-feedback');
  check('quiz: correct answer shows explanation', fb1.startsWith('ถูกต้อง') && fb1.includes('⌊n/3⌋'), fb1.slice(0, 60));
  check('quiz: wrong answer marks and explains', fb2.startsWith('ยังไม่ถูกต้อง'), fb2.slice(0, 40));
  const bib = await page.getAttribute('.copy-btn', 'data-copy');
  check('BibTeX: copy button carries the entry', bib && bib.includes('10.1109/SP.2018.000-5') && bib.includes('583--598'));

  // PDF modal
  await page.locator('#sec6 .paper-ref-pill').click();
  await page.waitForTimeout(300);
  const m1 = await page.evaluate(() => ({ open: document.getElementById('pdf-modal-overlay').classList.contains('open'), img: document.getElementById('modal-page-img').getAttribute('src'), badge: document.querySelector('.pdf-modal-title .badge').innerText, items: document.querySelectorAll('.modal-outline-item').length, header: document.querySelector('.modal-outline-header').innerText, iframe: document.getElementById('modal-pdf-iframe').getAttribute('src') }));
  check('modal: opens on page 10 of the OmniLedger PDF', m1.open && m1.img === 'assets/pages/page-10.png' && m1.iframe.includes('Paper_III_1_PRIMARY_OmniLedger_8418625.pdf#page=10'), JSON.stringify(m1));
  check('modal: Paper III badge and 16-page outline', m1.badge.includes('Paper III') && m1.items === 16 && m1.header.includes('16 หน้า'), `${m1.badge} ${m1.items} ${m1.header}`);
  const imgOk = await page.evaluate(() => { const i = document.getElementById('modal-page-img'); return i.complete && i.naturalWidth > 1000; });
  check('modal: page image loads', imgOk);
  await page.keyboard.press('ArrowRight');
  check('modal: arrow key moves to page 11', (await page.getAttribute('#modal-page-img', 'src')) === 'assets/pages/page-11.png');
  await page.screenshot({ path: path.join(SHOTS, 'p3-07-modal-light.png') });
  await page.keyboard.press('Escape');
  check('modal: Escape closes', !(await page.evaluate(() => document.getElementById('pdf-modal-overlay').classList.contains('open'))));

  // Header links on paper-3
  const hdr = await page.evaluate(() => [...document.querySelectorAll('site-header a.nav-link')].map((a) => [a.innerText.trim(), a.getAttribute('href')]));
  const want = { 'ห้องซ้อมบท': '../paper-3/index.html#sec-rehearsal', 'ซิมูเลเตอร์': '../paper-3/index.html#sec-simulator', 'จำลองถาม-ตอบ': '../paper-3/index.html#sec-qna', 'บทเรียน Paper III': '../paper-3/index.html' };
  const hdrOk = Object.entries(want).every(([k, v]) => hdr.some(([t, h]) => t === k && h === v));
  check('header: quick links point to paper-3', hdrOk, JSON.stringify(hdr));

  // Scrollspy
  await page.evaluate(() => window.scrollTo(0, document.getElementById('sec6').offsetTop - 20));
  await page.waitForTimeout(300);
  const active = await page.evaluate(() => (document.querySelector('.sidebar-link.active') || {}).getAttribute && document.querySelector('.sidebar-link.active').getAttribute('href'));
  check('sidebar: scrollspy marks section 6', active === '#sec6', active);

  // Local links and images exist on disk
  const refs = await page.evaluate(() => [...document.querySelectorAll('a[href], img[src], script[src], link[href]')].map((e) => e.getAttribute('href') || e.getAttribute('src')));
  const missing = refs.filter((r) => r && !/^(https?:|#|data:|about:|mailto:)/.test(r)).map((r) => r.split('#')[0]).filter((r, i, arr) => r && arr.indexOf(r) === i)
    .filter((r) => !fs.existsSync(path.resolve(SITE, 'paper-3', decodeURIComponent(r))));
  check('links: every local href/src on paper-3 exists', missing.length === 0, missing.join(', '));

  // Dark theme
  await page.click('site-header .theme-toggle-btn');
  await page.waitForTimeout(200);
  check('theme: toggles to dark', (await page.getAttribute('html', 'data-theme')) === 'dark');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: path.join(SHOTS, 'p3-08-top-dark.png') });
  await page.locator('#sec-rehearsal').scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(SHOTS, 'p3-09-studio-dark.png') });
  await page.locator('#sec-simulator').scrollIntoViewIfNeeded();
  await page.click('.p3-sim-tab[data-pane="simA"]');
  await page.screenshot({ path: path.join(SHOTS, 'p3-10-sim-dark.png') });
  await page.click('site-header .theme-toggle-btn');
  check('theme: toggles back to light', (await page.getAttribute('html', 'data-theme')) === 'light');

  check('paper-3: no console errors or failed requests', errors.length === 0, errors.slice(0, 6).join(' | '));
  await context.close();

  // Phone width
  const phone = await openPage(browser, 'paper-3/index.html', { viewport: { width: 390, height: 844 } });
  const overflow = await phone.page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check('phone: no horizontal page scroll at 390 px', overflow <= 1, `overflow=${overflow}px`);
  await phone.page.screenshot({ path: path.join(SHOTS, 'p3-11-phone.png') });
  check('phone: no console errors', phone.errors.length === 0, phone.errors.slice(0, 3).join(' | '));
  await phone.context.close();

  await browser.close();
  check('PDF iframes point at files that exist (aborted only because headless has no PDF viewer)', pdfAborts.length > 0, `${pdfAborts.length} aborts`);
  const failed = results.filter((r) => !r.ok);
  results.forEach((r) => console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${r.name}${r.ok || !r.detail ? '' : '  ::  ' + r.detail}`));
  console.log(`\n${results.length - failed.length}/${results.length} checks passed. Screenshots in ${SHOTS}`);
  if (failed.length) process.exitCode = 1;
}

main().catch((e) => { console.error(e); process.exit(1); });
