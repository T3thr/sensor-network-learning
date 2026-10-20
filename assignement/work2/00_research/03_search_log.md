# บันทึกการค้นและตรวจสอบ
วันที่ค้น: 21 กันยายน 2026, Asia/Bangkok
วิธี: ใช้ web search หา lead แล้วเปิดหน้า IEEE Xplore ทีละรายการในเบราว์เซอร์เพื่อยืนยันชื่อ ผู้แต่ง ปี ประชุม DOI และ Abstract ไม่ใช้ script/crawler ดาวน์โหลด PDF

## บริบทและขอบเขต
อ่าน task “ทำ Assignment 1 วิชา Sensor Network (2)” ID 01a0c1aa-c9bb-7992-a0d5-340f3c140802 บน local; latest preview ระบุ Paper II เกี่ยวกับ CPE Project และห้ามซ้ำ 12 บทความข้าม Paper I–IV
ตรวจ work1/06_evidence/source-verification.md ยืนยัน IoT-CAD 9256703 / DOI 10.1145/3400302.3415672; กัน 10635077 และ 9826168 ตามคำขอด้วย

## ลำดับการค้นจริง
| ลำดับ | ช่องทาง/คำค้น | ผลและการตัดสินใจ |
|---|---|---|
| 1 | Web: site.ieeexplore.ieee.org "interactive narrative" authoring; site.ieeexplore.ieee.org "visual novel" | ผลปะปน ACM/preprint และวารสาร จึงไม่รับตามชื่ออย่างเดียว |
| 2 | Web: "visual novel" "IEEE" conference authoring; "branching" "narrative" "IEEE" conference authoring tool | พบ GENEVA ผ่าน Microsoft Research, VR VN 8346298, educational VN และ Story Validator ผ่านเว็บ CoG |
| 3 | Web: "GENEVA" "10.1109" narrative; "interactive narrative" "authoring" "2021" "CoG" tool; "StoryVerse" "IEEE" DOI; "Bring Your Own Story" "IEEE" DOI | พบ lead Story Validator/GENEVA/BYOS; StoryVerse เป็น ACM FDG ไม่ยืนยันว่ามี IEEE record จึงไม่เลือก |
| 4 | Web: "Validating the plot of interactive narrative games" DOI; "GENEVA" "10645625"; "Bring Your Own Story: Generating Interactive Visual Novels with AI" DOI | ตรวจ publisher DOI กับคลังมหาวิทยาลัยผู้แต่ง |
| 5 | Web: "GENEVA: GENErating" "10.1109/CoG60054.2024.10645625"; "Generating Together" "10645553"; "Anti-Plagiarism Adventure Game" DOI; "From hypertext to hyperdimension" DOI authors | เตรียมผู้สมัครครบ 6; ผลเว็บทั่วไปเป็น lead ไม่ใช้แทนหน้า publisher |
| 6 | web open หน้า IEEE 9618897,10645625,11274671 | text fetch เจอ JavaScript verification; เปลี่ยนเป็นเปิด UI browser ตามปกติและอ่านได้ ไม่ bypass challenge |
| 7 | Browser เปิด IEEE 9618897 → 10645625 → 11274671 → 10645553 → 10585502 → 8346298 | ยืนยันทั้ง 6 เป็น IEEE Conference Publication พร้อม metadata; 3 ตัวเลือกหลักแสดงไม่มีสิทธิ์ PDF ใน session |
| 8 | IEEE Xplore search โดยตรง: "interactive narrative" AND "authoring" | UI แสดง 4 ผล รวม Conferences 2; พบ Story Validator และ ConnectVR เป็น conference ขณะที่ผลอื่นต้องดูประเภทแยก |

[เปิดผลค้น IEEE ครั้งที่ 8](https://ieeexplore.ieee.org/search/searchresult.jsp?newsearch=true&queryText=%22interactive%20narrative%22%20AND%20%22authoring%22)
จำนวนผลเป็น snapshot ณ วันค้น ไม่ใช่จำนวนถาวร และ query นี้ไม่ใช่ systematic review ที่ครอบคลุมทั้งสาขา

## แหล่งหลัก
- [Validating the plot of Interactive Narrative games](https://ieeexplore.ieee.org/document/9618897/) — IEEE metadata/Abstract; DOI 10.1109/CoG52621.2021.9618897
- [GENEVA: GENErating and Visualizing branching narratives using LLMs](https://ieeexplore.ieee.org/document/10645625/) — IEEE metadata/Abstract; DOI 10.1109/CoG60054.2024.10645625
- [Bring Your Own Story: Generating Interactive Visual Novels with AI](https://ieeexplore.ieee.org/document/11274671/) — IEEE metadata/Abstract; DOI 10.1109/GCCE65946.2025.11274671
- [Generating Together: Lessons Learned from Developing an Educational Visual Novel with AI Collaboration](https://ieeexplore.ieee.org/document/10645553/) — IEEE metadata/Abstract; DOI 10.1109/CoG60054.2024.10645553
- [Anti-Plagiarism Adventure Game: Using Visual Novels for Feasible Game-Based Learning](https://ieeexplore.ieee.org/document/10585502/) — IEEE metadata/Abstract; DOI 10.1109/GEM61861.2024.10585502
- [From hypertext to hyperdimension Neptunia: The future of VR visual novels: The potentials of new technologies for branching-path narrative games](https://ieeexplore.ieee.org/document/8346298/) — IEEE metadata/Abstract; DOI 10.1109/VSMM.2017.8346298

## แหล่งจากผู้แต่ง/สถาบันที่ใช้ตรวจประกอบ
- [Microsoft Research: GENEVA](https://www.microsoft.com/en-us/research/publication/geneva-generating-and-visualizing-branching-narratives-using-llms/) — ชื่อเรื่อง ผู้แต่งทั้ง 7 (IEEE หน้าแรกโชว์ 6 ก่อน All Authors), CoG 2024, Abstract
- [University of Lisbon: Story Validator](https://researchportal.ulisboa.pt/en/publications/validating-the-plot-of-interactive-narrative-games/) — ผู้แต่ง/ประชุม/publisher DOI
- [Ritsumeikan: BYOS](https://research-db.ritsumei.ac.jp/rithp/k04/resid/S000106/R260128135512857705/821%3Bjsessionid%3DFF5EC05C866F454480FA031C4A110771) — lead DOI/หน้า 627–630; URL session อาจหมดอายุ ให้ใช้ IEEE เป็นหลัก
- [CEU: Anti-Plagiarism VN](https://research.ceu.edu/en/publications/anti-plagiarism-adventure-game-using-visual-novels-for-feasible-g/) — metadata และ Abstract ด้านการประเมิน
- [Ulster: VR VN](https://pure.ulster.ac.uk/en/publications/from-hypertext-to-hyperdimension-neptuniathe-future-of-vr-visual-/) — metadata; ชื่อสั้นกว่าที่ IEEE จึงใช้ชื่อเต็มจาก IEEE

## Lead ที่ไม่เลือกตามเกณฑ์
From linear story generation to branching story graphs (1626183) เป็น Journals & Magazine; Orchid-Creator/Elsewise/StoryVerse ที่พบเป็น ACM หรือ preprint ไม่ได้ผ่านเงื่อนไข IEEE conference ในรอบนี้
พบ author copy/Zenodo ของ Story Validator แต่ไม่ได้ดาวน์โหลด; DOI 10.5281/zenodo.5472960 เป็น repository DOI ไม่ใช้แทน publisher DOI 10.1109/CoG52621.2021.9618897
ไม่อ่าน Full Text ครบ ไม่ใช้ยอด citation/full-text views เป็นผลการทดลอง และไม่บันทึก Abstract เต็มเพื่อหลีกเลี่ยงคัดลอกเกินจำเป็น

