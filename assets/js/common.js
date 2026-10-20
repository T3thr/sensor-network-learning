/**
 * 305432 เครือข่ายเซนเซอร์ (Sensor Networks)
 * Common JavaScript Helpers, Theme Management, Navigation & UI Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initPaperSelector();
  initScrollSpy();
  initAccordions();
  initTabs();
  initQuizzes();
  initCopyButtons();
  initPdfViewerModal();
});

// ═══════════ PDF Viewer Modal Controller (IoT-CAD & MCSOA) ═══════════
const PAPER_PAGE_METADATA = {
  1: {
    section: "Section I: Introduction & Motivating Scenario (หน้า 1)",
    purpose: "🎯 ใช้สำหรับสไลด์ที่ 1 (0:00–0:45) ทำความเข้าใจโจทย์ไฟไหม้จริง vs เซนเซอร์ชำรุด (Fig. 1) และคำถามวิจัยหลัก"
  },
  2: {
    section: "Section II: System Overview & Threat Model (หน้า 2)",
    purpose: "🎯 ใช้สำหรับสไลด์ที่ 2 (0:45–1:35) แผนภาพรวม Fig. 2 แสดงกระบวนการตั้งแต่ Edge, Fog สู่ Cloud และขอบเขตการโจมตี"
  },
  3: {
    section: "Section III: Sensor Association & Binary Fingerprint (หน้า 3)",
    purpose: "🎯 ใช้สำหรับสไลด์ที่ 3 (1:35–2:55) สูตรสมการที่ (1) การแปลงข้อมูลดิบเป็น Binary Fingerprint และการคลัสเตอร์ด้วย Hamming Distance"
  },
  4: {
    section: "Section IV-A: Predictive Model ด้วย LSTM Encoder-Decoder (หน้า 4)",
    purpose: "🎯 ใช้สำหรับสไลด์ที่ 3 โครงสร้างโครงข่ายประสาทเทียม LSTM (Fig. 3) ประจำแต่ละคลัสเตอร์เพื่อสร้าง Reconstruction Error"
  },
  5: {
    section: "Section IV-B & IV-C: Multivariate Gaussian & Consensus Algorithm (หน้า 5)",
    purpose: "🎯 หัวใจหลักของการตัดสิน EA vs SDA และการตั้งค่าขีดเริ่มเปลี่ยน α พร้อมอัลกอริทึมฉันทามติ 3 ต่อ 1"
  },
  6: {
    section: "Section V: Adaptive Updating (Partial vs Complete Update) (หน้า 6)",
    purpose: "🎯 อธิบายการปรับตัวแบบ Adaptive เมื่อได้รับข้อมูลใหม่ หรือเมื่อเพิ่ม/ลดเซนเซอร์ในเครือข่าย"
  },
  7: {
    section: "Section VI-A: Experimental Setup & 62-Sensor Testbed (หน้า 7)",
    purpose: "🎯 ใช้สำหรับสไลด์ที่ 4 (2:55–4:05) รายละเอียดฮาร์ดแวร์จริง: 62 เซนเซอร์, 13 มิติ, TinyOS, IEEE 802.15.4, USRP-B210, Fog Laptop"
  },
  8: {
    section: "Section VI-B: ผลการทดลอง Table 2 & Timing Table 3 (หน้า 8)",
    purpose: "🎯 ใช้สำหรับสไลด์ที่ 4 และตอบคำถามอาจารย์: ถอดรหัส Precision 92%, Recall 56%, และเวลาประมวลผล 0.532 วินาที"
  },
  9: {
    section: "Section VII: Conclusion & Limitations (หน้า 9)",
    purpose: "🎯 ใช้สำหรับสไลด์ที่ 5 (4:05–5:00) สรุปคุณค่าของงานวิจัย ข้อจำกัด และเอกสารอ้างอิง 25 รายการ"
  }
};

const PAPER_PAGE_METADATA_MCSOA = {
  1: {
    section: "Section I: Introduction & Background in Power IoT (หน้า 1)",
    purpose: "🎯 ที่มาของงานวิจัย Power System WSNs (PSWSNs) และปัญหา Energy Hole ในระบบสายส่งไฟฟ้าแรงสูง"
  },
  2: {
    section: "Section II: Mathematical Model & 3 Objective Functions (หน้า 2)",
    purpose: "🎯 แบบจำลองพลังงาน (Eq. 1-3) และฟังก์ชัน 3 วัตถุประสงค์: Transmission Loss, Load Balance, Reliability (Eq. 4-6)"
  },
  3: {
    section: "Section II-H & III: Composite Fitness & MCSOA Algorithm (หน้า 3)",
    purpose: "🎯 สมการ Fitness ถ่วงน้ำหนัก (Eq. 11), Tent Chaotic Map, Migration Phase และ Attacking Phase แบบ Spiral"
  },
  4: {
    section: "Section IV: Simulation Setup & Node Lifespan Analysis (หน้า 4)",
    purpose: "🎯 ผลการทดลองบน Intel Core i7-10700K 3.8GHz เปรียบเทียบโหนด 50, 100, 150, 200 โหนดกับ GA และ PSO (Fig. 1 & 2)"
  },
  5: {
    section: "Section IV-C & V: Packet Delivery & Academic Conclusions (หน้า 5)",
    purpose: "🎯 ผลการส่งแพ็กเก็ตถึงสถานีฐาน (Fig. 3 เพิ่มขึ้น 15.3%), การวิเคราะห์ข้อจำกัด และบทสรุปสำหรับงาน Power IoT"
  }
};

const PAPER_PAGE_METADATA_STORY_VALIDATOR = {
  1: {
    section: "Section I: Abstract & Introduction (หน้า 1)",
    purpose: "🎯 ใช้สำหรับสไลด์ที่ 1 และ 2 (0:00–1:30) ปัญหา Authorial Intent vs Player Agency และการแตกกิ่งแบบ State Explosion"
  },
  2: {
    section: "Section II: Related Work & Narrative Tools (หน้า 2)",
    purpose: "🎯 ใช้สำหรับสไลด์ที่ 2 ข้อจำกัดของเครื่องมือแต่งบท Twine / Ink / Ren'Py และช่องว่างงานวิจัย"
  },
  3: {
    section: "Section III: Story Validator Architecture (หน้า 3)",
    purpose: "🎯 ใช้สำหรับสไลด์ที่ 3 (1:35–2:30) แผนภาพสถาปัตยกรรม 4 ขั้นตอน: Extraction, Graph Model, DFS, Visual Feedback"
  },
  4: {
    section: "Section III.D: Story Quality Metrics 5 มิติ (หน้า 4)",
    purpose: "🎯 ใช้สำหรับสไลด์ที่ 4 (2:30–3:30) นิยามเชิงคณิตศาสตร์ Stroke Points, Dead-ends, Lost Plot, Variable Timelines"
  },
  5: {
    section: "Section IV: Visual Feedback GUI & Dotted Chart (หน้า 5)",
    purpose: "🎯 แสดงแผนผังต้นไม้ Interactive Tree View, Lost Plot Filter, Dotted Chart และ Persona Simulation"
  },
  6: {
    section: "Section V: Evaluation Setup & The Murder Case (หน้า 6)",
    purpose: "🎯 ใช้สำหรับสไลด์ที่ 5 (3:30–4:40) เรื่องทดสอบ The Murder Case 14 Passages, 20 Paths, 3 Endings และบั๊กฝัง 5 จุด"
  },
  7: {
    section: "Section V.E: Results, Timing & Usability SUS 92.4 (หน้า 7)",
    purpose: "🎯 ตัวเลขสถิติเด็ด: เวลาตรวจพบบั๊ก 52.3 s, เวลาคิดวิธีแก้ 146.2 s, ความพึงพอใจ SUS 92.4 เกรด Truly Superior A+"
  },
  8: {
    section: "Section VI & VII: Discussion, Limitations & References (หน้า 8)",
    purpose: "🎯 ใช้สำหรับสไลด์ที่ 6 และ 7 (4:40–6:15) วิจารณ์เชิงวิชาการ ข้อจำกัด ขาด Control Group และการประยุกต์ใช้ใน Game Engine"
  }
};

const PAPER_PAGE_METADATA_OMNILEDGER = {
  1: { section: "Abstract, Section I: Introduction, Fig. 1 (หน้า 583)", purpose: "สไลด์ที่ 1 และ 2: ข้อแลกเปลี่ยนสามด้าน (Fig. 1) และความท้าทาย 3 ข้อ" },
  2: { section: "Contributions และ Section II: Background (หน้า 584)", purpose: "ByzCoin, UTXO model, RandHound, VRF, Sybil-resistant identities" },
  3: { section: "Section II-E Elastico และ Section III: System Overview (หน้า 585)", purpose: "สไลด์ที่ 2: threat model ผู้โจมตีไม่เกิน 25%, เป้าหมาย 6 ข้อ, SLedger" },
  4: { section: "Fig. 2 สถาปัตยกรรม และ Section IV-A: Sharding (หน้า 586)", purpose: "สไลด์ที่ 3: สถาปัตยกรรมหนึ่ง epoch และเหตุผลที่ต้องใช้ค่าสุ่มที่บิดเบือนไม่ได้" },
  5: { section: "VRF leader election, Section IV-B และ IV-C (หน้า 587)", purpose: "สไลด์ที่ 3: ticket จาก VRF, การสลับ validator ชุดละ k = log(n/m), ปัญหาธุรกรรมข้าม shard" },
  6: { section: "Atomix protocol และ Fig. 3 (หน้า 588)", purpose: "สไลด์ที่ 3 และ 6: Initialize, Lock, Unlock to Commit หรือ Abort พร้อมข้อโต้แย้งด้านความปลอดภัย" },
  7: { section: "Size of unlock transactions, Section V-A ถึง V-C (หน้า 589)", purpose: "ByzCoinX แบบกลุ่มสองชั้น, การ commit แบบขนานด้วย blockDAG, collective signature 77 ไบต์" },
  8: { section: "State blocks และ Section V-D: Trust-but-Verify (หน้า 590)", purpose: "สไลด์ที่ 3: ตัดประวัติด้วย state block และการยืนยันสองชั้น (Fig. 4)" },
  9: { section: "Section VI: Security Analysis, Eq. (1) และ (2), Fig. 5 (หน้า 591)", purpose: "สไลด์ที่ 4: สมการที่ (1) ที่พิมพ์ขอบบนเป็น n, union bound และ 68.5 ปี" },
  10: { section: "Section VI-D, VII และ VIII-A, Fig. 6, Table I (หน้า 592)", purpose: "สไลด์ที่ 4 และ 5: DeterLab 60 เครื่อง 1,800 โหนด, throughput และ latency" },
  11: { section: "Table II, Fig. 7 และ 8, Section VIII-B ถึง VIII-E (หน้า 593)", purpose: "สไลด์ที่ 5: 439 ถึง 5,850 tps, ข้อความ 13,000 tps, ค่าประมาณ 4,200 โหนด, RandHound เกิน 70%" },
  12: { section: "Fig. 9 ถึง 11, Table III, Section VIII-F และ IX (หน้า 594)", purpose: "ByzCoinX +20% และ -35%, state block คุ้มเมื่อเกิน 19 วัน, งานที่เกี่ยวข้อง" },
  13: { section: "Table IV, Section X: Limitation and Future Work, XI (หน้า 595)", purpose: "สไลด์ที่ 7: ข้อจำกัดที่ผู้เขียนยอมรับ และตาราง 2,400 validator" },
  14: { section: "References และ Appendix A (หน้า 596)", purpose: "เอกสารอ้างอิง [1] ถึง [48] และจุดเริ่มของโปรโตคอลกันการเซ็นเซอร์" },
  15: { section: "Appendix A ถึง C, Eq. (3) (หน้า 597)", purpose: "สไลด์ที่ 7: ความน่าจะเป็นของธุรกรรมข้าม shard, 3.7% และอัตราเร่ง 1.56 เท่า" },
  16: { section: "Appendix D: Atomix for State-full Objects (หน้า 598)", purpose: "การขยาย Atomix ไปยัง smart contract ด้วยการล็อกแบบ pessimistic" }
};

function initPdfViewerModal() {
  const modalOverlay = document.getElementById('pdf-modal-overlay');
  if (!modalOverlay) return;

  const pageImg = document.getElementById('modal-page-img');
  const iframe = document.getElementById('modal-pdf-iframe');
  const targetTitle = document.getElementById('pdf-modal-target-title');
  const contextText = document.getElementById('pdf-modal-context-text');
  const closeBtn = document.getElementById('pdf-modal-close-btn');
  const fullscreenBtn = document.getElementById('pdf-modal-fullscreen-btn');
  const externalBtn = document.getElementById('pdf-modal-external-btn');
  const prevBtn = document.getElementById('modal-btn-prev');
  const nextBtn = document.getElementById('modal-btn-next');
  const stepIndicator = document.getElementById('modal-step-indicator');
  const modeImgBtn = document.getElementById('modal-mode-image-btn');
  const modePdfBtn = document.getElementById('modal-mode-pdf-btn');
  const splitJumpBtn = document.getElementById('modal-split-jump-btn');
  const container = modalOverlay.querySelector('.pdf-modal-container');
  const outlineItems = modalOverlay.querySelectorAll('.modal-outline-item');

  const isInsideSubfolder = window.location.pathname.includes('/paper-');
  const isPaper2 = window.location.pathname.includes('/paper-2');
  const isPaper3 = window.location.pathname.includes('/paper-3');
  
  let currentPaper = isPaper3 ? 'omniledger' : (isPaper2 ? 'story-validator' : 'iot-cad');
  let currentPage = 1;
  let viewMode = 'image'; // 'image' | 'pdf'

  function getPaths(paper) {
    if (paper === 'omniledger' || isPaper3) {
      return {
        pdf: isInsideSubfolder ? '../assignement/work3/01_original/Paper_III_1_PRIMARY_OmniLedger_8418625.pdf' : 'assignement/work3/01_original/Paper_III_1_PRIMARY_OmniLedger_8418625.pdf',
        imgBase: isInsideSubfolder ? 'assets/pages/' : 'paper-3/assets/pages/',
        maxPage: 16,
        metadata: PAPER_PAGE_METADATA_OMNILEDGER
      };
    }
    if (paper === 'story-validator' || isPaper2) {
      return {
        pdf: isInsideSubfolder ? '../assignement/work2/01_original/Paper_II_1_PRIMARY_StoryValidator_9618897.pdf' : 'assignement/work2/01_original/Paper_II_1_PRIMARY_StoryValidator_9618897.pdf',
        imgBase: isInsideSubfolder ? 'assets/pages/' : 'paper-2/assets/pages/',
        maxPage: 8,
        metadata: PAPER_PAGE_METADATA_STORY_VALIDATOR
      };
    }
    if (paper === 'mcsoa') {
      return {
        pdf: isInsideSubfolder ? '../raw/Paper_I_2_BACKUP_MCSOA_10635077.pdf' : 'raw/Paper_I_2_BACKUP_MCSOA_10635077.pdf',
        imgBase: isInsideSubfolder ? 'assets/pages_mcsoa/' : 'paper-1/assets/pages_mcsoa/',
        maxPage: 5,
        metadata: PAPER_PAGE_METADATA_MCSOA
      };
    }
    return {
      pdf: isInsideSubfolder ? '../raw/Paper_I_1_PRIMARY_IoT-CAD_9256703.pdf' : 'raw/Paper_I_1_PRIMARY_IoT-CAD_9256703.pdf',
      imgBase: isInsideSubfolder ? 'assets/pages/' : 'paper-1/assets/pages/',
      maxPage: 9,
      metadata: PAPER_PAGE_METADATA
    };
  }

  function setPdfPage(page, customSection, customPurpose, paperType) {
    const activeDropdown = document.getElementById('paper-select-dropdown');
    currentPaper = paperType || (activeDropdown ? activeDropdown.value : 'iot-cad');
    
    const config = getPaths(currentPaper);
    currentPage = Math.min(config.maxPage, Math.max(1, parseInt(page) || 1));
    const meta = config.metadata[currentPage] || { section: `หน้า ${currentPage}`, purpose: 'เอกสารงานวิจัยต้นฉบับ' };
    
    // 1. Update image & iframe
    if (pageImg) {
      pageImg.src = `${config.imgBase}page-${currentPage}.png`;
      pageImg.alt = `${currentPaper.toUpperCase()} Page ${currentPage}`;
    }
    if (iframe) {
      iframe.src = `${config.pdf}#page=${currentPage}`;
    }

    // 2. Update Titles and Badges
    const modalBadge = modalOverlay.querySelector('.pdf-modal-title .badge');
    if (modalBadge) {
      const badges = {
        'mcsoa': 'Paper I (สำรอง 1): MCSOA',
        'story-validator': 'Paper II: Story Validator (IEEE CoG 2021)',
        'omniledger': 'Paper III: OmniLedger (IEEE SP 2018)'
      };
      modalBadge.innerText = badges[currentPaper] || 'Paper I: IoT-CAD';
    }
    if (targetTitle) {
      targetTitle.innerText = customSection || meta.section;
    }
    if (contextText) {
      contextText.innerHTML = customPurpose || meta.purpose;
    }
    if (stepIndicator) {
      stepIndicator.innerText = `${currentPage} / ${config.maxPage}`;
    }

    // 3. Update Split View Link
    if (splitJumpBtn) {
      if (currentPaper === 'iot-cad') {
        splitJumpBtn.style.display = 'inline-flex';
        const transBase = isInsideSubfolder ? 'translation.html' : 'paper-1/translation.html';
        splitJumpBtn.href = `${transBase}?page=${currentPage}`;
        splitJumpBtn.innerHTML = `📖 เปิดอ่านแปลไทยหน้า ${currentPage} (Compare View) →`;
      } else {
        splitJumpBtn.style.display = 'none';
      }
    }

    // 4. Update Outline Pane
    const outlineHeader = modalOverlay.querySelector('.modal-outline-header');
    const outlineContainer = modalOverlay.querySelector('.modal-outline-list');
    if (outlineHeader) {
      const outlines = {
        'mcsoa': 'สารบัญบทความ 5 หน้า (IEEE CACRE 2024)',
        'story-validator': 'สารบัญบทความ 8 หน้า (IEEE CoG 2021)',
        'omniledger': 'สารบัญบทความ 16 หน้า (IEEE SP 2018)'
      };
      outlineHeader.innerText = outlines[currentPaper] || 'สารบัญบทความ 9 หน้า (IEEE ICCAD 2020)';
    }

    if (outlineContainer && outlineContainer.dataset.renderedPaper !== currentPaper) {
      outlineContainer.dataset.renderedPaper = currentPaper;
      let outlineHtml = '';
      for (let p = 1; p <= config.maxPage; p++) {
        const itemMeta = config.metadata[p] || { section: `หน้า ${p}`, purpose: '' };
        outlineHtml += `
          <div class="modal-outline-item ${p === currentPage ? 'active' : ''}" data-page="${p}">
            <div class="outline-tag-row">
              <span class="outline-page-num">P.${p}</span>
              <span class="outline-slide-tag">${itemMeta.purpose.slice(0, 32)}...</span>
            </div>
            <div class="outline-item-title">${itemMeta.section}</div>
          </div>
        `;
      }
      outlineContainer.innerHTML = outlineHtml;

      outlineContainer.querySelectorAll('.modal-outline-item').forEach(item => {
        item.addEventListener('click', () => {
          const p = parseInt(item.getAttribute('data-page'));
          setPdfPage(p, null, null, currentPaper);
        });
      });
    } else if (outlineContainer) {
      outlineContainer.querySelectorAll('.modal-outline-item').forEach(item => {
        const p = parseInt(item.getAttribute('data-page'));
        if (p === currentPage) {
          item.classList.add('active');
          item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        } else {
          item.classList.remove('active');
        }
      });
    }

    // 5. Open Modal
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function setViewMode(mode) {
    viewMode = mode;
    if (viewMode === 'image') {
      if (pageImg) pageImg.parentElement.style.display = 'flex';
      if (iframe) iframe.classList.remove('active');
      if (modeImgBtn) modeImgBtn.classList.add('active');
      if (modePdfBtn) modePdfBtn.classList.remove('active');
    } else {
      if (pageImg) pageImg.parentElement.style.display = 'none';
      if (iframe) iframe.classList.add('active');
      if (modePdfBtn) modePdfBtn.classList.add('active');
      if (modeImgBtn) modeImgBtn.classList.remove('active');
    }
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Bind Buttons
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const config = getPaths(currentPaper);
      if (currentPage > 1) setPdfPage(currentPage - 1, null, null, currentPaper);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const config = getPaths(currentPaper);
      if (currentPage < config.maxPage) setPdfPage(currentPage + 1, null, null, currentPaper);
    });
  }

  if (modeImgBtn) modeImgBtn.addEventListener('click', () => setViewMode('image'));
  if (modePdfBtn) modePdfBtn.addEventListener('click', () => setViewMode('pdf'));

  outlineItems.forEach(item => {
    item.addEventListener('click', () => {
      const p = parseInt(item.getAttribute('data-page'));
      setPdfPage(p, null, null, currentPaper);
    });
  });

  // Global triggers
  document.querySelectorAll('.paper-ref-pill, .btn-paper-ref').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const p = btn.getAttribute('data-page') || 1;
      const s = btn.getAttribute('data-section') || '';
      const purpose = btn.getAttribute('data-purpose') || '';
      const paperType = btn.getAttribute('data-paper') || (document.getElementById('paper-select-dropdown')?.value || 'iot-cad');
      setPdfPage(p, s, purpose, paperType);
    });
  });
  // Keyboard navigation when modal is open
  document.addEventListener('keydown', (e) => {
    if (!modalOverlay.classList.contains('open')) return;
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'ArrowLeft') {
      const config = getPaths(currentPaper);
      if (currentPage > 1) setPdfPage(currentPage - 1, null, null, currentPaper);
    } else if (e.key === 'ArrowRight') {
      const config = getPaths(currentPaper);
      if (currentPage < config.maxPage) setPdfPage(currentPage + 1, null, null, currentPaper);
    }
  });

  // Fullscreen toggle
  if (fullscreenBtn && container) {
    fullscreenBtn.addEventListener('click', () => {
      container.classList.toggle('fullscreen');
      fullscreenBtn.innerHTML = container.classList.contains('fullscreen') ? '🗗' : '⛶';
    });
  }

  // Open in new tab
  if (externalBtn) {
    externalBtn.addEventListener('click', () => {
      const config = getPaths(currentPaper);
      window.open(`${config.pdf}#page=${currentPage}`, '_blank');
    });
  }

  // Expose to window
  window.openPaperPdf = setPdfPage;
}

// ═══════════ Paper Selector Switcher (IoT-CAD vs MCSOA) ═══════════
function initPaperSelector() {
  const dropdown = document.getElementById('paper-select-dropdown');
  if (!dropdown) return;

  const urlParams = new URLSearchParams(window.location.search);
  const paperParam = urlParams.get('paper');
  if (paperParam === 'mcsoa') {
    dropdown.value = 'mcsoa';
  }

  function applyPaperSelection(paperId) {
    const iotCadViews = document.querySelectorAll('.paper-subview-iot-cad, #paper-view-iot-cad');
    const mcsoaViews = document.querySelectorAll('.paper-subview-mcsoa, #paper-view-mcsoa');
    const sidebarBadge = document.querySelector('.sidebar-badge-pill');
    const sidebarListIotCad = document.getElementById('sidebar-list-iot-cad');
    const sidebarListMcsoa = document.getElementById('sidebar-list-mcsoa');
    const metaIotCad = document.getElementById('sidebar-meta-iot-cad');
    const metaMcsoa = document.getElementById('sidebar-meta-mcsoa');

    if (paperId === 'mcsoa') {
      iotCadViews.forEach(v => v.classList.add('hidden'));
      mcsoaViews.forEach(v => v.classList.remove('hidden'));
      if (sidebarBadge) sidebarBadge.innerText = 'Paper I (สำรอง 1)';
      if (sidebarListIotCad) sidebarListIotCad.style.display = 'none';
      if (sidebarListMcsoa) sidebarListMcsoa.style.display = 'block';
      if (metaIotCad) metaIotCad.style.display = 'none';
      if (metaMcsoa) metaMcsoa.style.display = 'block';
    } else {
      iotCadViews.forEach(v => v.classList.remove('hidden'));
      mcsoaViews.forEach(v => v.classList.add('hidden'));
      if (sidebarBadge) sidebarBadge.innerText = 'Paper I (ตัวจริง)';
      if (sidebarListIotCad) sidebarListIotCad.style.display = 'block';
      if (sidebarListMcsoa) sidebarListMcsoa.style.display = 'none';
      if (metaIotCad) metaIotCad.style.display = 'block';
      if (metaMcsoa) metaMcsoa.style.display = 'none';
    }

    const tipsMcsoa = document.getElementById('rehearsal-tips-mcsoa');
    if (tipsMcsoa) tipsMcsoa.style.display = paperId === 'mcsoa' ? 'block' : 'none';

    if (window.presentationStudio) {
      window.presentationStudio.setPaper(paperId);
    }

    // The site header shows the backup paper in its breadcrumb.
    document.dispatchEvent(new CustomEvent('sn:subview', { detail: { paper: paperId } }));

    // Update URL without page refresh
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('paper', paperId);
    window.history.replaceState({}, '', newUrl);

    // Re-trigger scrollspy
    if (typeof initScrollSpy === 'function') {
      setTimeout(initScrollSpy, 50);
    }
  }

  dropdown.addEventListener('change', (e) => {
    applyPaperSelection(e.target.value);
  });

  // Apply on initial load
  applyPaperSelection(dropdown.value);
}

// ═══════════ Sidebar Table of Contents & Sticky ScrollSpy ═══════════
function initScrollSpy() {
  const links = document.querySelectorAll('.sidebar-link');
  if (!links.length) return;

  const sidebar = document.querySelector('.chapter-sidebar');
  const liveSection = document.getElementById('sidebar-live-section');

  const sections = [];
  links.forEach(link => {
    const targetId = link.getAttribute('href')?.replace('#', '');
    if (targetId) {
      const section = document.getElementById(targetId);
      if (section) sections.push({ id: targetId, el: section, link: link });
    }
  });

  if (!sections.length) return;

  function onScroll() {
    const scrollPos = window.scrollY + 160;
    let currentId = sections[0].id;
    let currentLink = sections[0].link;

    for (let i = 0; i < sections.length; i++) {
      const top = sections[i].el.offsetTop;
      if (scrollPos >= top) {
        currentId = sections[i].id;
        currentLink = sections[i].link;
      }
    }

    links.forEach(link => {
      const targetId = link.getAttribute('href')?.replace('#', '');
      if (targetId === currentId) {
        link.classList.add('active');
        // Ensure active sidebar link stays visible inside the sticky sidebar during deep reading
        if (sidebar) {
          const linkTop = link.offsetTop - sidebar.offsetTop;
          if (linkTop < sidebar.scrollTop || linkTop > sidebar.scrollTop + sidebar.clientHeight - 60) {
            link.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
          }
        }
      } else {
        link.classList.remove('active');
      }
    });

    if (liveSection && currentLink) {
      liveSection.innerText = currentLink.innerText.replace('★', '').trim();
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
function initTheme() {
  const savedTheme = localStorage.getItem('sn_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeButton(savedTheme);

  const themeBtns = document.querySelectorAll('.theme-toggle-btn');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('sn_theme', next);
      updateThemeButton(next);
    });
  });
}

function updateThemeButton(theme) {
  const btns = document.querySelectorAll('.theme-toggle-btn');
  btns.forEach(btn => {
    if (theme === 'dark') {
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      btn.setAttribute('aria-label', 'เปลี่ยนเป็นโหมดสว่าง');
      btn.setAttribute('title', 'เปลี่ยนเป็นโหมดสว่าง');
    } else {
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      btn.setAttribute('aria-label', 'เปลี่ยนเป็นโหมดมืด');
      btn.setAttribute('title', 'เปลี่ยนเป็นโหมดมืด');
    }
  });
}

// ═══════════ Responsive Navbar & Mobile Drawer ═══════════
function initNavbar() {
  const toggleBtn = document.querySelector('.nav-mobile-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');

  if (toggleBtn && drawer) {
    if (toggleBtn.dataset.bound) return;
    toggleBtn.dataset.bound = 'true';

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      drawer.classList.toggle('open');
      const isOpen = drawer.classList.contains('open');
      toggleBtn.innerHTML = isOpen ? '✕' : '☰';
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    document.addEventListener('click', (e) => {
      if (drawer.classList.contains('open') && !drawer.contains(e.target) && e.target !== toggleBtn) {
        drawer.classList.remove('open');
        toggleBtn.innerHTML = '☰';
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });

    const mobileAccordionHeaders = drawer.querySelectorAll('.mobile-accordion-header');
    mobileAccordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        item.classList.toggle('open');
      });
    });
  }
}

// ═══════════ Sidebar Table of Contents & ScrollSpy ═══════════
function initScrollSpy() {
  if (!document.querySelector('.sidebar-link')) return;

  // Resolve links and sections on every scroll and skip hidden ones, so pages that swap content
  // panels (the Paper III Version 1 / Version 2 switcher) highlight the sidebar that is on screen.
  function onScroll() {
    const links = [...document.querySelectorAll('.sidebar-link')].filter(l => l.offsetParent !== null);
    if (!links.length) return;
    const scrollPos = window.scrollY + 140;
    let currentId = null;

    links.forEach(link => {
      const targetId = link.getAttribute('href')?.replace('#', '');
      const section = targetId ? document.getElementById(targetId) : null;
      if (section && section.offsetParent !== null && scrollPos >= section.getBoundingClientRect().top + window.scrollY) {
        currentId = targetId;
      }
    });
    if (!currentId) currentId = links[0].getAttribute('href')?.replace('#', '');

    links.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href')?.replace('#', '') === currentId);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();
}

// ═══════════ Standard Accordions ═══════════
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const parent = header.parentElement;
      parent.classList.toggle('open');
    });
  });
}

// ═══════════ Tabs ═══════════
function initTabs() {
  document.querySelectorAll('.tab-container').forEach(container => {
    const buttons = container.querySelectorAll('.tab-btn');
    const panes = container.querySelectorAll('.tab-pane');

    buttons.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        if (panes[idx]) panes[idx].classList.add('active');
      });
    });
  });
}

// ═══════════ Quiz Option Checker ═══════════
function initQuizzes() {
  document.querySelectorAll('.quiz-card').forEach(card => {
    const options = card.querySelectorAll('.quiz-option');
    const feedback = card.querySelector('.quiz-feedback');

    options.forEach(opt => {
      opt.addEventListener('click', () => {
        if (card.getAttribute('data-answered') === 'true') return;
        card.setAttribute('data-answered', 'true');

        const isCorrect = opt.getAttribute('data-correct') === 'true';
        options.forEach(o => {
          if (o.getAttribute('data-correct') === 'true') {
            o.classList.add('correct');
          } else if (o === opt && !isCorrect) {
            o.classList.add('wrong');
          }
        });

        if (feedback) {
          feedback.style.display = 'block';
          feedback.style.background = isCorrect ? 'var(--green-bg)' : 'var(--red-bg)';
          feedback.style.color = isCorrect ? 'var(--green)' : 'var(--red)';
          feedback.style.border = `1.5px solid ${isCorrect ? 'var(--green)' : 'var(--red)'}`;
          feedback.innerHTML = isCorrect 
            ? `<strong>ถูกต้อง!</strong> ${feedback.getAttribute('data-explanation') || ''}`
            : `<strong>ยังไม่ถูกต้อง!</strong> ${feedback.getAttribute('data-explanation') || ''}`;
        }
      });
    });
  });
}

// ═══════════ Copy to Clipboard Helper ═══════════
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.innerText;
        btn.innerText = 'คัดลอกสำเร็จ';
        btn.style.background = 'var(--green-bg)';
        btn.style.color = 'var(--green)';
        btn.style.borderColor = 'var(--green)';
        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.background = '';
          btn.style.color = '';
          btn.style.borderColor = '';
        }, 2000);
      });
    });
  });
}
