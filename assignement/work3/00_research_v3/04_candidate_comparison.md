# ตารางเปรียบเทียบผู้สมัครบทความวิจัย 6 เรื่อง (Candidate Comparison Matrix)
## เกณฑ์การประเมิน 6 มิติ (คะแนนเต็ม 35 คะแนน, เกณฑ์ผ่านไม่น้อยกว่า 28 คะแนน)

ทุกคะแนนประเมินหลังอ่านเนื้อหาฉบับเต็ม (HTML ของ IEEE Xplore หรือ PDF) เมื่อ 28 กันยายน 2026

1. **ก. Strict Rules Compliance (เต็ม 5):** IEEE Conference, ปี 2024-2026, มี PDF ดาวน์โหลดได้จริง
2. **ข. 5-Minute Storytelling (เต็ม 8):** ปัญหาและข้อแลกเปลี่ยนเข้าใจง่าย ไม่ต้องอธิบายคณิตศาสตร์ซับซ้อน
3. **ค. Visual Quality of Diagrams (เต็ม 6):** มีภาพสถาปัตยกรรมคมชัด (vector) สื่อการไหลของข้อมูลได้ทันที
4. **ง. Concrete Benchmark Metrics (เต็ม 6):** มีกราฟและตารางเทียบ Baseline พร้อมตัวเลขเชิงประจักษ์
5. **จ. Student Natural Affinity (เต็ม 5):** ตรงกับทักษะจริง (Go, PostgreSQL, API Security, Microservices, AI in SE)
6. **ฉ. Honest Flaws & Q&A Defensibility (เต็ม 5):** มีจุดอ่อนหรือ Threats to Validity ที่จับต้องได้

---

## 1. ตารางสรุปคะแนน

| อันดับ | ชื่อบทความ (ย่อ) | งานประชุมและปี | IEEE Doc ID / DOI | แทร็ก | ก | ข | ค | ง | จ | ฉ | รวม | สถานะ |
| :---: | :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 1 | Prompt-to-SQL Injections in LLM-Integrated Web Applications (P2SQL / LangShield) | ICSE 2025 | 11029790 / 10.1109/ICSE55347.2025.00007 | 3 + 1 | 5 | 8 | 5 | 6 | 4 | 5 | **33/35** | **PRIMARY** |
| 2 | Autonomous Monitors for Detecting Failures Early (Smart Alerts + GPT-3) | ICSE-SEIP 2024 | 10554688 / 10.1145/3639477.3639712 | 1 | 5 | 7 | 5 | 3 | 5 | 5 | **30/35** | **BACKUP 1** |
| 3 | Dynamic Alert Suppression Policy for Noise Reduction in AIOps (Dynamic-X-Y) | ICSE-SEIP 2024 | 10554731 / 10.1145/3639477.3639752 | 1 | 5 | 6 | 4 | 6 | 4 | 4 | **29/35** | **BACKUP 2** |
| 4 | Is Your Anomaly Detector Ready for Change? (AIOps + Concept Drift) | CAIN 2024 | 10555939 / ไม่มี DOI ใน metadata | 1 | 5 | 5 | 4 | 6 | 3 | 5 | **28/35** | ผ่านเกณฑ์ สำรองลำดับ 3 |
| 5 | Leveraging Large Language Models to Improve REST API Testing (RESTGPT) | ICSE-NIER 2024 | 10727123 / 10.1145/3639476.3639769 | 1 + 3 | 5 | 7 | 4 | 3 | 5 | 2 | 26/35 | ไม่ผ่าน |
| 6 | RAMSES: an Artifact Exemplar for Self-Adaptive Microservice Applications | SEAMS 2024 | 10556141 / 10.1145/3643915.3644110 | 1 | 5 | 6 | 5 | 2 | 4 | 2 | 24/35 | ไม่ผ่าน |

---

## 2. เหตุผลการให้คะแนนรายบทความ

### อันดับ 1: P2SQL (11029790) รวม 33/35
- **ก (5):** ICSE 2025 (IEEE/ACM Conference), Open Access, PDF 13 หน้า (pp. 1768-1780) ดาวน์โหลดได้ HTTP 200
- **ข (8):** เล่าเป็นเรื่องได้ทันที: แชตบอตหางานถูกพิมพ์ว่า "DROP TABLE users" แล้วฐานข้อมูลหายจริง ไม่มีสูตรคณิตศาสตร์เลย มีข้อแลกเปลี่ยนชัด (ความสะดวกของ Text-to-SQL เทียบกับความปลอดภัย)
- **ค (5):** Figure 1 (LangChain flow 3 ขั้น) และ Figure 2 (LangShield hooks a/b/c) เป็นภาพเวกเตอร์ ใช้บนสไลด์ได้ทันที หัก 1 คะแนนเพราะ Figure 2 มีกล่องย่อยจำนวนมาก ต้องครอปหรือวาดใหม่
- **ง (6):** Table II (อัตราสำเร็จ 1.0), Table III (7 LLMs), Table VI (red team 22/23 เทียบเครื่องมืออัตโนมัติ 11/23), Figure 3 (LLM guard 100% เทียบ Rebuff 78%), Figure 4 (147.30 s ลดเหลือ 64.15 s), ตัวเลข 99.55% บน 1,120 prompts
- **จ (4):** ตรงกับงาน API Security, PostgreSQL และการคุมสิทธิ์ข้อมูลรายผู้ใช้ (row-level) ที่นิสิตทำจริงใน GraphQL/Keycloak หัก 1 คะแนนเพราะโค้ดต้นแบบเป็น Python/LangChain ไม่ใช่ Go
- **ฉ (5):** มีจุดอ่อนจับต้องได้: benign set 150 รายการสร้างด้วย GPT-4, ทดสอบแค่ LangChain 0.1.0 และ GPT-3.5/4 รุ่นเก่า, LLM guard ถูก bypass ได้ด้วย adaptive attack, overhead 0.43 วินาทีต่อตัวอย่าง

### อันดับ 2: Autonomous Monitors (10554688) รวม 30/35
- **ข (7):** เรื่องเข้าใจง่าย (แจ้งเตือนอัจฉริยะเข้า MS Teams พร้อมคำแนะนำ root cause จาก GPT-3)
- **ง (3):** จุดอ่อนหลัก: ไม่มี ground truth ก่อน deploy, ประเมินจริงแค่ 2 สัปดาห์, พบความผิดปกติ 26 ครั้ง F1 = 0.64, แบบสอบถาม 7 คำตอบ ไม่มีการเทียบ Baseline เชิงตัวเลข
- **จ (5):** ตรงกับงาน Observability ของ Microservices บน Cloud ที่นิสิตคุ้นเคย
- **ฉ (5):** มีหัวข้อ Threats to Validity ครบ 4 ด้าน (Construct, Conclusion, Internal, External)

### อันดับ 3: Dynamic Alert Suppression (10554731) รวม 29/35
- **ข (6):** ต้องอธิบาย moving average envelope และ peak/persistent region ทำให้ใช้เวลามากกว่า
- **ง (6):** เทียบ state-of-the-art ชัดเจน: accuracy เพิ่ม 7.39% (log anomaly) และ 35.7% (metric anomaly), ลด alert noise 61.53% (13 เหลือ 5)
- **ค (4):** ไม่มีมุมมอง HTML บน IEEE Xplore ต้องครอปภาพจาก PDF

### อันดับ 4: AIOps Concept Drift (10555939) รวม 28/35
- ตารางผลละเอียด (Table 2-5) แต่เนื้อหาเป็น ML time series (LSTM-AE, drift detector) ห่างจากงาน backend ของนิสิต (จ = 3)

### อันดับ 5-6: ไม่ผ่านเกณฑ์ 28 คะแนน
- **RESTGPT (10727123):** NIER 5 หน้า ผลเป็น Preliminary Results 2 ตาราง ไม่มีหัวข้อข้อจำกัด (ฉ = 2)
- **RAMSES (10556141):** Artifact paper ไม่มี Baseline (ง = 2) และผลลัพธ์เป็นเพียงกราฟตัวอย่าง 2 ภาพ
