# หลักฐานการค้นคว้า Paper_II

ดาวน์โหลดจาก IEEE Xplore ทีละบทความผ่านหน้าเว็บ เมื่อวันที่ 21 กันยายน 2026 (เวลาไทย, UTC+7)

ทุกไฟล์มีแถบลิขสิทธิ์ระบุว่า `Authorized licensed use limited to: Naresuan University provided by UniNet. Downloaded on September 21,2026 from IEEE Xplore` จึงเป็นการเข้าถึงผ่านสิทธิ์บอกรับของมหาวิทยาลัยนเรศวร ไม่ใช่ Open Access และไม่ได้ใช้ script หรือ crawler

หัวข้อที่ใช้ค้น: โครงงานจบ CPE **DivWy Platform** (แพลตฟอร์มนิยายออนไลน์ภาพขยับเชิงโต้ตอบ)

## 1. ตัวจริง

**Validating the plot of Interactive Narrative games**

- ผู้แต่ง: Carolina Veloso, Rui Prada (INESC-ID, Instituto Superior Técnico, Universidade de Lisboa)
- งานประชุม: 2021 IEEE Conference on Games (CoG)
- วันที่ประชุม: 17-20 สิงหาคม 2021, Copenhagen, Denmark
- DOI: <https://doi.org/10.1109/CoG52621.2021.9618897>
- IEEE Xplore: <https://ieeexplore.ieee.org/document/9618897/>
- ไฟล์: `Paper_II_1_PRIMARY_StoryValidator_9618897.pdf`
- สถานะ: 8 หน้า, เข้าถึงผ่านสิทธิ์ ม.นเรศวร
- ซอร์สโค้ดของผู้แต่ง: <https://github.com/iv4xr-project/in-story-validator>
- เหตุผลที่เลือก: ตรงกับช่องว่างจริงของ DivWy ที่ตรวจความพร้อมเผยแพร่เพียงว่ามีตอนและมีเนื้อหา แต่ไม่ตรวจว่าทุกเส้นทางไปถึงฉากจบได้ และมีผลการทดลองกับผู้ใช้ 20 คนให้วิเคราะห์

## 2. สำรอง 1

**GENEVA: GENErating and Visualizing branching narratives using LLMs**

- ผู้แต่ง: Jorge Leandro, Sudha Rao, Michael Xu, Weijia Xu, Nebojsa Jojic, Chris Brockett, Bill Dolan (Microsoft Research)
- งานประชุม: 2024 IEEE Conference on Games (CoG)
- วันที่ประชุม: 5-8 สิงหาคม 2024, Milan, Italy
- DOI: <https://doi.org/10.1109/CoG60054.2024.10645625>
- IEEE Xplore: <https://ieeexplore.ieee.org/document/10645625/>
- ไฟล์: `Paper_II_2_BACKUP_GENEVA_10645625.pdf`
- สถานะ: 5 หน้า, เข้าถึงผ่านสิทธิ์ ม.นเรศวร
- เหตุผลที่เลือก: ใช้ GPT-4 สร้างกราฟเรื่องแบบแตกแขนงและกลับมารวมกัน ตรงกับเครื่องมือผังเรื่องของ DivWy แต่ประเมินผลเป็นการวิเคราะห์เชิงคุณภาพของผู้แต่งเอง

## 3. สำรอง 2

**Bring Your Own Story: Generating Interactive Visual Novels with AI**

- ผู้แต่ง: Zifan Ye, Menghan Zhang, Pratch Suntichaikul, Satoru Goto, Oki Nakamura, Ruck Thawonmas (Ritsumeikan University)
- งานประชุม: 2025 IEEE 14th Global Conference on Consumer Electronics (GCCE)
- วันที่ประชุม: 23-26 กันยายน 2025, Osaka, Japan
- DOI: <https://doi.org/10.1109/GCCE65946.2025.11274671>
- IEEE Xplore: <https://ieeexplore.ieee.org/document/11274671/>
- ไฟล์: `Paper_II_3_BACKUP_BYOS_11274671.pdf`
- สถานะ: 4 หน้า, เข้าถึงผ่านสิทธิ์ ม.นเรศวร
- เหตุผลที่เลือก: เป็น Visual Novel ตรงประเภทผลิตภัณฑ์เดียวกับ DivWy ใช้ GPT-4o ร่วมกับ DALL-E 3 และ rembg บน Unity แต่ไม่มีการประเมินผลเชิงประจักษ์

## ตรวจความไม่ซ้ำ

ทั้งสามรายการไม่ซ้ำกันเอง และไม่ซ้ำกับ Paper_I (9256703, 10635077, 9826168) ทั้งชื่อ ผู้แต่ง ปี งานประชุม DOI และ IEEE document number

ใช้รายการนี้ตรวจซ้ำอีกครั้งเมื่อทำ Paper_III และ Paper_IV

## การตรวจไฟล์

ค่าแฮชอยู่ใน `MANIFEST.sha256` ตรวจผ่านทั้งหกไฟล์ด้วย `shasum -a 256 -c MANIFEST.sha256` เมื่อ 21 กันยายน 2026

