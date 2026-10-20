# สรุปบทความที่ผ่านการคัดเลือก 3 บทความ (1 PRIMARY + 2 BACKUPs)
## Assignment Paper 3: 305432 เครือข่ายเซนเซอร์

เอกสารนี้ระบุรายละเอียดของบทความวิจัยที่ได้รับการคัดเลือกให้เป็นบทความตัวจริง (PRIMARY) จำนวน 1 บทความ และบทความตัวสำรอง (BACKUP) จำนวน 2 บทความ ตามข้อกำหนดของรายวิชา 305432 เครือข่ายเซนเซอร์

ตรวจข้อมูลเมตาจากหน้า IEEE Xplore และตรวจเนื้อหาจาก PDF ฉบับเต็มเมื่อ 26 กันยายน 2026 และตรวจซ้ำเชิงลึกเมื่อ 27 กันยายน 2026 ที่มาของการคัดเลือกอยู่ใน `03_search_log.md` และ `04_candidate_comparison.md`

การเปลี่ยนแปลงเมื่อ 27 กันยายน 2026: การค้นรอบที่ 3 พบ Burglars' IoT Paradise (IEEE 9152619) ซึ่งเป็นบทความสำรองที่เหมาะกว่า PESTO จึงเปลี่ยน BACKUP 2 เป็นบทความนี้ตามที่นิสิตยืนยัน ส่วน PRIMARY และ BACKUP 1 คงเดิม และ PESTO ถูกเก็บไว้เป็นผู้สมัครที่ไม่ได้เลือก (ดูหัวข้อ 4)

---

## 1. บทความหลักที่ได้รับคัดเลือก (PRIMARY PAPER)

- **ชื่องานวิจัย (Title):** OmniLedger: A Secure, Scale-Out, Decentralized Ledger via Sharding
- **ผู้แต่ง (Authors):** Eleftherios Kokoris-Kogias, Philipp Jovanovic, Linus Gasser, Nicolas Gailly, Ewa Syta, Bryan Ford
- **สถาบัน / ประเทศ:** École Polytechnique Fédérale de Lausanne (EPFL), Switzerland (ผู้แต่ง 5 คน); Trinity College, USA (Ewa Syta)
- **งานประชุมวิชาการ (Conference Venue & Year):** 2018 IEEE Symposium on Security and Privacy (SP), 20-24 พฤษภาคม 2018, San Francisco, CA, USA
- **หน้า:** 583-598 (16 หน้า)
- **ฐานข้อมูลสากล:** IEEE Xplore (IEEE Conference Publication)
- **หมายเลขเอกสาร (Document ID / DOI):** IEEE 8418625 / [10.1109/SP.2018.000-5](https://doi.org/10.1109/SP.2018.000-5)
- **หน้า IEEE Xplore:** <https://ieeexplore.ieee.org/document/8418625/>
- **ISBN (Electronic):** 978-1-5386-4353-2
- **Cited by (IEEE Xplore, 26 ก.ย. 2026):** 1,078 papers
- **สิทธิ์การเข้าถึง:** IEEE ระบุเป็นเอกสารฟรี ดาวน์โหลดได้โดยไม่ต้องล็อกอิน
- **สรุปสั้น (เรียบเรียงเอง):** ระบบบัญชีแยกประเภทแบบกระจายศูนย์ที่ขยายความสามารถได้ด้วยการเพิ่มจำนวน shard (scale-out) โดยยังรักษาความปลอดภัยต่อผู้โจมตีแบบ Byzantine ใช้การสุ่มที่มีอคติไม่ได้ (RandHound + VRF) เลือก validator เข้า shard ใช้ ByzCoinX ทำ consensus ภายใน shard และใช้ Atomix ทำธุรกรรมข้าม shard แบบ atomic
- **ตัวเลขหลักจาก PDF:**
  - Prototype ภาษา Go ทดลองบน DeterLab 60 เครื่อง จำลองสูงสุด 1,800 โหนด จำกัด 20 Mbps และหน่วง 100 ms
  - 13,000 tps ที่ 1,800 โหนด 25 shard เมื่อผู้โจมตีมี 12.5% ตามข้อความ Section VIII-B (หน้า 593) แต่บทนำ (หน้า 584) ระบุ 6,000 tps และแท่งกราฟ Fig. 6 (หน้า 592) อ่านได้ราว 6,800 tps (regular) และ 19,900 tps (trust-but-verify) ในรายงานจึงอ้าง Table II และ Fig. 6 แทนตัวเลข 13,000 tps
  - Table II: 439, 869, 1,674, 3,240, 5,850 tps เมื่อมี 1, 2, 4, 8, 16 shard
  - Table I: ยืนยันชั้นแรก 1.38 s (shard 4 ถึง 70 โหนด) และยืนยันชั้นที่สองสูงสุด 62.96 s (shard 600 โหนด ผู้โจมตี 25%)
  - โอกาสล้มเหลวต่อ epoch 4 × 10⁻⁵ หรือประมาณ 1 ครั้งใน 68.5 ปีเมื่อ epoch ยาว 1 วัน (ผู้โจมตี 12.5%, 16 shard)
  - ByzCoinX เพิ่ม throughput 20% และลด latency 35% เมื่อเทียบกับ ByzCoin
- **เหตุผลที่ได้รับคัดเลือกเป็นบทความหลัก:**
  - คะแนนรวมสูงสุด 24/25 ในตารางเปรียบเทียบ และผ่านเงื่อนไขบทความหลักครบ: มีสมการ (Eq. 1 ถึง 3), มีโปรโตคอลที่อธิบายเป็นขั้นตอน (Atomix), และมีผลทดลองเชิงปริมาณพร้อมตาราง
  - งานประชุม IEEE SP เป็นงานประชุมหลักด้านความปลอดภัยระบบคอมพิวเตอร์ และบทความถูกอ้างอิงสูงสุดในกลุ่มผู้สมัคร
  - ตรงทักษะจริงของนิสิต: prototype เขียนด้วย Go; ปัญหาหลักคือการแบ่ง state เป็น partition แล้วรักษาความถูกต้องของธุรกรรมข้าม partition ซึ่งเทียบได้กับ partition ของ Kafka และ distributed transaction ใน microservices (การเทียบนี้เป็นของผู้ประเมิน ไม่ได้อยู่ในบทความ)
  - มีวัตถุดิบสำหรับหัวข้อวิจารณ์ที่ตรวจสอบได้จริง ทั้งข้อจำกัดที่ผู้แต่งยอมรับเองและจุดผิดในสมการที่ตีพิมพ์ (ดู `09_final_decision.md`)
- **ตำแหน่งจัดเก็บไฟล์ PDF ฉบับเต็ม:** `assignement/work3/01_original/Paper_III_1_PRIMARY_OmniLedger_8418625.pdf` (สำเนาใน `senior-subject/sensor-network/raw/`)
- **ขนาดไฟล์ / SHA-256:** 1,772,141 ไบต์ / `bbfd73b28036343db48d97b4d7456c886193afd5640dd6458902248e7fb08b32`

---

## 2. บทความสำรองลำดับที่ 1 (BACKUP PAPER 1)

- **ชื่องานวิจัย (Title):** Back to the Drawing Board: A Critical Evaluation of Poisoning Attacks on Production Federated Learning
- **ผู้แต่ง (Authors):** Virat Shejwalkar, Amir Houmansadr (University of Massachusetts Amherst, USA); Peter Kairouz, Daniel Ramage (Google Research)
- **งานประชุมวิชาการ:** 2022 IEEE Symposium on Security and Privacy (SP), 22-26 พฤษภาคม 2022, San Francisco, CA, USA
- **หน้า:** 1354-1371 (18 หน้า)
- **หมายเลขเอกสาร (DOI / Doc ID):** [10.1109/SP46214.2022.9833647](https://doi.org/10.1109/SP46214.2022.9833647) / IEEE 9833647
- **หน้า IEEE Xplore:** <https://ieeexplore.ieee.org/document/9833647/>
- **Cited by (IEEE Xplore, 26 ก.ย. 2026):** 259 papers
- **สรุปสั้น (เรียบเรียงเอง):** ทบทวนว่าการโจมตีแบบ poisoning ต่อ Federated Learning อันตรายจริงแค่ไหนเมื่อใช้พารามิเตอร์ของระบบ production จัดระบบ threat model ได้ 8 แบบ ชี้ว่ามีเพียง 2 แบบที่เกิดได้จริง และแสดงด้วยการทดลองว่าเมื่อสัดส่วนเครื่องที่ถูกยึดอยู่ในช่วงที่เป็นไปได้จริง แม้ Average AGR ที่ไม่มีกลไกป้องกันก็ยังให้ความแม่นยำสูง และ Norm-bounding ซึ่งเป็นวิธีป้องกันต้นทุนต่ำก็เพียงพอ
- **ตัวเลขหลักจาก PDF:** FEMNIST ลดจาก 83.4% เป็น 81.4% (data poisoning, M = 0.1%) และ 73.4% (model poisoning, M = 0.01%); robust AGR ถูกลดความแม่นยำไม่เกิน 1%; ทดสอบยาว 5,000 rounds
- **เหตุผลที่จัดเป็นบทความสำรอง:**
  - คะแนน 21/25 สูงเป็นอันดับสองร่วม และอยู่คนละโดเมนกับ PRIMARY จึงเป็นทางเลือกจริงถ้าอาจารย์ไม่รับหัวข้อ distributed ledger
  - ใกล้วิชาเครือข่ายเซนเซอร์ที่สุดในสามเรื่อง เพราะเป็นการเรียนรู้แบบกระจายบนอุปกรณ์ปลายทางจำนวนมาก
  - เป็นรองเพราะ ML ไม่ใช่งานหลักของนิสิต และผลเป็น simulation บน benchmark dataset ไม่ใช่ข้อมูล production จริง
- **ตำแหน่งจัดเก็บไฟล์ PDF:** `senior-subject/sensor-network/raw/Paper_III_2_BACKUP1_FL-Poisoning_9833647.pdf`
- **ขนาดไฟล์ / SHA-256:** 1,177,683 ไบต์ / `ff37454b61920276844c796230be90c001fd39ba7e1c29ed8b00ecbb30432a40`

---

## 3. บทความสำรองลำดับที่ 2 (BACKUP PAPER 2)

- **ชื่องานวิจัย (Title):** Burglars' IoT Paradise: Understanding and Mitigating Security Risks of General Messaging Protocols on IoT Clouds
- **ผู้แต่ง (Authors):** Yan Jia, Yuhang Mao, Shangru Zhao (School of Cyber Engineering, Xidian University, China); Luyi Xing, Dongfang Zhao, XiaoFeng Wang (Indiana University Bloomington, USA); Yuqing Zhang (National Computer Network Intrusion Protection Center, University of Chinese Academy of Sciences, China)
- **งานประชุมวิชาการ:** 2020 IEEE Symposium on Security and Privacy (SP), 18-21 พฤษภาคม 2020, San Francisco, CA, USA (ตามที่ IEEE Xplore ระบุ)
- **หน้า:** 465-481 (17 หน้า)
- **หมายเลขเอกสาร (DOI / Doc ID):** [10.1109/SP40000.2020.00051](https://doi.org/10.1109/SP40000.2020.00051) / IEEE 9152619
- **หน้า IEEE Xplore:** <https://ieeexplore.ieee.org/document/9152619/>
- **Cited by (IEEE Xplore, 27 ก.ย. 2026):** 75 papers
- **สรุปสั้น (เรียบเรียงเอง):** ศึกษาอย่างเป็นระบบว่าเมื่อ IoT cloud นำ MQTT ซึ่งเป็นโปรโตคอล publish-subscribe ที่ออกแบบมาสำหรับสภาพแวดล้อมที่ไม่มีผู้ประสงค์ร้าย มาใช้สื่อสารระหว่างผู้ใช้กับอุปกรณ์ จะเกิดช่องโหว่ด้าน identity, session และ authorization อะไรบ้าง โดยเฉพาะเมื่อสิทธิ์ของผู้ใช้ถูกเพิกถอน (เช่น ผู้เช่าห้องหรือแขกที่เคยได้สิทธิ์ใช้ smart lock) จากนั้นเสนอหลักการออกแบบและแบบจำลอง access control ชื่อ MOUCON แล้วนำไปติดตั้งบน Mosquitto
- **ตัวเลขหลักจาก PDF:**
  - Table I (หน้า 475): ทดสอบ 8 แพลตฟอร์ม (Alibaba, AWS, Baidu, Google, IBM, Microsoft, Suning, Tuya) โจมตีสำเร็จอย่างน้อยหนึ่งประเภทใน 7 แพลตฟอร์ม ส่วน Google โจมตีไม่สำเร็จ (แต่หลายรายการเป็น N/A); ClientId hijacking สำเร็จ 6 แพลตฟอร์ม และช่องโหว่ lifecycle state ของ session สำเร็จ 6 แพลตฟอร์ม
  - Table II (หน้า 478): Mosquitto ที่เพิ่มการป้องกัน ทดสอบที่ 1,000 ถึง 8,000 client ค่า delay เพิ่ม 0.06% ถึง 0.63%
  - Eq. (1) ของ MOUCON: allowed(s, o, R) ⇒ (o.URI ∈ s.URIr) ∧ (o.URI ∈ o.source.URIw) คือผู้รับต้องมีสิทธิ์อ่าน topic นั้น และผู้ส่งต้องยังมีสิทธิ์เขียน topic นั้นอยู่ ณ เวลาที่ส่งมอบข้อความ
  - ได้รับเงิน bug bounty รวม 6,700 USD และรายงานปัญหาให้ AWS, Microsoft, IBM, Alibaba, Baidu, Eclipse Mosquitto และ MQTT Technical Committee
- **ข้อควรระวังที่ตรวจพบใน Table II:** ข้อความในบทความสรุปว่า memory overhead ไม่เกิน 0.16% และ CPU สูงขึ้นประมาณ 10% แต่เมื่อคำนวณจากค่าดิบในตารางเอง ที่ 8,000 client หน่วยความจำเพิ่มจาก 6,883 เป็น 6,963 KB คือ 1.16% (ตารางพิมพ์ 0.16%) และที่ 1,000 client CPU เพิ่มจาก 19.1% เป็น 22.2% คือ 16.2% (ตารางพิมพ์ 5.52%) ข้อสรุปว่า overhead ต่ำยังพอรับได้ แต่ตัวเลขที่อ้างในบทความต่ำกว่าค่าที่คำนวณได้
- **ข้อจำกัดของไฟล์:** PDF ฉบับ IEEE ของเรื่องนี้แทบไม่มีชั้นข้อความ (ข้อความถูกวาดเป็นเส้น ทำให้ไฟล์ใหญ่ 10.4 MB) คัดลอกข้อความจาก PDF ไม่ได้ ถ้าต้องยกข้อความให้ใช้มุมมอง HTML บน IEEE Xplore
- **เหตุผลที่จัดเป็นบทความสำรอง:**
  - คะแนน 21/25 เท่ากับอันดับสองร่วม และเป็นบทความเดียวที่แตะทั้งสามโดเมน: ระบบ publish-subscribe แบบ event-driven (Domain 1, ใกล้ Kafka ที่นิสิตใช้), identity, session และ authorization รวมถึงการเพิกถอนสิทธิ์ (Domain 2, ใกล้งาน Keycloak) และอุปกรณ์ IoT (Domain 3)
  - ตรงวิชาเครือข่ายเซนเซอร์มากกว่า PESTO เพราะ MQTT เป็นโปรโตคอลรับส่งข้อมูลหลักของอุปกรณ์ IoT จึงเป็นทางสำรองที่ดีที่สุดถ้าอาจารย์ต้องการหัวข้อที่ใกล้วิชา หรือไม่รับหัวข้อ distributed ledger
  - เป็นรองเพราะคณิตศาสตร์มีเพียงแบบจำลองเชิงเซตและกฎ Eq. (1) ผลการวัดแต่ละแพลตฟอร์มเป็นแบบโจมตีสำเร็จหรือไม่สำเร็จ และการทดสอบ overhead ทำบนเครื่องเดียวในห้องปฏิบัติการ
- **ตำแหน่งจัดเก็บไฟล์ PDF:** `senior-subject/sensor-network/raw/Paper_III_3_BACKUP2_BurglarsIoT_9152619.pdf`
- **ขนาดไฟล์ / SHA-256:** 10,444,991 ไบต์ / `a1d88009295c108d51b101b3f37c33542ba1943522b1aeff69fa377eab967c85`

---

## 4. บทความที่เคยเป็น BACKUP 2 (ไม่ได้เลือกแล้ว)

- **PESTO: Proactively Secure Distributed Single Sign-On, or How to Trust a Hacked Server** (IEEE EuroS&P 2020, IEEE 9230400, DOI [10.1109/EuroSP48549.2020.00044](https://doi.org/10.1109/EuroSP48549.2020.00044), หน้า 587-606) โดย Carsten Baum, Tore Frederiksen, Julia Hesse, Anja Lehmann, Avishay Yanai
- ตัวเลขหลัก (Table 1 หน้า 600, n = 2): Sign-in 124 ms (SD 5.8) และ 60 ops/s; Registration 138 ms (SD 8.0) และ 51 ops/s
- เหตุผลที่เปลี่ยนออก: ตรงงาน OIDC และ JWT แต่เนื้อหาส่วนใหญ่เป็นบทพิสูจน์ทาง cryptography การทดลองมีเพียง n = 2 และไม่เกี่ยวกับวิชาเครือข่ายเซนเซอร์ Burglars' IoT Paradise ตรงทักษะเท่ากันแต่มีการวัดผลบนแพลตฟอร์มจริงมากกว่าและใกล้วิชามากกว่า
- ไฟล์ยังเก็บไว้เป็นหลักฐานที่ `senior-subject/sensor-network/raw/Paper_III_CANDIDATE_PESTO_9230400.pdf` (483,095 ไบต์, SHA-256 `cef83833273cda033a535462a8e30a6edf2bddb6acaf1ff46b7cec1f6c58e97b` ค่าเดิม)

---

## 5. บันทึกการตรวจสอบความถูกต้อง (Verification Checklist)

- [x] ไม่ซ้ำกับ Paper I (IoT-CAD 9256703 และสำรอง 10635077, 9826168)
- [x] ไม่ซ้ำกับ Paper II (StoryValidator 9618897 และสำรอง 10645625, 11274671)
- [x] ทั้งสามเรื่องเป็น IEEE Conference Publication (ตรวจจากหน้า document ของ IEEE Xplore)
- [x] DOI ทั้งสาม redirect จาก doi.org ไปยังหน้า IEEE Xplore ของบทความนั้นจริง
- [x] ตรวจว่ามีไฟล์ PDF ฉบับเต็มสามารถเปิดอ่านได้อย่างสมบูรณ์ (จำนวนหน้าตรงกับช่วงหน้าที่ IEEE ระบุ: 16, 18, 17 หน้า และเรนเดอร์ครบทุกหน้า)
- [x] ค่า SHA-256 ถูกบันทึกใน `senior-subject/sensor-network/raw/MANIFEST.sha256` และตรวจผ่านด้วย `shasum -a 256 -c` (10 ไฟล์ เมื่อ 27 ก.ย. 2026)
- [x] มีหลักฐานตัวเลขผลการทดลองเชิงปริมาณที่ชัดเจนเพื่อใช้ทำรายงานและสไลด์ (ตรวจกับตารางใน PDF แล้ว)

## 6. บรรณานุกรม (IEEE Style)

1. E. Kokoris-Kogias, P. Jovanovic, L. Gasser, N. Gailly, E. Syta, and B. Ford, "OmniLedger: A Secure, Scale-Out, Decentralized Ledger via Sharding," in *Proc. 2018 IEEE Symposium on Security and Privacy (SP)*, San Francisco, CA, USA, 2018, pp. 583–598, doi: 10.1109/SP.2018.000-5.
2. V. Shejwalkar, A. Houmansadr, P. Kairouz, and D. Ramage, "Back to the Drawing Board: A Critical Evaluation of Poisoning Attacks on Production Federated Learning," in *Proc. 2022 IEEE Symposium on Security and Privacy (SP)*, San Francisco, CA, USA, 2022, pp. 1354–1371, doi: 10.1109/SP46214.2022.9833647.
3. Y. Jia, L. Xing, Y. Mao, D. Zhao, X. Wang, S. Zhao, and Y. Zhang, "Burglars' IoT Paradise: Understanding and Mitigating Security Risks of General Messaging Protocols on IoT Clouds," in *Proc. 2020 IEEE Symposium on Security and Privacy (SP)*, San Francisco, CA, USA, 2020, pp. 465–481, doi: 10.1109/SP40000.2020.00051.
