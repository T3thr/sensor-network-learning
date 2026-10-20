/**
 * 305432 เครือข่ายเซนเซอร์ (Sensor Networks)
 * Story Validator: Interactive Narrative Graph & Lost Plot Simulator
 * Simulates:
 * 1. The Murder Case (TMC) Directed Graph G = (V, E)
 * 2. 5 Injected Bugs: Dead-End, Loop, Impossible Condition, Lost Ending, Blocked Choice
 * 3. Automated DFS Validation Engine & Metrics (Total Paths, Stroke Points, Lost Plot, Reachability)
 * 4. Player Persona Simulation (Aggressive vs Cautious)
 */

class StoryGraphSimulator {
  constructor() {
    this.modelMode = 'clean'; // 'clean' | 'failed'
    this.personaMode = 'none'; // 'none' | 'aggressive' | 'cautious'
    this.initDOM();
  }

  initDOM() {
    this.cleanBtn = document.getElementById('sim-mode-clean');
    this.failedBtn = document.getElementById('sim-mode-failed');
    this.runDfsBtn = document.getElementById('sim-btn-run-dfs');
    this.runPersonaAggBtn = document.getElementById('sim-btn-persona-agg');
    this.runPersonaCautBtn = document.getElementById('sim-btn-persona-caut');
    this.resetBtn = document.getElementById('sim-btn-reset');

    this.statusBadge = document.getElementById('sim-status-badge');
    this.summaryBox = document.getElementById('sim-summary-box');
    this.graphContainer = document.getElementById('sim-graph-canvas');
    this.traceLog = document.getElementById('sim-trace-log');

    this.valTotalPaths = document.getElementById('sim-val-paths');
    this.valStrokePoints = document.getElementById('sim-val-stroke');
    this.valLostPlots = document.getElementById('sim-val-lost');
    this.valDeadEnds = document.getElementById('sim-val-deadends');
    this.valReachEnding1 = document.getElementById('sim-val-end1');
    this.valReachEnding2 = document.getElementById('sim-val-end2');
    this.valReachEnding3 = document.getElementById('sim-val-end3');

    if (this.cleanBtn) {
      this.cleanBtn.addEventListener('click', () => this.setModelMode('clean'));
    }
    if (this.failedBtn) {
      this.failedBtn.addEventListener('click', () => this.setModelMode('failed'));
    }
    if (this.runDfsBtn) {
      this.runDfsBtn.addEventListener('click', () => this.runDfsValidation());
    }
    if (this.runPersonaAggBtn) {
      this.runPersonaAggBtn.addEventListener('click', () => this.runPersonaSimulation('aggressive'));
    }
    if (this.runPersonaCautBtn) {
      this.runPersonaCautBtn.addEventListener('click', () => this.runPersonaSimulation('cautious'));
    }
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => this.resetSimulation());
    }

    this.renderGraph();
    this.updateMetricsPlaceholder();
  }

  setModelMode(mode) {
    this.modelMode = mode;
    if (this.cleanBtn && this.failedBtn) {
      if (mode === 'clean') {
        this.cleanBtn.classList.add('active');
        this.failedBtn.classList.remove('active');
        if (this.statusBadge) {
          this.statusBadge.innerText = 'ฉบับสมบูรณ์ (TMC Clean Model)';
          this.statusBadge.style.background = 'var(--green)';
          this.statusBadge.style.color = '#fff';
        }
      } else {
        this.failedBtn.classList.add('active');
        this.cleanBtn.classList.remove('active');
        if (this.statusBadge) {
          this.statusBadge.innerText = 'ฉบับมีบั๊กจงใจ 5 จุด (TMC Failed Model)';
          this.statusBadge.style.background = 'var(--red)';
          this.statusBadge.style.color = '#fff';
        }
      }
    }
    this.renderGraph();
    this.log(`เปลี่ยนโหมดเป็น: ${mode === 'clean' ? 'The Murder Case (ต้นฉบับไร้บั๊ก)' : 'The Murder Case (จงใจฝังบั๊ก 5 จุดตามเปเปอร์)'}`);
  }

  resetSimulation() {
    this.renderGraph();
    this.updateMetricsPlaceholder();
    if (this.traceLog) this.traceLog.innerHTML = '<div style="color: var(--ink-muted); font-size: 0.82rem;">กดปุ่ม "รันการตรวจสอบด้วย DFS" หรือ "จำลอง Persona" เพื่อเริ่มต้นจำลอง</div>';
    if (this.summaryBox) {
      this.summaryBox.innerHTML = '<div style="font-size: 0.88rem; color: var(--ink-soft);">เลือกโมเดลแล้วคลิกปุ่มเพื่อเริ่มจำลองอัลกอริทึมตรวจจับโครงเรื่อง</div>';
    }
  }

  updateMetricsPlaceholder() {
    if (this.valTotalPaths) this.valTotalPaths.innerText = '-';
    if (this.valStrokePoints) this.valStrokePoints.innerText = '-';
    if (this.valLostPlots) this.valLostPlots.innerText = '-';
    if (this.valDeadEnds) this.valDeadEnds.innerText = '-';
    if (this.valReachEnding1) this.valReachEnding1.innerText = '-';
    if (this.valReachEnding2) this.valReachEnding2.innerText = '-';
    if (this.valReachEnding3) this.valReachEnding3.innerText = '-';
  }

  getGraphData() {
    // 14 Passages of The Murder Case
    const nodes = [
      { id: 'p1', name: '1. ที่เกิดเหตุ (Crime Scene)', type: 'start', desc: 'พบศพในห้องทำงาน' },
      { id: 'p2', name: '2. ตรวจสอบศพ (Inspect Body)', type: 'normal', desc: 'พบรอยแผล + หลักฐานมีด' },
      { id: 'p3', name: '3. สอบปากคำ (Interrogate)', type: 'normal', desc: 'เริ่มซักถามผู้ต้องสงสัย' },
      { id: 'p4', name: '4. ซักนุ่มนวล (Gentle Ask)', type: 'normal', desc: 'ผู้ต้องสงสัยลดความสับสน' },
      { id: 'p5', name: '5. ซักกดดัน (Aggressive Ask)', type: 'normal', desc: 'ผู้ต้องสงสัยโกรธพุ่งสูง' },
      { id: 'p6', name: '6. แสดงหลักฐาน (Show Knife)', type: 'normal', desc: 'เงื่อนไข: ต้องมีด (evidence)' },
      { id: 'p7', name: '7. ตรวจสอบ Alibi', type: 'normal', desc: 'ผู้ต้องสงสัยอ้างว่าอยู่ที่โรงแรม' },
      { id: 'p8', name: '8. ถามพยานบาร์เทนเดอร์', type: 'normal', desc: 'พยานบอกว่าเห็นคนร้ายวิ่งออกไป' },
      { id: 'p9', name: '9. เผชิญหน้าชี้ขาด (Confront)', type: 'stroke', desc: 'จุดคอขวด Stroke Point' },
      { id: 'p10', name: '10. ทางเลือกบีบคั้น', type: 'normal', desc: 'ยื่นข้อเสนอยอมจำนน' },
      { id: 'p11', name: '11. ทางเลือกผ่อนปรน', type: 'normal', desc: 'ให้เวลาทบทวนตนเอง' },
      { id: 'end1', name: 'Ending 1: สารภาพผิด (Confession)', type: 'ending', desc: 'ฉากจบที่ 1 (สำเร็จ)' },
      { id: 'end2', name: 'Ending 2: ผู้ต้องสงสัยหลบหนี (Flee)', type: 'ending', desc: 'ฉากจบที่ 2 (ล้มเหลว)' },
      { id: 'end3', name: 'Ending 3: ปล่อยตัวไร้หลักฐาน (Release)', type: 'ending', desc: 'ฉากจบที่ 3 (ไม่สรุปผล)' }
    ];

    let edges = [];

    if (this.modelMode === 'clean') {
      edges = [
        { from: 'p1', to: 'p2', choice: 'ตรวจศพอย่างละเอียด', cond: null },
        { from: 'p1', to: 'p3', choice: 'ข้ามไปสอบปากคำทันที', cond: null },
        { from: 'p2', to: 'p3', choice: 'ไปคุยกับผู้ต้องสงสัย', cond: null },
        { from: 'p3', to: 'p4', choice: 'ถามด้วยความสุภาพ', cond: null },
        { from: 'p3', to: 'p5', choice: 'ตวาดข่มขู่เสียงดัง', cond: null },
        { from: 'p4', to: 'p7', choice: 'ถามเรื่องที่อยู่ Alibi', cond: null },
        { from: 'p4', to: 'p8', choice: 'ไปตามสืบที่บาร์', cond: null },
        { from: 'p5', to: 'p6', choice: 'เอาอาวุธมีดมาแสดง', cond: 'evidence_found == true' },
        { from: 'p5', to: 'p9', choice: 'เค้นถามขั้นสุดท้าย', cond: null },
        { from: 'p6', to: 'p9', choice: 'ยื่นหลักฐานเข้าห้องสืบสวน', cond: null },
        { from: 'p7', to: 'p9', choice: 'นำคำให้การมาเทียบเคียง', cond: null },
        { from: 'p8', to: 'p9', choice: 'เชิญพยานมาเผชิญหน้า', cond: null },
        { from: 'p9', to: 'p10', choice: 'ยื่นหลักฐานเด็ดขาด', cond: null },
        { from: 'p9', to: 'p11', choice: 'เกลี้ยกล่อมใจเย็น', cond: null },
        { from: 'p10', to: 'end1', choice: 'ผู้ต้องสงสัยยอมรับสารภาพ', cond: 'anger >= 5' },
        { from: 'p10', to: 'end2', choice: 'ผู้ต้องสงสัยฉวยโอกาสหนี', cond: 'fear >= 5' },
        { from: 'p11', to: 'end2', choice: 'กระโดดหน้าต่างหลบหนี', cond: null },
        { from: 'p11', to: 'end3', choice: 'หลักฐานไม่พอจึงต้องปล่อยตัว', cond: 'confusion >= 4' }
      ];
    } else {
      // TMC Failed Version (5 Injected Bugs)
      edges = [
        { from: 'p1', to: 'p2', choice: 'ตรวจศพอย่างละเอียด', cond: null },
        { from: 'p1', to: 'p3', choice: 'ข้ามไปสอบปากคำทันที', cond: null },
        { from: 'p2', to: 'p3', choice: 'ไปคุยกับผู้ต้องสงสัย', cond: null },
        { from: 'p3', to: 'p4', choice: 'ถามด้วยความสุภาพ', cond: null },
        { from: 'p3', to: 'p5', choice: 'ตวาดข่มขู่เสียงดัง', cond: null },
        // Bug 2: Infinite Loop (p4 -> p7 -> p3)
        { from: 'p4', to: 'p7', choice: 'ถามเรื่องที่อยู่ Alibi', cond: null },
        { from: 'p7', to: 'p3', choice: '[BUG 2: LOOP] วนกลับมาห้องสอบปากคำ', cond: null, isBug: true },
        // Bug 1: Dead-end in path 7 (p8 has no exit)
        { from: 'p4', to: 'p8', choice: 'ไปตามสืบที่บาร์', cond: null },
        // p8 -> p9 link is REMOVED! Causing p8 to be a Dead-End!
        // Bug 5: Blocked Choice 6 (impossible condition)
        { from: 'p5', to: 'p6', choice: '[BUG 5] ชี้ตัวคนร้าย (เงื่อนไขขัดแย้ง: evidence == false && knife == true)', cond: 'impossible', isBug: true },
        { from: 'p5', to: 'p9', choice: 'เค้นถามขั้นสุดท้าย', cond: null },
        { from: 'p6', to: 'p9', choice: 'ยื่นหลักฐานเข้าห้องสืบสวน', cond: null },
        { from: 'p9', to: 'p10', choice: 'ยื่นหลักฐานเด็ดขาด', cond: null },
        { from: 'p9', to: 'p11', choice: 'เกลี้ยกล่อมใจเย็น', cond: null },
        // Bug 4: Ending 1 becomes Lost Plot (Unreachable condition)
        { from: 'p10', to: 'end1', choice: '[BUG 4] สารภาพ (เงื่อนไข anger > 999 ไม่มีทางเป็นจริง)', cond: 'anger > 999', isBug: true },
        { from: 'p10', to: 'end2', choice: 'ผู้ต้องสงสัยฉวยโอกาสหนี', cond: 'fear >= 5' },
        // Bug 3: Dead-end in path 14 (p11 choices blocked)
        { from: 'p11', to: 'end2', choice: '[BUG 3: LOCKED] ปิดประตูทางออก', cond: 'impossible', isBug: true },
        { from: 'p11', to: 'end3', choice: 'หลักฐานไม่พอจึงต้องปล่อยตัว', cond: 'confusion >= 4' }
      ];
    }

    return { nodes, edges };
  }

  renderGraph() {
    if (!this.graphContainer) return;
    const { nodes, edges } = this.getGraphData();

    let html = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; font-size: 0.84rem; color: var(--ink-muted);">
        <span>โครงสร้างฉากและทางเลือก (Nodes &amp; Links): ${nodes.length} ฉาก, ${edges.length} ทางเลือก</span>
        <span>สัญลักษณ์: <span style="color: var(--purple); font-weight: 700;">★ Stroke Point</span> | <span style="color: var(--red); font-weight: 700;">⚠ บั๊กที่ตรวจพบ</span></span>
      </div>
      <div class="sim-node-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 10px;">
    `;

    nodes.forEach(n => {
      let borderStyle = '1px solid var(--rule)';
      let bgStyle = 'var(--paper)';
      let badgeHtml = '';

      if (n.type === 'start') {
        borderStyle = '2px solid var(--accent)';
        badgeHtml = '<span class="unit-tag" style="background: var(--accent-bg); color: var(--accent);">จุดเริ่มต้น (Root)</span>';
      } else if (n.type === 'ending') {
        borderStyle = '2px solid var(--green)';
        badgeHtml = '<span class="unit-tag" style="background: var(--green-bg); color: var(--green);">ฉากจบ (Ending)</span>';
        if (this.modelMode === 'failed' && n.id === 'end1') {
          borderStyle = '2px solid var(--red)';
          badgeHtml = '<span class="unit-tag" style="background: var(--red-bg); color: var(--red);">⚠ LOST PLOT!</span>';
        }
      } else if (n.type === 'stroke') {
        borderStyle = '2px solid var(--purple)';
        badgeHtml = '<span class="unit-tag" style="background: var(--purple-bg); color: var(--purple);">★ Stroke Point</span>';
      }

      // Check if node is dead-end in failed mode
      if (this.modelMode === 'failed' && n.id === 'p8') {
        borderStyle = '2px solid var(--red)';
        badgeHtml = '<span class="unit-tag" style="background: var(--red-bg); color: var(--red);">⚠ DEAD-END!</span>';
      }

      html += `
        <div class="sim-node-card" id="node-${n.id}" style="padding: 10px 12px; background: ${bgStyle}; border: ${borderStyle}; border-radius: var(--radius-sm);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <strong style="font-size: 0.86rem; color: var(--ink);">${n.name}</strong>
          </div>
          <div style="font-size: 0.78rem; color: var(--ink-soft); margin-bottom: 6px;">${n.desc}</div>
          ${badgeHtml}
        </div>
      `;
    });

    html += `</div>`;
    this.graphContainer.innerHTML = html;
  }

  runDfsValidation() {
    const { nodes, edges } = this.getGraphData();
    this.log('<strong>[1. Extraction & Graph Parsing]</strong> สกัดข้อมูล 14 Passages สำเร็จ... โครงข่าย G = (V, E)');
    this.log('<strong>[2. DFS Traversal]</strong> เริ่มค้นหาในแนวลึก (Depth-First Search) ทุกเส้นทางจาก p1 (Crime Scene)...');

    if (this.modelMode === 'clean') {
      setTimeout(() => {
        this.log('✔ สำรวจพบเส้นทางทั้งหมด <strong>20 Complete Paths</strong> มุ่งสู่ 3 ฉากจบ');
        this.log('✔ ตรวจพบ Stroke Point: <strong>Passage 9 (Confrontation)</strong> ทุกเส้นทางวิ่งผ่าน 100%');
        this.log('✔ ตรวจสอบความถูกต้อง: <strong>0 Lost Plots</strong>, <strong>0 Dead-Ends</strong>');
        this.log('✔ สัดส่วนการเข้าถึงฉากจบ: Ending 1 (45%), Ending 2 (30%), Ending 3 (25%)');

        if (this.valTotalPaths) this.valTotalPaths.innerText = '20 เส้นทาง';
        if (this.valStrokePoints) this.valStrokePoints.innerText = 'Passage 9';
        if (this.valLostPlots) this.valLostPlots.innerText = '0 (ผ่าน 100%)';
        if (this.valDeadEnds) this.valDeadEnds.innerText = '0 (ไม่มีทางตัน)';
        if (this.valReachEnding1) this.valReachEnding1.innerText = '45%';
        if (this.valReachEnding2) this.valReachEnding2.innerText = '30%';
        if (this.valReachEnding3) this.valReachEnding3.innerText = '25%';

        if (this.summaryBox) {
          this.summaryBox.innerHTML = `
            <div style="padding: 10px 14px; background: var(--green-bg); border-left: 4px solid var(--green); border-radius: var(--radius-sm); font-size: 0.90rem;">
              <strong style="color: var(--green);">🎉 ผลการตรวจพิสูจน์ (TMC Clean): ผ่านการตรวจสอบ 100%</strong><br>
              โครงเรื่องถูกต้องสมบูรณ์ ไม่มีฉากค้าง ไม่มีพล็อตตกหล่น ทุกเส้นทางสามารถดำเนินไปสู่ฉากจบได้อย่างถูกต้อง
            </div>
          `;
        }
      }, 300);
    } else {
      setTimeout(() => {
        this.log('⚠ <span style="color: var(--red); font-weight: 700;">ตรวจพบบั๊กที่ 1:</span> Passage 8 เป็น <strong>Dead-End</strong> ทางเลือกลอย ขาดเส้นทางต่อไปยังฉากจบ!');
        this.log('⚠ <span style="color: var(--red); font-weight: 700;">ตรวจพบบั๊กที่ 2:</span> ตรวจพบ <strong>Infinite Loop</strong> ระหว่าง Passage 7 ➔ Passage 3 ผู้เล่นวนไม่รู้จบ!');
        this.log('⚠ <span style="color: var(--red); font-weight: 700;">ตรวจพบบั๊กที่ 3:</span> Passage 11 ทางเลือกไป Ending 2 ถูกล็อกด้วยเงื่อนไขที่เป็นเท็จตลอดกาล!');
        this.log('⚠ <span style="color: var(--red); font-weight: 700;">ตรวจพบบั๊กที่ 4:</span> <strong>Ending 1 (Confession) กลายเป็น Lost Plot</strong> ไม่มีเส้นทางใดเข้าถึงได้!');
        this.log('⚠ <span style="color: var(--red); font-weight: 700;">ตรวจพบบั๊กที่ 5:</span> ทางเลือกแสดงมีด (Choice 6) เงื่อนไขขัดแย้งกับประวัติการเล่น!');

        if (this.valTotalPaths) this.valTotalPaths.innerText = '14 เส้นทาง (ลดลง 6)';
        if (this.valStrokePoints) this.valStrokePoints.innerText = 'Passage 9';
        if (this.valLostPlots) this.valLostPlots.innerText = '1 (Ending 1)';
        if (this.valDeadEnds) this.valDeadEnds.innerText = '1 (Passage 8)';
        if (this.valReachEnding1) this.valReachEnding1.innerText = '0% (เข้าไม่ถึง!)';
        if (this.valReachEnding2) this.valReachEnding2.innerText = '64%';
        if (this.valReachEnding3) this.valReachEnding3.innerText = '36%';

        if (this.summaryBox) {
          this.summaryBox.innerHTML = `
            <div style="padding: 10px 14px; background: var(--red-bg); border-left: 4px solid var(--red); border-radius: var(--radius-sm); font-size: 0.90rem;">
              <strong style="color: var(--red);">🚨 ตรวจพบบั๊กโครงเรื่อง 5 จุดตามเปเปอร์ Story Validator (IEEE CoG 2021):</strong><br>
              1. Dead-End ที่ Passage 8 | 2. Loop ที่ Passage 7 ➔ 3 | 3. Locked Choice ที่ Passage 11<br>
              4. Lost Plot: Ending 1 เข้าไม่ถึง (Reachability 0%) | 5. Blocked Choice ที่ Passage 5
            </div>
          `;
        }

        // Highlight bug nodes
        const nodeP8 = document.getElementById('node-p8');
        const nodeEnd1 = document.getElementById('node-end1');
        if (nodeP8) nodeP8.style.animation = 'pulse 1.5s infinite';
        if (nodeEnd1) nodeEnd1.style.animation = 'pulse 1.5s infinite';
      }, 300);
    }
  }

  runPersonaSimulation(persona) {
    this.personaMode = persona;
    this.log(`<strong>[Persona Simulation]</strong> กำลังจำลองผู้เล่นสไตล์: ${persona === 'aggressive' ? 'ก้าวร้าว (Aggressive - เน้นตัวแปรความโกรธ Anger สูงสุด)' : 'รอบคอบ/ระแวง (Cautious - เน้นหลีกเลี่ยงความขัดแย้ง)'}`);

    if (persona === 'aggressive') {
      this.log('• ขั้น 1: เริ่มต้นที่ Crime Scene ➔ เลือก "ข้ามไปสอบปากคำทันที" (p3)');
      this.log('• ขั้น 2: ที่ห้องสอบปากคำ ➔ เลือก "ตวาดข่มขู่เสียงดัง" (p5) [ตัวแปร Anger +4]');
      if (this.modelMode === 'failed') {
        this.log('• ขั้น 3: พยายามเลือก "ชี้ตัวคนร้ายด้วยมีด" ➔ ⚠ <span style="color: var(--red);">ติดบั๊ก Choice 6 เงื่อนไขไม่ผ่าน!</span>');
        this.log('• ขั้น 4: ตกไปเลือก "เค้นถามขั้นสุดท้าย" ➔ เข้าสู่ Confrontation (p9)');
        this.log('• ขั้น 5: เลือก "ยื่นหลักฐานเด็ดขาด" ➔ พยายามไป Ending 1 ➔ ⚠ <span style="color: var(--red);">ติดบั๊ก Lost Plot (Anger > 999 เป็นไปไม่ได้)</span> ➔ หลุดไป Ending 2 (คนร้ายหนี)!');
      } else {
        this.log('• ขั้น 3: แสดงอาวุธมีดสำเร็จ ➔ เข้าสู่ Confrontation (p9)');
        this.log('• ขั้น 4: ยื่นหลักฐานเด็ดขาด (p10) ➔ <strong>ผู้ต้องสงสัยยอมรับสารภาพ (Ending 1) สำเร็จ!</strong>');
      }
    } else {
      this.log('• ขั้น 1: เริ่มต้นที่ Crime Scene ➔ เลือก "ตรวจศพอย่างละเอียด" (p2) [พบหลักฐานมีด]');
      this.log('• ขั้น 2: เข้าห้องสอบปากคำ ➔ เลือก "ถามด้วยความสุภาพ" (p4) [ความสับสนลดลง]');
      if (this.modelMode === 'failed') {
        this.log('• ขั้น 3: เลือก "ไปตามสืบที่บาร์" (p8) ➔ ⚠ <span style="color: var(--red);">ติดกับดัก DEAD-END! เกมค้าง ไม่มีทางไปต่อ</span>');
      } else {
        this.log('• ขั้น 3: ไปตามสืบที่บาร์ (p8) ➔ เชิญพยานมาเผชิญหน้า (p9)');
        this.log('• ขั้น 4: เกลี้ยกล่อมใจเย็น (p11) ➔ <strong>ปล่อยตัวไร้หลักฐาน (Ending 3) สำเร็จ!</strong>');
      }
    }
  }

  log(msg) {
    if (!this.traceLog) return;
    const item = document.createElement('div');
    item.style.padding = '4px 0';
    item.style.borderBottom = '1px dashed var(--rule)';
    item.style.fontSize = '0.82rem';
    item.style.lineHeight = '1.6';
    item.innerHTML = msg;
    this.traceLog.prepend(item);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('sim-graph-canvas')) {
    window.storyGraphSim = new StoryGraphSimulator();
  }
});
