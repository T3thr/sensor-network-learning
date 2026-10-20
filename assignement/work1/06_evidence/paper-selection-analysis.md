# การคัดเลือก Paper_I

## สรุปผลคัดเลือก

| ลำดับ | บทความ | แกนหลัก | จุดเด่น | ข้อควรระวัง | สถานะ |
|---|---|---|---|---|---|
| 1 | IoT-CAD (2020) | anomaly detection จากความสัมพันธ์ของเซนเซอร์ | มี testbed 62 sensors, เปรียบเทียบ baseline, อธิบายเป็นเรื่องราวได้ | recall 56% และ anomaly ส่วนหนึ่งเป็นข้อมูลสังเคราะห์ | **ตัวจริง** |
| 2 | MCSOA (2024) | routing optimization ใน WSN ของระบบไฟฟ้า | ตรงวิชา WSN และมีโจทย์พลังงาน/อายุเครือข่าย | เน้น metaheuristic และ simulation ค่อนข้างมาก | สำรอง 1 |
| 3 | ML-IoT Security Practices (2022) | กระบวนการพัฒนา ML บน IoT อย่างปลอดภัย | เชื่อม technical กับข้อจำกัดธุรกิจจริง | กลุ่มตัวอย่างเล็ก: survey 25, interview 4 | สำรอง 2 |

## เหตุผลที่ IoT-CAD เหมาะที่สุดสำหรับ 5 นาที

บทความมีคำถามที่ผู้ฟังเข้าใจได้ทันที: ถ้าเซนเซอร์วัดค่าแปลก เราจะรู้ได้อย่างไรว่าสภาพแวดล้อมเปลี่ยนจริง หรือเซนเซอร์เสีย/ถูกโจมตี?

คำตอบของงานมีโครงสร้างเล่าได้ชัด:

1. แปลงแนวโน้มของแต่ละ sensor เป็น binary fingerprint
2. จัดกลุ่ม sensor ที่เปลี่ยนแปลงสัมพันธ์กัน
3. ใช้ LSTM ทำนายค่าปกติและ Gaussian estimator ตัดสิน anomaly
4. ใช้ consensus แยก Environmental Anomaly (EA) กับ Sensing Device Anomaly (SDA)
5. retrain เพื่อปรับตามระบบและสภาพแวดล้อมที่เปลี่ยน

ตัวเลขที่จำง่ายและใช้ตอบคำถามได้:

- 62 sensors, 13 physical parameters
- เก็บข้อมูล 8 วัน ประมาณ 2.3 ล้าน measurements
- precision 92%, recall 56%, F0.5 81%, F1 70%
- inference 0.532 วินาที

## ความน่าสนใจและ impact ในยุค AI

IoT-CAD ยังน่าสนใจในยุค AI เพราะระบบ AI ที่ควบคุมอาคาร โรงงาน หุ่นยนต์ หรือระบบสุขภาพต้องเริ่มจากข้อมูล sensor ที่เชื่อถือได้ หาก sensor เสียหรือถูกโจมตี model ที่ฉลาดเพียงใดก็อาจตัดสินใจผิด งานนี้จึงเชื่อมสามหัวข้อที่ยังสำคัญพร้อมกัน ได้แก่ multimodal sensing, trustworthy AI และ edge/fog intelligence

จุดที่เหมาะกับนิสิตวิศวกรรมคอมพิวเตอร์ชั้นปีที่ 4 คือสามารถอธิบายได้ทั้งระดับระบบเครือข่าย ระดับ algorithm และระดับการประเมินผล โดยไม่กลายเป็น paper ที่มีเพียงสมการหรือ simulation อีกทั้งยังเปิดช่องให้วิจารณ์อย่างเป็นธรรมจาก precision–recall trade-off, synthetic anomalies และ threat model

## ต้องหา paper ใหม่หรือไม่

**ข้อสรุป: ไม่จำเป็นสำหรับ Assignment Paper 1** การค้นทบทวน paper conference ที่ใหม่กว่าไม่พบตัวเลือกที่เหนือกว่า IoT-CAD อย่างชัดเจนพร้อมกันทั้งความตรงหัวข้อ IoT/Sensor Network, ความมีหลักฐานเชิงทดลอง, ความเข้าใจได้ภายใน 5–8 นาที และโอกาสวิเคราะห์ contribution/ข้อจำกัดตาม rubric

ปีพิมพ์ 2020 ไม่ทำให้งานหมดคุณค่า เพราะประเด็นที่นำเสนอไม่ใช่ “LSTM ใหม่ที่สุดหรือไม่” แต่คือแนวคิดการใช้ความสัมพันธ์ระหว่าง sensor เพื่อแยกเหตุจริงออกจากความผิดปกติของอุปกรณ์ ควรนำเสนอในฐานะงานระบบที่มีแนวคิดแข็งแรง และกล่าวตรงไปตรงมาว่าโมเดลลำดับเวลาในอนาคตอาจแทนด้วย architecture ที่ใหม่กว่าได้

ดังนั้นการเปลี่ยน paper ตอนนี้มีต้นทุนในการอ่านและจัดทำใหม่มากกว่าประโยชน์ที่คาดว่าจะได้ ควรลงทุนเวลาในความเข้าใจเชิงลึก การตีความ metric และการซ้อมตอบคำถามแทน

## บรรณานุกรมรูปแบบ IEEE

[1] R. Yasaei, F. Hernandez, and M. A. Al Faruque, “IoT-CAD: Context-Aware Adaptive Anomaly Detection in IoT Systems Through Sensor Association,” in *2020 IEEE/ACM International Conference on Computer-Aided Design (ICCAD)*, 2020, pp. 1-9, doi: 10.1145/3400302.3415672.

[2] J. Wei, T. Luo, D. Jia, Y. Zhu, P. Ma, and J. Zhou, “MCSOA: A Novel High-Reliable Wireless Sensor Networks Routing Optimization Method for Power Internet of Things,” in *2024 9th International Conference on Automation, Control and Robotics Engineering (CACRE)*, 2024, pp. 79-83, doi: 10.1109/CACRE62362.2024.10635077.

[3] N. K. Gopalakrishna *et al.*, “'If Security Is Required': Engineering and Security Practices for Machine Learning-Based IoT Devices,” in *2022 IEEE/ACM 4th International Workshop on Software Engineering Research and Practices for the IoT (SERP4IoT)*, 2022, pp. 1-8, doi: 10.1145/3528227.3528565.
