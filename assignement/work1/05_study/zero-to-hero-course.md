# Zero-to-Hero Course: เข้าใจ IoT-CAD ตั้งแต่ศูนย์

## เป้าหมาย

เมื่อเรียนจบ คุณควรอธิบายได้ว่า:

1. IoT-CAD แก้ปัญหาอะไร และเหตุใด detector ของ sensor ตัวเดียวจึงไม่พอ
2. EA ต่างจาก SDA อย่างไร
3. binary fingerprint และ sensor association ทำงานอย่างไร
4. LSTM, reconstruction error, Gaussian estimator และ consensus ต่อกันอย่างไร
5. ตัวเลขผลทดลองบอกอะไรและไม่บอกอะไร
6. ข้อจำกัดของงานคืออะไร

## บทที่ 1 - ภาพใหญ่: Sensor Network, IoT และ CPS

### Sensor คืออะไร

Sensor แปลงคุณสมบัติทางกายภาพ เช่น อุณหภูมิ แสง ความชื้น หรือความเร่ง ให้เป็นสัญญาณที่ระบบคอมพิวเตอร์อ่านได้ ค่าที่ได้มี noise, drift, missing data และอาจผิดเพราะอุปกรณ์เสียหรือถูกโจมตี

### Wireless Sensor Network (WSN)

WSN คือกลุ่ม sensor node ที่มีอย่างน้อย 4 ส่วน:

- sensing: รับค่าจากโลกจริง
- computation: ประมวลผลเบื้องต้น
- communication: ส่งข้อมูลผ่านวิทยุ
- power source: แบตเตอรี่หรือแหล่งพลังงานอื่น

หลาย node ส่งข้อมูลไปยัง sink หรือ gateway ซึ่งเชื่อมต่อระบบภายนอก

### IoT ต่างจาก WSN อย่างไร

WSN เน้นเครือข่ายของ sensor ส่วน IoT กว้างกว่า โดยรวม device, network, gateway, edge/fog/cloud, application และผู้ใช้ WSN สามารถเป็น subsystem ของ IoT ได้

### Cyber-Physical System (CPS)

CPS คือระบบที่ computation และ communication เชื่อมกับโลกกายภาพแบบมีผลกระทบจริง เช่น controller เปิดวาล์วจากค่าที่ sensor วัด ถ้า sensor ถูกหลอก คำสั่งในโลกจริงก็อาจผิด

Paper แบ่ง IoT system เป็น:

- closed-loop control: Sensor -> Controller -> Actuator -> Environment
- monitoring: Sensor -> User -> การตัดสินใจ/การกระทำ

แม้ monitoring ไม่มี actuator อัตโนมัติ แต่ผู้ใช้ทำหน้าที่ปิด loop ดังนั้นความถูกต้องของ sensor ยังสำคัญมาก

## บทที่ 2 - โจทย์ที่ paper แก้

Anomaly คือ observation ที่ไม่สอดคล้องกับพฤติกรรมปกติ Paper แยกเป็น:

### Environmental Anomaly (EA)

สภาพแวดล้อมเปลี่ยนจริง เช่น ไฟไหม้ อุณหภูมิ แสง และควันเปลี่ยนพร้อมกัน Sensor อาจทำงานถูกต้อง แต่ค่าที่อ่านต่างจากปกติ

### Sensing Device Anomaly (SDA)

ตัว sensor หรือข้อมูลของ sensor ผิด เช่น sensor เสื่อม ถูกทำลาย ถูกแก้ค่า หรือ attacker ปลอม packet ค่าผิดปกติมักไม่สอดคล้องกับ sensor อื่นที่ควรสัมพันธ์กัน

### เหตุใด model ของ sensor เดียวจึงสับสน

ถ้า model เห็นเพียงอุณหภูมิ 40°C มันรู้ได้เพียงว่าค่านี้ต่างจากปกติ แต่ไม่รู้ว่า:

- ห้องร้อนขึ้นจริง
- sensor calibration เพี้ยน
- packet ถูกแก้ระหว่างส่ง

IoT-CAD จึงใช้ sensor อื่นเป็น “พยานบริบท”

## บทที่ 3 - System context และ sensor association

ใน paper คำว่า context หมายถึง pattern ของสถานการณ์และความสัมพันธ์ระหว่าง sensor ไม่ได้หมายถึงข้อความประกอบทั่วไป

ตัวอย่าง: เมื่อคนเปิดประตู อาจเกิดสัญญาณพร้อมกันจาก magnetic switch, PIR, vibration และ microphone แม้ sensor เหล่านี้วัดคนละหน่วย แต่มี pattern ทางเวลาเกี่ยวข้องกัน

### ขั้น 1: สร้าง snapshot

Sensor วัดทุก `z` วินาที ในหน้าต่างเวลา `q` วินาที จะมีประมาณ `v = q/z` ค่า แล้วหาค่าเฉลี่ยของ snapshot นั้น เพื่อลด noise และทำให้ sensor ที่ sampling rate ต่างกันเปรียบเทียบกันได้

### ขั้น 2: แปลงเป็น variation bit

เปรียบเทียบค่าเฉลี่ยของช่วงติดกัน:

```text
b(t) = 1  ถ้าการเปลี่ยนแปลงสัมพัทธ์มากกว่า epsilon_rel
b(t) = 0  ถ้าไม่เกิน threshold
```

เมื่อนำ bit หลายช่วงมาต่อกันจะได้ binary fingerprint เช่น `0011100101`

ความหมาย: fingerprint เก็บ “รูปแบบการเปลี่ยน” มากกว่าค่าดิบ จึงเทียบ temperature กับ humidity ได้แม้หน่วยต่างกัน

### ขั้น 3: แบ่ง fingerprint เป็น subsequence

แบ่งสาย bit เป็นช่วงย่อยที่ซ้อนกันได้ เพื่อจับ pattern ระยะสั้นหลายตำแหน่ง Hyperparameters สำคัญคือ:

- `l`: ความยาว subsequence
- `o`: จำนวนตำแหน่งที่ overlap

### ขั้น 4: ใช้ Hamming distance

Hamming distance คือจำนวนตำแหน่งที่ bit ต่างกัน:

```text
101101
100001
  ^^    -> ต่าง 2 ตำแหน่ง ดังนั้น distance = 2
```

distance ต่ำแปลว่า pattern คล้ายกัน

### ขั้น 5: cluster สองระดับ

ระดับแรก cluster subsequence ในตำแหน่งเดียวกันเพื่อให้ pattern ID จากนั้นสร้าง pattern history ของแต่ละ sensor แล้ว cluster อีกครั้งเพื่อได้กลุ่ม sensor ที่มี contextual variation คล้ายกัน

Algorithm พยายาม:

- ลด intra-cluster distance: สมาชิกในกลุ่มต้องคล้ายกัน
- เพิ่ม inter-cluster distance: แต่ละกลุ่มต้องต่างกัน
- ปรับจำนวน cluster อัตโนมัติ
- ตัด cluster ที่มีสมาชิกน้อยกว่า 3 ตัว

เหตุผลที่ต้อง 3 ตัว: consensus ของสองตัวแยกไม่ได้ว่าใครผิด หากค่าขัดกัน 1 ต่อ 1

## บทที่ 4 - ทำนายพฤติกรรมปกติด้วย LSTM

### Time series

Time series คือข้อมูลที่ลำดับเวลามีความหมาย เช่น อุณหภูมิทุก 10 วินาที การสลับตำแหน่งเวลาทำให้ความหมายเปลี่ยน

### RNN และ LSTM

RNN มี state จากอดีต จึงเหมาะกับ sequence แต่ RNN ธรรมดามีปัญหาจำความสัมพันธ์ระยะยาว LSTM ใช้ gates ควบคุมสิ่งที่จะจำ ลืม และส่งออก

ไม่จำเป็นต้องจำสมการ gate สำหรับการนำเสนอ สิ่งที่ต้องเข้าใจคือ LSTM เรียนรู้ว่า “จากรูปแบบที่ผ่านมา ค่าถัดไปควรเป็นเท่าใด”

### Encoder-decoder

- encoder ย่อ input sequence เป็น representation ของ pattern
- decoder สร้าง sequence ที่คาดว่าจะเกิด
- dense layer แปลง representation เป็น output ของ sensor แต่ละตัว
- dropout 0.5 ช่วยลด overfitting ระหว่าง train

Paper สร้าง predictive model แยกต่อ cluster แทน model ใหญ่ตัวเดียว ทำให้กระจายงานไปหลาย fog node ได้

## บทที่ 5 - จาก prediction สู่ anomaly

### Reconstruction error

```text
error = ค่าจริง - ค่าที่ model ทำนาย
```

ถ้า error เล็ก แสดงว่าข้อมูลคล้ายพฤติกรรมปกติ ถ้า error ใหญ่หรือมีรูปแบบที่พบได้น้อย อาจเป็น anomaly

### Multivariate Gaussian estimator

เพราะหนึ่ง cluster มีหลาย sensor จึงมอง error เป็น vector แล้ว fit Gaussian distribution จากข้อมูลปกติ หากความน่าจะเป็นของ error ใหม่ต่ำกว่า threshold `alpha` ให้ตัดสินเป็น anomaly

คำว่า multivariate สำคัญ: model ไม่ได้มอง error ของ sensor ทีละตัว แต่พิจารณาความสัมพันธ์ของหลายมิติพร้อมกัน

### Unsupervised แต่เหตุใดมี threshold

Model ฝึกพฤติกรรมจากข้อมูลปกติโดยไม่ต้องมี label ของ anomaly จึงเป็น unsupervised อย่างไรก็ตาม paper ปรับ `alpha` เพื่อเพิ่ม F-score บน validation data ที่มี synthetic anomalies ดังนั้นระบบไม่ได้ปลอดจากการเลือก threshold โดยผู้พัฒนา

## บทที่ 6 - Consensus แยก EA กับ SDA

เมื่อพบ anomaly:

- ถ้าสมาชิกใน cluster เปลี่ยนผิดปกติสอดคล้องกัน -> EA
- ถ้ามีบาง sensor ผิดจาก pattern ของสมาชิกส่วนใหญ่ -> SDA

Paper ตรวจเป็นช่วงเวลา ไม่ใช่จุดเดียว เพื่อรองรับ inertia ของระบบกายภาพ เช่น sensor แต่ละชนิดตอบสนองต่อไฟไม่พร้อมกันเป๊ะ

### Threat model

Paper รองรับความเสียหายโดยบังเอิญและ attacker ที่ควบคุม sensor หรือ communication channel บางส่วน แต่สมมติว่า attacker ไม่รู้ครบทั้ง cluster layout, correlation และ trained model และไม่สามารถปลอมหลาย sensor ให้รักษา correlation เดิมได้

นี่คือข้อจำกัดเชิงความปลอดภัย: ถ้า attacker ควบคุม sensor ส่วนใหญ่ใน cluster หรือขโมย model ได้ consensus อาจถูกหลอก

## บทที่ 7 - Adaptive หรือ “aliveness”

IoT เปลี่ยนตลอด: ย้าย sensor, เพิ่ม/ถอด node, firmware เปลี่ยน หรือฤดูกาลเปลี่ยน Static model จึงเสื่อมตามเวลา หรือเกิด concept drift

Paper มี update สองแบบ:

- partial update: retrain predictive model ด้วยข้อมูลใหม่ที่ผ่านการตรวจว่าไม่ผิดปกติ
- complete update: สร้าง sensor association, model และ estimator ใหม่

Trigger หลัก:

1. เพิ่มหรือลด sensor -> complete update
2. ได้ข้อมูลใหม่ที่ไม่ใช่ anomaly -> partial update
3. ครบช่วง `t_retrain` -> complete update

ความเสี่ยงที่ควรถามต่อ: หาก anomaly หลุด detector และถูกใช้ retrain อาจเกิด model poisoning หรือ model ค่อย ๆ เรียนรู้พฤติกรรมผิดว่าเป็นปกติ

## บทที่ 8 - Fog computing และเครือข่ายทดลอง

Architecture มี 3 ชั้น:

```text
Edge sensors -> Fog node -> Cloud
```

- edge: sensor และ embedded board
- fog: ประมวลผลใกล้ผู้ใช้ ลด latency และ bandwidth
- cloud: เก็บ/ประมวลผลส่วนกลาง

Testbed ของ paper:

- 62 sensors
- 13 modalities: temperature, humidity, visible/infrared light, force/load, tilt, accelerometer, presence, magnetic, CO2, CO, dust, acoustic
- low-power board ใช้ TinyOS และ IEEE 802.15.4
- USRP-B210 ทำหน้าที่ Software-Defined Radio
- Raspberry Pi เป็น edge/base station และ gateway ผ่าน Wi-Fi
- laptop Intel Core i5-6300HQ, RAM 8 GB เป็น fog node
- ข้อมูล 8 วัน ประมาณ 2.3 ล้าน measurements

IEEE 802.15.4 เป็นมาตรฐาน PHY/MAC สำหรับเครือข่ายไร้สายอัตราข้อมูลต่ำและพลังงานต่ำ เป็นฐานที่เทคโนโลยีอย่าง Zigbee และ Thread นำไปใช้ต่อ

## บทที่ 9 - อ่านผลทดลองอย่างถูกต้อง

### Confusion matrix

|  | ทำนาย anomaly | ทำนาย normal |
|---|---:|---:|
| เป็น anomaly จริง | TP | FN |
| เป็น normal จริง | FP | TN |

### Metrics

```text
Precision = TP / (TP + FP)
Recall    = TP / (TP + FN)
F1        = 2PR / (P + R)
```

- precision สูง: เมื่อระบบแจ้ง anomaly ส่วนใหญ่แจ้งถูก
- recall สูง: anomaly จริงส่วนใหญ่ถูกตรวจพบ
- F0.5 ให้น้ำหนัก precision มากกว่า recall

### ผล Table 2

| วิธี | Context-aware | Precision | Recall | F0.5 | F1 |
|---|---|---:|---:|---:|---:|
| IoT-CAD | Yes | **92%** | 56% | **81%** | **70%** |
| LSTM baseline | No | 64% | 44% | 58% | 52% |
| ConvLSTM baseline | No | 51% | **95%** | 56% | 66% |
| One-Class SVM | No | 89% | 25% | 60% | 39% |

สิ่งที่สรุปได้: IoT-CAD ลด false alarm ได้ดีและมีสมดุลตาม F-score ดีที่สุดในชุดทดลอง

สิ่งที่ห้ามสรุป: “IoT-CAD ตรวจ anomaly ได้ 92%” เพราะ 92% คือ precision ไม่ใช่ accuracy หรือ recall ระบบตรวจเจอเพียง 56% ของ anomaly จริงในชุดประเมิน

### Timing

| Process | เวลา |
|---|---:|
| fingerprint generation สำหรับ 62 sensors | 2.98 s |
| sensor association (604 clustering runs) | 10.54 s |
| initial predictive model training | 2472.20 s (~41.2 min) |
| anomaly detection | 0.532 s |

คำว่า real-time ใน paper หมายถึง 0.532 วินาทีเพียงพอสำหรับ system under test ไม่ได้หมายความว่าเหมาะกับทุกระบบ เช่น motor protection ที่ต้องตอบในระดับ millisecond

## บทที่ 10 - วิจารณ์ paper แบบนักวิจัย

### จุดแข็ง

- ใช้ cross-sensor context แก้ false alarm จากสิ่งแวดล้อม
- แยก detection และ root-cause classification เป็น EA/SDA
- รองรับ heterogeneous sensors ผ่าน binary fingerprint
- testbed มี 62 sensors และหลาย modality
- เปรียบเทียบหลาย baseline และรายงานหลาย metric
- มี adaptation และ timing analysis

### ข้อจำกัด

- recall 56% ยังพลาด anomaly จริงจำนวนมาก
- validation anomalies เป็น synthetic จึงอาจไม่แทน fault/attack จริงทุกชนิด
- ต้องมี correlated sensors อย่างน้อย 3 ตัวเพื่อแยก EA/SDA
- clustering และ threshold ขึ้นกับ hyperparameters
- threat model ไม่ครอบคลุม coordinated multi-sensor attack
- testbed อยู่ในห้องทดลอง 8 วัน จึงยังไม่ยืนยันการทำงานระยะยาวหรือพื้นที่ใหญ่
- initial training ราว 41 นาทีและต้อง retrain เมื่อ topology เปลี่ยน
- paper เน้น precision จึงอาจไม่เหมาะกับ safety-critical system ที่การพลาดเหตุจริงมีต้นทุนสูง

### งานต่อยอดที่สมเหตุผล

- ทดสอบ fault/attack จริงหลายรูปแบบและหลายฤดูกาล
- เพิ่ม uncertainty calibration และเลือก threshold ตามต้นทุน FP/FN
- ใช้ robust consensus ที่ทน Byzantine/compromised nodes
- ป้องกัน model poisoning ในขั้น adaptive retraining
- ประเมิน energy, bandwidth และ memory บน fog hardware จริง
- เปรียบเทียบกับ Transformer หรือ graph neural network โดยควบคุมขนาด model

## บทที่ 11 - แบบฝึกหัดเช็กความเข้าใจ

1. ถ้า temperature, light และ smoke ผิดปกติพร้อมกัน ระบบน่าจะจัดเป็น EA หรือ SDA เพราะอะไร?
2. ทำไมใช้ binary fingerprint แทนค่าดิบ?
3. ถ้า cluster มี sensor เพียง 2 ตัวและให้ค่าขัดกัน ระบบรู้ได้หรือไม่ว่าใครผิด?
4. precision 92% และ recall 56% แปลเป็นภาษาคนอย่างไร?
5. เหตุใด ConvLSTM recall 95% แต่ precision 51% อาจสร้างปัญหา alarm fatigue?
6. ถ้าเพิ่ม sensor ใหม่ ทำไม partial update ไม่พอ?
7. attacker ต้องทำอะไรจึงจะหลอก consensus ได้?

### เฉลยย่อ

1. EA เพราะหลาย sensor ที่สัมพันธ์กันตอบสนองสอดคล้องกัน
2. เพื่อเทียบ pattern ข้าม modality/หน่วย ลดมิติและ noise บางส่วน
3. ไม่รู้ จึงต้องการอย่างน้อย 3 สมาชิกเพื่อมี majority/context
4. alert ที่แจ้งมีแนวโน้มถูก 92% แต่จับ anomaly จริงได้เพียง 56%
5. แจ้งผิดเกือบครึ่งของ alert ทำให้ผู้ใช้เหนื่อยและไม่เชื่อระบบ
6. จำนวน input เปลี่ยน ต้องสร้าง association และโครงสร้าง model ใหม่
7. ควบคุมหลาย sensor และปลอมค่าให้ยังรักษา correlation/pattern ของกลุ่ม

## Cheat sheet หนึ่งย่อหน้า

IoT-CAD แปลงแนวโน้ม time series ของ heterogeneous sensors เป็น binary fingerprints แล้วใช้ Hamming-distance clustering จัดกลุ่ม sensor ที่มี context ร่วมกัน จากนั้น LSTM encoder-decoder ต่อ cluster ทำนายค่าปกติ และ multivariate Gaussian estimator ใช้ reconstruction error ตรวจ anomaly เมื่อพบ anomaly consensus ใน cluster จะแยกว่าเป็น EA ซึ่งหลาย sensor เปลี่ยนสอดคล้องกัน หรือ SDA ซึ่งบาง sensor ขัดกับกลุ่ม Model retrain เพื่อรับ concept drift และ topology change ผลบน 62 sensors/13 modalities/8 days คือ precision 92%, recall 56%, F1 70% และ inference 0.532 s โดยข้อจำกัดหลักคือ synthetic anomalies, recall ต่ำ, ต้องมีอย่างน้อย 3 correlated sensors และยังไม่ทน coordinated attack

