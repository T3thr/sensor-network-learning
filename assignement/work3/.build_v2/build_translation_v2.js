// Render the Version 2 panel of paper-3/translation.html (parallel English-Thai reading view of
// Dautov and Husom, SEAMS 2024, IEEE Doc ID: 10556381) from translation_v2.js.
//
//   node build_translation_v2.js      (same as node build_paper3_pages.js: rebuilds both Paper III pages)
//
// Every paragraph, list item, heading, caption, footnote and the table of the paper sits next to its
// Thai translation, page by page (pp. 110-121). Blocks of kind 'analysis' are the translator's reading
// of a table or figure; they are Thai only and labelled as additions that are not in the original.
// Styles: paper-3/assets/v2/css/translation-v2.css. Reading modes: paper-3/assets/v2/js/translation-v2.js.
const blocks = require('./translation_v2');
const { references, endNote } = require('./translation_v2');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const thai = (s) => esc(s).replace(/\(หมายเหตุผู้แปล: ([^)]*)\)/g, '<span class="tr-note">หมายเหตุผู้แปล: $1</span>');
const link = (s) => esc(s).replace(/(https?:\/\/[^\s)]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
const asset = (p) => p.replace(/^assets\//, 'assets/v2/');
const FIRST_PAGE = 110;
const PDF_PAGES = 12;

const PAGE_TOPICS = {
  110: 'ชื่อเรื่อง บทคัดย่อ และบทนำ',
  111: 'บทนำ (ต่อ) และพื้นฐาน Federated Learning',
  112: 'งานที่เกี่ยวข้อง: FL แบบกระจายศูนย์และ DLT',
  113: 'แนวทางที่นำเสนอ: ฉันทามติและ Raft',
  114: 'ระดับการทำสำเนาสถานะ (ตารางที่ 1)',
  115: 'สถาปัตยกรรมและ checkpoint (ภาพที่ 1)',
  116: 'ต้นแบบ: Flower และ PySyncObj',
  117: 'การทดลองและแผนภาพลำดับ (ภาพที่ 2)',
  118: 'ผลการทดลอง (ภาพที่ 3 และ 4) และข้อจำกัด',
  119: 'ข้อจำกัด (ต่อ) บทสรุป และงานในอนาคต',
};

function renderPanel() {
  const sections = blocks.filter((b) => b.kind === 'h2');
  const rows = [];
  const pageIds = [];
  let lastPage = 0;
  for (const b of blocks) {
    if (b.page !== lastPage) {
      lastPage = b.page;
      const pdf = b.page - FIRST_PAGE + 1;
      pageIds.push({ id: `v2-page-${b.page}`, label: `หน้า ${b.page}: ${PAGE_TOPICS[b.page] || ''}` });
      rows.push(`<div class="tr-page" id="v2-page-${b.page}"><span>หน้า ${b.page}</span><span class="tr-page-sub">PDF หน้า ${pdf} จาก ${PDF_PAGES} · ${esc(PAGE_TOPICS[b.page] || '')}</span><a href="assets/v2/pages/page-${pdf}.png" target="_blank" rel="noopener">ดูภาพหน้าต้นฉบับ</a></div>`);
    }
    const id = b.id ? ` id="v2-${b.id}"` : '';
    if (b.kind === 'h1' || b.kind === 'h2' || b.kind === 'h3') {
      const tag = b.kind === 'h3' ? 'h3' : 'h2';
      rows.push(`<div class="tr-row tr-${b.kind}"${id}><div class="tr-en" lang="en"><${tag}>${esc(b.en)}</${tag}></div><div class="tr-th"><${tag}>${esc(b.th)}</${tag}></div></div>`);
    } else if (b.kind === 'fig') {
      rows.push(`<div class="tr-fig"><figure class="v2-figure"><img src="${asset(b.img)}" alt="${esc(b.en.split('.').slice(0, 2).join('.'))}" loading="lazy"></figure>
      <div class="tr-row tr-cap"><div class="tr-en" lang="en">${esc(b.en)}</div><div class="tr-th">${thai(b.th)}</div></div></div>`);
    } else if (b.kind === 'table') {
      rows.push(`<div class="tr-table"><div class="tr-row tr-cap"><div class="tr-en" lang="en"><strong>${esc(b.en)}</strong></div><div class="tr-th"><strong>${esc(b.th)}</strong></div></div>
      <div class="table-responsive"><table class="academic-table"><thead><tr><th>Level</th><th>State replication</th><th class="c-en">Description</th><th class="c-th">คำอธิบาย</th></tr></thead><tbody>
      ${b.rows.map((r) => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td class="c-en" lang="en">${esc(r[2])}</td><td class="c-th">${esc(r[3])}</td></tr>`).join('')}
      </tbody></table></div></div>`);
    } else if (b.kind === 'analysis') {
      rows.push(`<div class="tr-analysis"><div class="tr-analysis-head"><span class="tr-analysis-title">${esc(b.title)}</span><span class="tr-analysis-tag">ส่วนเสริมของผู้แปล (ไม่อยู่ในต้นฉบับ)</span></div><p>${esc(b.th)}</p></div>`);
    } else {
      rows.push(`<div class="tr-row tr-${b.kind}"${id}><div class="tr-en" lang="en">${link(b.en)}</div><div class="tr-th">${thai(b.th)}</div></div>`);
    }
  }
  pageIds.push({ id: 'v2-page-120', label: 'หน้า 120 ถึง 121: เอกสารอ้างอิง 35 รายการ' });

  const refsHtml = `<div class="tr-page" id="v2-page-120"><span>หน้า 120 ถึง 121</span><span class="tr-page-sub">PDF หน้า 11 ถึง 12 จาก ${PDF_PAGES} · เอกสารอ้างอิง</span><a href="assets/v2/pages/page-11.png" target="_blank" rel="noopener">ดูภาพหน้าต้นฉบับ</a></div>
      <div class="tr-row tr-h2" id="v2-refs"><div class="tr-en" lang="en"><h2>References</h2></div><div class="tr-th"><h2>เอกสารอ้างอิง</h2><p class="tr-note">คงรายการอ้างอิงเป็นภาษาอังกฤษตามต้นฉบับ เพื่อให้ค้นหาเอกสารได้ถูกต้อง</p></div></div>
      <ol class="tr-refs" lang="en">${references.map((r) => `<li>${link(r)}</li>`).join('')}</ol>
      <div class="tr-row tr-fn"><div class="tr-en" lang="en">${esc(endNote.en)}</div><div class="tr-th"><span class="tr-note">หมายเหตุผู้แปล: ${esc(endNote.th)}</span></div></div>`;

  const nav = [
    ...sections.map((s) => `<li><a href="#v2-${s.id}" class="sidebar-link">${esc(s.th)}</a></li>`),
    '<li><a href="#v2-refs" class="sidebar-link">เอกสารอ้างอิง</a></li>',
  ].join('\n          ');
  const count = (k) => blocks.filter((b) => b.kind === k).length;

  return `<div class="chapter-container tr2 mode-both" id="v2-tr">
      <aside class="chapter-sidebar">
        <div class="sidebar-header">
          <div class="sidebar-header-top"><span class="sidebar-title-text">สารบัญบทความ</span><span class="sidebar-badge-pill" style="background: var(--accent); color: #FFFFFF;">12 หน้า</span></div>
          <div class="sidebar-live-pin"><span class="pin-pulse"></span><span class="pin-label">IEEE Doc ID: 10556381</span></div>
        </div>
        <ul class="sidebar-nav">
          ${nav}
        </ul>
        <div class="sidebar-actions">
          <a href="index.html?v=2" class="sidebar-action-card"><span class="action-icon" style="font-size: 0.72rem; font-weight: 800;">v2</span><div class="action-text"><div class="action-title">กลับหน้าบทเรียน Version 2</div><div class="action-desc">ซิมูเลเตอร์ ห้องซ้อม และ Q&amp;A</div></div><span class="action-arrow">&rarr;</span></a>
          <a href="?v=1" class="sidebar-action-card" data-p3-switch="v1"><span class="action-icon" style="font-size: 0.72rem; font-weight: 800;">v1</span><div class="action-text"><div class="action-title">บทแปล Version 1 (OmniLedger)</div><div class="action-desc">Compare View 16 หน้า</div></div><span class="action-arrow">&rarr;</span></a>
          <a href="../assignement/work3/01_original_v2/Paper_III_2_PRIMARY_RaftFL_10556381.pdf" target="_blank" rel="noopener" class="sidebar-action-card"><span class="action-icon" style="font-size: 0.72rem; font-weight: 800;">PDF</span><div class="action-text"><div class="action-title">เปิด PDF ต้นฉบับ</div><div class="action-desc">Open Access จาก IEEE Xplore</div></div><span class="action-arrow">&rarr;</span></a>
        </div>
      </aside>
      <main class="chapter-main">
        <h1 class="book-title">Raft Protocol for Fault Tolerance and Self-Recovery in Federated Learning</h1>
        <div class="subtitle">การใช้โปรโตคอล Raft เพื่อความทนทานต่อความผิดพลาดและการกู้คืนตนเองในการเรียนรู้แบบสหพันธ์ · Rustem Dautov, Erik Johannes Husom (SINTEF Digital) · SEAMS 2024 หน้า 110-121 · IEEE Doc ID: 10556381 · DOI: 10.1145/3643915.3644093</div>
        <div class="tr-intro"><strong>สิทธิ์และที่มา:</strong> ต้นฉบับเผยแพร่ภายใต้ Creative Commons Attribution 4.0 (CC BY 4.0) หน้านี้แสดงข้อความภาษาอังกฤษตามต้นฉบับคู่กับคำแปลภาษาไทยของนายธีรภัทร์ ภู่ระยา ทีละย่อหน้า ครบทั้ง 12 หน้า รายการอ้างอิงคงเป็นภาษาอังกฤษ ข้อความที่ขึ้นต้นว่า "หมายเหตุผู้แปล" และกล่อง "บทวิเคราะห์" ไม่อยู่ในต้นฉบับ แต่เพิ่มเพื่ออธิบายตาราง ภาพ และจุดที่ตัวเลขหรือถ้อยคำในต้นฉบับควรอ่านอย่างระมัดระวัง</div>
        <div class="tr-controls">
          <div class="tr-mode-group" role="group" aria-label="โหมดการอ่าน">
            <button type="button" class="tr-mode active" data-tr-mode="both" aria-pressed="true">Compare View (อังกฤษ | ไทย)</button>
            <button type="button" class="tr-mode" data-tr-mode="th" aria-pressed="false">ภาษาไทยอย่างเดียว</button>
            <button type="button" class="tr-mode" data-tr-mode="en" aria-pressed="false">ต้นฉบับอย่างเดียว</button>
          </div>
          <label class="tr-jump">ไปที่หน้า
            <select id="v2-tr-jump">
              ${pageIds.map((p) => `<option value="${p.id}">${esc(p.label)}</option>`).join('\n              ')}
            </select>
          </label>
        </div>
        <p class="tr-stats">${count('p') + count('li')} ย่อหน้าและรายการ · ${count('h2') + count('h3')} หัวข้อ · ${count('fig')} ภาพ · ${count('table')} ตาราง · ${count('fn')} เชิงอรรถ · ${count('analysis')} บทวิเคราะห์ตารางและภาพ · ${references.length} รายการอ้างอิง</p>
        <div class="tr-colhead" aria-hidden="true"><span>ต้นฉบับ (English)</span><span>คำแปลภาษาไทย</span></div>
        ${rows.join('\n        ')}
        ${refsHtml}
        <footer class="page-footer" style="margin-top: 40px;">Dautov and Husom, SEAMS 2024 (CC BY 4.0) · คำแปลภาษาไทยสำหรับรายวิชา 305432 เครือข่ายเซนเซอร์ · Assignment Paper 3 Version 2</footer>
      </main>
    </div>`;
}

module.exports = { renderPanel };

if (require.main === module) require('./build_paper3_pages').main();
