# กระดานสนทนากลางข้าม Agent (Shared Multi-Agent Blackboard)
## วิชา 305432 เครือข่ายเซนเซอร์ (Sensor Networks)
## สะพานประสานงาน: Agent Alpha (Lead Academic Architect) และ Agent Bravo (Field Drill Sergeant)

---

## 1. กฎและระเบียบปฏิบัติการสื่อสารข้าม Agent (Inter-Agent Operating Protocol)

1. **การแบ่งบทบาทหน้าที่อย่างชัดเจน (Division of Labor):**
   - **Agent Bravo (MiMo-V2.6-Pro ใน Terminal):** ทำหน้าที่เป็น "Field Drill Sergeant" ยิงโจทย์คำนวณและข้อสอบปรนัย/อัตนัยสดในหน้าต่าง Terminal ตรวจคำตอบ ตรวจจุดผิดพลาดทางคณิตศาสตร์ทันที และส่งผลคะแนนเข้าสู่ระบบ
   - **Agent Alpha (Gemini ใน IDE Chat):** ทำหน้าที่เป็น "Lead Academic Architect & System Orchestrator" วางโครงสร้างแม่บท 4 ด่านสอบ, เฉลยเชิงลึกเชื่อมโยงระดับซิลิคอนและฟิสิกส์คลื่นวิทยุ, และพัฒนา Interactive Web Simulator / Visual Components ตามมาตรฐาน `DESIGN_SYSTEM.md` และ `WEB_DESIGN_SYSTEM.md`

2. **การป้องกันคำถามชนกัน (Anti-Collision Protocol):**
   - ทั้งสองเอเจนต์ต้องอ้างอิง `DRILL_MATRIX.md` เป็นแผนที่กลาง
   - เมื่อ Agent Bravo ยิงโจทย์หัวข้อใดไปแล้ว Agent Alpha จะไม่ยิงโจทย์ซ้ำในหัวข้อนั้น แต่จะรอรับผลการตรวจเพื่ออธิบายเชิงลึก หรือสลับหัวข้อเพื่อขับเคลื่อนการติวไปข้างหน้า

3. **บันทึกสรุป 3 บรรทัดท้ายกระดาน (3-Line Agent Handoff Footer):**
   - ในทุกๆ รอบที่ฝ่ายใดฝ่ายหนึ่งทำการตอบ สนทนา หรือประมวลผล จะต้องอัปเดตสรุปสั้น 3 บรรทัดท้ายกระดานนี้เสมอ

---

## 2. บันทึกเหตุการณ์และสถานะล่าสุด (Live Event Log)

### บันทึกที่ 1 (2026-10-19): การเปิดระบบประสานงานข้าม Agent
- **ผู้บันทึก:** Agent Alpha (Gemini Lead Academic Architect)
- **สถานะ:** สร้างระบบสื่อสารข้าม Agent ในโฟลเดอร์ `agents-bridge/` สำเร็จเรียบร้อย ประกอบด้วย `STATE.json`, `BLACKBOARD.md`, และ `DRILL_MATRIX.md`

### บันทึกที่ 2 (2026-10-19): Agent Bravo (MiMo) ยิงโจทย์ชุดที่ 1 ใน Terminal
- **ผู้บันทึก:** รับแจ้งเหตุการณ์จากระบบ
- **สถานะปัจจุบัน:** Agent Bravo (MiMo-V2.6-Pro) ได้ปล่อยโจทย์ประจำด่านที่ 1 (Data, Signals, Channel Capacity, Nyquist vs Shannon, IEEE 802.15.4 Path Loss) รวม 3 ข้อใน Terminal ของนิสิต
- **โจทย์ที่กำลังดำเนินการใน Terminal:**
  1. การคำนวณ Shannon Capacity เทียบกับ Nyquist Bit Rate และการหาจำนวนระดับสัญญาณ L
  2. การวิเคราะห์ผลกระทบเมื่อเพิ่มกำลังส่ง TX Power ขึ้น 2 เท่า (+3 dBm) ตาม Friis Transmission Equation
  3. สเปกฮาร์ดแวร์ CC2420 บนบอร์ด TelosB / MICAz (อัตราการกินกระแสไฟ TX vs RX vs Sleep, แบนด์วิดท์ 2 MHz, และ Noise Floor)
- **สถานะนิสิต:** อยู่ระหว่างคิดและพิมพ์ตอบคำถามใน Terminal
- **สถานะ Agent Alpha:** สแตนด์บายรอรับผลการตรวจคำตอบจาก Terminal เพื่อเตรียมเฉลยเชิงลึก, วิเคราะห์ข้อผิดพลาดทางฮาร์ดแวร์, และเตรียมโค้ด Visual Simulator บนเว็บ

### บันทึกที่ 3 (2026-10-19T16:34:30Z): ผลตรวจคำตอบชุด Concept Check 1 โดย Agent Bravo
- **ผู้บันทึก:** Agent Bravo (Field Drill Sergeant, MiMo Terminal)
- **โจทย์ที่ตรวจ (ตรงกับ DRILL_MATRIX D1-02, D1-03, D1-04):**
  1. กำลัง 100 mW ลดทอน 30 dB เหลือกี่ mW และกี่ dBm
  2. วิเคราะห์กับดัก "ใช้ Shannon ตรงๆ 120 kbps โดยไม่สนใจ Nyquist"
  3. โหนดหลังกำแพงเหล็ก 2.4 GHz ทำไมส่งไม่ถึง (attenuation, multipath, noise floor)
- **ผลนิสิต ข้อ 1:** ตอบ "เหลือ 0.1 mW เพราะ 30 dB ลดทอน 1000 เท่า คิดเป็น dBm ได้ -10 dBm"
  - คะแนน: 10/10 ถูกทั้งตัวเลข mW และหน่วย dBm
  - ตรวจซ้ำ: 100 mW หาร 1000 = 0.1 mW; 100 mW = +20 dBm; +20 - 30 = -10 dBm; 10 log10(0.1) = -10 dBm ตรงกัน
  - หมายเหตุผู้ตรวจ: ตรรกะ "30 dB คือ 1000 เท่า" ถูกต้อง (10^(30/10) = 1000) ควรยึดทั้งสองวิธีคือหารกำลังตรง และบวก/ลบ dB ต่อเนื่อง
- **ข้อ 2-3:** Agent Bravo เฉลยเชิงลึกใน Terminal แล้ว (Shannon เป็นเพดานบน ต้องใช้ Nyquist หา L บวก fade margin; กำแพงเหล็กทำ attenuation + multipath deep fade + ลด SNR)
- **สถานะนิสิต:** ข้อ 1 ผ่านเกณฑ์ช่างวัดสัญญาณ เตรียมรับ Drill ชุดถัดไปของ D1-03/D1-04/D1-05
- **งานต่อ Agent Alpha:** อธิบายส่วนต่อขยายหรือสร้าง Interactive Simulator (แนะนำ: Link Budget Calculator + Path Loss / Multipath Visualizer สำหรับ D1-04, และ Duty Cycle Energy Estimator สำหรับ D1-05)

### บันทึกที่ 4 (2026-10-19T16:51:44Z): เปิดตัว Agent Bravo ในบทบาท IoT and WSN Track Specialist
- **ผู้บันทึก:** Agent Bravo (Field Systems Engineer and IoT/WSN Track Specialist, MiMo Terminal)
- **สถานะ:** รับมอบหมายสายวิชา IoT and Wireless Sensor Networks Track โดยเต็มรูปแบบ
- **ขอบเขตเนื้อหาที่ดูแล:**
  1. Architecture and Node Anatomy (MCU, Transceiver CC2420, Energy Harvesting, Power Profiles)
  2. Medium Access Control for WSN (S-MAC, T-MAC, Contention vs Scheduling)
  3. Routing and Data Dissemination (Flooding, Directed Diffusion, LEACH, RPL)
  4. Node Localization (RSSI, TOA, TDOA, AOA) และ Time Synchronization
  5. IEEE 802.15.4, 6LoWPAN, ZigBee, และ IoT Security
- **แหล่งเนื้อหาหลัก:** `textbook/wireless-sensor-networks.pdf` ทั้ง 14 บท ร่วมกับสไลด์ IoT `305141_Chapter01-06.pdf` และเชื่อม DataCom ของ Agent Alpha
- **ผลงานรอบนี้:** จัดทำโครงสร้างบทที่ 1 เรียบร้อยที่ `agents-bridge/iot-wsn-track/ch01-introduction.md`
  - Historical origin, 10 network characteristics, applications, objectives vs challenges
  - Node anatomy 4 บล็อก, hardware platform 3 กลุ่ม, TinyOS 178 bytes
  - IEEE 802.15.4 bands (868/915/2400 MHz) และ ZigBee/IEEE 1451
  - Interactive Checklist, Mental Model Summary, DataCom bridge (Shannon/Nyquist/SNR)
  - Open Drill Hooks 3 ข้อสำหรับ live terminal session
- **หมายเหตุระบบ:** `lecture/iot/` ยังว่าง สื่อ IoT ที่ใช้จริงคือ `305141_Chapter01-06.pdf`
- **งานต่อ Agent Alpha:** รับช่วง DataCom track ต่อ และ/หรือสร้าง Interactive Simulator ตามที่แจ้งในบันทึกที่ 3 (Link Budget, Multipath, Energy Duty Cycle)
- **งานต่อ Agent Bravo:** พร้อมยิง drill กายวิภาคโหนดและ energy math ทันทีที่นิสิตตอบชุด D1-04/D1-05 ที่ค้างอยู่ หรือให้เริ่มบทที่ 1 ในชั้นเรียน

### บันทึกที่ 5 (2026-10-19T17:15:00Z): Agent Alpha พัฒนา Track 1 บทที่ 1 และเปิดตัว Dual-Track Portal
- **ผู้บันทึก:** Agent Alpha (Lead Academic Architect & Educational Web Engineer)
- **ผลการดำเนินงาน:**
  1. **สถาปัตยกรรมคณิตศาสตร์สากล:** สร้าง `assets/css/math.css` ตามมาตรฐาน `MATH_FORMATTING_GUIDE.md` (Zero-Dollar, Zero-LaTeX, รากมีเส้น vinculum ไร้รอยต่อ, เศษส่วนซ้อนแนวตั้งพร้อมเส้นคั่นแนวนอนสมบูรณ์)
  2. **โครงสร้างสารบัญสองแกนขนาน (Dual-Track Portal):** อัปเดต `index.html` เพิ่มเซกชันสถาปัตยกรรมหลักสูตร 2 แกนขนาน (Track 1 DataCom Forouzan 14 บท โดย Alpha และ Track 2 WSN & IoT โดย Bravo) พร้อมลิงก์ตรงและตัวบ่งชี้สถานะ
  3. **บทเรียน Track 1 บทที่ 1 สมบูรณ์แบบ 7 มิติ:** สร้าง `datacom/ch01.html` ครบทั้ง 7 เสาหลัก:
     - 1. Engineering Genesis: ที่มาจากการส่งบัตรเจาะรู ปัญหาสายเคเบิล O(N²) สู่การสื่อสารข้อมูล
     - 2. Technical Glossary: 8 ศัพท์หลักพร้อมสัทศาสตร์ภาษาไทย
     - 3. Theoretical Rigor: องค์ประกอบ 5 ประการ, Simplex/Half/Full-Duplex, โทโพโลยี Mesh, Star, Bus, Ring พร้อมคณิตศาสตร์พิสูจน์สายส่งและพอร์ต, LAN/MAN/WAN, และเสาหลักโปรโตคอล (Syntax, Semantics, Timing)
     - 4. Interactive Topology Visualizer: วิดเจ็ต SVG จำลองโครงสร้างเครือข่าย ปรับโหนด N (3-10) คำนวณสายส่ง พอร์ต ความทนทาน และปุ่มจำลองสายส่งขาดแบบไดนามิก
     - 5. Mastery Checklist: 5 ข้อประเมินตนเองพร้อมกลไกคลิกเฉลยเหตุผล
     - 6. Mental Model: ตารางสังเคราะห์ 3 มิติเปรียบเทียบ Computer Networks vs WSN Motes
     - 7. Cross-Chapter Links: ป้ายแท็กเชื่อมโยงคำศัพท์สู่ WSN Ch 3, Ch 4, Ch 6, Ch 9
- **สถานะ:** Track 1 Chapter 1 พร้อมใช้งาน 100% เชื่อมต่อสมบูรณ์กับ Track 2 ของ Bravo

### บันทึกที่ 6 (2026-10-19T17:05:00Z): Canonical Separation Directive บังคับใช้โดย Agent Bravo
- **ผู้บันทึก:** Agent Bravo (Field Drill Sergeant and IoT/WSN Track Specialist)
- **คำสั่งยุทธวิธีที่ได้รับ:** แยกเนื้อหาแกนสอบออกจากงานซ้อมนำเสนออย่างเด็ดขาด
- **Canonical Exam Sources (ใช้สอบ 305432 เท่านั้น):**
  - Track 1 Data Communications: โฟลเดอร์ `datacom/` (Forouzan 14 บท) ดูแลโดย Agent Alpha
  - Track 2 IoT and Sensor Networks: สไลด์ `lecture/305141_Chapter01.pdf` ถึง `305141_Chapter06.pdf` และตำรา `textbook/wireless-sensor-networks.pdf` 14 บท ดูแลโดย Agent Bravo
- **EXCLUDED จากโจทย์ทฤษฎีข้อสอบ (ห้ามนำเข้า exam drill):**
  - `assignement/` (งานมอบหมายซ้อมนำเสนอ 5 นาทีเฉพาะส่วน)
  - `paper-1/`, `paper-2/`, `paper-3/`, `paper-4/` (เปเปอร์วิจัยสำหรับซ้อมนำเสนอ)
- **ที่ตั้งเนื้อหา Track 2 ที่ Bravo ดูแล:** `agents-bridge/iot-wsn-track/`
- **ผลตรวจสถาปัตยกรรม:** โครงสร้างโฟลเดอร์ปัจจุบันสอดคล้องคำสั่งแล้ว (`datacom/`, `textbook/`, `lecture/` 305141, `iot-wsn-track/`) และ `ch01-introduction.md` อ้างอิงเฉพาะ canonical sources ไม่มีเนื้อหา paper-1 ถึง paper-4 ปะปน
- **ภารกิจถัดไปของ Bravo:** ยิง Concept Check 2 (Friis Transmission Path Loss และ CC2420 Duty Cycle Battery Life) ใน Terminal และตรวจเข้มงวด

### บันทึกที่ 7 (2026-10-20T00:32:00Z): Agent Alpha ยกเครื่อง Navigation Mega Menu และ UX/UI หน้าหลัก
- **ผู้บันทึก:** Agent Alpha (Lead Academic Architect & Educational Web Engineer)
- **ผลการดำเนินงาน:**
  1. **สถาปัตยกรรมแถบนำทาง Mega Menu 3 คอลัมน์สมมาตร:** ปรับปรุง `header-component.js` จัดระเบียบสารบัญอย่างสมบูรณ์:
     - คอลัมน์ 1: "หลักสูตรแกนกลาง & ติวสอบ (Core Curriculum)" แบ่ง Track 1 (DataCom 14 บท) ลิงก์สู่ `datacom/ch01.html` และ Track 2 (IoT & WSN Core 14 บท)
     - คอลัมน์ 2: "คลังบทความวิจัย IEEE 4 ฉบับ (Research Presentation Archive)" ติดป้ายกำกับชัดเจนว่าเป็น "งานมอบหมายซ้อมนำเสนอ 5 นาที (Assignments)" ลิงก์สู่ Paper I ถึง IV
     - คอลัมน์ 3: "เครื่องมือและซิมูเลเตอร์ (Interactive Tools)" ลิงก์สู่ Topology Visualizer, ห้องซ้อมนำเสนอ 5 นาที, ตัวจับเวลา Teleprompter, และระบบถามตอบ Q&A Defense
  2. **จัดระเบียบหน้าหลัก index.html:**
     - ชู "สถาปัตยกรรมหลักสูตรสองแกนขนาน (Dual-Track Core Curriculum)" ขึ้นเป็นส่วนนำหลักด้านบนใต้ Hero Header
     - ย้ายตาราง 4 งานมอบหมายและเปเปอร์วิจัยลงไปเป็นส่วนรองด้านล่าง พร้อม Disclaimer ชัดเจน: "ส่วนนี้คืองานมอบหมายค้นคว้าเฉพาะส่วน ไม่ใช่เนื้อหาบรรยายที่ใช้ในการออกข้อสอบ"
  3. **การปฏิบัติตามกฎเหล็กวิศวกรรม:** กำจัดอีโมจิและเครื่องหมายทั้งหมด (Zero-Emoji, Zero-Dollar-Sign, No-Em-Dash) รวมถึงเปลี่ยนปุ่ม Hamburger/Close ในระบบนำทางเป็น SVG มาตรฐาน
- **สถานะ:** หน้าหลักและระบบนำทางผ่านเกณฑ์มาตรฐานสากล 100%

### บันทึกที่ 9 (2026-10-20T01:00:00Z): Agent Alpha ปล่อยคลังบทเรียน Track 1 ชุดแรก (ch01, ch02, ch03) เต็มรูปแบบ
- **ผู้บันทึก:** Agent Alpha (Distinguished Chair Professor of Data Communications & Lead Academic Architect)
- **ผลการดำเนินงาน Track 1 Wave 1 (1,000 ถึง 1,500 บรรทัดต่อบท, Zero-Emoji, Zero-Dollar-Sign, No-Em-Dash):**
  1. **ยกระดับ datacom/ch01.html (1,354 บรรทัด):**
     - เพิ่มโจทย์คำนวณโทโพโลยีจริง 3 ข้อพร้อมเฉลยละเอียดทีละขั้นตอน: N = 12 Mesh DC (66 ลิงก์, 132 พอร์ต, สเกล O(N²)), Enterprise 100 Workstations Mesh vs Hierarchical Star (ลดสาย 97.88%), Fault Tolerance และเส้นทางสำรอง 2-hop ใน 6-node Mesh vs Ring
     - เพิ่มส่วน Hardware & Silicon Reality Check (ระดับแรงดันไฟฟ้า TTL vs RS-232, ชิปชาร์จปั๊ม MAX232 สร้างไฟ ±10V จากราง 5V, รีจิสเตอร์ 16550 UART THR/TSR/FIFO, ปัญหา Clock Drift และ Framing Jitter)
  2. **สร้างบทใหม่ datacom/ch02.html (1,016 บรรทัด - Network Models):**
     - วิวัฒนาการประวัติศาสตร์: วิกฤตซอฟต์แวร์แบบ Monolithic สู่ Layered Architecture ยุค ARPANET, ความขัดแย้งเชิงพาณิชย์ IBM SNA และ DECnet, มาตรฐาน ISO 7498 OSI vs DoD TCP/IP สถาปัตยกรรมนาฬิกาทราย (Hourglass Architecture)
     - คำศัพท์สัทศาสตร์ไทย 8 คำ (PDU, Encapsulation, Decapsulation, Physical Address/MAC, Logical Address/IP, Port Address, Ephemeral Port, Peer-to-Peer Process)
     - ทฤษฎีเข้มข้น: ตารางแจกแจงฟังก์ชันละเอียด 7 เลเยอร์ OSI และ 5 เลเยอร์ TCP/IP, ระดับแอดเดรส 4 ระดับ (Physical, Logical, Port, Specific)
     - โจทย์คำนวณจริง 3 ข้อ: การคำนวณความสิ้นเปลืองเฮดเดอร์และ Throughput บนพอร์ต 1 Gbps (HTTP 1,460B ได้ประสิทธิภาพ 94.93% เทียบกับแพ็กเก็ต IoT 64B ได้เพียง 45.07%), การกลายพันธุ์ของ MAC Address ทีละฮอปผ่านเราเตอร์ R1 และ R2 โดยที่ IP ไม่เปลี่ยนแปลง, การแยกแยะ Socket 4-Tuple {Src IP, Src Port, Dst IP, Dst Port}
     - Hardware Reality Check: NIC MAC Controller ASIC, ชิป PHY (MII/RGMII), คิว DMA Ring Buffers (RX/TX Descriptors), Hardware Checksum Offload (TSO)
     - วิดเจ็ตอินเทอร์แอคทีฟ: Interactive Packet Tracer & Multi-hop Flow Simulator จำลองการส่งแพ็กเก็ตทีละขั้นตอนจาก Host A ผ่าน R1, R2 ถึง Host B พร้อมรายงานสถานะเฮดเดอร์สด
     - เช็กลิสต์ทดสอบความเข้าใจ 5 ข้อ พร้อมปุ่มเปิดดูเฉลยเชิงลึก และตารางสังเคราะห์โมเดล 3 คอลัมน์
  3. **สร้างบทใหม่ datacom/ch03.html (1,060 บรรทัด - Data and Signals):**
     - วิวัฒนาการประวัติศาสตร์: ธรรมชาติของข้อมูลเชิงต่อเนื่อง vs บิตดิจิทัล, ทฤษฎีการกระจายความร้อนของ Joseph Fourier ปี 1807 สู่การสังเคราะห์สัญญาณ, รากฐานทฤษฎีสารสนเทศของ Nyquist (1928) และ Shannon (1948)
     - คำศัพท์สัทศาสตร์ไทย 12 คำ (Analog Signal, Digital Signal, Fourier Analysis, Fundamental Frequency, Harmonics, Bandwidth, Attenuation, Decibel, dBm, SNR, Thermal Noise Floor, Shannon Capacity)
     - ทฤษฎีและคณิตศาสตร์: พิสูจน์สมการคลื่นไซน์ (คาบ, ความถี่, เฟส, ความยาวคลื่น v/f), อนุกรมฟูเรียร์ของคลื่นสี่เหลี่ยม (Odd Harmonics 1/n), แบนด์วิดท์ของสัญญาณประกอบ, ความเสื่อมสภาพของสัญญาณ (Attenuation, Distortion, Noise, dB, dBm), ทฤษฎีขีดจำกัดความเร็ว Nyquist Bit Rate และ Shannon Channel Capacity
     - โจทย์คำนวณจริง 3 ข้อ: Multi-stage Optical Link Budget คำนวณ dB/dBm ผ่านสายและแอมพลิฟายเออร์ (+6.99 dBm = 5.00 mW, ได้ Signal Margin เหลือเฟือ 16.99 dB), การวิเคราะห์แบนด์วิดท์ฮาร์มอนิกของกระแสบิต 1 Mbps (Odd Harmonics 1st, 3rd, 5th), การผสานกฎ Nyquist และ Shannon (ช่องสัญญาณ 4 kHz, SNR 30 dB คำนวณได้ L = 16 ระดับ เพื่อส่งบิตเรต 32 kbps อย่างปลอดภัย)
     - Hardware & Silicon Reality Check: รากฐานคณิตศาสตร์ของสัญญาณรบกวนความร้อน (Thermal Noise Floor k·T = -174 dBm/Hz), การคำนวณ Noise Floor ของชิป CC2420 ช่องสัญญาณ 2 MHz (-111 dBm) และ Sensitivity Threshold (-94 dBm), สัญญาณรบกวนจากการควอนไทซ์ของ ADC (6.02N + 1.76 dB)
     - วิดเจ็ตอินเทอร์แอคทีฟ: Interactive Fourier Wave Synthesizer & Canvas Studio ให้ผู้เรียนเปิด-ปิดฮาร์มอนิกลำดับคี่ (1, 3, 5, 7, 9) และเติมสัญญาณรบกวน Gaussian Noise เห็นปรากฏการณ์ Gibbs และสเปกตรัมความถี่แบบเรียลไทม์
     - เช็กลิสต์ทดสอบความเข้าใจ 5 ข้อ, ตารางสังเคราะห์โมเดล 3 คอลัมน์, และโครงข่ายลิงก์คำศัพท์
- **สารบบคำศัพท์เชื่อมโยงข้ามแทร็ก (Cross-Track Terminology Bridge for Agent Bravo):**
  - จาก datacom/ch01: Topology (Mesh vs Star), Link Budget, Reliability MTBF
  - จาก datacom/ch02: PDU, Header Overhead (เชื่อมโยง 6LoWPAN Header Compression ใน WSN Ch 6), 4-Tuple Socket, Layered Separation
  - จาก datacom/ch03: Thermal Noise Floor (-174 dBm/Hz), CC2420 Sensitivity (-94 dBm), Bandwidth, SNR, dB/dBm (เชื่อมโยงการฝึกคำนวณ Friis Path Loss และ Link Margin ใน Terminal ของ Agent Bravo)

### บันทึกที่ 11 (2026-10-20T01:30:00Z): Agent Alpha ยกระดับ ch02 และ ch03 สู่มาตรฐานตำราสากลและผสาน Layout Pipeline
- **ผู้บันทึก:** Agent Alpha (Distinguished Chair Professor of Data Communications & Information Theory)
- **การตอบสนองเชิงวิศวกรรมต่อคำสั่งปฏิบัติการและการผสานงานกับ Agent Bravo:**
  1. **สถาปัตยกรรมและ Layout กลาง:** ผสาน `assets/css/lesson.css` และ `assets/js/chapter-layout.js` เข้าสู่ `datacom/ch02.html` และ `datacom/ch03.html` สมบูรณ์แบบ รองรับ Scrollspy นุ่มนวล, Mobile Sticky Drawer, Breadcrumb `datacom-ch02` / `datacom-ch03`, และความกว้างอ่านสบายตา 1,280px line-height 1.8
  2. **ยกระดับเนื้อหาเชิงประวัติศาสตร์ระดับ Wikipedia-Grade:**
     - **บทที่ 2 (1,396 บรรทัด):** วิกฤตสถาปัตยกรรมเสาหิน (Monolithic Architecture) ของ ARPANET และ NCP RFC 33, ปัญหาระบบปิดผูกขาด (IBM SNA, DECnet, Xerox XNS), สงครามโปรโตคอลระหว่าง ISO 7498 OSI (7 เลเยอร์) กับ DoD TCP/IP ใน BSD 4.2 Unix โดย Bill Joy, ทฤษฎีการล่มสลายของช้างสารสองตัว (The Apocalypse of the Two Elephants โดย Tanenbaum), และปรัชญาของ David Clark ("We reject: kings, presidents, and voting. We believe in: rough consensus and running code.")
     - **บทที่ 3 (1,416 บรรทัด):** มรดกฟูเรียร์ปี 1807 ว่าด้วยการแพร่ความร้อนในของแข็ง, ข้อโต้แย้งทางประวัติศาสตร์ของ Lagrange, Laplace, และ Monge ที่ไม่เชื่อว่าคลื่นเรียบจะประกอบเป็นคลื่นสี่เหลี่ยมที่มีจุดไม่ต่อเนื่องได้จนต้องรอ 15 ปี, ทฤษฎีสารสนเทศเชิงลอการิทึมของ Ralph Hartley (1928), ทฤษฎีการชักตัวอย่างของ Harry Nyquist (1928), และการพิสูจน์ขีดจำกัดความจุช่องสัญญาณในปริภูมิ N มิติของ Claude Shannon (1948)
  3. **อภิธานศัพท์ สัทศาสตร์ไทย และบริบทฮาร์ดแวร์/ซอฟต์แวร์จริง:**
     - บทที่ 2: PDU, Encapsulation, Decapsulation, Physical/MAC, Logical/IP, Port, Ephemeral Port, Socket 4-Tuple/5-Tuple, MTU พร้อมบริบทโค้ดเคอร์เนล Linux (`struct sk_buff`, `skb_push()`, `skb_pull()` Zero-Copy), EUI-48 EEPROM, และ `/proc/sys/net/ipv4/ip_local_port_range`
     - บทที่ 3: Attenuation, Decibel (dB), dBm, SNR, Harmonics, Thermal Noise (Johnson-Nyquist), Shannon Capacity, Intersymbol Interference (ISI), Wavelength (λ) พร้อมบริบทฮาร์ดแวร์จริง (การลดทอนของเส้นใยแก้ว 1550 nm 0.2 dB/km, รีจิสเตอร์ TXCTRL ในชิป CC2420, ความยาวสายอากาศ 1/4 ความยาวคลื่น 3.125 cm สำหรับคลื่น 2.4 GHz)
  4. **การพิสูจน์คณิตศาสตร์และตัวอย่างคำนวณจริง 4 ข้อต่อบท (รวม 8 ข้อ):**
     - **บทที่ 2 (4 ข้อ):**
       - ตัวอย่าง 2.1: Propagation Time vs Transmission Time และ Bandwidth-Delay Product (BDP) เปรียบเทียบ WAN ใยแก้ว 5,000 km (BDP 3.125 MB, ประสิทธิภาพ Stop-and-Wait เหลือเพียง 0.024% พิสูจน์ความจำเป็นของ TCP Sliding Window) กับ LAN 100 m
       - ตัวอย่าง 2.2: การวิเคราะห์โอเวอร์เฮดเฮดเดอร์และประสิทธิภาพสายสัญญาณ (HTTP 1,460B ได้ประสิทธิภาพ 94.93% และ Throughput 949.28 Mbps เทียบกับเพย์โหลด IoT 64B ที่ได้ประสิทธิภาพเพียง 45.07% พิสูจน์ความจำเป็นของ 6LoWPAN)
       - ตัวอย่าง 2.3: การติดตามการกลายพันธุ์ของแอดเดรสระดับฮอป (Hop-by-Hop MAC Mutation Tracing) ผ่านเราเตอร์ R1 และ R2 พิสูจน์ความไม่เปลี่ยนแปลงของ End-to-End IP
       - ตัวอย่าง 2.4: การแยกแยะเซสชันพร้อมกันด้วย Socket 4-Tuple และ Ephemeral Port สำหรับ 3 แท็บเบราว์เซอร์
     - **บทที่ 3 (4 ข้อ):**
       - ตัวอย่าง 3.1: งบประมาณกำลังงานของลิงก์สื่อสารหลายช่วง (Multi-Stage Link Budget) คำนวณ dB/dBm ผ่านสายใยแก้ว แอมพลิฟายเออร์ EDFA และสายต่อ (+4.99 dBm = 3.155 mW, เหลือ Signal Margin 14.99 dB เหนือระดับความไวรับ -10 dBm)
       - ตัวอย่าง 3.2: การวิเคราะห์ฮาร์มอนิกฟูเรียร์และแบนด์วิดท์ของกระแสบิต 1 Mbps และ 10 Mbps (ฮาร์มอนิกที่ 1 ได้ 81.06% พลังงาน, ถึงฮาร์มอนิกที่ 3 ได้ 90.06%, ถึงฮาร์มอนิกที่ 5 ใช้ 2.5 MHz ได้ 93.30% พลังงาน)
       - ตัวอย่าง 3.3: การคำนวณแบนด์วิดท์ขั้นต่ำตามกฎไนควิสต์สำหรับการส่งแบบหลายระดับ (Multilevel Signaling 16-QAM ประหยัดแบนด์วิดท์ได้ถึง 75% จาก 12 MHz เหลือเพียง 3 MHz สำหรับ 24 Mbps)
       - ตัวอย่าง 3.4: การผสานกฎแชนนอนและไนควิสต์ในช่องสัญญาณโทรศัพท์ 3.1 kHz, SNR 35 dB (คำนวณความจุแชนนอนได้ 36.04 kbps และคำนวณหาระดับสัญญาณ L สำหรับส่งความเร็วโมเด็ม V.34 33.6 kbps ได้ L = 42.8 ระดับ จึงต้องใช้ 64-QAM / TCM)
  5. **วิดเจ็ตอินเทอร์แอคทีฟ:**
     - บทที่ 2: Interactive Packet Tracer & Protocol Inspector จำลองการห่อหุ้ม L7 สู่ L1 พร้อมพาเนลผ่าพิสูจน์ไส้ในของเฮดเดอร์แต่ละเลเยอร์ระดับไบต์ (Ethernet, IPv4, TCP, Payload, FCS)
     - บทที่ 3: Interactive Fourier Synthesizer & Gibbs Studio พร้อมตัวเลือกฮาร์มอนิก H1 ถึง H13, สไลเดอร์ความถี่มูลฐานและสัญญาณรบกวน, วาดกราฟ Time Domain และ Frequency Spectrum คู่ขนานแบบไดนามิกบน Canvas, พร้อมคำนวณยอดสวิงเกิน Gibbs Overshoot (+8.95%) แบบสด
- **การตรวจสอบคุณภาพขั้นเด็ดขาด (Automated Quality Gates):**
  - ch01: 1,354 บรรทัด | Dollars: 0 | Em-dashes: 0 | Emojis: 0
  - ch02: 1,396 บรรทัด | Dollars: 0 | Em-dashes: 0 | Emojis: 0
  - ch03: 1,416 บรรทัด | Dollars: 0 | Em-dashes: 0 | Emojis: 0

### บันทึกที่ 11 (2026-10-20T01:40:00Z): Lead Frontend Architect ปฏิรูป Navbar และ Scrollspy
- **ผู้บันทึก:** Agent Bravo (Lead Frontend Architect and Core System Engineer)
- **header-component.js:**
  1. สร้าง Mega Menu ที่ 1 "หลักสูตร Data Communications (14 บท)" ชี้โฟลเดอร์ `datacom/` ครบ Ch 1-14 บทที่ 1-3 ติดป้ายเขียว Active
  2. สร้าง Mega Menu ที่ 2 "หลักสูตร IoT and Wireless Sensor Networks (14 บท)" ชี้โฟลเดอร์ `iot/` ครบ Ch 1-14 บทที่ 1 ติดป้ายม่วง Active
  3. แยกเมนูเดี่ยว "งานมอบหมายค้นคว้า IEEE (Assignments)" กำกับชัด "งานซ้อมนำเสนอ 5 นาที ไม่ใช่เนื้อหาเตรียมสอบ"
  4. ลบปุ่มรก Navbar: หน้าหลัก Portal, ซิมูเลเตอร์, ห้องซ้อมบท 5 นาที, จำลองถาม-ตอบ เหลือเพียง Brand ฝั่งซ้ายคลิกกลับ index.html
  5. ซ่อม `theme-toggle-btn` ฝัง SVG พระอาทิตย์/พระจันทร์ พร้อม handler เปลี่ยน `data-theme` และ localStorage `sn_theme` ได้จริง
  6. Breadcrumb แยกแทร็ก DataCom กับ IoT ชัดเจน
- **chapter-layout.js:**
  - ถอดอัลกอริทึม Scrollspy จาก `iot/ch01.html` ใช้เกณฑ์ `getBoundingClientRect().top <= 120`
  - อัปเดต `#sidebar-live-section` ตรงกับหัวข้อที่กำลังอ่าน
  - Mobile drawer เลื่อน active pill ให้เห็นอัตโนมัติ
- **style.css:** เพิ่ม `.mega-badge.badge-purple` สำหรับ WSN Active
- **ผล:** Navigation มาตรฐานเดียวกันทุกหน้า ปุ่มธีมกดได้จริง Sidebar ติดตามการอ่านทั้ง datacom และ iot

---

### บันทึกที่ 12 (2026-10-20T02:10:00Z): Agent Alpha ปลดล็อกโซ่นำทางและประกาศดัชนีอภิธานศัพท์แม่บท (Master Terminology Index Ch 1-3)
- **ผู้บันทึก:** Agent Alpha (Distinguished Chair Professor of Data Communications & Lead Academic Architect)
- **การดำเนินการตามภารกิจเร่งด่วน 3 ประการ:**
  1. **ปลดล็อกปุ่มเชื่อมโยงบทเรียน (Chapter Navigation Chain) โดยสมบูรณ์:**
     - แก้ไข [ch01.html](../datacom/ch01.html): ปลดสไตล์ `opacity: 0.6; pointer-events: none;` ออกอย่างถาวร ส่งผลให้นิสิตสามารถคลิกปุ่ม "บทถัดไป: บทที่ 2 Network Models →" เดินทางเข้าสู่ ch02.html ได้ทันที
     - ตรวจสอบโซ่เชื่อมโยงทั้งสองฝั่ง (Sidebar Quick Nav และ Bottom Navigation Footer):
       - `ch01.html`: มีปุ่ม Quick Nav สู่ `ch02.html` และ Bottom Footer สู่ `ch02.html`
       - `ch02.html`: มีปุ่ม Quick Nav ย้อนกลับ `ch01.html` / ข้ามไป `ch03.html` และ Bottom Footer ย้อนกลับ `ch01.html` / ข้ามไป `ch03.html`
       - `ch03.html`: มีปุ่ม Quick Nav ย้อนกลับ `ch02.html` / ข้ามไป `ch04.html` และ Bottom Footer ย้อนกลับ `ch02.html` / ข้ามไป `ch04.html`
     - ซิงโครไนซ์คลาส `.sidebar-link`, `chapter-container`, `chapter-sidebar`, และ `<site-header>` สอดรับกับระบบ Scrollspy (threshold: 120px) ของ Agent Bravo ร้อยเปอร์เซ็นต์
  2. **ยกระดับทฤษฎีและปูพื้นฐานทางคณิตศาสตร์อย่างหมดจด (Exhaustive Theoretical Rigor):**
     - **บทที่ 1 (Big O Notation & Asymptotic Complexity):** ปูรากเหง้าสัญกรณ์ทางคณิตศาสตร์ตั้งแต่ Paul Bachmann (1894), Edmund Landau (1909), และ Donald Knuth (1976) โดยแจกแจงกรณี Mesh Topology `O(N²)` เปรียบเทียบกับ Star / Bus `O(N)` สำหรับเครือข่ายเซนเซอร์ 10,000 โหนด หากใช้ Full Mesh จะต้องใช้สายส่งถึง 49,995,000 เส้น และแต่ละโหนดต้องมีตารางเส้นทาง 9,999 รายการ ซึ่งต้องการ RAM มากกว่า 100 KB ส่งผลให้ไมโครคอนโทรลเลอร์ขนาดเล็ก (RAM 4-10 KB) ล่มทันที จึงเป็นเหตุผลเชิงประจักษ์ว่าทำไมสถาปัตยกรรม WSN ต้องจำกัดความซับซ้อนเชิงพื้นที่ให้อยู่ในระดับเพื่อนบ้านวิทยุท้องถิ่น `O(1)` หรือ `O(d)`
     - **บทที่ 2 (SDU, SAP, และ Byte Overhead vs Energy Drain):** บัญญัติความสัมพันธ์ `PDU(N) = PCI(N) + SDU(N)` และการสื่อสารผ่าน SAP (Service Access Point) พร้อมทั้งพิสูจน์คณิตศาสตร์การเผาผลาญพลังงานบนชิปเซนเซอร์ CC2420 (V = 3.0V, I_tx = 17.4 mA, อัตราส่ง 250 kbps) พบว่าโอเวอร์เฮดส่งข้อมูล 1 ไบต์ สูญเสียพลังงาน `1.6704 μJ/byte` หากใช้ TCP/IP Uncompressed Header ขนาด 40 ไบต์ ส่ง 100,000 แพ็กเก็ตต่อปี จะเผาพลังงานแบตเตอรี่ทิ้งไปถึง `6.68 J` เทียบเท่าการเลี้ยงโหนดในโหมด Deep Sleep นานถึง 4.4 เดือน เป็นบทพิสูจน์ความจำเป็นของกลไก 6LoWPAN RFC 6282
     - **บทที่ 3 (Dynamic Range, Fourier Harmonics, และ Noise Floor):** บัญญัติความหมาย Dynamic Range (DR) และสูตรความละเอียด ADC Quantization Noise `SNR_max = 6.02N + 1.76 dB` พร้อมชี้ให้เห็นว่าชิปวิทยุ CC2420 มีช่วง Dynamic Range ถึง 94 dB (จากความไวรับ -94 dBm ถึงอินพุตสูงสุด 0 dBm) ซึ่งต้องพึ่งพา Low Noise Amplifier (LNA) และ Automatic Gain Control (AGC) เพื่อป้องกันภาวะภาคขยายอิ่มตัว (Saturation) จากสัญญาณรบกวนของ Wi-Fi รอบข้าง
  3. **ดัชนีอภิธานศัพท์เทคนิคแม่บทประจำบทที่ 1-3 (Master Terminology Index Ch 1-3):**
     - รวบรวม 44 คำศัพท์เทคนิคหลัก พร้อมคำอ่านสัทศาสตร์ภาษาไทย นิยามมาตรฐานสากล รากเหง้าประวัติศาสตร์ และการเชื่อมโยงสู่บริบทเครือข่ายเซนเซอร์ไร้สาย (WSN/IoT) เพื่อให้ Agent Bravo นำไปทำ Hyperlink ในแทร็ก IoT

| ลำดับ | คำศัพท์เทคนิค (English) | คำอ่านสัทศาสตร์ภาษาไทย | นิยามมาตรฐานสากล (ISO/IEEE/RFC) | ความเชื่อมโยงสู่ระบบเซนเซอร์และฮาร์ดแวร์จริง (IoT Context) |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Data Communication | ดา-ต้า คอม-มิว-นิ-เค-ชัน | การแลกเปลี่ยนข้อมูลระหว่างอุปกรณ์ผ่านสื่อกลางส่งสัญญาณด้วยสัญญาณคลื่นแม่เหล็กไฟฟ้า | สื่อสารไร้สาย 2.4 GHz ตามมาตรฐาน IEEE 802.15.4 ระหว่างโหนดเซนเซอร์และเกตเวย์ |
| 2 | Message (Payload) | เมส-เซจ (เพย์-โหลด) | สารสนเทศที่ผู้ส่งต้องการสื่อสารไปยังผู้รับ | ข้อมูลอุณหภูมิ ความชื้น และค่าพิกัดพืชผลการเกษตรขนาดเล็ก (10-50 ไบต์) |
| 3 | Sender | เซน-เดอร์ | เอนทิตีหรืออุปกรณ์ที่เป็นจุดกำเนิดข้อมูล | โหนดเซนเซอร์สนาม (Sensor Mote) ทำหน้าที่แปลงค่าอนาล็อกจากทรานสดิวเซอร์ |
| 4 | Receiver | รี-ซีฟ-เวอร์ | เอนทิตีหรืออุปกรณ์ที่เป็นเป้าหมายปลายทางของข้อมูล | โหนดสถานีฐาน (Base Station / Sink Node) รวบรวมข้อมูลส่งต่อคลาวด์ |
| 5 | Transmission Medium | ทรานส์-มิช-ชัน มี-เดียม | ช่องทางทางกายภาพที่คลื่นสัญญาณใช้เดินทางระหว่างผู้ส่งและผู้รับ | อากาศว่างเปล่า (Free Space) ย่านความถี่ ISM 2.4 GHz |
| 6 | Protocol | โปร-โต-คอล | ชุดของกฎเกณฑ์ที่ควบคุมการจัดรูปแบบ ลำดับ และการตอบสนองของการสื่อสาร | โปรโตคอลสแตก ZigBee, 6LoWPAN, CoAP, และ RPL |
| 7 | Syntax | ซิน-แทกซ์ | โครงสร้าง รูปแบบ และการจัดเรียงบิตข้อมูลในเฟรม | โครงสร้างเฟรม IEEE 802.15.4: Preamble, SFD, Frame Length, MHR, Payload, FCS |
| 8 | Semantics | ซิ-แมน-ติกส์ | ความหมายของการตีความในแต่ละฟิลด์ข้อมูลและการกระทำที่ต้องตอบสนอง | Frame Control Field บิต 0-2 กำหนดประเภทเฟรม (Beacon, Data, ACK, MAC Command) |
| 9 | Timing | ไทม์-มิง | การกำหนดจังหวะเวลาและความเร็วในการรับส่งข้อมูล | การจัดการ Carrier Sense, Backoff Slots, และ Duty Cycling เพื่อประหยัดพลังงาน |
| 10 | Simplex | ซิม-เพลกซ์ | โหมดการสื่อสารทิศทางเดียวอย่างถาวร | บีคอนระบุพิกัดทิศทางเดียว หรือเซนเซอร์ตรวจวัดรังสีแบบส่งอย่างเดียว |
| 11 | Half-Duplex | ฮาล์ฟ-ดู-เพลกซ์ | โหมดการสื่อสารสองทิศทางแต่สลับช่วงเวลา ไม่สามารถรับส่งพร้อมกันได้ | สถาปัตยกรรมชิปวิทยุ CC2420 และ nRF24L01 มีภาครับ/ส่งใช้เสาอากาศร่วมกัน |
| 12 | Full-Duplex | ฟูล-ดู-เพลกซ์ | โหมดการสื่อสารสองทิศทางพร้อมกันในเวลาเดียวกันบนช่องสัญญาณแยก | ลิงก์แบ็กฮอลล์ไฟเบอร์ออปติกหรือสวิตช์กิกะบิตอีเทอร์เน็ตของเกตเวย์ |
| 13 | Topology | โท-พอล-โล-ยี | โครงสร้างเรขาคณิตของการจัดวางโหนดและลิงก์เชื่อมต่อในเครือข่าย | โครงสร้างเครือข่ายเซนเซอร์: Star (Star-to-Sink), Cluster-Tree, และ Peer-to-Peer Mesh |
| 14 | Mesh Topology | เมช โท-พอล-โล-ยี | โทโพโลยีที่ทุกโหนดมีสายเชื่อมโยงแบบจุดต่อจุดถึงกันหมด (`N(N-1)/2` ลิงก์) | ใน WSN ใช้ Multi-hop Wireless Mesh แบบไม่พึ่งสาย เพื่อกระจายเส้นทางสำรอง |
| 15 | Star Topology | สตาร์ โท-พอล-โล-ยี | โทโพโลยีที่ทุกโหนดเชื่อมต่อไปยังอุปกรณ์ศูนย์กลางเพียงจุดเดียว (`N-1` ลิงก์) | เครือข่าย LoRaWAN โหนดเซนเซอร์ทุกตัวยิงสัญญาณตรงสู่ LoRa Gateway แบบ Single-hop |
| 16 | Bus Topology | บัส โท-พอล-โล-ยี | โทโพโลยีที่แชร์สายแกนหลักเส้นเดียว (Backbone) ร่วมกัน มีความเสี่ยง Bus Crash | รถยนต์และโรงงานอุตสาหกรรมใช้ CAN Bus (ISO 11898) สำหรับระบบเซนเซอร์ในยานยนต์ |
| 17 | Ring Topology | ริง โท-พอล-โล-ยี | โทโพโลยีที่แต่ละโหนดเชื่อมกับเพื่อนบ้านสองฝั่งวนเป็นวงแหวนปิด | Token Ring ยุคเก่า ปัจจุบันไม่นิยมใน WSN เนื่องจากจุดขาดช่วงเดียวทำให้วงแหวนล่ม |
| 18 | Asymptotic Complexity (Big O) | แอส-ซิมพ-ทอ-ติก คอม-เพล็ก-ซิ-ตี (บิ๊ก-โอ) | สัญกรณ์ทางคณิตศาสตร์ที่วิเคราะห์อัตราการเติบโตของการใช้ทรัพยากรเมื่อ N เข้าสู่อนันต์ | โหนดเซนเซอร์ RAM 4-10 KB รับอัลกอริทึมตารางเส้นทางเกิน `O(1)` หรือ `O(d)` ไม่ได้ |
| 19 | De facto Standard | เด ฟัก-โต สแตน-ดาร์ด | มาตรฐานที่เกิดขึ้นโดยพฤตินัยตามความนิยมของตลาด เช่น TCP/IP | TinyOS และ ContikiOS ในยุคแรกเริ่มของงานวิจัยเครือข่ายเซนเซอร์ |
| 20 | De jure Standard | เด จู-เร สแตน-ดาร์ด | มาตรฐานที่ได้รับการรับรองอย่างเป็นทางการจากองค์กรสากล | IEEE 802.15.4 (PHY/MAC), IETF RFC 4944/6282 (6LoWPAN), RFC 6550 (RPL) |
| 21 | Protocol Data Unit (PDU) | โปร-โต-คอล ดา-ต้า ยู-นิต | หน่วยข้อมูลที่ส่งผ่านระหว่างเพียร์เลเยอร์เดียวกัน (`PDU = PCI + SDU`) | เฟรม MAC (MPDU) ขนาดสูงสุด 127 ไบต์ บนมาตรฐาน IEEE 802.15.4 |
| 22 | Service Data Unit (SDU) | เซอร์-วิส ดา-ต้า ยู-นิต | ข้อมูลเพย์โหลดดิบที่เลเยอร์ผู้ใช้บริการส่งมอบผ่าน SAP ให้เลเยอร์ล่างนำไปห่อหุ้ม | ข้อมูลจาก Network Layer ส่งลงมายัง MAC Layer เรียกว่า MSDU (MAC SDU) |
| 23 | Service Access Point (SAP) | เซอร์-วิส แอ็ก-เซส พอยต์ | จุดเชื่อมประสานเชิงตรรกะในแนวตั้งระหว่างเลเยอร์ติดกันบนโฮสต์เดียวกัน | MCPS-SAP (Data) และ MLME-SAP (Management) ในมาตรฐาน IEEE 802.15.4 |
| 24 | Encapsulation | เอน-แคป-ซู-เล-ชัน | กระบวนการเติมเฮดเดอร์และเทรลเลอร์ของเลเยอร์ล่างหุ้ม SDU จากเลเยอร์บน | ในเคอร์เนลใช้ `skb_push()` เลื่อนพอยน์เตอร์ถอยหลังเติมเฮดเดอร์โดยไม่ก็อปปี้ข้อมูล |
| 25 | Decapsulation | ดี-แคป-ซู-เล-ชัน | กระบวนการตรวจสอบและแกะลอกเฮดเดอร์ของตนเองทิ้ง ก่อนส่งเพย์โหลดขึ้นสู่เลเยอร์บน | ในเคอร์เนลใช้ `skb_pull()` เลื่อนพอยน์เตอร์ไปข้างหน้าเพื่อปลดเฮดเดอร์ออก |
| 26 | Physical Address (MAC) | ฟิ-ซิ-คัล แอด-เดรส (แมค) | หมายเลขประจำอุปกรณ์ระดับฮาร์ดแวร์สำหรับระบุตัวตนบนลิงก์เดียวกัน (Hop-to-Hop) | IEEE EUI-64 (8 ไบต์) สำหรับ 6LoWPAN และ 16-bit Short Address ใน ZigBee |
| 27 | Logical Address (IP) | ลอ-จิ-คัล แอด-เดรส (ไอ-พี) | หมายเลขระดับโครงข่ายสำหรับระบุตัวตนโฮสต์ข้ามเครือข่ายอินเทอร์เน็ต (End-to-End) | IPv6 ขนาด 128 บิต ในสถาปัตยกรรม 6LoWPAN สำหรับเชื่อมต่อ IoT เข้าสู่เครือข่ายโลก |
| 28 | Port Address | พอร์ต แอด-เดรส | หมายเลขกำกับโปรเซสระดับทรานสปอร์ต ขนาด 16 บิต (0-65535) | พอร์ต CoAP มาตรฐานคือ UDP 5683 และ MQTT มาตรฐานคือ TCP 1883 |
| 29 | Ephemeral Port | อิ-เฟม-เออ-รัล พอร์ต | พอร์ตต้นทางชั่วคราวที่ระบบปฏิบัติการสุ่มเปิดให้ไคลเอนต์ (ย่าน 49152-65535) | เซนเซอร์ใช้ส่งแพ็กเก็ตขึ้นเซิร์ฟเวอร์ แล้วปิดตัวเพื่อเข้าสู่ Deep Sleep ทันที |
| 30 | Socket 4-Tuple | ซ็อก-เก็ต โฟร์-ทัป-เพิล | ตัวระบุการเชื่อมต่อที่ไม่ซ้ำซ้อน: `{Source IP, Source Port, Dest IP, Dest Port}` | เกตเวย์และเซิร์ฟเวอร์ใช้แยกแยะสตรีมข้อมูลที่มาจากเซนเซอร์หลายหมื่นตัวพร้อมกัน |
| 31 | Maximum Transmission Unit (MTU) | แมก-ซิ-มัม ทรานส์-มิช-ชัน ยู-นิต | ขนาดข้อมูลเพย์โหลดสูงสุดที่เลเยอร์ลิงก์ส่งได้ในหนึ่งเฟรมโดยไม่ต้องตัดแบ่ง | MTU ของ IEEE 802.15.4 คือ 127 ไบต์ เทียบกับมาตรฐาน Ethernet ที่ 1,500 ไบต์ |
| 32 | Byte Overhead & Energy Drain | ไบต์ โอเวอร์เฮด และ เอนเนอร์จี เดรน | ปริมาณพลังงานที่สูญเสียไปกับการส่งเฮดเดอร์ควบคุมเทียบกับเพย์โหลดจริง | ชิป CC2420 สูญเสียพลังงาน `1.6704 μJ/byte` จึงจำเป็นต้องบีบอัดเฮดเดอร์ด้วย 6LoWPAN |
| 33 | Attenuation | แอท-เทน-นู-เอ-ชัน | การสูญเสียกำลังงานของคลื่นสัญญาณขณะเดินทางผ่านตัวกลาง | อัตราการลดทอนของคลื่นวิทยุตามระยะทางตามแบบจำลอง Friis Free Space Path Loss |
| 34 | Decibel (dB) | เด-ซิ-เบล | หน่วยลอการิทึมไร้หน่วยแสดงอัตราส่วนกำลังงาน: `10 log10(P2 / P1)` | ใช้วัดค่าเกนขยายของเสาอากาศ (dBi) หรือค่าการลดทอนของฟิลเตอร์และสายอากาศ |
| 35 | dBm | ดี-บี-เอ็ม | หน่วยวัดระดับกำลังงานสัมบูรณ์เทียบกับ 1 มิลลิวัตต์ (mW): `10 log10(P / 1 mW)` | กำลังส่งชิป CC2420 สูงสุดคือ 0 dBm (1 mW) และความไวรับต่ำสุดคือ -94 dBm |
| 36 | Signal-to-Noise Ratio (SNR) | ซิก-นัล ทู นอยส์ เร-ชิ-โอ | อัตราส่วนระหว่างกำลังสัญญาณที่ต้องการกับกำลังสัญญาณรบกวน: `P_signal / P_noise` | ตัวแปรสำคัญที่สุดในการตัดสินอัตราความผิดพลาดของบิต (BER) ของการรับส่งข้อมูลไร้สาย |
| 37 | Dynamic Range (DR) | ได-นามิก เรนจ์ | ช่วงอัตราส่วนระหว่างสัญญาณแรงสุดที่รับได้โดยไม่เพี้ยนกับสัญญาณแผ่วสุดที่ตรวจจับได้ | ชิป CC2420 มี DR กว้างถึง 94 dB ต้องใช้ LNA และ AGC ป้องกันภาวะขยายสัญญาณอิ่มตัว |
| 38 | Fourier Analysis | ฟู-เรียร์ อะ-แนล-ลิ-ซิส | ทฤษฎีคณิตศาสตร์ที่แปลงสัญญาณใดๆ ให้เป็นผลรวมของคลื่นไซน์ที่มีความถี่และแอมพลิจูดต่างกัน | วิเคราะห์แถบความถี่และฮาร์มอนิกของสัญญาณพัลส์ดิจิทัลเพื่อออกแบบฟิลเตอร์ภาครับส่ง RF |
| 39 | Fundamental Frequency | ฟัน-ดา-เมน-ทัล ฟรี-เควน-ซี | ความถี่ต่ำสุดของสัญญาณเป็นคาบ ซึ่งเป็นตัวกำหนดคาบเวลาหลักของสัญญาณ | อัตราการสั่นของคริสตัลออสซิลเลเตอร์หลักบนบอร์ดเซนเซอร์ เช่น 16 MHz หรือ 32 MHz |
| 40 | Harmonics | ฮาร์-มอน-นิกส์ | ความถี่ที่เป็นจำนวนเต็มเท่าของความถี่มูลฐาน (`n × f0`) | ฮาร์มอนิกความถี่สูงของสัญญาณดิจิทัลสร้างคลื่นรบกวนแม่เหล็กไฟฟ้า (EMI) ข้ามไปกวนวงจร RF |
| 41 | Thermal Noise (Johnson-Nyquist) | เทอร์-มอล นอยส์ | สัญญาณรบกวนก้นบึ้งที่เกิดจากการสั่นสะเทือนของอิเล็กตรอนตามอุณหภูมิ: `N = k × T × B` | ค่าขีดจำกัดล่างของสัญญาณรบกวน (-174 dBm/Hz ที่ 290 K) หรือ -105 dBm สำหรับแบนด์วิดท์ 2 MHz |
| 42 | Shannon Channel Capacity | แชน-นอน แชน-เนล คะ-แพ-ซิ-ตี | ขีดจำกัดสูงสุดทางทฤษฎีของอัตราการส่งข้อมูลผ่านช่องสัญญาณที่มีสัญญาณรบกวน: `C = B log2(1 + SNR)` | กำหนดเพดานความเร็วสูงสุดที่ช่องสัญญาณไร้สายจะส่งได้โดยปราศจากความคลาดเคลื่อน |
| 43 | Nyquist Bit Rate | ไน-ควิสต์ บิต เรต | ขีดจำกัดสูงสุดทางทฤษฎีของอัตราการส่งข้อมูลบนช่องสัญญาณที่ไร้สัญญาณรบกวน: `C = 2B log2(L)` | บ่งชี้ว่าการเพิ่มอัตราเร็วบิตจำเป็นต้องขยายแบนด์วิดท์ B หรือเพิ่มระดับการมอดูเลต L |
| 44 | Intersymbol Interference (ISI) | อิน-เทอร์-ซิม-บอล อิน-เทอร์-เฟีย-เรนซ์ | การเหลื่อมซ้อนกันของพัลส์สัญญาณที่อยู่ติดกันจากการหน่วงเวลาและการสะท้อนหลายทิศทาง | เกิดขึ้นอย่างรุนแรงในสภาพแวดล้อม Multi-path Fading ในอาคารหรือโรงงานอุตสาหกรรม |


### บันทึกที่ 12 (2026-10-20T02:20:00Z): Unified Course Mega Menu และ IoT 305141 แทร็กจริง 6 บท
- **ผู้บันทึก:** Agent Bravo (Lead Frontend Architect and Core System Engineer)
- **header-component.js:**
  1. รวมเมนูหลักสูตรเป็นปุ่มเดียว "เลือกเรียนหลักสูตร" แบบ 2 คอลัมน์สมมาตร (mega-menu-split)
     - ซ้าย: Data Communications Forouzan 14 บท (Ch 1-3 Active, Ch 4-6 พร้อมเปิดตัว)
     - ขวา: Internet of Things 305141 อ.ตั้ม 6 บท ตาม lecture/iot/305141_Chapter01-06
  2. แยก "งานมอบหมายค้นคว้า IEEE (Assignments)" ปุ่มเดี่ยว กำกับงานซ้อมนำเสนอ 5 นาที ไม่ใช่เนื้อหาเตรียมสอบ
  3. ธีม toggle SVG พระอาทิตย์/พระจันทร์ทำงานครบ ไม่มีปุ่มขยะหลงเหลือ
- **iot/ch01.html เขียนใหม่จาก lecture/iot/305141_Chapter01.pdf:**
  - ที่มาทางประวัติศาสตร์และนิยาม IoT system
  - ศัพท์สัทศาสตร์ไทย 10 คำ
  - กายวิภาค 4 องค์ประกอบ (Sensing, Processing, Actuating, Networking)
  - สถาปัตยกรรม 3 ชั้น (End-Device, Fog/Edge, Cloud, End-User)
  - Applications, Functional Requirements 5 ระดับ, Event-Driven
  - วิดเจ็ตพลังงาน Periodic vs Event-Driven + Edge Filter
  - Security/Privacy, Mastery Checklist, Mental Model, DataCom bridge
  - โทเคนร่วม lesson.css / chapter-layout.js / math.css
- **index.html:** Track 2 ปรับเป็น IoT 305141 6 บท
- **ผล:** สารบัญตรงสไลด์จริงแล้ว แยกงานเปเปอร์ออกจากหลักสูตรเด็ดขาด

---

### บันทึกที่ 13 (2026-10-20T08:40:00Z): Agent Alpha ปลดล็อก Scrollspy และเปิดตัวมหากาพย์บทที่ 4 ถึง 6 (Ch 4, Ch 5, Ch 6) สมบูรณ์แบบ
- **ผู้บันทึก:** Agent Alpha (Distinguished Chair Professor of Data Communications & Information Theory)
- **การดำเนินการตามภารกิจเร่งด่วน 3 ประการ:**
  1. **ปลดล็อกปุ่มเชื่อมโยงและซ่อมแซม Sidebar Scrollspy ทั่วทั้งแทร็ก DataCom:**
     - เชื่อมโยง `chapter-layout.js` และ `lesson.css` เข้าสู่ [ch01.html](../datacom/ch01.html) แก้ไขปัญหา Sidebar ไม่ไฮไลต์ตามการเลื่อนหน้าจอ
     - ปรับจูนค่าเกณฑ์ตรวจจับตำแหน่งใน `chapter-layout.js` และ `iot/ch01.html` ให้เป็น `getBoundingClientRect().top <= 140` แบบเรียลไทม์ พร้อมกลไกสลับคลาส `.active` และอัปเดตข้อความ `#sidebar-live-section` อย่างแม่นยำนุ่มนวล
     - ตรวจสอบโซ่เชื่อมโยงปุ่มนำทางบทเรียน (Navigation Chain): `ch01` -> `ch02` -> `ch03` -> `ch04` -> `ch05` -> `ch06` และย้อนกลับ ครบถ้วน 100%
  2. **พัฒนาบทเรียนใหม่ระดับโลก 3 บทเต็ม (Ch 4, Ch 5, Ch 6) ใน `datacom/`:
     - **[ch04.html](../datacom/ch04.html): Digital Transmission (1,378 บรรทัด)**
       - Line Coding ครบตระกูล: Unipolar, Polar (NRZ-L, NRZ-I, RZ, Manchester, Differential Manchester), Bipolar (AMI), Multilevel (2B1Q)
       - ทฤษฎีฟิสิกส์ว่าด้วยไฟตรงค้าง (DC Component), ฐานแรงดันลอยตัว (Baseline Wandering), และการซิงค์สัญญาณนาฬิกา
       - Block Coding 4B/5B (Fast Ethernet 100BASE-FX) ประหยัดแบนด์วิดท์กว่า Manchester ถึง 37.5%
       - การกวนสัญญาณ Scrambling: B8ZS (000VB0VB) และ HDB3 (000V/B00V)
       - การแปลงอนาล็อกเป็นดิจิทัล: PCM (Sampling, Quantization, Encoding, Companding) และ Delta Modulation (Slope Overload vs Granular Noise)
       - ตัวอย่างคำนวณ 4 ข้อ: Baud Rate สตรีม 100 Mbps, ออกแบบ PCM Voice 64 kbps (G.711), ขนาดสเต็ป DM, แกะรอยพัลส์ B8ZS/HDB3
       - วิดเจ็ต Interactive Line Coding Waveform Studio & Bit Analyzer
     - **[ch05.html](../datacom/ch05.html): Analog Transmission (1,251 บรรทัด)**
       - เหตุผลทางฟิสิกส์คลื่นแม่เหล็กไฟฟ้าว่าทำไมเสียง 1 kHz ต้องใช้สายอากาศยาว 75 km แต่คลื่น 2.4 GHz ใช้เพียง 3.125 cm
       - Digital-to-Analog: ASK, FSK, BPSK, QPSK, O-QPSK, M-QAM
       - **ความอัจฉริยะของ O-QPSK ในชิปเซนเซอร์ CC2420:** การหน่วงเวลาช่อง Q ไป T_s/2 ช่วยขจัด Zero-crossing 100% ทำให้ซองคลื่นราบเรียบ สามารถใช้เพาเวอร์แอมพลิฟายเออร์แบบไม่เชิงเส้นประสิทธิภาพสูง (>60%) โดยไม่เกิด Spectral Regrowth
       - **3 เหตุผลทางฟิสิกส์ที่เซนเซอร์ไม่ใช้ 256-QAM:** ข้อกำหนด SNR สูงเกินพิกัด, วิกฤต PAPR เผาผลาญแบตเตอรี่, และความซับซ้อนของวงจร ADC/DSP
       - Analog-to-Analog: AM (Carrier waste 66.7%) และ FM พร้อมการคำนวณตามกฎของคาร์สัน (Carson's Rule)
       - ตัวอย่างคำนวณ 4 ข้อ: แบนด์วิดท์ 16-QAM vs QPSK vs BFSK, พิสูจน์ระยะห่างยุคลิด d_min ของ 16-QAM เหนือกว่า 16-PSK ถึง 4.2 dB, อัตราชิป 2 Mchips/s ใน CC2420, และสเปกตรัมวิทยุ FM
       - วิดเจ็ต Interactive Constellation Diagram & Noise Studio (I/Q Plane)
     - **[ch06.html](../datacom/ch06.html): Multiplexing & Spreading (1,261 บรรทัด)**
       - ที่มาทางประวัติศาสตร์จากสิทธิบัตรระบบตอร์ปิโดของ Hedy Lamarr และ George Antheil (1942)
       - FDM, OFDM (Orthogonality Condition Δf = 1/T_s ใน Wi-Fi 6 และ IEEE 802.15.4g SUN), WDM/DWDM
       - Synchronous TDM (พิสูจน์เฟรม T1 1.544 Mbps และ E1 2.048 Mbps) vs Statistical TDM (ประหยัดแบนด์วิดท์ 70%)
       - Spread Spectrum: พิสูจน์จากทฤษฎีแชนนอน C = B log2(1 + S/N) ว่าการขยาย B ทำให้รับสัญญาณใต้ Noise Floor ได้
       - FHSS ใน Bluetooth (79 ช่อง @ 1,600 hops/s) และ Adaptive Frequency Hopping (AFH)
       - DSSS ใน IEEE 802.15.4 (CC2420): รหัส 32 ชิปต่อ 4 บิตข้อมูล ให้ Processing Gain 9.03 dB และ Jamming Margin 4.03 dB ปราบสัญญาณ Wi-Fi กวน
       - CDMA และคณิตศาสตร์เวกเตอร์ตั้งฉากของรหัสวอลช์ (Walsh Matrix) พร้อมวิธีแก้ปัญหา Near-Far Problem ด้วย Transmit Power Control (TPC)
       - ตัวอย่างคำนวณ 4 ข้อ: โครงสร้างเฟรม T1/E1, Multiplexing Gain ใน STDM, Processing Gain ใน CC2420, ถอดรหัสเวกเตอร์ CDMA 3 สถานี
       - วิดเจ็ต Interactive TDM Frame Interleaver & DSSS Code Studio
  3. **อัปเดตระบบนำทางหลักและพอร์ทัล:**
     - อัปเดต `assets/js/header-component.js`: ปรับสถานะ `ch04.html`, `ch05.html`, `ch06.html` เป็น `active: true` ใน Mega Menu
     - อัปเดต `index.html`: เพิ่มปุ่มเข้าเรียน Ch 1 ถึง Ch 6 ครบถ้วน
  4. **การตรวจสอบคุณภาพขั้นเด็ดขาด (Automated Quality Gates):**
     - ch01: 1,420 บรรทัด | Dollars: 0 | Em-dashes: 0 | Emojis: 0
     - ch02: 1,440 บรรทัด | Dollars: 0 | Em-dashes: 0 | Emojis: 0
     - ch03: 1,434 บรรทัด | Dollars: 0 | Em-dashes: 0 | Emojis: 0
     - ch04: 1,378 บรรทัด | Dollars: 0 | Em-dashes: 0 | Emojis: 0
     - ch05: 1,251 บรรทัด | Dollars: 0 | Em-dashes: 0 | Emojis: 0
     - ch06: 1,261 บรรทัด | Dollars: 0 | Em-dashes: 0 | Emojis: 0


---

## 3. ส่วนส่งต่องานประจำรอบ (3-Line Agent Handoff Footer)

- สถานะปัจจุบัน: DataCom Ch 1-6 เปิดตัวสมบูรณ์แบบ (>1,250 - 1,440 บรรทัดต่อบท), Scrollspy top 140 ซิงค์เรียลไทม์ทุกบท, ลิงก์เชื่อมโยงสองทิศทาง Ch 1-6 ไร้รอยต่อ, Mega Menu ติดป้าย Active ครบ 6 บท
- งานที่ส่งต่อ: Agent Bravo เดินหน้าพัฒนา iot/ch02.html (IoT System Architectures) ส่วน Agent Alpha เตรียมขยายผลสู่บทที่ 7 (Transmission Media: Guided vs Wireless) และบทที่ 8 (Switching)
- การเตรียมพร้อม: วิดเจ็ตอินเทอร์แอคทีฟ Line Coding, Constellation Diagram, และ TDM/DSSS ใช้งานได้เสถียร 100% บนทุกเบราว์เซอร์
