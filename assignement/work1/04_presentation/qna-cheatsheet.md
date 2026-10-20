# Q&A Cheat Sheet

## Paper นี้ใหม่ตรงไหน?

ไม่ได้เพียงตรวจ anomaly จาก time series แต่สร้าง context จากความสัมพันธ์ของ sensor ต่างชนิด แล้วใช้ consensus แยก environmental anomaly ออกจาก sensor fault/attack พร้อม adaptive retraining

## ทำไมไม่ใช้ sensor ตัวเดียว?

ค่าผิดปกติของ sensor ตัวเดียวตีความต้นเหตุไม่ได้ ถ้าใช้กลุ่ม sensor ที่สัมพันธ์กัน สมาชิกอื่นทำหน้าที่ตรวจสอบความสมเหตุผลทางกายภาพได้

## ทำไมต้อง LSTM?

ข้อมูล sensor เป็น time series และพฤติกรรมปกติขึ้นกับอดีต LSTM จึงใช้ความสัมพันธ์ตามเวลาเพื่อทำนายค่าถัดไป แล้วใช้ prediction error ตรวจ anomaly

## ทำไมต้อง Gaussian estimator หลัง LSTM?

LSTM ให้ค่าทำนาย แต่ยังต้องมีกฎตัดสินว่า error ใหญ่ผิดปกติแค่ไหน Gaussian estimator เรียน distribution ของ error ปกติและแปลง error ใหม่เป็น probability เพื่อเทียบ threshold

## Fingerprint สูญเสียข้อมูลหรือไม่?

สูญเสีย magnitude และรายละเอียดบางส่วนแน่นอน แต่ได้ความทนต่อหน่วยวัดและ sampling rate ที่ต่างกัน จุดประสงค์คือใช้เพื่อ association ไม่ใช่แทนข้อมูลดิบในการทำนายทั้งหมด

## Unsupervised จริงไหม?

Model ฝึกจาก normal data โดยไม่ต้องมี label ของ anomaly จึงเป็น unsupervised ในแกนหลัก แต่การเลือก threshold `alpha` ใช้ validation anomalies เพื่อ maximize F-score จึงยังมีขั้น calibration

## 92% คือ accuracy หรือไม่?

ไม่ใช่ เป็น precision หมายถึงใน alert ที่ model แจ้ง 92% เป็น anomaly จริง ส่วน recall 56% หมายถึง anomaly จริงถูกตรวจพบ 56% เท่านั้น

## เหตุใดเน้น precision มากกว่า recall?

โจทย์ต้องการลด false alarm จึงรายงาน F0.5 ซึ่งให้น้ำหนัก precision มากกว่า แต่ระบบ safety-critical อาจต้องให้น้ำหนัก recall มากกว่าเพื่อไม่พลาดเหตุอันตราย

## “Real-time” 0.532 วินาทีเชื่อได้แค่ไหน?

เชื่อได้สำหรับ testbed และความถี่ของระบบที่ paper ใช้เท่านั้น ต้องทดสอบใหม่หากระบบเป้าหมายมี deadline สั้นกว่า hardware ต่าง หรือ sensor มากกว่านี้

## ถ้า sensor ทุกตัวเสียพร้อมกันจะเกิดอะไร?

หากเสียแบบไม่สอดคล้องกันอาจตรวจพบได้ แต่ถ้าหลาย sensor ถูกควบคุมให้สร้าง pattern ที่สอดคล้องกัน consensus อาจตีความผิดเป็น environmental event ซึ่งอยู่นอก threat model หลักของ paper

## Fog ต่างจาก edge และ cloud อย่างไร?

Edge อยู่ที่อุปกรณ์หรือใกล้ sensor มากที่สุด Fog เป็นชั้นประมวลผลใกล้หน้างานระหว่าง edge กับ cloud ส่วน cloud เป็นศูนย์กลางระยะไกล Paper วาง anomaly model บน fog laptop/gateway-class device

## ถ้าต้องปรับปรุงงานนี้หนึ่งอย่างจะทำอะไร?

ทดสอบด้วย fault และ coordinated attack จริง แล้วปรับ threshold ตามต้นทุนของ false negative เพราะ recall 56% เป็นความเสี่ยงสำคัญที่สุด

## คำศัพท์ที่ต้องออกเสียง/จำ

- anomaly: ความผิดปกติ
- context-aware: ใช้บริบทประกอบการตัดสิน
- sensor association: การจัดความสัมพันธ์ของ sensor
- fingerprint: ตัวแทน pattern แบบย่อ
- Hamming distance: จำนวน bit ที่ต่างกัน
- LSTM encoder-decoder: model ลำดับเวลาสำหรับเข้ารหัสและทำนาย sequence
- reconstruction error: ความต่างค่าจริงกับค่าทำนาย
- consensus: การหาข้อสรุปจากความสอดคล้องของสมาชิก
- fog computing: ประมวลผลใกล้หน้างานระหว่าง edge กับ cloud
- precision: alert ที่แจ้งแล้วถูกสัดส่วนเท่าใด
- recall: anomaly จริงที่จับได้สัดส่วนเท่าใด

