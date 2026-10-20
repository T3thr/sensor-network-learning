/**
 * 305432 เครือข่ายเซนเซอร์ (Sensor Networks)
 * Interactive Sensor Association & Consensus Simulator Engine
 */

class SensorAssociationSimulator {
  constructor() {
    this.scenarios = {
      normal: {
        name: "1. สภาพปกติ (Normal)",
        sensors: [
          { id: "S1", name: "อุณหภูมิห้อง A", val: "24.5 °C", status: "normal", fp: "00000000", err: "0.02" },
          { id: "S2", name: "อุณหภูมิห้อง B", val: "24.8 °C", status: "normal", fp: "00000000", err: "0.03" },
          { id: "S3", name: "เซนเซอร์วัดแสง", val: "310 Lux", status: "normal", fp: "00000000", err: "0.01" },
          { id: "S4", name: "เซนเซอร์วัดควัน/ก๊าซ", val: "12 ppm", status: "normal", fp: "00000000", err: "0.04" }
        ],
        decision: "normal",
        badgeText: "สภาวะปกติ (NORMAL)",
        badgeClass: "normal",
        explanation: "ค่าการวัดของทุกเซนเซอร์สอดคล้องกับพฤติกรรมในอดีต Reconstruction error อยู่ในเกณฑ์ปกติ ไม่มี Anomaly ตรวจพบ",
        rootCause: "สภาพแวดล้อมและอุปกรณ์ทำงานปกติสมบูรณ์"
      },
      fire: {
        name: "2. เหตุการณ์สิ่งแวดล้อมจริง (EA: ไฟไหม้)",
        sensors: [
          { id: "S1", name: "อุณหภูมิห้อง A", val: "78.5 °C ▲", status: "anomaly", fp: "00111111", err: "0.89" },
          { id: "S2", name: "อุณหภูมิห้อง B", val: "74.2 °C ▲", status: "anomaly", fp: "00111111", err: "0.82" },
          { id: "S3", name: "เซนเซอร์วัดแสง", val: "880 Lux ▲", status: "anomaly", fp: "00111101", err: "0.76" },
          { id: "S4", name: "เซนเซอร์วัดควัน/ก๊าซ", val: "245 ppm ▲", status: "anomaly", fp: "00111111", err: "0.95" }
        ],
        decision: "ea",
        badgeText: "ENVIRONMENTAL ANOMALY (EA)",
        badgeClass: "ea",
        explanation: "เซนเซอร์ทั้งหมดในกลุ่มที่สัมพันธ์กัน (Cluster) มี Fingerprint พุ่งขึ้นและ Reconstruction error สูงสอดคล้องกันพร้อมกัน",
        rootCause: "เกิดการเปลี่ยนแปลงทางกายภาพจริงในสิ่งแวดล้อม (ไฟไหม้) → ระบบส่งสัญญาณแจ้งเตือนภัยพิบัติทันที!"
      },
      fault: {
        name: "3. เซนเซอร์ตัวเดียวเสีย (SDA: Faulty Sensor)",
        sensors: [
          { id: "S1", name: "อุณหภูมิห้อง A", val: "94.2 °C ▲", status: "anomaly", fp: "01111111", err: "0.94" },
          { id: "S2", name: "อุณหภูมิห้อง B", val: "24.6 °C", status: "normal", fp: "00000000", err: "0.02" },
          { id: "S3", name: "เซนเซอร์วัดแสง", val: "312 Lux", status: "normal", fp: "00000000", err: "0.01" },
          { id: "S4", name: "เซนเซอร์วัดควัน/ก๊าซ", val: "14 ppm", status: "normal", fp: "00000000", err: "0.03" }
        ],
        decision: "sda",
        badgeText: "SENSING DEVICE ANOMALY (SDA)",
        badgeClass: "sda",
        explanation: "มีเพียงเซนเซอร์ S1 (อุณหภูมิ A) ที่รายงานค่าผิดปกติเพียงตัวเดียว ขณะที่เซนเซอร์พยานอีก 3 ตัวในคลัสเตอร์รายงานค่าปกติอย่างสอดคล้องกัน (มติ 3 ต่อ 1)",
        rootCause: "ตัวเซนเซอร์ S1 เสียหาย ฮาร์ดแวร์ลัดวงจร หรือทรานสมิตเตอร์เพี้ยน → กรองทิ้ง ไม่ส่ง False Alarm เตือนไฟไหม้ปลอม!"
      },
      attack: {
        name: "4. การโจมตีประสานงาน (Coordinated Attack)",
        sensors: [
          { id: "S1", name: "อุณหภูมิห้อง A", val: "85.0 °C ▲", status: "anomaly", fp: "00111111", err: "0.85" },
          { id: "S2", name: "อุณหภูมิห้อง B", val: "82.0 °C ▲", status: "anomaly", fp: "00111111", err: "0.80" },
          { id: "S3", name: "เซนเซอร์วัดแสง", val: "310 Lux (ปกติ)", status: "normal", fp: "00000000", err: "0.02" },
          { id: "S4", name: "เซนเซอร์วัดควัน/ก๊าซ", val: "210 ppm ▲", status: "anomaly", fp: "00111111", err: "0.91" }
        ],
        decision: "attack",
        badgeText: "FALSE EA DETECTED (BYZANTINE ATTACK)",
        badgeClass: "sda",
        explanation: "ผู้โจมตีเข้าควบคุมเซนเซอร์ 3 ใน 4 ตัวและปลอมแปลงค่าให้อุณหภูมิและควันสูงสอดคล้องกัน ทำให้ Consensus Algorithm หลงเชื่อว่าเป็นไฟไหม้จริง",
        rootCause: "ช่องโหว่ความปลอดภัยระดับสถาปัตยกรรม (Threat Model Limit) ตามที่ระบุในข้อจำกัดของ Paper!"
      }
    };

    this.initDOM();
  }

  initDOM() {
    this.scenarioBtns = document.querySelectorAll('.btn-scenario');
    this.nodeGrid = document.getElementById('sim-node-grid');
    this.badgeEl = document.getElementById('consensus-badge');
    this.explanationEl = document.getElementById('consensus-explanation');
    this.rootCauseEl = document.getElementById('consensus-rootcause');

    if (this.scenarioBtns.length) {
      this.scenarioBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const scenarioKey = btn.getAttribute('data-scenario');
          this.loadScenario(scenarioKey);
        });
      });
      // Load default normal scenario
      this.loadScenario('normal');
    }
  }

  loadScenario(key) {
    const data = this.scenarios[key];
    if (!data) return;

    // Update active button
    this.scenarioBtns.forEach(b => {
      if (b.getAttribute('data-scenario') === key) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    // Render Nodes
    if (this.nodeGrid) {
      this.nodeGrid.innerHTML = '';
      data.sensors.forEach(s => {
        const card = document.createElement('div');
        card.className = `sim-sensor-card ${s.status === 'anomaly' ? 'has-anomaly' : 'normal'}`;
        card.innerHTML = `
          <div class="sim-sensor-header">
            <span class="sim-sensor-name">${s.name} (${s.id})</span>
            <span class="academic-badge ${s.status === 'anomaly' ? 'badge-primary' : ''}">${s.status === 'anomaly' ? 'Anomaly' : 'Normal'}</span>
          </div>
          <div class="sim-sensor-val">${s.val}</div>
          <div style="font-size: 0.80rem; color: var(--ink-muted);">Reconstruction Error: <strong>${s.err}</strong></div>
          <div class="sim-fingerprint-box">
            Fingerprint: <strong>${s.fp}</strong>
          </div>
        `;
        this.nodeGrid.appendChild(card);
      });
    }

    // Render Consensus Result
    if (this.badgeEl) {
      this.badgeEl.className = `consensus-decision-badge ${data.badgeClass}`;
      this.badgeEl.innerText = data.badgeText;
    }

    if (this.explanationEl) {
      this.explanationEl.innerHTML = `<strong>ผลการวิเคราะห์ฉันทามติ (Consensus Analysis):</strong> ${data.explanation}`;
    }

    if (this.rootCauseEl) {
      this.rootCauseEl.innerHTML = `<strong>การระบุต้นเหตุ (Root Cause Identification):</strong> ${data.rootCause}`;
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('sim-node-grid')) {
    window.sensorSimulator = new SensorAssociationSimulator();
  }
});
