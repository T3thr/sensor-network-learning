# Source Verification & Evidence Audit

เอกสารตรวจสอบความถูกต้องของข้อมูล ที่มา หมายเลข DOI และตำแหน่งหลักฐานในบทความต้นฉบับ สำหรับ Assignment Paper 2

---

## 1. ข้อมูลบทความหลัก (PRIMARY)

- **ชื่อบทความ:** Validating the plot of Interactive Narrative games
- **ผู้เขียน:** Carolina Veloso และ Rui Prada
- **สังกัดสถาบัน:** INESC-ID, Instituto Superior Técnico, Universidade de Lisboa, Portugal
- **งานประชุมวิชาการ:** 2021 IEEE Conference on Games (CoG)
- **วันจัดงานประชุม:** 17–20 August 2021
- **สถานที่จัดประชุม:** Copenhagen, Denmark (Online Virtual)
- **ผู้จัดพิมพ์:** IEEE
- **IEEE Document ID:** 9618897
- **DOI:** 10.1109/CoG52621.2021.9618897
- **ISBN:** 978-1-6654-3886-5
- **หน้า:** 1–8 (รวม 8 หน้า)
- **สถานะสิทธิ์การเข้าถึง:** ดาวน์โหลดผ่านสิทธิ์ของมหาวิทยาลัยนเรศวร (Authorized licensed use limited to: Naresuan University provided by UniNet. Downloaded on September 21, 2026 at 03:30:48 UTC)
- **ไฟล์ต้นฉบับในระบบ:** `senior-subject/sensor-network/assignement/work2/01_original/Paper_II_1_PRIMARY_StoryValidator_9618897.pdf`
- **SHA-256 Checksum:** ตรวจสอบตรงกับใน `senior-subject/sensor-network/raw/MANIFEST.sha256`

---

## 2. การตรวจสอบตำแหน่งหลักฐานในบทความ (Claim-to-Evidence Matrix)

| ประเด็นอ้างอิง | ข้อความ / ตัวเลข | ตำแหน่งในบทความต้นฉบับ | ตรวจสอบ |
|---|---|---|:---:|
| ผลสำรวจนักเขียนใช้ Word | 76% ใช้ Word/Docs, 24% เคยใช้ Twine | Section VI-D (หน้า 8, คอลัมน์ซ้าย บรรทัด 1–5) | ✅ ยืนยัน |
| ปัญหาความท้าทาย 4 ข้อ | Authorial intent, Branching, Variables, Evaluation | Section II (หน้า 1–2) | ✅ ยืนยัน |
| ตัวชี้วัด 5 มิติ | Total paths, Stroke points, Lost plot, Variable timeline, Endings | Section IV (หน้า 3–4) | ✅ ยืนยัน |
| สูตร Heuristic Greedy Search | $Total_l = v_{1,l} w_1 + \dots + v_{n,l} w_n$ | Algorithm 1 (หน้า 6, คอลัมน์ซ้าย) | ✅ ยืนยัน |
| สเปกฉาก The Murder Case | 14 Passages, 20 Paths, 3 Endings, 3 ตัวแปร | Section VI-A (หน้า 6, คอลัมน์ขวา) | ✅ ยืนยัน |
| บั๊ก 5 จุดใน Failed Version | Path #7, #8, #14 dead-ends, Ending 1 & Choice 6 unreachable | Section VI-C (หน้า 7, คอลัมน์ซ้าย บรรทัด 15–25) | ✅ ยืนยัน |
| เวลาเฉลี่ยตรวจพบบั๊ก | 52.3 วินาที (SD = 22.66) | Section VI-C (หน้า 7, คอลัมน์ขวา บรรทัด 24–25) | ✅ ยืนยัน |
| เวลาเฉลี่ยเสนอวิธีแก้ | 146.2 วินาที (SD = 31.84) | Section VI-C (หน้า 7, คอลัมน์ขวา บรรทัด 26–27) | ✅ ยืนยัน |
| ผู้ใช้ 3 คนพลาดปัญหาที่ 2 | พลาดเพราะกวาดตาดูผังแทนการใช้ตัวกรอง Lost Plot | Section VI-C (หน้า 7, คอลัมน์ขวา บรรทัด 15–20) | ✅ ยืนยัน |
| คะแนนความง่าย SUS Score | User Study 1 = 83.5 (SD 9.45) → User Study 2 = 92.4 (SD 4.76) | Section VI-B (หน้า 6) & Section VI-C (หน้า 7) | ✅ ยืนยัน |
| เกณฑ์คะแนน Superior | อ้างอิง Bangor, Kortum & Miller (2008) [22] | Section VI-C (หน้า 7, คอลัมน์ขวา) | ✅ ยืนยัน |
| ซอร์สโค้ดเครื่องมือเปิดเผย | github.com/iv4xr-project/in-story-validator | Footnote ในบทความ | ✅ ยืนยัน |
