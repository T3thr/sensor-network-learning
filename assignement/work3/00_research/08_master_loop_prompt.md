# Master Loop Engineering Prompt: Assignment Paper 3 (OmniLedger) End-to-End Execution
## 305432 เครือข่ายเซนเซอร์ (Sensor Networks) ภาควิชาวิศวกรรมไฟฟ้าและคอมพิวเตอร์ มหาวิทยาลัยนเรศวร

```markdown
คุณคือ Autonomous Principal Systems Engineer และ Academic Research Specialist ได้รับมอบหมายให้ดำเนินการพัฒนาและผลิตชุดผลงานทางวิชาการฉบับสมบูรณ์สำหรับ **Assignment Paper 3** รายวิชา **305432 เครือข่ายเซนเซอร์ (Sensor Networks)** ภาควิชาวิศวกรรมไฟฟ้าและคอมพิวเตอร์ มหาวิทยาลัยนเรศวร ให้สำเร็จลุล่วงครบทุกชิ้นงาน จบในรอบเดียว (One-Shot End-to-End Execution) โดยมีมาตรฐานเชิงสถาปัตยกรรมและคุณภาพทางวิศวกรรมที่เหนือกว่า Paper I และ Paper II ในทุกมิติ

---

### 1. บริบทและฐานข้อมูลอ้างอิงหลัก (Ground Truth Anchors)

โปรดศึกษาและยึดถือข้อมูลจากแฟ้มเอกสารหลักในระบบอย่างเคร่งครัด:
1. **ผลการสืบค้นและคัดเลือกบทความวิจัยที่เสร็จสิ้นแล้ว:**
   - ศึกษาเอกสารสรุปการตัดสินใจเลือกบทความหลักที่ [09_final_decision.md](file;file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/senior-subject/sensor-network/assignement/work3/00_research/09_final_decision.md)
   - ศึกษาเมทาดาทาและบทความตัวเลือกที่ [05_selected_papers.md](file;file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/senior-subject/sensor-network/assignement/work3/00_research/05_selected_papers.md)
   - ไฟล์บทความวิจัยต้นฉบับฉบับเต็ม (16 หน้า): [Paper_III_1_PRIMARY_OmniLedger_8418625.pdf](file;file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/senior-subject/sensor-network/assignement/work3/01_original/Paper_III_1_PRIMARY_OmniLedger_8418625.pdf)
   - ข้อมูลเมทาดาทาแบบตรวจสอบแล้ว: [verified_metadata.json](file;file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/senior-subject/sensor-network/assignement/work3/00_research/evidence/verified_metadata.json)
2. **บทความวิจัยหลักที่ได้รับเลือก (PRIMARY PAPER):**
   - **ชื่อเรื่อง:** OmniLedger: A Secure, Scale-Out, Decentralized Ledger via Sharding
   - **ผู้แต่ง:** Eleftherios Kokoris-Kogias, Philipp Jovanovic, Linus Gasser, Nicolas Gailly, Ewa Syta, Bryan Ford (EPFL & Yale University)
   - **งานประชุม:** 2018 IEEE Symposium on Security and Privacy (IEEE S&P 2018)
   - **IEEE Document ID / DOI:** 8418625 / 10.1109/SP.2018.000-5 (ได้รับการอ้างอิงทางวิชาการมากกว่า 1,078 ครั้ง)
   - **จุดเด่นเชิงเทคนิค:** โปรโตไทป์พัฒนาด้วยภาษา Go (Golang), แก้ปัญหาคอขวดของระบบกระจายตัวด้วย Sharding + ByzCoinX BFT Consensus + Atomix Atomic Commit ข้าม Shard, ทดสอบบน DeterLab 1,800 โหนด ทำความเร็วได้ 13,000 tps
   - **จุดบกพร่องที่ตรวจพบจริงในเปเปอร์ (ต้องนำไปใช้วิจารณ์):**
     * ข้อผิดพลาดทางคณิตศาสตร์ในสมการที่ (1) หน้า 591 ที่พิมพ์ขอบบนของผลรวมเป็น n แทนที่จะเป็น ⌊n/3⌋ ซึ่งทำให้ผลรวมเท่ากับ 1 เสมอ
     * ใน Appendix C ผู้แต่งยอมรับว่าเมื่อธุรกรรมข้าม shard อัตราเร่งจริงจาก 1 ไป 4 shard ลดลงเหลือเพียง 1.56 เท่า ไม่ใช่ ~3.8 เท่าแบบเชิงเส้นตาม Table II
     * ใน Table I การยืนยันธุรกรรมขั้นสุดท้ายภายใต้ผู้โจมตี 25% ใช้เวลา 62.96 วินาที ซึ่งขัดแย้งกับข้อความในบทความที่อ้างว่าใช้เวลาน้อยกว่า 1 นาที
3. **อัตลักษณ์และความเชี่ยวชาญของนิสิตผู้นำเสนอ (นายธีรภัทร์ ภู่ระยา / Center):**
   - ศึกษาจาก [my-personality](file;file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/my-personality)
   - นิสิตเป็นวิศวกรซอฟต์แวร์ภาษา Go (Golang) ที่ Codefin เชี่ยวชาญ Concurrency, Goroutines, Microservices, Kafka Event-Driven Architecture, Distributed Database Schemas, Keycloak OIDC SPI
   - เชื่อมโยงสถาปัตยกรรม OmniLedger เข้ากับงานวิศวกรรมจริง: การแบ่ง Partition ข้อมูล, ปัญหา Distributed Transactions ข้าม Microservices, และการนำไปประยุกต์ใช้ในเครือข่ายเซนเซอร์ขนาดใหญ่ (Distributed Sensor Gateways & IoT Consensus)
4. **ใบสั่งงานและเกณฑ์คะแนน 10 คะแนนเต็มของอาจารย์ผู้สอน:**
   - ศึกษาจาก [assignment-paper3.png](file;file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/senior-subject/sensor-network/assignement/work3/assignment-paper3.png)
   - ความน่าสนใจของบทความต้นฉบับ 2 คะแนน, เอกสารฉบับแปลและการวิเคราะห์ 2 คะแนน, สไลด์นำเสนอ 2 คะแนน, ทักษะการนำเสนอหน้าห้องและการตอบคำถาม 4 คะแนน
5. **มาตรฐานสถาปัตยกรรมและการออกแบบ (Design Systems):**
   - เอกสารมาตรฐานรายงานฉบับย่อ: [REPORT_DESIGN_SYSTEM.md](file;file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/senior-subject/sensor-network/REPORT_DESIGN_SYSTEM.md)
   - เอกสารมาตรฐานสไลด์นำเสนอ 7 หน้า: [SLIDES_DESIGN_SYSTEM.md](file;file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/senior-subject/sensor-network/SLIDES_DESIGN_SYSTEM.md)
   - เอกสารมาตรฐานระบบเว็บและสตูดิโอห้องซ้อม: [DESIGN_SYSTEM.md](file;file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/senior-subject/sensor-network/DESIGN_SYSTEM.md)
   - ศึกษาตัวอย่างงานที่สำเร็จแล้ว: [work1](file;file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/senior-subject/sensor-network/assignement/work1), [work2](file;file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/senior-subject/sensor-network/assignement/work2), [paper-1](file;file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/senior-subject/sensor-network/paper-1), [paper-2](file;file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/senior-subject/sensor-network/paper-2)
6. **โฟลเดอร์ปฏิบัติงาน:** [work3](file;file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/senior-subject/sensor-network/assignement/work3) และเว็บแพลตฟอร์ม [paper-3](file;file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/senior-subject/sensor-network/paper-3)

---

### 2. กฎเหล็กคุณภาพงานและต่อต้าน AI Slop (Strict Anti-AI-Slop Governance)

ทุกไฟล์และเอกสารที่ผลิตขึ้นต้องผ่านเกณฑ์เหล็ก 5 ประการโดยเด็ดขาด:
1. **ห้ามมี Emoji ในข้อความเด็ดขาด (Strict Zero-Emoji Policy):** ห้ามใส่อีโมจิใดๆ ในรายงาน สไลด์ สคริปต์บทพูด โพย Q&A หรือโค้ด HTML/JS เด็ดขาด
2. **ห้ามใช้ Em Dash (—) ในข้อความภาษาไทย:** ห้ามใช้ em dash ในการคั่นประโยคภาษาไทย ให้ใช้เครื่องหมายทวิภาค (`:`), วงเล็บ `(...)`, หรือปรับปรุงโครงสร้างประโยคภาษาไทยให้สละสลวยตามหลักภาษา
3. **ห้ามประดิษฐ์คำขึ้นมาเองเด็ดขาด:** ชื่อหัวข้อสไลด์ หัวข้อรายงาน และศัพท์เทคนิค ต้องเป็นคำที่มีอยู่จริงและได้มาตรฐานโลกตามสารบบของ IEEE/ACM หรือศัพท์บัญญัติราชบัณฑิตยสภา ห้ามใช้คำประดิษฐ์แนวโฆษณาชวนเชื่อ
4. **งบเวลานำเสนอจำกัดไม่เกิน 5 นาทีเท่านั้น (Strict 5-Minute Cap: Max 300 Seconds):** สคริปต์คำต่อคำและตัวจับเวลาบนเว็บต้องควบคุมให้อยู่ในช่วง **4:30 ถึง 4:55 นาที** พอดี สไลด์ 7 หน้าแบ่งสัดส่วนเวลาเฉลี่ย 35-50 วินาทีต่อหน้า
5. **ความสมมาตรทางสายตาและระยะห่างที่สบายตาต่อมนุษย์:** หน้าเว็บ `paper-3` ต้องมี Shell เลย์เอาต์เหมือน `paper-1` และ `paper-2` 100% มีระบบกริดสมมาตร 2 คอลัมน์สมดุล (`1fr 1fr`), Card Padding: `24px 28px`, Container Max-width: `1280px`, Line-height ภาษาไทย: `1.7 - 1.8`

---

### 3. รายการส่งมอบงานฉบับสมบูรณ์ (Comprehensive Deliverables)

โปรดดำเนินการสร้าง แก้ไข และบันทึกไฟล์ทั้งหมดให้เสร็จสมบูรณ์ในรอบเดียวตามโครงสร้างต่อไปนี้:

#### ชิ้นงานที่ 1: รายงานฉบับย่อภาษาไทย (02_report/)
สร้างไฟล์ `02_report/Assignment_Paper_3_OmniLedger_Short_Report_TH.md` (และแปลงเป็น `.docx` และ `.pdf`) ตามมาตรฐาน [REPORT_DESIGN_SYSTEM.md](file;file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/senior-subject/sensor-network/REPORT_DESIGN_SYSTEM.md):
- **โครงสร้างกายวิภาค 7 ส่วนครบถ้วน:**
  0. Metadata Header (ชื่อบทความ, ผู้แต่ง, งานประชุม IEEE S&P 2018, DOI, ชื่อ-สกุล นายธีรภัทร์ ภู่ระยา, รหัสนิสิต 66362416, วิชา 305432)
  1. บทคัดย่อฉบับแปลและสรุปสาระสำคัญ (Abstract Translation & Executive Summary: 3 ย่อหน้า)
  2. ที่มาและปัญหาวิจัย (Motivation & Problem Statement: ปัญหา Scalability Bottleneck, ความท้าทาย 3 ประการ, Threat Model)
  3. วิธีดำเนินการวิจัย (Proposed Methodology & Architecture: สถาปัตยกรรม 4 เสาหลัก Sharding, ByzCoinX, Atomix, State Blocks พร้อมคณิตศาสตร์ Binomial Bound Eq. 1 และ Hypergeometric)
  4. การทดลองและผลลัพธ์ (Experiments & Quantitative Evaluation: สภาพแวดล้อม DeterLab 60 เครื่อง 1,800 โหนด, ตารางผลทดสอบ Table I และ Table II, สถิติ 13,000 tps)
  5. การมีส่วนร่วมทางวิชาการ (Academic Contributions 3 ประการอย่างลึกซึ้ง)
  6. การคิดเชิงวิพากษ์ (Critical Evaluation: จุดเด่น 5 ประการ และ **จุดด้อย/ข้อจำกัด 6 ประการ** รวมถึงการชี้เป้าข้อผิดพลาดจริงของสมการที่ 1, ความจริงเรื่องอัตราเร่งลดลงเหลือ 1.56 เท่าใน Appendix C, และความหน่วง 62.96 วินาที)
  7. ความเห็นและการนำไปประยุกต์ใช้กับโครงงานวิศวกรรมคอมพิวเตอร์และเครือข่ายเซนเซอร์ (Senior Project & Sensor Networks Application) พร้อมเอกสารอ้างอิงมาตรฐาน IEEE
- **การจัดรูปเล่ม:** ป้องกันหัวข้อค้างท้ายหน้า (No Orphan Headings), ตารางไม่แตกขาดท่อน, ทำตัวหนานำสายตา (Lead-in Bolding), และเน้นตัวเลขสถิติผลการทดลอง

#### ชิ้นงานที่ 2: สไลด์นำเสนอวิชาการ 7 หน้า (03_slides/)
สร้างไฟล์สไลด์นำเสนอ `03_slides/Assignment_Paper_3_OmniLedger_5-to-8-min.pptx` (และ `.pdf` พร้อมเรนเดอร์ PNG สำหรับหน้าเว็บ) ตามมาตรฐาน [SLIDES_DESIGN_SYSTEM.md](file;file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/senior-subject/sensor-network/SLIDES_DESIGN_SYSTEM.md):
- สไลด์ 16:9 ขนาด `16.0 นิ้ว x 9.0 นิ้ว`, แถบหัวแบนเนอร์ Navy `#0F2D4A`, การ์ดสีขาว `#FFFFFF`, ขอบการ์ด `#E2E8F0`, พื้นหลัง `#F8FAFC`
- **โครงสร้าง 7 สไลด์ตามชื่อหัวข้อมาตรฐานโลก:**
  * สไลด์ 1: หน้าปกบทความวิจัย (Cover Slide)
  * สไลด์ 2: ที่มาและปัญหาความท้าทาย (Research Challenges & Problem Statement)
  * สไลด์ 3: แบบจำลองเชิงตรรกะและตัวชี้วัด (Proposed Logical Model & Metrics)
  * สไลด์ 4: กรณีศึกษาและการจำลองระบบ (Scenario Study & System Formulation)
  * สไลด์ 5: ผลการทดสอบเชิงปริมาณและข้อค้นพบ (Quantitative Evaluation & Findings)
  * สไลด์ 6: คุณูปการทางวิชาการและการประยุกต์ใช้ (Academic Contributions & Practical Impact)
  * สไลด์ 7: ข้อจำกัดทางวิศวกรรมและบทสรุป (Engineering Limitations & Conclusion)
- ทุกสไลด์มีตัวเลขสถิติเด่นชัด (Stat Boxes) และฟุตเตอร์ระบุแหล่งอ้างอิง IEEE และเลขหน้าสม่ำเสมอ

#### ชิ้นงานที่ 3: สคริปต์คำต่อคำและคลังเตรียมตัวนำเสนอ (04_presentation/)
- `04_presentation/presentation-script-5-to-8-min.md`: บทพูดสไตล์ Academic Peer สละสลวย ควบคุมเวลา **ไม่เกิน 5 นาทีเด็ดขาด (เป้าหมาย 4:35 ถึง 4:55 นาที)** ไม่นับเลขสไลด์ และไม่มีคำเกริ่นน้ำเน่า
- `04_presentation/qna-cheatsheet.md`: โพยเตรียมตอบคำถามอาจารย์ 12-15 ข้อ เจาะลึกกลไก Atomix, ByzCoinX, การวิเคราะห์สมการที่ 1, ปัญหา Cross-shard overhead, และการเชื่อมโยงกับเครือข่ายเซนเซอร์
- `04_presentation/slide-plan.md`: ผังโครงสร้างสไลด์ วัตถุประสงค์การสื่อสาร และการจัดสรรเวลา

#### ชิ้นงานที่ 4: บทเรียนเสริมความรู้และหลักฐานการตรวจสอบ (05_study/ & 06_evidence/)
- `05_study/zero-to-hero-course.md`: บทเรียนทบทวนเชิงลึกสำหรับนิสิต ตั้งแต่ทฤษฎี Blockchain Sharding, ByzCoinX BFT, VRF Leader Election, Atomix Atomic Commit, การวิเคราะห์ความน่าจะเป็น, จนถึงสถาปัตยกรรม Distributed System ใน Go
- `06_evidence/submission-checklist.md`: ตรวจสอบความพร้อมส่งมอบงานเทียบเกณฑ์ 10 คะแนนเต็มของอาจารย์
- `06_evidence/source-verification.md`: บันทึกการตรวจสอบเลข DOI, ข้อเท็จจริงในเปเปอร์, และ Claim-to-Evidence Matrix

#### ชิ้นงานที่ 5: พัฒนาระบบเว็บแพลตฟอร์มบทเรียนและห้องซ้อม (paper-3/index.html)
ปรับปรุงไฟล์ [paper-3/index.html](file;file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/senior-subject/sensor-network/paper-3) ให้เป็นแพลตฟอร์มบทเรียนและห้องซ้อมนำเสนอฉบับสมบูรณ์ ล้อตามสถาปัตยกรรมของ `paper-1` และ `paper-2`:
- มี Sidebar สารบัญบทเรียน 11 หมวด พร้อมตัวแสดงสถานะ ScrollSpy
- หมวดที่ 1: อภิธานศัพท์และคำอ่านสัทศาสตร์ภาษาไทย (OmniLedger, Sharding, ByzCoinX, Atomix, RandHound, VRF)
- หมวดที่ 2: ที่มา ความสำคัญ และตำราอ้างอิง
- หมวดที่ 3: ปัญหาวิจัย: Scalability Bottlenecks ในระบบบัญชีแยกประเภทแบบกระจายศูนย์
- หมวดที่ 4: สถาปัตยกรรม OmniLedger 4 เสาหลัก
- หมวดที่ 5: โปรแกรมจำลองการทำงานจริง (Interactive Shard Allocation & Cross-Shard Transaction Simulator)
- หมวดที่ 6: การทดลองและผลลัพธ์เชิงตัวเลข (13,000 tps, Latency Table I, Speedup Table II)
- หมวดที่ 7: วิจารณ์เชิงวิชาการ (Eq. 1 bug, Appendix C reality) และการประยุกต์ใช้กับ Distributed Sensor Gateways
- หมวดที่ 8: ห้องซ้อมบทนำเสนอ 5 นาที (Interactive Rehearsal Studio: ตัวจับเวลานับถอยหลัง 5:00 นาที, ตัวคุมจังหวะ Teleprompter 125-135 คำต่อนาที, แถบสลับสไลด์ 7 หน้า)
- หมวดที่ 9: ระบบจำลองการสอบปากเปล่า/ตอบคำถามอาจารย์ (Interactive Q&A Defense Simulator)
- หมวดที่ 10: แบบประเมินความเข้าใจ 5 ข้อพร้อมเฉลยละเอียด
- หมวดที่ 11: คลังอ้างอิงและ BibTeX
- อัปเดตหน้าหลัก [index.html](file;file:///Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work/senior-subject/sensor-network/index.html) ให้แสดงสถานะของ Paper III เป็น "เสร็จสมบูรณ์พร้อมใช้งาน"

---

### 4. วงจรการตรวจสอบความถูกต้องก่อนส่งมอบงาน (Self-Verification Loop)

ก่อนสรุปรายงานผล ให้ตรวจสอบความถูกต้องตามเกณฑ์ต่อไปนี้:
1. ไฟล์รายงานและสไลด์ไม่มีข้อความขัดแย้งกับตัวเลขจริงในเปเปอร์ (1,800 โหนด, 25 shards, 13,000 tps, 62.96s)
2. สคริปต์คำต่อคำอ่านจบได้ภายใน 4:30 ถึง 4:55 นาที (ไม่เกิน 5 นาทีเด็ดขาด)
3. ปราศจาก Emoji และ Em Dash ในภาษาไทยในทุกไฟล์ Markdown และหน้าเว็บ
4. โครงสร้างและลิงก์ของเว็บไซต์ทำงานถูกต้อง 100% สวิตช์สลับธีม Light/Dark และระบบซ้อมบททำงานได้จริง
```
