# ตารางเปรียบเทียบบทความตัวเลือก (Candidate Comparison Matrix)
## Assignment Paper 3: 305432 เครือข่ายเซนเซอร์

เอกสารนี้ใช้สำหรับประเมินและเปรียบเทียบบทความตัวเลือกอย่างเป็นกลางตามหลักวิศวกรรมคอมพิวเตอร์ เพื่อคัดสรรบทความ 3 บทความ (1 PRIMARY + 2 BACKUPs)

สถานะเนื้อหา:
- 26 กันยายน 2026: อ่านฉบับเต็มผ่านมุมมอง HTML ของ IEEE Xplore สำหรับผู้สมัครชุดแรก 6 เรื่อง และตรวจตัวเลข ตาราง และสมการจาก PDF ของ 8418625, 9833647 และ 9230400
- 27 กันยายน 2026: การค้นรอบที่ 3 (ดู `03_search_log.md` หัวข้อ 5) พบผู้สมัครใหม่ที่แข็งกว่าเดิม 3 เรื่อง จึงปรับตาราง 6 เรื่องให้เป็น 6 อันดับที่ดีที่สุดโดยให้แต่ละโดเมนมี 2 เรื่อง ผู้สมัครที่ถูกย้ายออกจากตารางยังเก็บผลประเมินไว้ในหัวข้อ 6 และตรวจตัวเลขของ 9152619 จาก PDF แล้ว

ตัวเลขทุกตัวในเอกสารนี้มาจากบทความโดยตรง เว้นแต่ระบุว่าเป็นการคำนวณตรวจซ้ำของผู้ประเมิน

---

## 1. เกณฑ์การให้คะแนนและประเมินบทความ (Evaluation Criteria)

1. **ความเป็นวิชาการและงานประชุมสากล (Conference Rigor & Prestige):** ตีพิมพ์ในงานประชุม IEEE ที่ได้รับการยอมรับ
2. **ความลึกซึ้งทางคณิตศาสตร์และอัลกอริทึม (Mathematical & Algorithmic Depth):** มีโมเดล สูตร หรืออัลกอริทึมที่จับต้องได้
3. **การทดลองเชิงประจักษ์ (Empirical & Quantitative Validation):** มีการทดลองจริง มีตัวเลขสถิติ เปรียบเทียบกับ Baseline
4. **ความน่าสนใจและผลกระทบต่อโลกจริง (Innovation & Real-World Impact):** มีความว้าว แก้ปัญหาที่มีมูลค่าสูง
5. **ความเชื่อมโยงกับทักษะของนิสิต (Presenter Alignment):** นิสิตเข้าใจได้ลึกซึ้ง สามารถอธิบายและตอบคำถามอาจารย์ได้อย่างมั่นใจ

มาตราส่วน: 5 = ดีมาก, 4 = ดี, 3 = พอใช้, 2 = อ่อน, 1 = ไม่ผ่านเกณฑ์ น้ำหนักเท่ากันทุกข้อ รวมเต็ม 25 คะแนน

ข้อมูลประกอบที่ไม่นับคะแนน: ความตรงกับวิชา 305432 เครือข่ายเซนเซอร์ ใช้ประกอบการเลือก BACKUP เพราะเป็นทางสำรองในกรณีที่อาจารย์ต้องการหัวข้อที่ใกล้วิชา

คะแนนเป็นดุลยพินิจของผู้ประเมินหลังอ่านเนื้อหาจริง ไม่ใช่ค่าที่วัดได้ ใช้เพื่อจัดลำดับและอธิบายเหตุผล ส่วนยอด Cited by เป็นค่า snapshot ของ IEEE Xplore ณ วันที่สืบค้น ใช้เป็นตัวบ่งชี้ผลกระทบโดยประมาณเท่านั้น

---

## 2. ตารางเปรียบเทียบเชิงวิเคราะห์

| เกณฑ์ประเมิน | บทความที่ 1 | บทความที่ 2 | บทความที่ 3 | บทความที่ 4 | บทความที่ 5 | บทความที่ 6 |
|---|---|---|---|---|---|---|
| ชื่องานวิจัย | [OmniLedger](https://ieeexplore.ieee.org/document/8418625/) (8418625) | [Red Belly](https://ieeexplore.ieee.org/document/9519440/) (9519440) | [PESTO](https://ieeexplore.ieee.org/document/9230400/) (9230400) | [Burglars' IoT Paradise](https://ieeexplore.ieee.org/document/9152619/) (9152619) | [Back to the Drawing Board](https://ieeexplore.ieee.org/document/9833647/) (9833647) | [Crowd-GPS-Sec](https://ieeexplore.ieee.org/document/8418651/) (8418651) |
| งานประชุม / ปี / Cited by | IEEE SP 2018 / 1,078 | IEEE SP 2021 / 109 | IEEE EuroS&P 2020 / 40 | IEEE SP 2020 / 75 | IEEE SP 2022 / 259 | IEEE SP 2018 / 111 |
| โดเมนหลัก | Domain 1: Distributed Ledger, Sharding, Byzantine Fault Tolerance | Domain 1: BFT Consensus, Blockchain | Domain 2: Distributed SSO, Identity Federation | Domain 2 ร่วมกับ Domain 1 และ 3: Authorization และ Session Management ของ MQTT (publish-subscribe) บน IoT Cloud | Domain 3: Federated Learning Robustness | Domain 3: การตรวจจับความผิดปกติจากข้อมูลเครือข่ายเซนเซอร์ภาคพื้นดิน |
| สถาปัตยกรรมที่นำเสนอ | แบ่ง validator เป็น shard ทุก epoch ด้วย RandHound + VRF leader election; ByzCoinX ภายใน shard; Atomix (lock แล้ว unlock) สำหรับธุรกรรมข้าม shard; state blocks สำหรับ ledger pruning; trust-but-verify สองชั้น | Leaderless DBFT ที่รวมข้อเสนอหลาย proposer เป็น superblock (Set Byzantine Consensus) และแบ่งงานตรวจลายเซ็นให้ verifier กลุ่มย่อย (verification sharding) ในระบบแบบ open permissioned | แยก IdP เป็น n เซิร์ฟเวอร์ ใช้ distributed partially-oblivious PRF ตรวจรหัสผ่าน และ distributed signature ให้ผู้ใช้รวม share เป็น JWT ที่เซ็นด้วย RSA ตามมาตรฐาน มีขั้น Refresh เพื่อฟื้นตัวหลังถูกเจาะ (proactive security) | วิเคราะห์ช่องว่างระหว่าง MQTT กับการใช้งานจริงบน IoT cloud ใน 4 ด้าน (ClientId, การอนุญาตข้อความ Will และ Retained, การอนุญาต topic, สถานะ session) แล้วเสนอหลักการออกแบบและ MOUCON ที่ตรวจสิทธิ์ทั้งผู้ส่งและผู้รับของแต่ละข้อความ | จัดระบบ threat model ของ poisoning ใน FL เป็น 3 มิติ 8 แบบ ชี้ว่ามีเพียง 2 แบบที่เกิดได้จริงใน production กำหนดช่วงพารามิเตอร์จริง แล้วประเมิน Aggregation Rule (Average, Norm-bounding, Multi-krum, Trimmed-mean) | ระบบภาคพื้นดินที่ประมวลผลข้อความ ADS-B และ Flarm จากเครือข่ายเซนเซอร์ OpenSky (มากกว่า 700 จุด, สูงสุด 200,000 ข้อความต่อวินาที) มี 3 โมดูล: multilateration (MLAT) จาก TDoA, การตรวจจับการปลอมสัญญาณ GPS (Test 1 และ Test 2), การหาตำแหน่งผู้ปลอมสัญญาณ |
| อัลกอริทึม/สูตรคณิตศาสตร์ | Eq. (1) binomial ของโอกาสที่ shard ถูกยึด, Eq. (2) union bound ความล้มเหลวต่อ epoch, การคำนวณ hypergeometric ของกลุ่ม 25 จาก 600 โหนด, Eq. (3) ความน่าจะเป็นที่ธุรกรรมต้องใช้ k shard, โปรโตคอล Atomix 3 ขั้น | นิยาม Set Byzantine Consensus พร้อมทฤษฎีบทและบทพิสูจน์ในภาคผนวก ภายใต้เงื่อนไข t < n/3 | นิยาม DSIG (Setup, KGen, Sign, Comb, Vf, Refresh) และ dpOPRF พิสูจน์ความปลอดภัยใน UC framework ภายใต้สมมติฐาน gap one-more BDH และ RSA | แบบจำลอง usage control เชิงเซต ATT(S) = {id, URIw, URIr}, ATT(O) = {content, URI, source} และกฎ Eq. (1) allowed(s, o, R) ⇒ (o.URI ∈ s.URIr) ∧ (o.URI ∈ o.source.URIw) | สูตร optimization ของการโจมตี (Eq. 3 และ 4) และตัวชี้วัด attack impact Iθ = Aθ − Aθ* | 13 สมการ: TDoA และ multilateration, เกณฑ์ threshold ของการตรวจจับ, การหาตำแหน่งจากความต่างระยะแพร่สัญญาณ และความสัมพันธ์ของความคลาดเคลื่อน E ∝ √2 · σ_GPS / v_track (Eq. 12) |
| สภาพแวดล้อมการทดลอง | Prototype ภาษา Go บน DeterLab 60 เครื่อง จำลองสูงสุด 1,800 โหนด จำกัดแบนด์วิดท์ 20 Mbps หน่วง 100 ms ใช้ 10,000 บล็อกแรกของ Bitcoin | VM 1,000 เครื่องในมากกว่า 10 ประเทศ 4 ทวีป โค้ด 30k บรรทัด เทียบกับ PBFT และ HoneyBadger ทั้งภาวะปกติและภายใต้การโจมตี | Java บน AWS EC2 m5.xlarge: เซิร์ฟเวอร์ 2 เครื่อง (อังกฤษ, ไอร์แลนด์) ผู้ใช้ในเยอรมนี ผ่าน REST + TLS ทำซ้ำ 30 รอบ | ทดสอบกับบัญชีจริงบน IoT cloud 8 ราย (ซื้ออุปกรณ์จริงสำหรับ Tuya และ Suning); ติดตั้งการป้องกันบน Mosquitto 1.5.4 วัดบน workstation i7-6700 ด้วย client 1,000 ถึง 8,000 | Simulation บน FEMNIST (3,400 clients), CIFAR10 (1,000 clients) และ Purchase ทั้ง cross-device และ cross-silo สูงสุด 5,000 rounds | ข้อมูลจริงจาก OpenSky ยุโรปกลาง 1 ชั่วโมง (141,693 ตำแหน่ง, 142 ลำ) สำหรับการตรวจจับ; simulation ใน MATLAB (พื้นที่ 400 × 400 km) สำหรับการหาตำแหน่ง; ทดลองปลอมสัญญาณจริงเฉพาะในห้องปฏิบัติการด้วย USRP B200 และ gps-sdr-sim |
| ตัวชี้วัดสำคัญ (Key Metrics) | 13,000 tps ที่ 1,800 โหนด 25 shard (adversary 12.5%) ตามข้อความ Section VIII-B แต่ไม่ตรงกับ Fig. 6 (อ่านได้ราว 6,800 / 19,900 tps) และบทนำ (6,000 tps); 439 ถึง 5,850 tps เมื่อ shard 1 ถึง 16; ยืนยันชั้นแรก 1.38 s; โอกาสล้มเหลว 4 × 10⁻⁵ ต่อ epoch (1 ครั้งใน 68.5 ปี); ByzCoinX throughput +20%, latency −35% | สูงสุด 660,000 TPS (n = 300); 30,684 TPS ที่ขนาดใหญ่สุด latency 3 s; เหลือ 1,900 TPS ภายใต้ coalition attack 33% | Sign-in 124 ms (SD 5.8) และ 60 ops/s; Registration 138 ms (SD 8.0) และ 51 ops/s | Table I: โจมตีสำเร็จอย่างน้อยหนึ่งประเภทใน 7 จาก 8 แพลตฟอร์ม (ClientId hijacking สำเร็จ 6 แพลตฟอร์ม); Table II: delay เพิ่ม 0.06% ถึง 0.63%; bug bounty รวม 6,700 USD | FEMNIST 83.4% ลดเหลือ 81.4% (data poisoning, M = 0.1%) และ 73.4% (model poisoning, M = 0.01%); robust AGR ลดความแม่นยำไม่เกิน 1% | ตรวจจับได้ภายในไม่ถึง 2 วินาที; หาตำแหน่งผู้ปลอมสัญญาณได้แม่นถึง 150 m หลังเฝ้าดู 15 นาที (จาก simulation); ความครอบคลุม: Test 1 อย่างเดียว 61.2%, Test 2 อย่างเดียว 2.9%, ทั้งสอง 8.9% |
| จุดเด่นสำคัญ | มีครบทั้งโมเดลความปลอดภัยเชิงความน่าจะเป็น โปรโตคอล และระบบที่วัดผลได้; ตัวเลขชัด ยกขึ้นสไลด์ได้ทันที; ผลกระทบสูงสุดในกลุ่ม | การทดลองกระจายภูมิศาสตร์ขนาดใหญ่จริงและทดสอบภายใต้การโจมตี | ผลลัพธ์เป็น JWT มาตรฐาน SP ไม่ต้องแก้โค้ด; ทนการถูกเจาะได้ถึง n − 1 เครื่อง | ผลกระทบจริงกับผู้ให้บริการรายใหญ่และ MQTT Technical Committee; แตะทั้งสามโดเมน; อธิบายได้ด้วยสถานการณ์จริง เช่น ผู้เช่าเก่ายังสั่งเปิด smart lock ได้หลังถูกเพิกถอนสิทธิ์ | ใช้การทดลองเป็นระบบแย้งความเชื่อเดิม มีผู้ร่วมวิจัยจาก Google ที่ดูแล production FL ได้ข้อสรุปใช้งานได้จริง | เป็นเครือข่ายเซนเซอร์จริงระดับโลก ไม่ต้องแก้ไขดาวเทียม GPS หรืออุปกรณ์บนอากาศยาน; มีสมการครบและทดสอบกับข้อมูลจริง |
| จุดด้อยหรือข้อจำกัด | ผลทดลอง scale-out ไม่ได้แยกผลของธุรกรรมข้าม shard: ผู้แต่งคำนวณเองใน Appendix C ว่าความเร็วจาก 1 ไป 4 shard เหลือราว 1.56 เท่า; Eq. (1) พิมพ์ขอบบนของผลรวมเป็น n; กรณี adversary 25% ที่ระดับ 4,000 tps (ราว 4,200 โหนด) เป็นค่าประมาณ ไม่ได้วัด; ตัวเลข throughput ที่ 1,800 โหนดไม่ตรงกันระหว่างข้อความกับ Fig. 6; WAN จำลอง; epoch bootstrap กรณีแย่สุดประมาณ 3 ชั่วโมง; security analysis แบบ informal ตามที่ผู้แต่งระบุ | ต้องได้สิทธิ์ก่อนเป็น proposer/verifier จึงไม่ใช่ permissionless เต็มรูป; throughput ต่างกันมากตามขนาดและภาวะโจมตี; โดเมนเดียวกับบทความที่ 1 | ต้องมีเซิร์ฟเวอร์ครบ n จาก n เครื่องเดียวล่มทั้งระบบหยุด (ผู้แต่งยอมรับเรื่อง DoS); ทดสอบเพียง n = 2; เซิร์ฟเวอร์ single-threaded และ throughput ประมาณจากการคูณจำนวนคอร์; รองรับเฉพาะ flow ที่ผู้ใช้ส่งโทเคนต่อเอง | ผลวัดแต่ละแพลตฟอร์มเป็นแบบสำเร็จหรือไม่สำเร็จ ไม่มีสถิติ; overhead วัดบนเครื่องเดียว และร้อยละใน Table II บางช่องไม่ตรงกับค่าดิบ (ดูหัวข้อ 4); การ map ClientId กับ identity แบบทั่วไปยังเป็นงานในอนาคต; PDF ไม่มีชั้นข้อความ | เป็น simulation บน benchmark ไม่ใช่ข้อมูล production จริง; ครอบคลุมเฉพาะ untargeted poisoning; ข้อสรุปขึ้นกับช่วง M ที่ผู้แต่งกำหนด; baseline FEMNIST ในบทนำ (83.4%) ไม่ตรงกับหัวข้อ V-A (82.3%) | การหาตำแหน่งประเมินด้วย simulation; ประมาณ 27% ของเครื่องบินในชุดข้อมูลไม่ถูกครอบคลุมโดย test ใด (ผู้ประเมินคำนวณ); หาตำแหน่งไม่ได้ถ้าเป้าหมายอยู่นิ่ง (ผู้แต่งยอมรับ); ขึ้นกับความหนาแน่นของเซนเซอร์อาสาสมัคร |
| ความตรงกับวิชา 305432 (ไม่นับคะแนน) | ต่ำ | ต่ำ | ต่ำ | สูง: MQTT เป็นโปรโตคอลรับส่งข้อมูลหลักของอุปกรณ์ IoT | ปานกลาง: การเรียนรู้บนอุปกรณ์ปลายทาง | สูงมาก: เป็นเครือข่ายเซนเซอร์ที่ใช้งานจริง |
| ความเหมาะสมในการนำเสนอ | สูง: เขียนด้วย Go; sharding เทียบกับ partition ของ Kafka ได้; Atomix เทียบกับ two-phase commit และ Saga ได้; state blocks เทียบกับ snapshot และ log compaction ได้ | ปานกลาง: ต้องอธิบาย DBFT และ superblock ซึ่งนิสิตไม่ได้ใช้ในงานจริง | ปานกลาง: ตรงงาน OIDC/JWT/Keycloak แต่ถ้าถูกถามเรื่อง cryptography และ UC proof จะตอบยาก | สูง: topic, session และ retained message เทียบกับ Kafka ได้; การเพิกถอนสิทธิ์และ attribute-based authorization เทียบกับ Keycloak ได้ | ปานกลางถึงสูง: ตัวเลขชัด แต่ ML ไม่ใช่งานหลักของนิสิต | ปานกลาง: มุม stream processing 200,000 ข้อความต่อวินาทีเชื่อมกับงาน Kafka ได้ แต่แกนเป็นฟิสิกส์สัญญาณ GPS และ multilateration ที่ต้องเตรียมเพิ่ม |

---

## 3. ตารางคะแนน

| เกณฑ์ | 1. OmniLedger | 2. Red Belly | 3. PESTO | 4. Burglars' IoT Paradise | 5. FL Poisoning | 6. Crowd-GPS-Sec |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Conference Rigor & Prestige | 5 | 5 | 4 | 5 | 5 | 5 |
| Mathematical & Algorithmic Depth | 4 | 4 | 5 | 3 | 4 | 5 |
| Empirical & Quantitative Validation | 5 | 5 | 3 | 4 | 5 | 4 |
| Innovation & Real-World Impact | 5 | 4 | 3 | 4 | 4 | 4 |
| Presenter Alignment | 5 | 3 | 5 | 5 | 3 | 3 |
| **รวม (เต็ม 25)** | **24** | **21** | **20** | **21** | **21** | **21** |

เหตุผลของคะแนนที่อาจถูกโต้แย้ง:
- OmniLedger ได้ 4 ด้านคณิตศาสตร์ ไม่ใช่ 5 เพราะผู้แต่งเขียนเองว่า security analysis เป็นแบบ informal และพบจุดผิดในสมการที่ตีพิมพ์ (ดูหัวข้อ 4)
- PESTO ได้ 5 ด้านคณิตศาสตร์เพราะมีนิยามและบทพิสูจน์ครบ แต่ได้ 3 ด้านการทดลองเพราะวัดเพียง n = 2 และประมาณ throughput จากเครื่องเดียว
- Burglars' IoT Paradise ได้ 3 ด้านคณิตศาสตร์ เพราะมีเพียงแบบจำลองเชิงเซตและกฎ Eq. (1) ไม่มีแบบจำลองเชิงปริมาณ และได้ 4 ด้านการทดลองเพราะทดสอบกับแพลตฟอร์มจริง 8 ราย แต่ผลเป็นแบบสำเร็จหรือไม่สำเร็จ
- Crowd-GPS-Sec ได้ 4 ด้านการทดลองแทน 5 เพราะการหาตำแหน่งผู้ปลอมสัญญาณประเมินด้วย simulation เนื่องจากปลอมสัญญาณ GPS กับอากาศยานจริงไม่ได้

---

## 4. ข้อตรวจพบจากการอ่านฉบับเต็ม (ใช้ต่อในหัวข้อวิจารณ์ของรายงาน)

**OmniLedger (8418625)** ตรวจจาก PDF หน้า 591, 593, 595 และ 597 (เลขหน้าตามที่พิมพ์ในบทความ):
1. Eq. (1) พิมพ์เป็น P[X ≤ ⌊n/3⌋] = Σ (k = 0 ถึง n) C(n,k) mᵏ (1 − m)ⁿ⁻ᵏ ถ้าอ่านตรงตัว ผลรวมจาก 0 ถึง n มีค่าเท่ากับ 1 เสมอตามทฤษฎีบททวินาม ขอบบนที่ถูกต้องควรเป็น ⌊n/3⌋ จึงน่าจะเป็นความผิดพลาดในการพิมพ์ ไม่กระทบกราฟ Fig. 5 แต่เป็นจุดที่ควรชี้ในรายงาน
2. ข้อความในหัวข้อ VI-B เรียก Fig. 5 ฝั่งขวาว่าเป็นขนาด shard และฝั่งซ้ายว่าเป็นความมั่นใจของกลุ่ม optimistic validation แต่คำบรรยายใต้รูปและตัวกราฟเป็นด้านกลับกัน
3. Appendix C ผู้แต่งยอมรับว่าเมื่อกระจาย UTXO แบบสุ่มตาม hash ธุรกรรมส่วนใหญ่จะข้าม shard และความเร็วที่เพิ่มขึ้นจริงจะต่ำกว่าผลใน Section VIII อย่างไรก็ดี ผู้ประเมินคำนวณซ้ำแล้วพบว่าตัวเลขตัวอย่างไม่สอดคล้องกันภายใน:
   - สูตรเวียนเกิด Eq. (3) ที่พิมพ์ไว้ใช้สัมประสิทธิ์ (m − k)/m ซึ่งทำให้ผลรวมความน่าจะเป็นของ n = 3, m = 3 ได้ 0.444 ไม่ใช่ 1 สัมประสิทธิ์ที่ถูกต้องคือ (m − k + 1)/m
   - โอกาสที่ธุรกรรม 2 input 1 output (3 UTXO) อยู่ใน shard เดียวเมื่อมี 3 shard ควรเป็น 1/9 ≈ 11.1% ส่วนค่า 3.7% ในบทความเท่ากับ 1/27 ซึ่งเป็นโอกาสที่ทั้งสามตกใน shard ที่ระบุตัวหนึ่ง
   - ค่า speed-up 1.56 เท่า (1 ไป 4 shard) ตรงกับกรณี 4 UTXO ไม่ใช่ 3 UTXO ตามที่ข้อความระบุ ถ้าใช้ 3 UTXO จะได้ประมาณ 1.875 เท่า
   - สูตร speed-up ของผู้แต่งเฉลี่ยค่า 1/k (m · Σ P(k)/k) ถ้าคิดแบบงานรวมต่อธุรกรรม (m / E[k]) จะได้ต่ำกว่า คือประมาณ 1.46 ถึง 1.73 เท่า (รายละเอียดใน `09_final_decision.md`)
   - ไม่ว่าจะใช้ตัวเลขชุดใด ข้อสรุปยังเหมือนเดิม คือความเร็วจริงต่ำกว่าผลใน Table II มาก (Table II ได้ 1,674 / 439 ≈ 3.8 เท่าที่ 4 shard)
4. ตาราง Table IV เปรียบเทียบ latency และ time to fail กับระบบอื่นโดยใช้ตัวเลขจากคนละบทความและคนละสภาพการทดลอง จึงไม่ใช่การเปรียบเทียบภายใต้เงื่อนไขเดียวกัน
5. ข้อความ "Visa-level" อิงค่าเฉลี่ย Visa ประมาณ 4,000 tx/s ตามที่ผู้แต่งอ้าง ไม่ใช่ค่าสูงสุดของ Visa
6. โหมดยืนยันเร็วของ trust-but-verify ยอมรับโอกาสน้อยกว่า 10% ที่การยืนยันชั้นแรกจะเสี่ยงต่อ double-spending ผู้แต่งจำกัดให้ใช้กับธุรกรรมมูลค่าต่ำ
7. Section VIII-B ระบุว่าการยืนยันขั้นสุดท้ายยังไม่ถึงหนึ่งนาที แต่ Table I กรณีผู้โจมตี 25% แสดง 62.96 s

**Burglars' IoT Paradise (9152619)** ตรวจจากภาพหน้ากระดาษของ PDF หน้า 475 และ 478 (PDF ไม่มีชั้นข้อความ):
1. Table I: Google เป็นแพลตฟอร์มเดียวที่โจมตีไม่สำเร็จทุกรายการ แต่หลายรายการเป็น N/A เพราะแพลตฟอร์มไม่รองรับฟีเจอร์นั้น ผลนี้จึงไม่ได้แปลว่า Google ปลอดภัยทุกด้าน
2. Table II: ผู้ประเมินคำนวณร้อยละใหม่จากค่าดิบในตาราง พบว่าไม่ตรง 3 ช่อง ได้แก่ memory ที่ 8,000 client (6,883 เป็น 6,963 KB ได้ 1.16% แต่พิมพ์ 0.16%), CPU ที่ 1,000 client (19.1% เป็น 22.2% ได้ 16.2% แต่พิมพ์ 5.52%) และ CPU ที่ 6,000 client (ได้ 7.25% แต่พิมพ์ 7.34%) ข้อความในบทความที่ว่า memory overhead ไม่เกิน 0.16% จึงขัดกับค่าดิบของตารางเอง
3. ค่า delay ในตารางอยู่ที่ประมาณ 1.43 ถึง 1.47 วินาทีแม้ไม่มีการป้องกัน บทความไม่ได้อธิบายว่าค่านี้วัดจากจุดใด จึงเป็นคำถามที่ควรตรวจก่อนนำไปเทียบกับ latency ของ broker ทั่วไป

**Back to the Drawing Board (9833647)** ตรวจจาก PDF: ความแม่นยำ FEMNIST เมื่อไม่มีการโจมตีเขียนเป็น 83.4% ในบทนำ (หน้า 1355) แต่ 82.3% ในหัวข้อ V-A

**PESTO (9230400)** ตรวจจาก PDF หน้า 600: Table 1 วัดที่ n = 2 เท่านั้น ผู้แต่งระบุว่าเซิร์ฟเวอร์เป็น single-threaded และ throughput ได้จากการรันบนคอร์เดียวแล้วคูณตามจำนวนคอร์

**Crowd-GPS-Sec (8418651)** ตรวจจากมุมมอง HTML: ความครอบคลุม 61.2%, 2.9% และ 8.9% รวมกันได้ 73.0% ส่วนที่เหลือประมาณ 27% ไม่ถูกครอบคลุมโดย test ใดเลยในการตั้งค่าที่ทดสอบ (ผู้ประเมินคำนวณ)

---

## 5. ผลการจัดอันดับและเหตุผลการเลือก

| อันดับ | บทความ | คะแนน | ความตรงกับวิชา | บทบาท |
|:---:|---|:---:|:---:|---|
| 1 | OmniLedger (8418625) | 24 | ต่ำ | **PRIMARY** |
| 2 | Back to the Drawing Board (9833647) | 21 | ปานกลาง | **BACKUP 1** |
| 2 | Burglars' IoT Paradise (9152619) | 21 | สูง | **BACKUP 2** (เปลี่ยนเมื่อ 27 ก.ย. 2026) |
| 2 | Crowd-GPS-Sec (8418651) | 21 | สูงมาก | ไม่เลือก (ทางสำรองลำดับถัดไป) |
| 2 | Red Belly (9519440) | 21 | ต่ำ | ไม่เลือก (โดเมนเดียวกับ PRIMARY) |
| 6 | PESTO (9230400) | 20 | ต่ำ | ไม่เลือก (เป็น BACKUP 2 จนถึง 27 ก.ย. 2026) |

1. **PRIMARY เป็น OmniLedger** เพราะคะแนนรวมสูงสุด และเป็นเรื่องเดียวที่ผ่านทั้งสามเงื่อนไขของบทความหลัก (สมการ, อัลกอริทึม, ผลทดลองเชิงปริมาณ) ในระดับสูงพร้อมกับตรงทักษะ Go และระบบกระจายตัวของนิสิต การค้นรอบที่ 3 ไม่พบเรื่องที่คะแนนสูงกว่า
2. **BACKUP ต้องคนละโดเมนกับ PRIMARY** เพื่อให้มีตัวเลือกจริงถ้าอาจารย์ไม่รับหัวข้อ distributed ledger จึงไม่เลือก Red Belly แม้คะแนนเท่ากับอันดับ 2
3. **BACKUP 1 คง Back to the Drawing Board** เพราะตรงหัวข้อย่อย Federated Learning ที่ระบุไว้ใน Domain 3 และผลทดลองทั้งหมดเป็นการวัดจริง (ไม่ใช่การประมาณ)
4. **BACKUP 2 เปลี่ยนจาก PESTO เป็น Burglars' IoT Paradise** เพราะในกลุ่มคะแนน 21 เรื่องนี้ตรงทักษะนิสิตที่สุด (5 คะแนน) และเป็นทางสำรองที่ดีที่สุดในทั้งสองกรณีเสี่ยง คือกรณีอาจารย์ไม่รับหัวข้อ distributed ledger และกรณีอาจารย์ต้องการหัวข้อที่ใกล้วิชา PESTO ตรงทักษะเท่ากันแต่การทดลองเล็กกว่าและไม่เกี่ยวกับวิชา
5. **Crowd-GPS-Sec เป็นทางสำรองลำดับถัดไป** ถ้าอาจารย์กำหนดให้ต้องเป็นงานเครือข่ายเซนเซอร์โดยตรง เพราะตรงวิชามากที่สุดและมีสมการครบ แต่ผลการหาตำแหน่งมาจาก simulation และแกนเป็นฟิสิกส์สัญญาณที่นิสิตต้องเตรียมเพิ่ม

---

## 6. ผู้สมัครที่ประเมินแล้วแต่ไม่อยู่ในตาราง 6 เรื่อง

| IEEE ID | บทความ | งานประชุม / Cited by | คะแนน | เหตุผลที่ไม่อยู่ในตาราง |
|---|---|---|:---:|---|
| 7958578 | IoT Goes Nuclear: Creating a ZigBee Chain Reaction | IEEE SP 2017 / 334 | 5, 4, 4, 5, 2 = 20 | ตรงวิชามาก (ZigBee บน IEEE 802.15.4) และมี percolation theory ประมาณว่าหลอดประมาณ 15,000 ดวงในปารีสพอให้ worm แพร่ทั้งเมือง แต่แกนเป็น side-channel และฮาร์ดแวร์ ซึ่งห่างจากทักษะนิสิตมากที่สุดในกลุ่ม; ข้อมูลเมตาของ IEEE ระบุสังกัดของ Adi Shamir และ Colin O'Flynn ในลักษณะที่น่าจะสลับกัน ต้องตรวจกับ PDF ถ้าใช้ |
| 7961984 | SoK: Single Sign-On Security – An Evaluation of OpenID Connect | IEEE EuroS&P 2017 / 43 | 4, 2, 4, 3, 5 = 18 | ตรงงาน JWT และ OIDC มาก (ไลบรารีที่ประเมิน 75% มีช่องโหว่ร้ายแรงอย่างน้อย 1 ข้อ, ทดสอบ 8 จาก 12 ไลบรารีด้วย PrOfESSOS) แต่ไม่มีสมการและผลเป็นภาพ ณ ปี 2017 |
| 8424629 | Machine Learning DDoS Detection for Consumer Internet of Things Devices | IEEE SPW 2018 (workshop) / 683 | 3, 2, 3, 4, 3 = 15 | Accuracy มากกว่า 0.999 จากข้อมูลจำลองขนาดเล็ก (อุปกรณ์ 3 ชนิด, traffic ปกติ 10 นาที, DoS แบบละประมาณ 1.5 นาที) ผู้แต่งยอมรับว่าต้องทดสอบกับ DDoS จริง และหัวข้อซ้อนกับ Paper I |

---

## 7. บรรณานุกรมผู้สมัคร (IEEE Style)

1. E. Kokoris-Kogias, P. Jovanovic, L. Gasser, N. Gailly, E. Syta, and B. Ford, "OmniLedger: A Secure, Scale-Out, Decentralized Ledger via Sharding," in *Proc. 2018 IEEE Symposium on Security and Privacy (SP)*, San Francisco, CA, USA, 2018, pp. 583–598, doi: [10.1109/SP.2018.000-5](https://doi.org/10.1109/SP.2018.000-5).
2. T. Crain, C. Natoli, and V. Gramoli, "Red Belly: A Secure, Fair and Scalable Open Blockchain," in *Proc. 2021 IEEE Symposium on Security and Privacy (SP)*, San Francisco, CA, USA, 2021, pp. 466–483, doi: [10.1109/SP40001.2021.00087](https://doi.org/10.1109/SP40001.2021.00087).
3. C. Baum, T. Frederiksen, J. Hesse, A. Lehmann, and A. Yanai, "PESTO: Proactively Secure Distributed Single Sign-On, or How to Trust a Hacked Server," in *Proc. 2020 IEEE European Symposium on Security and Privacy (EuroS&P)*, Genoa, Italy, 2020, pp. 587–606, doi: [10.1109/EuroSP48549.2020.00044](https://doi.org/10.1109/EuroSP48549.2020.00044).
4. Y. Jia, L. Xing, Y. Mao, D. Zhao, X. Wang, S. Zhao, and Y. Zhang, "Burglars' IoT Paradise: Understanding and Mitigating Security Risks of General Messaging Protocols on IoT Clouds," in *Proc. 2020 IEEE Symposium on Security and Privacy (SP)*, San Francisco, CA, USA, 2020, pp. 465–481, doi: [10.1109/SP40000.2020.00051](https://doi.org/10.1109/SP40000.2020.00051).
5. V. Shejwalkar, A. Houmansadr, P. Kairouz, and D. Ramage, "Back to the Drawing Board: A Critical Evaluation of Poisoning Attacks on Production Federated Learning," in *Proc. 2022 IEEE Symposium on Security and Privacy (SP)*, San Francisco, CA, USA, 2022, pp. 1354–1371, doi: [10.1109/SP46214.2022.9833647](https://doi.org/10.1109/SP46214.2022.9833647).
6. K. Jansen, M. Schäfer, D. Moser, V. Lenders, C. Pöpper, and J. Schmitt, "Crowd-GPS-Sec: Leveraging Crowdsourcing to Detect and Localize GPS Spoofing Attacks," in *Proc. 2018 IEEE Symposium on Security and Privacy (SP)*, San Francisco, CA, USA, 2018, pp. 1018–1031, doi: [10.1109/SP.2018.00012](https://doi.org/10.1109/SP.2018.00012).
7. E. Ronen, A. Shamir, A.-O. Weingarten, and C. O'Flynn, "IoT Goes Nuclear: Creating a ZigBee Chain Reaction," in *Proc. 2017 IEEE Symposium on Security and Privacy (SP)*, San Jose, CA, USA, 2017, pp. 195–212, doi: [10.1109/SP.2017.14](https://doi.org/10.1109/SP.2017.14).
8. C. Mainka, V. Mladenov, J. Schwenk, and T. Wich, "SoK: Single Sign-On Security – An Evaluation of OpenID Connect," in *Proc. 2017 IEEE European Symposium on Security and Privacy (EuroS&P)*, Paris, France, 2017, pp. 251–266, doi: [10.1109/EuroSP.2017.32](https://doi.org/10.1109/EuroSP.2017.32).
9. R. Doshi, N. Apthorpe, and N. Feamster, "Machine Learning DDoS Detection for Consumer Internet of Things Devices," in *Proc. 2018 IEEE Security and Privacy Workshops (SPW)*, San Francisco, CA, USA, 2018, pp. 29–35, doi: [10.1109/SPW.2018.00013](https://doi.org/10.1109/SPW.2018.00013).
