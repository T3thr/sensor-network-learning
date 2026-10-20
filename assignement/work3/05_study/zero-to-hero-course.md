# คอร์สทบทวน Zero-to-Hero: OmniLedger และระบบบัญชีแยกประเภทแบบแบ่ง Shard

> **บทความหลัก:** E. Kokoris-Kogias, P. Jovanovic, L. Gasser, N. Gailly, E. Syta and B. Ford, "OmniLedger: A Secure, Scale-Out, Decentralized Ledger via Sharding," in *2018 IEEE Symposium on Security and Privacy (SP)*, 2018, pp. 583–598, doi: 10.1109/SP.2018.000-5  
> **ผู้เรียน:** นายธีรภัทร ภู่ระย้า (รหัสนิสิต 66362416) วิชา 305432 เครือข่ายเซนเซอร์ (Sensor Networks)  
> **ต้นฉบับ:** [Paper_III_1_PRIMARY_OmniLedger_8418625.pdf](../01_original/Paper_III_1_PRIMARY_OmniLedger_8418625.pdf) (เลขหน้าในคอร์สนี้คือเลขหน้าที่พิมพ์ในบทความ 583 ถึง 598)

คอร์สนี้ไล่จากพื้นฐานไปจนถึงระดับที่ตอบคำถามเชิงลึกได้ แต่ละบทมีสามส่วน: แนวคิด, สิ่งที่ OmniLedger ทำจริง (พร้อมหน้าที่อ้างอิง) และตัวอย่างตัวเลขที่คำนวณได้เอง ตัวเลขที่ระบุว่า "คำนวณซ้ำ" เป็นการคำนวณของผู้เรียนเพื่อตรวจบทความ ไม่ใช่ตัวเลขที่บทความพิมพ์

---

## บทที่ 0: แผนที่ของคอร์ส

| บท | หัวข้อ | สิ่งที่ต้องพูดได้หลังจบบท |
|:---:|---|---|
| 1 | Distributed ledger และปัญหาการขยายขนาด | ทำไมระบบที่ทุกเครื่องตรวจทุกธุรกรรมจึงไม่ scale-out |
| 2 | Byzantine Fault Tolerance, ByzCoin และ ByzCoinX | ทำไมต้องมีโหนดซื่อสัตย์เกินสองในสาม และ ByzCoinX เปลี่ยนอะไร |
| 3 | ตัวตนแบบกัน Sybil และ epoch | validator เข้าระบบอย่างไร และทำไมต้องมีรอบ epoch |
| 4 | ค่าสุ่มที่บิดเบือนไม่ได้: RandHound และ VRF | เลือก leader และจัด shard อย่างไรให้ผู้โจมตีเลือกไม่ได้ |
| 5 | ความน่าจะเป็นที่ shard ถูกยึด | อ่านและแก้สมการที่ (1) และ (2) ได้ พร้อมตัวเลขตัวอย่าง |
| 6 | ธุรกรรมข้าม shard และ Atomix | อธิบายสามขั้นและข้อพิสูจน์ความถูกต้องแบบไม่เป็นทางการ |
| 7 | ต้นทุนของธุรกรรมข้าม shard (Appendix C) | คำนวณอัตราเร่งจริงและชี้จุดผิดของสมการที่ (3) |
| 8 | State blocks และ trust-but-verify | ตัดประวัติเก่าอย่างไร และยืนยันเร็วแลกกับอะไร |
| 9 | อ่านผลการทดลองอย่างมีวิจารณญาณ | ตัวเลขใดเชื่อได้ ตัวเลขใดขัดกันเอง |
| 10 | สถาปัตยกรรมระบบกระจายในภาษา Go | แปลงแนวคิดเป็นโค้ดและโครงสร้างบริการ |
| 11 | แบบฝึกหัดทบทวนพร้อมเฉลย | ตรวจความเข้าใจก่อนขึ้นนำเสนอ |

---

## บทที่ 1: Distributed ledger และปัญหาการขยายขนาด

### 1.1 แนวคิด

**Distributed ledger (DL)** คือบัญชีธุรกรรมที่หลายเครื่องเก็บร่วมกันและต้องตกลงกันว่าลำดับธุรกรรมคืออะไร สถานะของระบบคำนวณจากสายบล็อก (blockchain) ที่เรียงลำดับแล้ว

**UTXO model (Unspent Transaction Output):** ธุรกรรมหนึ่งรายการ "ใช้" UTXO เดิมทั้งก้อนเป็น input และ "สร้าง" UTXO ใหม่เป็น output สถานะของระบบคือเซตของ UTXO ที่ยังไม่ถูกใช้ OmniLedger เลือกโมเดลนี้เพราะเรียบง่ายและแยกทำขนานได้ง่าย (Section II-B หน้า 584)

**Scale-up กับ scale-out:** scale-up คือทำให้เครื่องเดียวแรงขึ้น scale-out คือเพิ่มจำนวนเครื่องแล้วความจุรวมเพิ่มตาม ระบบอย่าง Bitcoin หรือ ByzCoin ให้ทุก validator ตรวจทุกธุรกรรม เพิ่มเครื่องจึงไม่เพิ่มความจุ และอาจลดลงเพราะต้องประสานกันมากขึ้น (Section I หน้า 583)

### 1.2 สิ่งที่บทความตั้งเป็นโจทย์

Fig. 1 วางระบบเดิมไว้บนขอบของสามเหลี่ยมสามด้าน คือ Decentralization, Scale-Out และ Security ระบบเดิมได้เพียงสองในสาม:

| ระบบ | ได้ | เสีย | หลักฐาน |
|---|---|---|---|
| Elastico | กระจายศูนย์, scale-out | shard เล็ก (100 validator ในการทดลอง) โอกาสล้มเหลว 2.76% ต่อ shard ต่อบล็อกที่ผู้โจมตี 25% | Section II-E หน้า 585 |
| ByzCoin | กระจายศูนย์, ปลอดภัย | ความจุรวมไม่เพิ่มตามจำนวนผู้เข้าร่วม | Section II-A หน้า 584 |
| RSCoin | scale-out, ปลอดภัย | เป็นระบบแบบมีธนาคารกลาง (permissioned) และพึ่งค่าสุ่มจากแหล่งที่ต้องเชื่อใจ | Section IX หน้า 594, Table IV |

**ตรวจเลขได้เอง:** ค่า 2.76% ของ Elastico มาจาก footnote หน้า 585 ว่าเป็นการแจกแจงทวินามสะสม P = 0.25, N = 100, X ≥ 34 การคำนวณซ้ำได้ 0.02759 ตรงกับบทความ

### 1.3 เป้าหมายของ OmniLedger (Section III-D หน้า 585)

1. Full decentralization: ไม่มีจุดล้มเหลวเดี่ยว
2. Shard robustness: แต่ละ shard ประมวลผลได้ถูกต้องต่อเนื่อง
3. Secure transactions: ธุรกรรม commit แบบ atomic หรือ abort ในที่สุด ทั้งภายในและข้าม shard
4. Scale-out: throughput ที่คาดหวังเพิ่มแบบเชิงเส้นตามจำนวน validator
5. Low storage overhead: ไม่ต้องเก็บประวัติทั้งหมด
6. Low latency: ยืนยันธุรกรรมได้เร็ว

เป้าหมายข้อ 4 เป็นข้อที่บทที่ 7 จะตรวจว่าการทดลองพิสูจน์ได้จริงแค่ไหน

---

## บทที่ 2: Byzantine Fault Tolerance, ByzCoin และ ByzCoinX

### 2.1 ทำไมต้องมีโหนดซื่อสัตย์เกินสองในสาม

ปัญหา Byzantine Generals (Lamport, Shostak and Pease, 1982) ถามว่ากลุ่มผู้เข้าร่วมจะตกลงกันได้อย่างไรเมื่อบางคนโกหกได้ตามใจ ผลคลาสสิกคือถ้ามีผู้ไม่ซื่อสัตย์ f คน ต้องมีผู้เข้าร่วมอย่างน้อย **n = 3f + 1** คน

**สัญชาตญาณแบบ quorum:** ให้ n = 3f + 1 และให้ทุกการตัดสินใจต้องได้เสียง 2f + 1 เสียง สอง quorum ใด ๆ จะซ้อนกันอย่างน้อย (2f + 1) + (2f + 1) − (3f + 1) = f + 1 คน ซึ่งต้องมีคนซื่อสัตย์อย่างน้อยหนึ่งคน คนนี้จะไม่ลงเสียงให้สองทางเลือกที่ขัดกัน ระบบจึงไม่ตัดสินสองแบบพร้อมกัน

**PBFT (Castro and Liskov, 1999)** ทำให้แนวคิดนี้ใช้ได้จริง แต่การสื่อสารแบบทุกคนถึงทุกคนมีข้อความระดับ O(n²) ต่อรอบ จึงขยายได้ไม่กี่สิบถึงร้อยโหนด (Table IV ใส่ PBFT ไว้ที่ 16 validator)

### 2.2 ByzCoin: ทำ PBFT ให้ขยายได้ด้วย collective signing

ByzCoin ใช้ **CoSi (collective signing)** ให้ validator จำนวนมากร่วมกันออกลายเซ็นเดียวที่มีขนาดคงที่ และกระจายบล็อกผ่าน multicast tree ข้อเสียคือเมื่อโหนดในต้นไม้ล้ม ByzCoin ถอยไปใช้รูปแบบที่ขยายไม่ได้ ประสิทธิภาพจึงตกมาก (Section II-A หน้า 584, Section V-A หน้า 589)

**ขนาดของหลักฐานสำคัญแค่ไหน:** บทความยกตัวอย่างว่า shard 100 validator ใช้ collective signature เพียง 77 ไบต์ ขณะที่ลายเซ็นแยกของทุกคนรวมกันประมาณ 9 KB ใหญ่กว่าธุรกรรมธรรมดา (500 ไบต์) เกือบสองลำดับขนาด (หน้า 589) ข้อนี้คือเหตุผลที่ proof ของ Atomix ในบทที่ 6 มีขนาดเล็กพอใช้งานได้

### 2.3 ByzCoinX: สิ่งที่เปลี่ยน (Section V-A และ V-B หน้า 589)

**รูปแบบการสื่อสารแบบกลุ่ม (สองชั้น):**
- ใช้ค่าสุ่มของ epoch แบ่ง validator ใน shard เป็นกลุ่มเท่า ๆ กัน จำนวนกลุ่ม g กำหนดใน shard-policy file
- ทุกรอบ protocol leader สุ่มเลือก group leader ในแต่ละกลุ่ม ถ้า group leader ไม่ตอบภายใน timeout ก็สุ่มคนใหม่
- ไปขั้นถัดไปเมื่อได้การยอมรับเกิน 2/3 ถ้า protocol leader ล้ม ทุกคนเริ่ม view-change แบบ PBFT
- ตั้ง timeout สองระดับ: T1 สำหรับ leader ลองส่งซ้ำถึงสมาชิกที่เงียบ และ T2 สำหรับสมาชิกตัดสินว่า leader ล้ม โดยกำหนด T1 = 0.1 T2 และเมื่อเกิด view-change T2 จะเพิ่มเป็นสองเท่า (Section VI-D หน้า 591 ถึง 592)

**การ commit แบบขนาน:** ธุรกรรมสองรายการขัดแย้งกันเมื่อ (1) ใช้ UTXO ตัวเดียวกัน หรือ (2) รายการหนึ่งใช้ output ของอีกรายการ กรณี (1) commit ได้รายการเดียว กรณี (2) ต้องเรียงลำดับ ธุรกรรมที่ไม่มีสองกรณีนี้ใส่คนละบล็อกและทำพร้อมกันได้ บล็อกจึงเก็บเป็น **blockDAG** ที่มีหลาย parent และใส่ backpointer ชี้ไปยังบล็อกที่พึ่งพา

**ผลที่วัดได้ (Section VIII-E หน้า 593 ถึง 594):**
- ความขนาน 4 บล็อก: throughput เพิ่ม 20% และ latency ต่อบล็อกลด 35% เทียบกับบล็อกใหญ่บล็อกเดียว (Fig. 9, Table III)
- ขนานมากกว่านั้นเริ่มแย่ลง เพราะต้นทุนการเข้ารหัสต่อบล็อกคงที่
- รูปแบบกลุ่มของ ByzCoinX เร็วกว่าต้นไม้ของ ByzCoin เมื่อกลุ่มเล็กกว่า 600 โหนด และทนความล้มเหลวได้ดีกว่า (Fig. 10)

### 2.4 ตัวอย่างตัวเลข: ความน่าจะเป็นที่กลุ่มสื่อสารทำงานได้ (Section VI-D หน้า 591 ถึง 592)

บทความพิจารณา shard 600 โหนด แบ่งเป็น √600 ≈ 25 กลุ่ม กลุ่มละ 25 โหนด แล้วรายงานว่า
- โอกาสที่กลุ่มหนึ่งมีโหนดไม่ซื่อสัตย์น้อยกว่า 15 คือ 99.93% (hypergeometric)
- union bound ของ 25 กลุ่ม: 1 − 25 × 0.0007 = 98.25% (ขั้นนี้ตรวจแล้วสอดคล้อง)
- กลุ่มที่มีโหนดไม่ซื่อสัตย์ 15 โหนด จะหา group leader ที่ซื่อสัตย์ได้ภายใน 10 ครั้งด้วยความน่าจะเป็น 1 − (15/24)<sup>10</sup> ซึ่งบทความพิมพ์ว่า 98.6%

**ตรวจเลขได้เอง:** (15/24)<sup>10</sup> = 0.625<sup>10</sup> ≈ 0.0091 ดังนั้น 1 − 0.0091 ≈ **99.1%** ไม่ใช่ 98.6% ส่วนค่า 99.93% ขึ้นกับจำนวนโหนดไม่ซื่อสัตย์ทั้งหมดที่สมมติ ซึ่งข้อความไม่ระบุ ถ้าสมมติว่ามี 200 จาก 600 (หนึ่งในสาม) จะได้ประมาณ 99.53% จุดเหล่านี้ไม่กระทบข้อสรุปหลัก แต่เป็นตัวอย่างที่ดีว่าควรคำนวณซ้ำก่อนอ้างอิง

---

## บทที่ 3: ตัวตนแบบกัน Sybil และ epoch

**Sybil attack** คือการสร้างตัวตนปลอมจำนวนมากเพื่อครองเสียงข้างมาก ระบบแบบ permissionless จึงต้องผูกตัวตนกับทรัพยากรที่ปลอมยาก เช่น Proof-of-Work หรือ Proof-of-Stake (Section II-D หน้า 584 ถึง 585)

OmniLedger ไม่ผูกกับกลไกใดกลไกหนึ่ง validator สร้างตัวตนด้วยกลไกกัน Sybil ใดก็ได้ แล้วลงทะเบียนใน **identity blockchain** โดยต้องลงทะเบียนใน epoch e − 1 เพื่อเข้าร่วม epoch e (Section III-A หน้า 585)

**Epoch** คือช่วงเวลาคงที่ (ในบทความใช้ 1 วัน) ระหว่างการจัด shard ใหม่ทั้งระบบ ภายใน epoch นับเวลาเป็น round ที่แต่ละ shard ไม่ต้องตรงกัน

**สมมติฐานเครือข่ายสองระดับ (Section III-B หน้า 585):** ระหว่าง epoch ใช้แบบ synchronous ที่มีเพดานความหน่วง Δ ระดับนาที สำหรับงานช้าอย่างการสร้างตัวตนและการจัด shard ส่วนภายใน epoch ใช้แบบ partially synchronous ที่ timeout เพิ่มแบบทวีคูณ เพราะต้องการ latency ระดับวินาที

**Threat model (Section III-C หน้า 585):** ผู้โจมตีคุม validator ได้ไม่เกิน 25% (n = 4f) และปรับตัวได้ช้าในระดับ epoch (mildly adaptive) footnote ระบุว่าระบบรับได้ถึง 33% − ε แต่ประสิทธิภาพลดลง

---

## บทที่ 4: ค่าสุ่มที่บิดเบือนไม่ได้: RandHound และ VRF

### 4.1 ทำไมค่าสุ่มต้อง "บิดเบือนไม่ได้"

ถ้า validator เลือก shard เองได้ ผู้โจมตีจะรวมกำลังทั้งหมดไว้ใน shard เดียว การสุ่มจึงจำเป็น แต่ถ้าผู้โจมตีมีอิทธิพลต่อค่าสุ่ม ก็เลือกผลที่ตนได้เปรียบได้ บทความต้องการค่าสุ่มที่มีสี่คุณสมบัติ: unbiasability, unpredictability, third-party verifiability และ scalability (Section IV-A หน้า 586)

**RandHound (Syta et al., IEEE S&P 2017):** โปรโตคอลแบบ commit-then-reveal ที่แบ่งเซิร์ฟเวอร์เป็นกลุ่มย่อยและใช้หลักรังนกพิราบ (pigeonhole principle) พิสูจน์ว่าผลลัพธ์มีส่วนร่วมของผู้ซื่อสัตย์อย่างน้อยหนึ่งคน ผลจึงสุ่มจริง (Section II-C หน้า 584) ข้อจำกัดคือต้องมี leader คอยประสาน

### 4.2 VRF และการจับสลากเลือก leader

**Verifiable Random Function (VRF):** รับ input x และ private key sk แล้วคืนค่าแฮชสุ่มพร้อม proof π ใครที่มี public key pk ตรวจได้ว่าแฮชนั้นมาจาก x จริง (Section II-C หน้า 584)

**ขั้นตอน (Section IV-A หน้า 587):**
1. ต้น epoch e แต่ละ validator i คำนวณ ticket<sub>i,e,v</sub> = VRF<sub>sk<sub>i</sub></sub>("leader" ‖ config<sub>e</sub> ‖ v) โดย v คือ view counter
2. แลก ticket กันภายในเวลา Δ แล้วยอมรับ ticket ที่มีค่าต่ำสุดเป็น leader ของ RandHound
3. ถ้า leader ไม่เริ่มภายในอีก Δ ถือว่ารอบนั้นล้ม เพิ่ม view เป็น v + 1 แล้วจับใหม่ (leader ที่ล้มถูกตัดออกทั้ง epoch)
4. เมื่อได้ rnd<sub>e</sub> พร้อม proof ทุกคนตรวจแล้วใช้สร้าง permutation π<sub>e</sub> ของ 1 ถึง n และตัดเป็น m กลุ่มขนาดใกล้เคียงกัน

**ความน่าจะเป็นที่ผู้โจมตีคุม leader ติดกัน (Section VI-A หน้า 591):** ผู้โจมตี 25% ชนะแต่ละรอบได้ไม่เกิน 1/4 จึงคุม n รอบติดกันด้วยความน่าจะเป็นไม่เกิน 1/4<sup>n</sup> เมื่อ n = 10 ได้ 1/4<sup>10</sup> ≈ 9.5 × 10<sup>−7</sup> ต่ำกว่า 10<sup>−6</sup> บทความจึงสรุปว่าผู้โจมตีคุมได้ไม่เกิน 10 รอบติดกัน

### 4.3 การเปลี่ยน epoch โดยไม่หยุดระบบ (Section IV-B หน้า 587)

ถ้าสลับ validator ทุกคนพร้อมกัน shard จะหยุดทำงานจนกว่าคนใหม่ bootstrap เสร็จ OmniLedger จึงทยอยสลับ:
- สลับออกได้ไม่เกิน 1/3 ของขนาด shard (≈ n/m) เพื่อให้ยังมีผู้ซื่อสัตย์ที่พร้อมทำงานอย่างน้อย 2/3
- ขนาดชุดที่สลับครั้งละ **k = log(n/m)** โดยลำดับของชุดมาจาก permutation ที่ seed ด้วย H(j ‖ rnd<sub>e</sub>) สำหรับ shard j
- แต่ละชุดรอ Δ ก่อนเริ่ม bootstrap เพื่อกระจายภาระเครือข่าย

**ตัวอย่าง:** 1,800 validator ใน 25 shard ได้ n/m = 72 และ log<sub>2</sub>(72) ≈ 6.2 จึงสลับชุดละประมาณ 6 คน (บทความไม่ระบุฐานของ log ตัวอย่างนี้ใช้ฐาน 2)

---

## บทที่ 5: ความน่าจะเป็นที่ shard ถูกยึด

### 5.1 แบบจำลอง

ถ้าสุ่ม validator เข้า shard ขนาด n จากประชากรขนาดใหญ่มากที่มีสัดส่วนผู้โจมตี m แต่ละที่นั่งเป็นผู้โจมตีด้วยความน่าจะเป็น m อย่างอิสระ จำนวนผู้โจมตี X ใน shard จึงแจกแจงแบบทวินาม shard ปลอดภัยเมื่อ X ≤ ⌊n/3⌋ (Section VI-B หน้า 591)

**สมการที่ (1) ในรูปที่ถูกต้อง:**

P[X ≤ ⌊n/3⌋] = Σ<sub>k=0</sub><sup>⌊n/3⌋</sup> C(n, k) · m<sup>k</sup> · (1 − m)<sup>n−k</sup>

และโอกาสที่ shard ล้มเหลวคือ P[X<sub>S</sub>] = 1 − P[X ≤ ⌊n/3⌋]

**จุดผิดในบทความ:** สมการที่พิมพ์ในหน้า 591 ใช้ขอบบนของผลรวมเป็น n ตามทฤษฎีบททวินาม Σ<sub>k=0</sub><sup>n</sup> C(n, k) m<sup>k</sup> (1 − m)<sup>n−k</sup> = (m + (1 − m))<sup>n</sup> = 1 เสมอ สมการที่พิมพ์จึงไม่มีความหมาย และกราฟ Fig. 5 ย่อมคำนวณจากขอบบน ⌊n/3⌋ มิฉะนั้นจะไม่มีขนาด shard ใดที่ให้ผลต่างกัน

**ข้อสังเกตเรื่องสัญลักษณ์:** ในบทความ n หมายถึงจำนวน validator ทั้งหมด (Section III), ขนาด shard (สมการที่ 1), จำนวน shard (สมการที่ 2) และจำนวน leader ติดกัน (Section VI-A) ส่วน m หมายถึงจำนวน shard (Section III, Table II) และสัดส่วนผู้โจมตี (Section VI) เวลาอ่านต้องดูบริบททุกครั้ง

### 5.2 ตารางตัวอย่างที่คำนวณซ้ำ

โอกาสล้มเหลวต่อ shard P[X > ⌊n/3⌋] สำหรับสี่การตั้งค่าที่ใช้ใน Fig. 6 และ Table I:

| ขนาด shard | ผู้โจมตี | ⌊n/3⌋ | P[shard ล้มเหลว] (คำนวณซ้ำ) | จำนวน shard เมื่อมี 1,800 โหนด |
|:---:|:---:|:---:|:---:|:---:|
| 4 | 1% | 1 | 5.9 × 10<sup>−4</sup> | 450 |
| 25 | 5% | 8 | 1.9 × 10<sup>−6</sup> | 72 |
| 70 | 12.5% | 23 | 2.2 × 10<sup>−6</sup> | 25 |
| 600 | 25% | 200 | 1.9 × 10<sup>−6</sup> | 3 |
| 100 (Elastico) | 25% | 33 | 2.76 × 10<sup>−2</sup> | ไม่เกี่ยวข้อง |

**สิ่งที่อ่านได้จากตาราง:** สามการตั้งค่าหลังถูกเลือกให้อยู่ราว 2 × 10<sup>−6</sup> ต่อ shard ซึ่งสอดคล้องกับเป้า 10<sup>−6</sup> ใน Fig. 5 แต่การตั้งค่า [4, 1%] อยู่ที่ 5.9 × 10<sup>−4</sup> สูงกว่ามากกว่าสองร้อยเท่า และเมื่อมี 450 shard ความเสี่ยงต่อ epoch อยู่ราว 23% ถึง 27% แท่งกราฟ [4, 1%] ที่ให้ throughput สูงที่สุดใน Fig. 6 จึงไม่ได้อยู่ที่ระดับความปลอดภัยเดียวกับแท่งอื่น ข้อนี้บทความไม่ได้กล่าวถึง

### 5.3 ความล้มเหลวทั้ง epoch (สมการที่ 2)

ระบบล้มเหลวถ้า shard ใดก็ได้ถูกยึด ใช้ union bound: P[shard ใดล้มเหลว] ≤ จำนวน shard × P[X<sub>S</sub>] และเผื่อกรณีที่ผู้โจมตีได้เป็น leader แล้วทิ้งผลของ RandHound เพื่อสุ่มใหม่ รอบที่ k เกิดได้ด้วยความน่าจะเป็นไม่เกิน 1/4<sup>k</sup>:

P[X<sub>E</sub>] ≤ Σ<sub>k=0</sub><sup>l</sup> (1/4<sup>k</sup>) · n · P[X<sub>S</sub>] ≤ (4/3) · n · P[X<sub>S</sub>] เมื่อ l → ∞ (อนุกรมเรขาคณิต 1 + 1/4 + 1/16 + ... = 4/3)

โดยในสมการนี้ n คือ**จำนวน shard** (Section VI-C หน้า 591)

**ตัวอย่างของบทความ:** ผู้โจมตี 12.5% กับ 16 shard ได้ 4 × 10<sup>−5</sup> ต่อ epoch และด้วย epoch 1 วัน 1 / (4 × 10<sup>−5</sup>) = 25,000 วัน ≈ 68.5 ปี

**คำนวณซ้ำ:** ใช้ shard 70 โหนด (2.2 × 10<sup>−6</sup>) ได้ (4/3) × 16 × 2.2 × 10<sup>−6</sup> ≈ 4.6 × 10<sup>−5</sup> ใกล้กับค่าของบทความ

### 5.4 Binomial หรือ hypergeometric

แบบจำลองทวินามสมมติประชากรไม่จำกัด ถ้าจำนวน validator จำกัดและจำนวนผู้โจมตีคงที่ การสุ่มแบบไม่คืนที่เป็น hypergeometric ซึ่งมีความแปรปรวนน้อยกว่าเล็กน้อย การใช้ทวินามจึงให้ค่าที่ค่อนข้างระมัดระวัง บทความใช้ทวินามในสมการที่ (1) และใช้ hypergeometric ในการวิเคราะห์กลุ่มสื่อสาร (บทที่ 2.4)

---

## บทที่ 6: ธุรกรรมข้าม shard และ Atomix

### 6.1 ปัญหา atomic commit

เมื่อ UTXO กระจายอยู่หลาย shard ธุรกรรมหนึ่งรายการอาจต้องใช้ input จาก shard A และ B แล้วสร้าง output ใน shard C ถ้าส่งไปทุก shard พร้อมกันแบบตรงไปตรงมา บาง shard อาจ commit ขณะที่ shard อื่น abort และไม่มีวิธีย้อนกลับที่ปลอดภัย เงินจะหายหรือถูกล็อก (Section IV-C หน้า 587)

โปรโตคอลคลาสสิกอย่าง **two-phase commit** ออกแบบมาสำหรับผู้เข้าร่วมที่ซื่อสัตย์แต่อาจล่ม และต้องมีผู้ประสาน (coordinator) ถ้าผู้ประสานล่มกลางทาง ผู้เข้าร่วมอาจค้างรอ (blocking)

### 6.2 Atomix สามขั้น (Section IV-C หน้า 588, Fig. 3)

1. **Initialize:** client สร้าง cross-TX ที่ใช้ UTXO จาก input shards (ISs) และสร้าง UTXO ใน output shards (OSs) แล้ว gossip จนถึงทุก IS
2. **Lock:** leader ของแต่ละ IS ตรวจธุรกรรมภายใน shard
   - ถ้าถูกต้อง: ทำเครื่องหมายว่า input ถูกใช้แล้ว บันทึกลง ledger และ gossip **proof-of-acceptance** (Merkle proof ที่ลงนามแล้ว ชี้ไปยังบล็อกที่บรรจุธุรกรรม)
   - ถ้าไม่ถูกต้อง: ออก **proof-of-rejection** ที่มีบิตพิเศษบอกผล
3. **Unlock:**
   - **Unlock to Commit:** ถ้าทุก IS ออก proof-of-acceptance, client (หรือฝ่ายอื่น เช่น IS leader หลัง timeout) gossip unlock-to-commit ที่มี lock transaction และ proof ครบทุก input แล้ว OS แต่ละแห่งตรวจและใส่ในบล็อกถัดไป
   - **Unlock to Abort:** ถ้ามี IS ใดออก proof-of-rejection แม้แห่งเดียว client (หรือฝ่ายอื่น) ส่ง unlock-to-abort ที่มี proof-of-rejection อย่างน้อยหนึ่งใบ แล้ว IS ทำให้ UTXO เดิมใช้ได้อีกครั้ง

### 6.3 ทำไมจึงถูกต้อง (ข้อโต้แย้งแบบไม่เป็นทางการ หน้า 588)

ภายใต้สมมติฐานว่า shard ซื่อสัตย์โดยรวม ไม่ล้มถาวร และได้รับข้อความในที่สุด:
1. shard ประมวลผลธุรกรรมที่ถูกต้องเสมอ และแต่ละ IS ตอบกลับเพียงหนึ่งแบบ (ยอมรับหรือปฏิเสธ)
2. ถ้าทุก IS ยอมรับ ทุก OS จะ unlock to commit
3. ถ้ามี IS หนึ่งปฏิเสธ ทุก IS จะ unlock to abort
4. ถ้ามี IS หนึ่งปฏิเสธ จะไม่มี OS ใด unlock to commit

ผลคือ client ถือได้เพียงชุด proof ที่นำไปสู่ commit **หรือ** abort อย่างใดอย่างหนึ่ง ไม่มีทางได้ทั้งสองแบบ จึงไม่เกิด double spending และเงินที่ล็อกเรียกคืนได้เสมอเมื่อ commit ไม่ได้

### 6.4 ข้อแลกเปลี่ยนที่ต้องรู้

- เงินไม่ถูกคืนอัตโนมัติ ต้องมีผู้เริ่ม unlock-to-abort ถ้า client ล่มถาวรและไม่มีใครทำแทน เงินจะค้าง บทความเทียบว่าเหมือนทำ private key หาย (หน้า 588 ถึง 589)
- ทางบรรเทา: ใครก็ส่ง unlock แทนได้ (เช่น validator ที่ได้ค่าธรรมเนียม) หรือให้ shard ของ input ที่มีค่าน้อยที่สุดเป็นผู้ประสาน โดยให้ validator f + 1 รายส่ง unlock (หน้า 589)
- Appendix D ขยาย Atomix ไปยัง object ที่มีสถานะ (เช่น smart contract) ด้วยการล็อกแบบ pessimistic และส่ง unlock ไปทั้ง IS และ OS (หน้า 597 ถึง 598)

### 6.5 เทียบกับสิ่งที่นิสิตใช้ในงานจริง (ความเห็นของผู้เรียน)

| ประเด็น | Two-phase commit | Saga ใน microservices | Atomix |
|---|---|---|---|
| ผู้เข้าร่วม | โหนดที่ล่มได้แต่ไม่โกง | บริการที่ล่มได้แต่ไม่โกง | shard ที่ซื่อสัตย์โดยรวมด้วย BFT |
| ผู้ขับเคลื่อน | coordinator | orchestrator หรือ event choreography | client หรือใครก็ได้ที่ถือ proof |
| การล็อก | ล็อกระหว่าง prepare | ไม่ล็อก ย้อนงานด้วย compensating transaction | ล็อก input จนกว่าจะ unlock |
| หลักฐานการตัดสิน | ข้อความภายในระบบ | สถานะใน log ของแต่ละบริการ | proof ที่มี collective signature ใครก็ตรวจได้ |

---

## บทที่ 7: ต้นทุนของธุรกรรมข้าม shard (Appendix C หน้า 597)

### 7.1 ธุรกรรมหนึ่งแตะกี่ shard

ถ้ากำหนด UTXO ให้ shard ตาม hash แบบสุ่มสม่ำเสมอ ธุรกรรมที่มี UTXO รวม n ตัว (input และ output) ใน m shard จะแตะ k shard ด้วยความน่าจะเป็น

P(k) = C(m, k) · k! · S(n, k) / m<sup>n</sup>

โดย S(n, k) คือ Stirling number of the second kind (จำนวนวิธีแบ่ง n สิ่งเป็น k กลุ่มที่ไม่ว่าง)

**สมการที่ (3) ของบทความ** เขียนเป็นสูตรเวียนเกิดโดยพิมพ์สัมประสิทธิ์พจน์แรกเป็น (m − k)/m แต่เมื่อเพิ่ม UTXO ตัวที่ n ขณะที่ n − 1 ตัวแรกแตะ k − 1 shard โอกาสที่ตัวใหม่ไปตก shard ใหม่คือ (m − (k − 1))/m = **(m − k + 1)/m** สูตรที่พิมพ์ทำให้ผลรวมของความน่าจะเป็นไม่เท่ากับ 1

### 7.2 ตัวอย่างที่คำนวณซ้ำ

**n = 3 UTXO, m = 3 shard:** P(k = 1) = 3 · 1 · 1 / 27 = 1/9 ≈ **11.1%** บทความพิมพ์ 3.7% ซึ่งเท่ากับ 1/27 คือโอกาสที่ทุกตัวตกใน shard ที่ระบุไว้ล่วงหน้าหนึ่งแห่ง ไม่ใช่ shard ใดก็ได้

**m = 4 shard:**

| n (UTXO) | P(k=1) | P(k=2) | P(k=3) | P(k=4) | E[k] |
|:---:|:---:|:---:|:---:|:---:|:---:|
| 3 | 0.0625 | 0.5625 | 0.375 | 0 | 2.31 |
| 4 | 0.0156 | 0.328 | 0.5625 | 0.094 | 2.73 |

### 7.3 อัตราเร่งเมื่อเพิ่มจาก 1 เป็น 4 shard

**สูตรของบทความ:** speed-up = m · Σ P(k)/k = m · E[1/k]
- n = 4: 4 × (0.0156 + 0.328/2 + 0.5625/3 + 0.094/4) ≈ **1.56** ตรงกับตัวเลขที่พิมพ์
- n = 3 (ตามที่ข้อความบอกว่าธุรกรรมทั่วไปมีสอง input หนึ่ง output): 4 × (0.0625 + 0.5625/2 + 0.375/3) = **1.875**

ดังนั้นค่า 1.56 ตรงกับกรณี 4 UTXO ไม่ใช่ 3 UTXO ตามข้อความ

**สูตรแบบนับงานรวม (ความเห็นของผู้เรียน):** ถ้าแต่ละ shard ที่ธุรกรรมแตะต้องใช้งานหนึ่งหน่วย และความจุรวมคือ m หน่วย ปริมาณงานจะเป็น m / E[k]:
- n = 3: 4 / 2.31 ≈ **1.73**
- n = 4: 4 / 2.73 ≈ **1.46**

**ทำไมสูตรของบทความให้ค่าสูงกว่าเสมอ:** ฟังก์ชัน 1/x เป็น convex ตามอสมการของ Jensen E[1/k] ≥ 1/E[k] สูตร m · E[1/k] จึงไม่ต่ำกว่า m / E[k] เสมอ และทั้งสองสูตรยังไม่นับงานเพิ่มของ Atomix ในขั้น lock และ unlock

### 7.4 ข้อสรุปของบทนี้

- Table II (หน้า 593) ให้ 439, 869, 1,674, 3,240, 5,850 tps ที่ 1, 2, 4, 8, 16 shard (ผู้โจมตี 12.5% shard ละ 70 โหนด) อัตราเร่ง 1.98, 3.81, 7.38, 13.33 เท่า ประสิทธิภาพต่อ shard 99.0%, 95.3%, 92.3%, 83.3%
- Appendix C ของผู้เขียนเองชี้ว่าภาระงานที่ UTXO กระจายตาม hash จะได้อัตราเร่งที่ 4 shard ต่ำกว่านั้นมาก (1.56 เท่าหรือต่ำกว่า)
- บทความไม่ระบุสัดส่วนธุรกรรมข้าม shard ในการทดลอง throughput และไม่มีการทดลองที่ปรับสัดส่วนนี้
- Section X (หน้า 595) ยอมรับเองว่า throughput ขึ้นกับภาระงาน และถ้าทุกธุรกรรมแตะทุก shard ระบบที่มี shard เดียวจะดีกว่า งานต่อยอดคือการแบ่ง shard ตาม locality

---

## บทที่ 8: State blocks และ trust-but-verify

### 8.1 State blocks (Section V-C หน้า 589 ถึง 590)

ปัญหา: ledger โตไม่หยุด บทความยกตัวอย่างว่าระบบระดับ Visa (4,000 tx/s, 500 ไบต์ต่อธุรกรรม) สร้างข้อมูลได้เกิน 150 GB ต่อวัน validator ใหม่ที่ต้องเล่นประวัติทั้งหมดจะ bootstrap ช้ามาก

วิธีแก้ คล้าย **stable checkpoint** ของ PBFT:
1. ปลาย epoch e leader เก็บ UTXO ทั้งหมดใน ordered Merkle tree และใส่ root hash ใน header ของ state block sb<sub>j,e</sub>
2. validator รัน consensus บน header (ทุกคนสร้าง Merkle tree เดียวกันเพื่อตรวจได้)
3. เมื่อผ่าน sb<sub>j,e</sub> กลายเป็น genesis block ของ epoch e + 1 และทิ้งตัว UTXO ของ sb<sub>j,e−1</sub> ได้
4. บล็อกปกติของ epoch e เก็บไว้จนจบ epoch e + 1 เพื่อให้ client สร้าง proof-of-existence ได้ หลังจากนั้นหน้าที่เก็บ proof ย้ายไปที่ client
5. เพื่อไม่ให้การสร้าง state block หยุด epoch ใหม่ validator ใส่ state block ว่างเป็นตัวจองที่ไว้ก่อน แล้ว commit ตัวจริงเป็นบล็อกปกติทีหลัง

**ผลที่วัดได้ (Section VIII-F หน้า 594, Fig. 11):** จำลองกับ Bitcoin ที่มี state block รายสัปดาห์ validator ที่ตามไม่ทันเกิน **19 วัน (2,736 บล็อก)** จะประหยัดแบนด์วิดท์ด้วย state block ใน OmniLedger 2,736 บล็อกเกิดในเวลาไม่ถึง 8 ชั่วโมง จึงคุ้มมากกับ epoch ยาวหนึ่งวัน

### 8.2 Trust-but-verify (Section V-D หน้า 590)

ข้อแลกเปลี่ยนพื้นฐาน: shard ใหญ่ปลอดภัยแต่ช้า shard เล็กเร็วแต่ยึดง่าย (Fig. 4) OmniLedger แบ่ง validator ใน shard เป็น
- **กลุ่ม optimistic** จำนวนมาก ขนาดเล็ก (เล็กได้ถึงหนึ่งโหนด) ยืนยันเบื้องต้นเร็ว
- **กลุ่ม core** หนึ่งกลุ่ม ตรวจซ้ำทุกบล็อกจากกลุ่ม optimistic แล้วออกบล็อกสุดท้าย

ถ้า core พบความไม่สอดคล้อง ธุรกรรมนั้นถูกตัดออกและผู้ที่ลงนามบล็อกผิดถูกระบุตัวและลงโทษ shard-policy file อาจจำกัดมูลค่าที่ยืนยันแบบ optimistic ไม่ให้เกิน stake ของ validator

**ตัวเลข (Table I หน้า 592):**

| [ขนาด shard, ผู้โจมตี] | [4, 1%] | [25, 5%] | [70, 12.5%] | [600, 25%] |
|---|:---:|:---:|:---:|:---:|
| Regular validation (s) | 1.38 | 5.99 | 8.04 | 14.52 |
| ชั้นแรก (s) | 1.38 | 1.38 | 1.38 | 4.48 |
| ชั้นที่สอง (s) | 1.38 | 55.89 | 41.84 | 62.96 |

การทดลองใช้บล็อก 1 MB สำหรับแบบปกติ, 500 KB สำหรับบล็อก optimistic และ 16 MB สำหรับบล็อกสุดท้าย โดยมีกลุ่ม optimistic 32 กลุ่มต่อ shard (Section VIII-B หน้า 592) บทความระบุว่าโอกาสที่การยืนยันเบื้องต้นจะเปิดช่องให้ double-spending น้อยกว่า 10% และอ้างว่า finality ยังไม่ถึงหนึ่งนาที ซึ่งไม่ตรงกับ 62.96 วินาทีในตาราง

---

## บทที่ 9: อ่านผลการทดลองอย่างมีวิจารณญาณ

### 9.1 สภาพแวดล้อม (Section VIII-A หน้า 592)

DeterLab เครื่องจริง 60 เครื่อง (Intel E5-2420 v2, RAM 24 GB, ลิงก์ 10 Gbps) จำลองสูงสุด 1,800 โหนด จำกัดทุกลิงก์ที่ 20 Mbps และหน่วง 100 ms ใช้ข้อมูล 10,000 บล็อกแรกของ Bitcoin

### 9.2 วิธีอ่านค่าจาก Fig. 6 (ที่ผู้เรียนใช้)

Fig. 6 เป็นกราฟแท่งแกนตั้งสเกล log และบทความไม่พิมพ์ตัวเลขของแต่ละแท่ง ผู้เรียนอ่านพิกัดเวกเตอร์ของแท่งจากไฟล์ PDF โดยตรง:
1. หาเส้นแกน: 10<sup>0</sup> อยู่ที่ y = 186.21 pt และ 10<sup>7</sup> อยู่ที่ y = 76.2 pt ดังนั้นหนึ่งลำดับขนาดเท่ากับ 15.716 pt
2. แปลงความสูงของขอบบนแท่งเป็นค่า: ค่า = 10<sup>(186.21 − y)/15.716</sup>
3. ตรวจการสอบเทียบด้วยเส้น Visa ที่บทความบอกว่าประมาณ 4,000 tx/s อ่านได้ประมาณ 4,120 จึงคลาดเคลื่อนราว 3%

| [ขนาด shard, ผู้โจมตี] | regular (ประมาณ) | trust-but-verify (ประมาณ) |
|---|:---:|:---:|
| [4, 1%] | 431,600 | 431,600 |
| [25, 5%] | 25,700 | 91,200 |
| [70, 12.5%] | 6,800 | 19,900 |
| [600, 25%] | 450 | 2,200 |

### 9.3 ตัวเลขที่ขัดกันเองในบทความ

| ประเด็น | ข้อความในบทความ | สิ่งที่ตรวจพบ |
|---|---|---|
| throughput ที่ 1,800 โหนด ผู้โจมตี 12.5% | บทนำ 6,000 tps (หน้า 584), Section VIII-B 13,000 tps (หน้า 593) | Fig. 6 อ่านได้ราว 6,800 หรือ 19,900 tps |
| finality ของธุรกรรมความเสี่ยงสูง | ไม่ถึงหนึ่งนาที (หน้า 593) | Table I ที่ 25% ใช้ 62.96 วินาที |
| ขนาดการทดลอง | Table IV: 2,400 validator (หน้า 595) | การทดลองที่รายงานสูงสุด 1,800 โหนด |
| กรณีผู้โจมตี 25% ที่ระดับ Visa | ต้องใช้ราว 4,200 โหนดใน 7 shard (หน้า 593) | เป็นค่าประมาณ แพลตฟอร์มรับภาระไม่ไหว |
| Fig. 5 | คำบรรยายใต้ภาพ: ซ้ายขนาด shard ขวากลุ่ม optimistic | ข้อความ Section VI-B เรียกซ้ายขวาสลับกัน |

### 9.4 สิ่งที่การทดลองพิสูจน์ได้และไม่ได้

**พิสูจน์ได้:** ต้นแบบทำงานได้จริง, ByzCoinX ดีกว่า ByzCoin, Atomix ใช้งานได้โดยที่ shard 70 โหนด latency ที่ client เห็นอยู่ราว 9 ถึง 12 วินาทีตั้งแต่ 1 ถึง 7 shard (Fig. 8), การเปลี่ยน epoch ใช้เวลาหลักนาทีโดยมี RandHound เป็นต้นทุนหลัก

**ยังพิสูจน์ไม่ได้:** scale-out เชิงเส้นในภาระงานที่มีธุรกรรมข้าม shard จำนวนมาก, latency ของ Atomix เมื่อ shard ใหญ่ (Fig. 8 ขวา: shard 600 โหนดเพิ่มจากราว 15 เป็น 26 วินาทีเมื่อเพิ่มจาก 1 เป็น 3 shard ซึ่งมากกว่าคำว่า "เพิ่มเล็กน้อย" ในข้อความ), พฤติกรรมบนเครือข่ายจริงที่ความหน่วงแปรปรวน, ความแปรปรวนของผล (ไม่มี SD หรือจำนวนรอบ), throughput ระดับ Visa ภายใต้ผู้โจมตี 25%

---

## บทที่ 10: สถาปัตยกรรมระบบกระจายในภาษา Go

บทความพัฒนาต้นแบบด้วยภาษา Go (Section VII หน้า 592) โค้ดในบทนี้เป็นตัวอย่างแนวคิดที่ผู้เรียนเขียนเอง ไม่ใช่โค้ดของผู้เขียน

### 10.1 การจับคู่แนวคิดกับโครงสร้างใน Go

| แนวคิดใน OmniLedger | โครงสร้างใน Go ที่เทียบได้ |
|---|---|
| shard แต่ละแห่งรัน consensus ของตัวเอง | goroutine ต่อ shard ที่วนรับบล็อกผ่าน channel |
| gossip ระหว่าง validator | channel หรือ pub/sub ภายนอก (ในระบบจริงคือเครือข่าย) |
| timeout T1 และ T2 ของ ByzCoinX | `context.WithTimeout` และ `time.Timer` ที่เพิ่มค่าเป็นสองเท่าเมื่อ view-change |
| client รอ proof จากหลาย input shard | `errgroup` หรือ `sync.WaitGroup` พร้อมรวมผลลัพธ์ |
| commit ธุรกรรมไม่ขัดแย้งแบบขนาน | worker pool ที่จ่ายงานตามชุด UTXO ที่ไม่ทับกัน |

### 10.2 จัด validator เข้า shard จากค่าสุ่มของ epoch

```go
package omni

import (
	"crypto/sha256"
	"encoding/binary"
	"math/rand"
)

// AssignShards derives a permutation of validator indices from the epoch
// randomness and deals it into m buckets of near-equal size (Section IV-A).
// math/rand keeps the example short; a real system should use a
// cryptographically secure deterministic generator seeded by rnd.
func AssignShards(rnd []byte, n, m int) [][]int {
	seed := sha256.Sum256(rnd)
	r := rand.New(rand.NewSource(int64(binary.BigEndian.Uint64(seed[:8]))))
	shards := make([][]int, m)
	for i, v := range r.Perm(n) {
		shards[i%m] = append(shards[i%m], v)
	}
	return shards
}
```

ทุก validator ที่ได้ rnd เดียวกันจะได้ผลเหมือนกันโดยไม่ต้องสื่อสารเพิ่ม นี่คือเหตุผลที่ค่าสุ่มต้องตรวจสอบได้และบิดเบือนไม่ได้

### 10.3 คำนวณโอกาสที่ shard ล้มเหลว (สมการที่ 1 แบบแก้แล้ว)

```go
package omni

import "math"

// ShardFailure returns P[X > floor(n/3)] for X ~ Binomial(n, p): the chance that a
// shard of n validators holds more than a third malicious members (Section VI-B).
func ShardFailure(n int, p float64) float64 {
	c := n / 3
	logC, sum := 0.0, 0.0 // logC tracks log C(n, k)
	for k := 0; k <= n; k++ {
		if k > 0 {
			logC += math.Log(float64(n-k+1)) - math.Log(float64(k))
		}
		if k > c {
			sum += math.Exp(logC + float64(k)*math.Log(p) + float64(n-k)*math.Log1p(-p))
		}
	}
	return sum
}

// EpochFailure is the upper bound of Eq. (2): (4/3) * shards * P[X_S].
func EpochFailure(shards, shardSize int, p float64) float64 {
	return 4.0 / 3.0 * float64(shards) * ShardFailure(shardSize, p)
}
```

`ShardFailure(70, 0.125)` ให้ประมาณ 2.2 × 10<sup>−6</sup> และ `EpochFailure(16, 70, 0.125)` ให้ประมาณ 4.6 × 10<sup>−5</sup> ตามตารางในบทที่ 5 การคำนวณใน log-space ช่วยให้ n ระดับหลายร้อยไม่ล้นหรือปัดเป็นศูนย์

### 10.4 กฎการตัดสินของ Atomix ฝั่ง client

```go
package omni

type Decision int

const (
	Pending Decision = iota
	Commit
	Abort
)

// Proof is one input shard's answer for one input UTXO; the Merkle proof and the
// collective signature are omitted here.
type Proof struct {
	Accepted bool
}

// Decide applies the unlock rule of Atomix (Section IV-C): a single
// proof-of-rejection forces abort; commit needs an acceptance for every input.
func Decide(inputs []string, proofs map[string]Proof) Decision {
	missing := false
	for _, utxo := range inputs {
		p, ok := proofs[utxo]
		switch {
		case !ok:
			missing = true
		case !p.Accepted:
			return Abort
		}
	}
	if missing {
		return Pending
	}
	return Commit
}
```

สังเกตว่าเจอ proof-of-rejection เมื่อไรก็ตัดสิน abort ได้ทันที ไม่ต้องรอ shard ที่เหลือ แต่ commit ต้องรอให้ครบทุก input

### 10.5 ตรวจธุรกรรมที่ขัดแย้งก่อนจัดบล็อกขนาน

```go
package omni

type Tx struct {
	Inputs  []string // UTXOs spent
	Outputs []string // UTXOs created
}

// Conflicts reports whether a and b cannot be committed in independent parallel
// blocks (Section V-B): they spend the same UTXO, or one spends the other's output.
func Conflicts(a, b Tx) bool {
	return overlap(a.Inputs, b.Inputs) || overlap(a.Outputs, b.Inputs) || overlap(b.Outputs, a.Inputs)
}

func overlap(x, y []string) bool {
	seen := make(map[string]struct{}, len(x))
	for _, u := range x {
		seen[u] = struct{}{}
	}
	for _, u := range y {
		if _, ok := seen[u]; ok {
			return true
		}
	}
	return false
}
```

กรณีใช้ UTXO ซ้ำต้องทิ้งหนึ่งรายการ ส่วนกรณีพึ่งพา output ต้องวางธุรกรรมตามไว้ในบล็อกที่ชี้กลับไปยังบล็อกของธุรกรรมแรก (backpointer ใน blockDAG)

### 10.6 ร่างสถาปัตยกรรมสำหรับชั้น gateway ของเครือข่ายเซนเซอร์ (ความเห็นของผู้เรียน)

```text
[โหนดเซนเซอร์]  ส่งค่าวัดแบบประหยัดพลังงาน (ไม่รัน BFT)
      |
[gateway พื้นที่ A]  [gateway พื้นที่ B]  [gateway พื้นที่ C]   <- จัดเป็น shard ตามพื้นที่
      |  consensus ภายในกลุ่ม gateway ของพื้นที่ (BFT ขนาดเล็ก)
      |  สลับสมาชิกบางส่วนทุก epoch ด้วยค่าสุ่มที่ตรวจสอบได้
      |
เหตุการณ์ข้ามพื้นที่ (เช่น อุปกรณ์ย้ายจาก A ไป B) ใช้ lock แล้ว unlock พร้อม proof แบบ Atomix
      |
checkpoint ทะเบียนอุปกรณ์เป็นระยะ (แนวคิด state block) ให้ gateway ใหม่เริ่มงานเร็ว
```

ข้อควรระวัง: ข้อสมมติ synchronous ของบทความอาจไม่เป็นจริงบนลิงก์ไร้สายที่สูญเสียแพ็กเก็ต, ต้นทุนลายเซ็นดิจิทัลต้องอยู่ที่ gateway ไม่ใช่เซนเซอร์ และสัดส่วนธุรกรรมข้ามพื้นที่ต้องต่ำ มิฉะนั้นจะเจอปัญหาเดียวกับบทที่ 7

---

## บทที่ 11: แบบฝึกหัดทบทวนพร้อมเฉลย

1. **ถ้า shard มี 70 โหนด ต้องมีผู้โจมตีอย่างน้อยกี่โหนดจึงจะยึด shard ได้ตามสมการที่ (1)**  
   เฉลย: ⌊70/3⌋ = 23 shard ปลอดภัยเมื่อ X ≤ 23 จึงต้องมีอย่างน้อย 24 โหนด

2. **ทำไมสมการที่ (1) ตามที่พิมพ์ให้ผลเท่ากับ 1 เสมอ**  
   เฉลย: ผลรวมจาก k = 0 ถึง n ของ C(n, k) m<sup>k</sup> (1 − m)<sup>n−k</sup> เท่ากับ (m + 1 − m)<sup>n</sup> = 1 ตามทฤษฎีบททวินาม

3. **ตัวคูณ 4/3 ในสมการที่ (2) มาจากไหน**  
   เฉลย: อนุกรมเรขาคณิต Σ 1/4<sup>k</sup> จาก k = 0 ถึงอนันต์ = 1/(1 − 1/4) = 4/3 จากการที่ผู้โจมตีได้เป็น leader และสั่งสุ่มใหม่ได้ด้วยโอกาส 1/4 ต่อรอบ

4. **ใน Atomix ถ้า input shard หนึ่งปฏิเสธ แต่อีกสอง shard ยอมรับและล็อก input ไว้แล้ว จะเกิดอะไรขึ้น**  
   เฉลย: ธุรกรรมต้อง abort client หรือฝ่ายอื่นส่ง unlock-to-abort พร้อม proof-of-rejection อย่างน้อยหนึ่งใบ แล้ว shard ที่ล็อกไว้คืนสถานะ UTXO เดิม

5. **ธุรกรรม txA โอนเงินเข้าที่อยู่ X และ txB ก็โอนเข้าที่อยู่ X เช่นกัน ใส่ในบล็อกขนาน ByzCoinX ได้หรือไม่**  
   เฉลย: ได้ เพราะสร้าง UTXO คนละตัว ไม่ได้ใช้ UTXO ร่วมกันและไม่พึ่ง output ของกันและกัน

6. **ธุรกรรม 3 UTXO ใน 3 shard มีโอกาสอยู่ shard เดียวเท่าไร และบทความพิมพ์ผิดอย่างไร**  
   เฉลย: 3/27 = 1/9 ≈ 11.1% บทความพิมพ์ 3.7% ซึ่งเท่ากับ 1/27

7. **ทำไมสูตร speed-up ของบทความ (m · E[1/k]) ไม่ต่ำกว่า m / E[k] เสมอ**  
   เฉลย: 1/x เป็นฟังก์ชัน convex ตามอสมการของ Jensen E[1/k] ≥ 1/E[k]

8. **ทำไมบทความใช้ epoch ยาว 1 วัน**  
   เฉลย: การเปลี่ยน epoch แพง RandHound ใช้เวลาเกิน 70% ของการ bootstrap และกรณีแย่สุดประมาณ 3 ชั่วโมง (Section VIII-C หน้า 593)

9. **state block คุ้มค่าเมื่อ validator ตามไม่ทันนานเท่าไรในการจำลองกับ Bitcoin**  
   เฉลย: เกิน 19 วันหรือ 2,736 บล็อก (Section VIII-F หน้า 594)

10. **ข้อใดเป็นความเห็นของผู้นำเสนอ ไม่ใช่ข้อมูลในบทความ: (ก) ByzCoinX เพิ่ม throughput 20% (ข) ควรใช้แนวคิดนี้ที่ชั้น gateway ของเครือข่ายเซนเซอร์**  
    เฉลย: (ข) เป็นความเห็นของผู้นำเสนอ ส่วน (ก) มาจาก Fig. 9 และ Table III

---

## อภิธานศัพท์ย่อ

| คำ | ความหมายสั้น |
|---|---|
| Shard | กลุ่มย่อยของ validator ที่ดูแล state ส่วนหนึ่งของ ledger |
| Epoch | ช่วงเวลาคงที่ระหว่างการจัด shard ใหม่ (ในบทความคือ 1 วัน) |
| UTXO | output ของธุรกรรมที่ยังไม่ถูกใช้ เป็นหน่วยของสถานะ |
| BFT consensus | การตกลงร่วมกันที่ทนผู้ไม่ซื่อสัตย์ได้ไม่เกิน f เมื่อ n = 3f + 1 |
| CoSi | collective signing ลายเซ็นร่วมขนาดคงที่ของสมาชิกจำนวนมาก |
| VRF | ฟังก์ชันสุ่มที่ตรวจสอบได้ด้วย public key |
| RandHound | โปรโตคอลสร้างค่าสุ่มแบบกระจายที่บิดเบือนไม่ได้ |
| Atomix | โปรโตคอล atomic commit ข้าม shard แบบ lock แล้ว unlock |
| State block | บล็อกสรุปสถานะของ shard ปลาย epoch ใช้ตัดประวัติเก่า |
| Trust-but-verify | ยืนยันเร็วด้วยกลุ่มเล็ก แล้วให้กลุ่มใหญ่ตรวจซ้ำ |
| Union bound | ขอบบน P(A ∪ B) ≤ P(A) + P(B) ใช้รวมความเสี่ยงของทุก shard |

## เอกสารอ้างอิง

1. E. Kokoris-Kogias, P. Jovanovic, L. Gasser, N. Gailly, E. Syta and B. Ford, "OmniLedger: A Secure, Scale-Out, Decentralized Ledger via Sharding," in *2018 IEEE Symposium on Security and Privacy (SP)*, 2018, pp. 583–598, doi: 10.1109/SP.2018.000-5.
2. E. Kokoris-Kogias, P. Jovanovic, N. Gailly, I. Khoffi, L. Gasser and B. Ford, "Enhancing Bitcoin Security and Performance with Strong Consistency via Collective Signing," in *25th USENIX Security Symposium*, 2016, pp. 279–296.
3. E. Syta, P. Jovanovic, E. Kokoris-Kogias, N. Gailly, L. Gasser, I. Khoffi, M. J. Fischer and B. Ford, "Scalable Bias-Resistant Distributed Randomness," in *2017 IEEE Symposium on Security and Privacy (SP)*, 2017, pp. 444–460.
4. L. Lamport, R. Shostak and M. Pease, "The Byzantine Generals Problem," *ACM Transactions on Programming Languages and Systems*, vol. 4, no. 3, pp. 382–401, 1982.
5. M. Castro and B. Liskov, "Practical Byzantine Fault Tolerance," in *Proc. 3rd Symposium on Operating Systems Design and Implementation (OSDI)*, 1999, pp. 173–186.
6. S. Micali, M. Rabin and S. Vadhan, "Verifiable Random Functions," in *40th Annual Symposium on Foundations of Computer Science (FOCS)*, 1999, pp. 120–130.
7. M. Kleppmann, *Designing Data-Intensive Applications*. Sebastopol, CA: O'Reilly Media, 2017 (บทที่ 6 Partitioning, บทที่ 7 Transactions, บทที่ 9 Consistency and Consensus).
8. A. Narayanan, J. Bonneau, E. Felten, A. Miller and S. Goldfeder, *Bitcoin and Cryptocurrency Technologies*. Princeton, NJ: Princeton University Press, 2016.
9. H. Karl and A. Willig, *Protocols and Architectures for Wireless Sensor Networks*. Chichester: John Wiley & Sons, 2005.
