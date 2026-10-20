# การคัดเลือก Paper II สำหรับ CPE Senior Project

## สรุปผลคัดเลือก

| ลำดับ | บทความ | แกนหลัก | จุดเด่น | ข้อควรระวัง / จุดอ่อน | สถานะ |
|---|---|---|---|---|---|
| **1** | **Story Validator (2021)**<br>IEEE CoG 2021 (8 หน้า) | Automated plot validation & DFS narrative graph analysis | มีการทดลองจริง 2 รอบ (5 คน และ 20 คน), มีตัวเลขเวลา 52.3 s, คะแนน SUS 92.4, สอดคล้องกับสถาปัตยกรรมระบบ 1:1 | ขาดกลุ่มควบคุมเปรียบเทียบ (No control baseline) | **ตัวจริง (PRIMARY)** |
| **2** | **GENEVA (2024)**<br>IEEE CoG 2024 (5 หน้า) | LLM-based (GPT-4) narrative graph generation | หัวข้อทันสมัย มาจาก Microsoft Research ใช้โมเดลภาษาขนาดใหญ่ | **ไม่มีการประเมินผลเชิงปริมาณเลย** เป็นเพียงการวิเคราะห์เชิงคุณภาพที่ผู้แต่งอ่านผลลัพธ์เอง | สำรอง 1 (BACKUP 1) |
| **3** | **Bring Your Own Story (2025)**<br>IEEE GCCE 2025 (4 หน้า) | AI-driven visual novel platform with Unity | ตรงประเภทผลิตภัณฑ์ Visual Novel (แปลงข้อความเป็นฉาก) | **ไม่มีการทดลองใด ๆ ทั้งสิ้น** เอกสาร 4 หน้ามีแต่คำอธิบายสถาปัตยกรรมและงานในอนาคต | สำรอง 2 (BACKUP 2) |

---

### 1. เหตุผลที่เลือก Story Validator เป็นบทความหลัก (PRIMARY)
- **มีการทดลองเชิงประจักษ์ (Empirical Evidence):** 
  - มีเวลาเฉลี่ยในการตรวจพบบั๊ก **52.3 วินาที** (ส่วนเบี่ยงเบนมาตรฐาน 45.4 s)
  - มีเวลาเฉลี่ยในการแก้ไขบั๊ก **146.2 วินาที** (ส่วนเบี่ยงเบนมาตรฐาน 101.9 s)
  - มีอัตราความสำเร็จจำแนกตามรายปัญหา (ปัญหาที่ 1, 3, 4, 5 ได้ 100%, ปัญหาที่ 2 ได้ 85%)
  - มีคะแนนความง่ายในการใช้งาน **SUS Score 92.4 คะแนน**

### 2. ความตรงกับสถาปัตยกรรมของระบบเกมการเล่าเรื่องเชิงโต้ตอบแบบหนึ่งต่อหนึ่ง
- **Passage และ Link:** ตรงกับ Block และ Choice ในโมเดลของเอนจินนิยายภาพ
- **Guarded Link:** ตรงกับระบบตรวจสอบเงื่อนไขตัวแปรใน runtime ของเกม
- **Story State Variables:** ตรงกับระบบ Game State Management และการสะสมตัวแปร
- **Lost Plot & Dead-End:** ตรงกับฟังก์ชันสำคัญของระบบ Moderation และ Validation ก่อนปล่อยเนื้อเรื่องสู่ผู้เล่น

### 3. ประเด็นวิจารณ์เชิงวิชาการที่แหลมคม
นิสิตสามารถชี้ให้คณะกรรมการเห็นจุดด้อยที่แท้จริงของบทความได้อย่างมืออาชีพ:
1. การขาดกลุ่มควบคุม (No Control Baseline) เพื่อเปรียบเทียบเวลา
2. ปัญหา State-Space Explosion ของอัลกอริทึม DFS เมื่อโครงเรื่องขยายขนาดใหญ่

---

## ข้อมูลบรรณานุกรมรูปแบบ IEEE

[1] C. Veloso and R. Prada, “Validating the plot of Interactive Narrative games,” in *2021 IEEE Conference on Games (CoG)*, Copenhagen, Denmark, 2021, pp. 1–8, doi: 10.1109/CoG52621.2021.9618897. (IEEE Document ID: 9618897)

[2] E. B. Bura, P. Buro, and M. Volkovas, “GENEVA: Generative Narrative Graphs for Interactive Storytelling,” in *2024 IEEE Conference on Games (CoG)*, Milan, Italy, 2024, pp. 1–5, doi: 10.1109/CoG60054.2024.10645625. (IEEE Document ID: 10645625)

[3] H. Tagawa, Y. Takahashi, and K. Watanabe, “Bring Your Own Story: A System for Generating Interactive Visual Novels from Text,” in *2025 IEEE 14th Global Conference on Consumer Electronics (GCCE)*, 2025, pp. 1–4, doi: 10.1109/GCCE63604.2025.11274671. (IEEE Document ID: 11274671)
