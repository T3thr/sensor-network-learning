/**
 * 305432 เครือข่ายเซนเซอร์ (Sensor Networks)
 * <site-header data-page="..." data-base="../" [data-crumb="custom last label"]>
 *
 * One header for every page of the course site. It renders, from the single CATALOG below:
 *   1. the navigation row (brand, reading-list dropdown, quick links, theme and mobile buttons);
 *   2. the breadcrumb bar (getBreadcrumbs), so pages no longer hard-code <div class="breadcrumb">;
 *   3. a collapse toggle ("หุบแถบ ▲" / "ขยายแถบ ▼") that hides the navigation row to give the paper
 *      more room, remembered in localStorage 'sn_header_collapsed' ('1' or '0').
 * The rendered header height is published as --site-header-offset on <html>, so sticky sidebars
 * and scroll anchors sit exactly below the header in both states.
 *
 * Paper III keeps Version 1 (OmniLedger), Version 2 (Raft-FL) and Version 3 (P2SQL) on the same two
 * pages, switched by paper-3/assets/p3-version.js. The header follows the version on screen through
 * <html data-p3> (set before first paint) and the 'p3:version' event. Paper I has a backup-paper
 * subview (MCSOA) announced by common.js through the 'sn:subview' event.
 */

const SN_HEADER_KEY = 'sn_header_collapsed';

// SVG icons for theme toggle (sun = switch to light, moon = switch to dark)
const THEME_ICON_SUN = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y1="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y1="4.22"></line></svg>';
const THEME_ICON_MOON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

// Canonical chapter maps for the two exam tracks (separated from paper assignments)
const DATACOM_CHAPTERS = [
  { n: 1, file: 'ch01.html', title: 'บทนำและโครงสร้างเครือข่าย', desc: '5 องค์ประกอบ, Duplex, Topologies, Protocols', active: true, soon: false },
  { n: 2, file: 'ch02.html', title: 'Network Models', desc: 'OSI 7 ชั้น, TCP/IP, Encapsulation', active: true, soon: false },
  { n: 3, file: 'ch03.html', title: 'Data and Signals', desc: 'Fourier, Nyquist, Shannon, Impairments', active: true, soon: false },
  { n: 4, file: 'ch04.html', title: 'Digital Transmission', desc: 'Line Coding, Sampling, PCM', active: true, soon: false },
  { n: 5, file: 'ch05.html', title: 'Analog Transmission', desc: 'ASK, FSK, PSK, QAM', active: true, soon: false },
  { n: 6, file: 'ch06.html', title: 'Multiplexing and Spreading', desc: 'FDM, TDM, WDM, Spread Spectrum', active: true, soon: false },
  { n: 7, file: 'ch07.html', title: 'Transmission Media', desc: 'Guided Media, Unguided Radio', active: false, soon: true },
  { n: 8, file: 'ch08.html', title: 'Switching', desc: 'Circuit, Packet, Message Switching', active: false, soon: false },
  { n: 9, file: 'ch09.html', title: 'Telephone and Cable Networks', desc: 'ADSL, Cable Modem', active: false, soon: false },
  { n: 10, file: 'ch10.html', title: 'Error Detection and Correction', desc: 'Parity, CRC, Hamming', active: false, soon: false },
  { n: 11, file: 'ch11.html', title: 'Data Link Control', desc: 'Framing, Flow Control, ARQ', active: false, soon: false },
  { n: 12, file: 'ch12.html', title: 'Multiple Access', desc: 'ALOHA, CSMA/CD, CSMA/CA', active: false, soon: false },
  { n: 13, file: 'ch13.html', title: 'Wired LANs: Ethernet', desc: 'IEEE 802.3, Switching', active: false, soon: false },
  { n: 14, file: 'ch14.html', title: 'Wireless LANs', desc: 'IEEE 802.11, CSMA/CA', active: false, soon: false },
];

// Canonical 305141 IoT course by Dr. Settha Tangkawanit (lecture/iot/305141_Chapter01-06)
const IOT_305141_CHAPTERS = [
  { n: 1, file: 'ch01.html', title: 'Introduction to IoT', desc: 'Components, Architecture, Event-Driven, Power', active: true, soon: false },
  { n: 2, file: 'ch02.html', title: 'IoT System Architectures', desc: 'Sensing, Network, Application Layers', active: false, soon: true },
  { n: 3, file: 'ch03.html', title: 'Basic of Electric Circuit and Electronics for IoT', desc: 'Circuit, Instruments, Sensors, Motors', active: false, soon: false },
  { n: 4, file: 'ch04.html', title: 'Basic of Digital Logic', desc: 'Binary Levels, Combination Logic, Interfacing', active: false, soon: false },
  { n: 5, file: 'ch05.html', title: 'Basic of Back-end and End User Applications', desc: 'Web Service, MQTT, Database, Mobile/Web', active: false, soon: false },
  { n: 6, file: 'ch06.html', title: 'Basic of Arduino Platform', desc: 'ATmega328, Firmware, UNO R3 Specs', active: false, soon: false },
];

// Every page of the site, in reading order. `page` is the <site-header data-page> value;
// Paper III entries also carry the version they show.
const CATALOG = {
  portal: { label: 'หน้าหลัก Portal', href: 'index.html' },
  papers: [
    {
      id: 'paper-1', num: '01', title: 'Paper I: IoT-CAD (ICCAD 2020)', short: 'Paper I: IoT-CAD',
      lesson: { page: 'paper-1', href: 'paper-1/index.html', label: 'บทเรียนและห้องซ้อม' },
      read: { page: 'translation', href: 'paper-1/translation.html', label: 'แปลไทย Compare View (9 หน้า)' },
      sub: { mcsoa: 'Paper I (สำรอง 1): MCSOA (IEEE CACRE 2024)' },
    },
    {
      id: 'paper-2', num: '02', title: 'Paper II: Story Validator (IEEE CoG 2021)', short: 'Paper II: Story Validator',
      lesson: { page: 'paper-2', href: 'paper-2/index.html', label: 'บทเรียนและห้องซ้อม' },
      read: { page: 'translation-2', href: 'paper-2/translation.html', label: 'แปลไทย Compare View (8 หน้า)' },
    },
    {
      id: 'paper-3', num: '03', title: 'Paper III', short: 'Paper III',
      versions: [
        { v: 'v3', num: '03.3', title: 'Version 3: P2SQL (ICSE 2025)', read: 'แปลไทย Compare View (13 หน้า)', note: 'บทความที่ใช้นำเสนอ' },
        { v: 'v2', num: '03.2', title: 'Version 2: Raft-FL (SEAMS 2024)', read: 'แปลไทยคู่ขนาน (12 หน้า)' },
        { v: 'v1', num: '03.1', title: 'Version 1: OmniLedger (IEEE S&amp;P 2018)', read: 'แปลไทย Compare View (16 หน้า)' },
      ],
      lesson: { page: 'paper-3', href: 'paper-3/index.html', label: 'บทเรียนและห้องซ้อม' },
      read: { page: 'translation-3', href: 'paper-3/translation.html' },
    },
    {
      id: 'paper-4', num: '04', title: 'Paper IV: Publish-Time Optimizations (IEEE VIS 2025)', short: 'Paper IV',
      lesson: { page: 'paper-4', href: 'paper-4/index.html', label: 'บทเรียนและห้องซ้อม' },
      read: { page: 'translation-4', href: 'paper-4/translation.html', label: 'แปลไทย Compare View (5 หน้า)' },
    },
  ],
};

const P3_DEFAULT = 'v3';
const vNum = (v) => v.slice(1);

function paperOf(page) {
  return CATALOG.papers.find((p) => (p.lesson && p.lesson.page === page) || (p.read && p.read.page === page)) || null;
}

/**
 * Breadcrumb trail for a page: [{ label, href }], the last item has no href.
 *   getBreadcrumbs('translation-3', '../', null, { version: 'v3' })
 *   -> หน้าหลัก Portal / Paper III / Version 3: P2SQL (ICSE 2025) / แปลไทย Compare View (13 หน้า)
 * customLabel replaces the label of the last item (data-crumb on <site-header>).
 * opts.version (Paper III) and opts.subview (Paper I backup paper) refine the trail.
 */
function getBreadcrumbs(page, base, customLabel, opts = {}) {
  const trail = [{ label: CATALOG.portal.label, href: base + CATALOG.portal.href }];
  const paper = paperOf(page);
  if (paper) {
    const isRead = paper.read && paper.read.page === page;
    if (paper.versions) {
      const ver = paper.versions.find((x) => x.v === opts.version) || paper.versions.find((x) => x.v === P3_DEFAULT);
      trail.push({ label: paper.short, href: `${base}${paper.lesson.href}?v=${vNum(ver.v)}` });
      trail.push({ label: ver.title, href: isRead ? `${base}${paper.lesson.href}?v=${vNum(ver.v)}` : null });
      if (isRead) trail.push({ label: ver.read, href: null });
    } else if (isRead) {
      trail.push({ label: paper.short, href: base + paper.lesson.href });
      trail.push({ label: paper.read.label, href: null });
    } else if (opts.subview && paper.sub && paper.sub[opts.subview]) {
      trail.push({ label: paper.short, href: base + paper.lesson.href });
      trail.push({ label: paper.sub[opts.subview], href: null });
    } else {
      trail.push({ label: paper.title, href: null });
    }
  } else if (page.startsWith('datacom')) {
    trail.push({ label: 'หลักสูตร Data Communications', href: `${base}index.html#sec-dual-track` });
    trail.push({ label: customLabel || page, href: null });
  } else if (page.startsWith('iot')) {
    trail.push({ label: 'Internet of Things · 305141', href: `${base}index.html#sec-dual-track` });
    trail.push({ label: customLabel || page, href: null });
  } else if (page !== 'portal') {
    trail.push({ label: customLabel || page, href: null });
  }
  if (customLabel && trail.length > 1) trail[trail.length - 1].label = customLabel;
  trail[trail.length - 1].href = null;
  return trail;
}

class SiteHeader extends HTMLElement {
  connectedCallback() {
    this.page = this.getAttribute('data-page') || 'portal';
    this.base = this.getAttribute('data-base') || './';
    this.customLabel = this.getAttribute('data-crumb');
    this.isP3 = this.page === 'paper-3' || this.page === 'translation-3';
    this.version = this.isP3 ? (document.documentElement.dataset.p3 || P3_DEFAULT) : null;
    this.subview = this.page === 'paper-1' && new URLSearchParams(location.search).get('paper') === 'mcsoa' ? 'mcsoa' : null;
    this.render();
    this.attachEvents();
    this.applyCollapsed(this.readCollapsed(), false);
    this.syncVersion();
    this.renderCrumbs();
    this.publishOffset();

    if (this.isP3) {
      document.addEventListener('p3:version', (e) => {
        const v = e.detail && e.detail.version;
        if (v === 'v1' || v === 'v2' || v === 'v3') { this.version = v; this.syncVersion(); this.renderCrumbs(); }
      });
    }
    document.addEventListener('sn:subview', (e) => {
      if (this.page !== 'paper-1') return;
      this.subview = e.detail && e.detail.paper === 'mcsoa' ? 'mcsoa' : null;
      this.renderCrumbs();
    });
    window.addEventListener('resize', () => this.publishOffset(), { passive: true });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => this.publishOffset());
  }

  getBreadcrumbs(page, base, customLabel, opts) { return getBreadcrumbs(page, base, customLabel, opts); }

  // ── state ────────────────────────────────────────────────────────────
  readCollapsed() {
    try { return localStorage.getItem(SN_HEADER_KEY) === '1'; } catch (e) { return false; }
  }

  applyCollapsed(on, save = true) {
    const header = this.querySelector('.site-header');
    const btn = this.querySelector('.crumb-toggle');
    header.classList.toggle('is-collapsed', on);
    document.documentElement.classList.toggle('sn-header-collapsed', on);
    btn.setAttribute('aria-expanded', String(!on));
    btn.innerHTML = on
      ? '<span class="crumb-toggle-text">ขยายแถบ</span> <span aria-hidden="true">▼</span>'
      : '<span class="crumb-toggle-text">หุบแถบ</span> <span aria-hidden="true">▲</span>';
    btn.title = on ? 'แสดงแถบเมนูด้านบน' : 'ซ่อนแถบเมนูเพื่อเพิ่มพื้นที่อ่าน';
    if (on) this.closeDrawer();
    if (save) { try { localStorage.setItem(SN_HEADER_KEY, on ? '1' : '0'); } catch (e) { /* storage unavailable */ } }
    this.publishOffset();
  }

  publishOffset() {
    const header = this.querySelector('.site-header');
    if (!header) return;
    const set = () => document.documentElement.style.setProperty('--site-header-offset', `${Math.round(header.getBoundingClientRect().height)}px`);
    set();
    requestAnimationFrame(set); // again after layout settles (web fonts, wrapping)
  }

  // ── rendering ────────────────────────────────────────────────────────
  renderCrumbs() {
    const trail = getBreadcrumbs(this.page, this.base, this.customLabel, { version: this.version, subview: this.subview });
    const ol = this.querySelector('.crumb-list');
    ol.innerHTML = trail.map((c) => (c.href
      ? `<li><a href="${c.href}">${c.label}</a></li>`
      : `<li aria-current="page"><span>${c.label}</span></li>`)).join('');
  }

  // Quick links, labels and active states that depend on the Paper III version on screen.
  syncVersion() {
    const v = this.version;
    if (this.isP3) {
      this.querySelectorAll('[data-p3-link]').forEach((a) => {
        const [file, hash] = a.dataset.p3Link.split('#');
        a.href = `${this.base}paper-3/${file}?v=${vNum(v)}${hash ? '#' + hash : ''}`;
      });
      const ver = CATALOG.papers.find((p) => p.id === 'paper-3').versions.find((x) => x.v === v);
      this.querySelectorAll('[data-p3-read-label]').forEach((el) => { el.textContent = `แปลเปเปอร์ ${v} (${ver.read.match(/\d+/)[0]} หน้า)`; });
    }
    this.querySelectorAll('[data-item]').forEach((a) => {
      const [pg, ver] = a.dataset.item.split('@');
      a.classList.toggle('active', pg === this.page && (!ver || ver === v));
      if (a.classList.contains('active')) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
  }

  catalogLinks(cls) {
    const b = this.base;
    const out = [];
    CATALOG.papers.forEach((p) => {
      if (p.versions) {
        p.versions.forEach((ver) => {
          out.push(`<a href="${b}${p.lesson.href}?v=${vNum(ver.v)}" class="${cls}" data-item="${p.lesson.page}@${ver.v}"><span class="ch-num">${ver.num}</span> ${p.short} ${ver.title}${ver.note ? ` <span class="item-note">${ver.note}</span>` : ''}</a>`);
          out.push(`<a href="${b}${p.read.href}?v=${vNum(ver.v)}" class="${cls} is-sub" data-item="${p.read.page}@${ver.v}"><span class="ch-num"></span> ${ver.read}</a>`);
        });
      } else {
        out.push(`<a href="${b}${p.lesson.href}" class="${cls}" data-item="${p.lesson.page}"><span class="ch-num">${p.num}</span> ${p.title}</a>`);
        if (p.read) out.push(`<a href="${b}${p.read.href}" class="${cls} is-sub" data-item="${p.read.page}"><span class="ch-num"></span> ${p.read.label}</a>`);
      }
    });
    return out.join('\n');
  }

  chapterItemsHtml(chapters, hrefBase, theme, pagePrefix) {
    return chapters.map((c) => {
      const href = `${hrefBase}${c.file}`;
      let badge = '';
      if (c.active) {
        badge = theme === 'purple'
          ? '<span class="mega-badge badge-purple">Active</span>'
          : '<span class="mega-badge">Active</span>';
      } else if (c.soon) {
        badge = '<span class="mega-badge badge-amber">พร้อมเปิดตัว</span>';
      }
      const itemCls = theme === 'purple' ? 'mega-item item-purple' : 'mega-item';
      const pageId = `${pagePrefix}${String(c.n).padStart(2, '0')}`;
      return `<a href="${href}" class="${itemCls}" data-item="${pageId}">
        <div class="mega-item-title">Ch ${c.n}: ${c.title} ${badge}</div>
        <div class="mega-item-desc">${c.desc}</div>
      </a>`;
    }).join('\n');
  }

  render() {
    const { page, base } = this;
    const paper = paperOf(page) || CATALOG.papers[0];
    const ctx = page === 'portal' ? CATALOG.papers[0] : paper;
    const p3 = this.isP3;
    const inPaperList = ['paper-1', 'paper-2', 'paper-3', 'paper-4', 'translation', 'translation-2', 'translation-3', 'translation-4'].includes(page);
    const onDatacom = page.startsWith('datacom');
    const onIot = page.startsWith('iot');
    const theme = document.documentElement.getAttribute('data-theme') || 'light';
    const themeIcon = theme === 'dark' ? THEME_ICON_SUN : THEME_ICON_MOON;
    const themeLabel = theme === 'dark' ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด';

    const datacomItems = this.chapterItemsHtml(DATACOM_CHAPTERS, `${base}datacom/`, 'accent', 'datacom-ch');
    const iotItems = this.chapterItemsHtml(IOT_305141_CHAPTERS, `${base}iot/`, 'purple', 'iot-ch');

    this.innerHTML = `
      <header class="site-header">
        <div class="site-header-wrapper">
          <a href="${base}index.html" class="nav-brand" title="305432 เครือข่ายเซนเซอร์ (Sensor Networks)">
            <span class="brand-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                <circle cx="12" cy="20" r="1.5" fill="currentColor"></circle>
              </svg>
            </span>
            <span class="brand-badge">305432</span>
            <span class="brand-title">Sensor Networks</span>
          </a>

          <nav class="site-navbar-nav" aria-label="เมนูหลัก">
            <ul class="nav-menu">
              <li class="nav-item dropdown-parent">
                <a href="#" class="nav-link ${onDatacom || onIot ? 'active' : ''}" onclick="event.preventDefault();">เลือกเรียนหลักสูตร ▾</a>
                <div class="dropdown-menu mega-menu mega-menu-split">
                  <div class="mega-col">
                    <div class="mega-col-title">การสื่อสารข้อมูล (Data Communications · Forouzan 14 บท)</div>
                    <div class="mega-notice">Track 1 · Ch 1-3 พร้อมเรียน · Ch 4-6 พร้อมเปิดตัว</div>
                    ${datacomItems}
                  </div>
                  <div class="mega-col">
                    <div class="mega-col-title col-purple">อินเทอร์เน็ตของสรรพสิ่ง (Internet of Things · 305141 อ.ตั้ม 6 บท)</div>
                    <div class="mega-notice">Track 2 · บทที่ 1 พร้อมเรียน · อิงสไลด์ lecture/iot</div>
                    ${iotItems}
                  </div>
                </div>
              </li>
              <li class="nav-item dropdown-parent">
                <a href="#" class="nav-link ${inPaperList ? 'active' : ''}" onclick="event.preventDefault();">งานมอบหมายค้นคว้า IEEE (Assignments) ▾</a>
                <div class="dropdown-menu mega-menu">
                  <div class="mega-col">
                    <div class="mega-col-title col-purple">งานมอบหมายค้นคว้า IEEE (Assignments)</div>
                    <div class="mega-notice">งานซ้อมนำเสนอ 5 นาที ไม่ใช่เนื้อหาเตรียมสอบ</div>
                    <a href="${base}paper-1/index.html" class="mega-item item-purple">
                      <div class="mega-item-title">Paper I: IoT-CAD (ICCAD 2020)</div>
                      <div class="mega-item-desc">Context-Aware Anomaly Detection</div>
                    </a>
                    <a href="${base}paper-2/index.html" class="mega-item item-purple">
                      <div class="mega-item-title">Paper II: Story Validator (CoG 2021)</div>
                      <div class="mega-item-desc">Interactive Narrative Validation</div>
                    </a>
                    <a href="${base}paper-3/index.html?v=2" class="mega-item item-purple">
                      <div class="mega-item-title">Paper III: Raft-FL (SEAMS 2024)</div>
                      <div class="mega-item-desc">บทความที่ใช้นำเสนอจริง</div>
                    </a>
                    <a href="${base}paper-4/index.html" class="mega-item item-purple">
                      <div class="mega-item-title">Paper IV: Mosaic Publisher (VIS 2025)</div>
                      <div class="mega-item-desc">Publish-Time Optimizations</div>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </nav>

          <div class="nav-actions">
            <button class="theme-toggle-btn" type="button" aria-label="${themeLabel}" title="${themeLabel}">${themeIcon}</button>
            <button class="nav-mobile-toggle" type="button" aria-label="เปิดเมนู" aria-expanded="false" aria-controls="mobile-nav-drawer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
            </button>
          </div>
        </div>

        <div class="crumb-bar">
          <div class="crumb-bar-inner">
            <nav aria-label="ตำแหน่งปัจจุบัน"><ol class="crumb-list"></ol></nav>
            <button type="button" class="crumb-toggle" aria-expanded="true"></button>
          </div>
        </div>

        <div class="mobile-nav-drawer" id="mobile-nav-drawer">
          <div class="mobile-nav-group">
            <div class="mobile-nav-title">การสื่อสารข้อมูล (Data Communications · 14 บท)</div>
            ${DATACOM_CHAPTERS.map((c) => `<a href="${base}datacom/${c.file}" class="mobile-nav-link ${page === `datacom-ch${String(c.n).padStart(2, '0')}` ? 'active' : ''}">Ch ${c.n}: ${c.title}${c.active ? ' (Active)' : ''}${c.soon ? ' (พร้อมเปิดตัว)' : ''}</a>`).join('\n')}
          </div>
          <div class="mobile-nav-group">
            <div class="mobile-nav-title">อินเทอร์เน็ตของสรรพสิ่ง (IoT 305141 · 6 บท)</div>
            ${IOT_305141_CHAPTERS.map((c) => `<a href="${base}iot/${c.file}" class="mobile-nav-link ${page === `iot-ch${String(c.n).padStart(2, '0')}` ? 'active' : ''}">Ch ${c.n}: ${c.title}${c.active ? ' (Active)' : ''}${c.soon ? ' (พร้อมเปิดตัว)' : ''}</a>`).join('\n')}
          </div>
          <div class="mobile-nav-group">
            <div class="mobile-nav-title">งานมอบหมายค้นคว้า IEEE (Assignments)</div>
            <div class="mega-notice" style="margin-bottom:8px;">งานซ้อมนำเสนอ 5 นาที ไม่ใช่เนื้อหาเตรียมสอบ</div>
            <a href="${base}paper-1/index.html" class="mobile-nav-link">Paper I: IoT-CAD</a>
            <a href="${base}paper-2/index.html" class="mobile-nav-link">Paper II: Story Validator</a>
            <a href="${base}paper-3/index.html?v=2" class="mobile-nav-link">Paper III: Raft-FL</a>
            <a href="${base}paper-4/index.html" class="mobile-nav-link">Paper IV: Mosaic Publisher</a>
          </div>
        </div>
      </header>
    `;
  }

  // ── events ───────────────────────────────────────────────────────────
  closeDrawer() {
    const drawer = this.querySelector('.mobile-nav-drawer');
    const btn = this.querySelector('.nav-mobile-toggle');
    if (!drawer || !drawer.classList.contains('open')) return;
    drawer.classList.remove('open');
    btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>';
    btn.setAttribute('aria-expanded', 'false');
  }

  attachEvents() {
    const toggleBtn = this.querySelector('.nav-mobile-toggle');
    const drawer = this.querySelector('.mobile-nav-drawer');
    toggleBtn.dataset.bound = 'true'; // common.js initNavbar() skips buttons that are already bound
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = !drawer.classList.contains('open');
      drawer.classList.toggle('open', open);
      toggleBtn.innerHTML = open
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>';
      toggleBtn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', (e) => {
      if (drawer.classList.contains('open') && !drawer.contains(e.target) && e.target !== toggleBtn) this.closeDrawer();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.closeDrawer(); });

    this.querySelector('.crumb-toggle').addEventListener('click', () => {
      this.applyCollapsed(!this.querySelector('.site-header').classList.contains('is-collapsed'));
    });

    // Theme toggle: always show sun/moon SVG and switch data-theme for real
    const themeBtn = this.querySelector('.theme-toggle-btn');
    if (themeBtn) {
      const paintThemeBtn = (theme) => {
        const dark = theme === 'dark';
        themeBtn.innerHTML = dark ? THEME_ICON_SUN : THEME_ICON_MOON;
        const label = dark ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด';
        themeBtn.setAttribute('aria-label', label);
        themeBtn.setAttribute('title', label);
      };
      paintThemeBtn(document.documentElement.getAttribute('data-theme') || 'light');
      themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem('sn_theme', next); } catch (e) { /* storage unavailable */ }
        paintThemeBtn(next);
        if (typeof updateThemeButton === 'function') updateThemeButton(next);
      });
    }
  }
}

window.SNHeader = { CATALOG, getBreadcrumbs };

if (!customElements.get('site-header')) {
  customElements.define('site-header', SiteHeader);
}
