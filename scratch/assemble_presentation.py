import subprocess

with open('assets/js/presentation.js', 'r', encoding='utf-8') as f:
    code = f.read()

start_marker = "  'story-validator': {"
start_idx = code.find(start_marker)
idx_class = code.find('class PresentationStudio')

assert start_idx != -1, "start_marker not found"
assert idx_class != -1, "class PresentationStudio not found"

new_story_validator_block = """  'story-validator': {
    peer: [
      {
        id: 0,
        start: 0,
        end: 30,
        title: "1. หน้าปก",
        timeLabel: "0:00 - 0:30",
        slide: {
          num: "Slide 1 / 7",
          title: "Story Validator: Validating the Plot of Interactive Narrative Games",
          bullets: [
            "การตรวจสอบโครงเรื่องของเกมแบบโต้ตอบด้วยแบบจำลองกราฟและจำลองพฤติกรรมผู้เล่น",
            "2021 IEEE Conference on Games (CoG)",
            "คณะผู้วิจัย: Carolina Veloso, Rui Prada (INESC-ID & Univ. of Lisbon)",
            "ผู้นำเสนอ: นายธีรภัทร ภู่ระย้า ลำดับที่ 10 (รหัสนิสิต 66362416)"
          ],
          diagram: `[ ปัญหาโครงเรื่องแตกกิ่ง ]\\nPassage 1 ──▶ Choice A ──▶ Choice B ──▶ ? [Dead-End ทางตัน เข้าไม่ถึงฉากจบ]\\n[ ทางแก้ของ Story Validator ]\\nแปลงนิยายเป็น Directed Graph ──▶ ใช้ DFS ตรวจสอบ 5 มิติแบบอัตโนมัติ`,
          citation: "Veloso & Prada, IEEE CoG 2021, DOI: 10.1109/CoG52621.2021.9618897"
        },
        slideImage: 'assets/slides/slide-1.png',
        scriptHtml: `
          <p><strong>[0:00 - 0:30 · หน้าปก (IEEE CoG 2021)]</strong></p>
          <p>
            กราบเรียนอาจารย์และสวัสดีเพื่อนๆ ทุกคนครับ ผมนายธีรภัทร ภู่ระย้า ลำดับที่ 10 วันนี้ขอสรุปบทความวิจัยเรื่อง <em>Story Validator: Validating the Plot of Interactive Narrative Games</em> จากการประชุมวิชาการ <strong>IEEE Conference on Games (CoG) ปี 2021</strong> โดย Carolina Veloso และ Rui Prada จากมหาวิทยาลัยลิสบอนครับ <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            ในการสร้างเกมหรือนิยายเชิงโต้ตอบที่มีทางเลือกแตกแขนง สิ่งที่ท้าทายมากคือ: <span class="highlight-key">“เราจะมั่นใจได้อย่างไรว่าทุกเส้นทางที่ผู้เล่นเลือก จะดำเนินไปถึงฉากจบได้จริงโดยไม่ติดทางตันกลางคัน?”</span>
          </p>
          <p>
            เปเปอร์นี้นำเสนอเครื่องมือวิศวกรรมชื่อ <strong>Story Validator</strong> ที่ใช้แบบจำลองกราฟและจำลองพฤติกรรมผู้เล่น มาตรวจความถูกต้องของโครงเรื่องแบบอัตโนมัติครับ
          </p>
        `
      },
      {
        id: 1,
        start: 30,
        end: 75,
        title: "2. ปัญหา & ความท้าทาย",
        timeLabel: "0:30 - 1:15",
        slide: {
          num: "Slide 2 / 7",
          title: "ปัญหาและความท้าทายในการตรวจสอบ Interactive Story",
          bullets: [
            "ความท้าทายหลัก 4 ด้าน: Authorial Intent vs Player Agency, State Explosion, ตัวแปรเงื่อนไข, Playtesting แพง",
            "ภาพที่ 1: ผังโครงเรื่องแบบ Node & Link ใน Twine ซับซ้อนเกินกว่าสายตามนุษย์จะตรวจไหว",
            "ผลสำรวจชี้: 76% ของนักเขียนบทเกมยังคงใช้ MS Word หรือ Google Docs ในการร่างบท",
            "เครื่องมือเดิมขาดระบบตรวจตรรกะอัตโนมัติ ทำให้เกิด Dead-Ends และ Lost Plot หลุดรอดสู่ผู้เล่น"
          ],
          diagram: `ปัญหาการเขียนบท ──▶ 76% ใช้ Word/Docs ──▶ ไร้ระบบตรวจตรรกะ ──▶ Dead-Ends & Lost Plot หลุดสู่ผู้เล่น`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section I & II"
        },
        slideImage: 'assets/slides/slide-2.png',
        scriptHtml: `
          <p><strong>[0:30 - 1:15 · ปัญหาและความท้าทาย (Section I & II)]</strong></p>
          <p>
            ในสไลด์ที่ 2 เป็นปัญหาและความท้าทายหลัก 4 ประการของการเล่าเรื่องแบบแตกแขนงครับ: <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            1. <span class="highlight-key">Authorial Intent vs Player Agency:</span> การรักษาสมดุลระหว่างสารที่คนแต่งต้องการเล่า กับอิสระในการตัดสินใจของผู้เล่น<br>
            2. <span class="highlight-key">State-Space Explosion:</span> ยิ่งตัวเลือกมาก กิ่งก้านจะทวีคูณจนเกินขีดความสามารถที่มนุษย์จะตรวจด้วยตาเปล่าได้ครบ ดังภาพที่ 1 ทางขวาที่เป็นผังใน Twine ซึ่งซับซ้อนจนกวาดสายตาดูไม่ไหว<br>
            3. <span class="highlight-key">Guarded Variables & Logic:</span> การผูกเงื่อนไขกับตัวแปรสะสม เช่น ค่าอารมณ์หรือสกิล เสี่ยงต่อการเกิดข้อผิดพลาดเชิงตรรกะในเส้นทางที่คาดไม่ถึง<br>
            4. <span class="highlight-key">High Playtesting Cost:</span> การใช้คนจริงมาทดสอบเล่นซ้ำๆ มีต้นทุนสูง ช้า และไม่ครอบคลุมทุกเส้นทางครับ
          </p>
          <p>
            และที่น่าตกใจคือ ผลสำรวจในเปเปอร์พบว่า <span class="highlight-warn">76% ของคนเขียนบทยังใช้ MS Word หรือ Google Docs</span> ในการร่างบท โดยเครื่องมืออย่าง Twine หรือ Ren'Py ช่วยเพียงการเรียบเรียง แต่ขาดระบบตรวจจับความถูกต้องเชิงตรรกะแบบอัตโนมัติ ทำให้มักพบ Dead-Ends (ทางตัน) และ Lost Plot (ฉากที่เข้าไม่ถึง) หลุดรอดไปถึงมือผู้เล่นจริงครับ
          </p>
        `
      },
      {
        id: 2,
        start: 75,
        end: 125,
        title: "3. กราฟ & ตัวชี้วัด",
        timeLabel: "1:15 - 2:05",
        slide: {
          num: "Slide 3 / 7",
          title: "แบบจำลองกราฟและตัวชี้วัดโครงเรื่อง (The Proposed Model & Metrics)",
          bullets: [
            "กราฟระบุทิศทาง G = (V, E): Passage (โหนด V) แทนฉาก, Link (เส้นเชื่อม E) แทนทางเลือกมี Guarded Edges",
            "การท่องกราฟด้วย DFS: ท่องจนสุดฉากจบ รวบรวม Playthrough Traces ทุกเส้นทางอัตโนมัติ",
            "ตัวชี้วัด 5 ด้าน: N_paths (รวมเส้นทาง), S_points (ฉากบังคับผ่าน), P_endings (สัดส่วนฉากจบ)",
            "Dead-Ends (ทางตัน), Lost Plot (ฉากเข้าไม่ถึง), และ V_evol (Dotted Chart ติดตามตัวแปร)"
          ],
          diagram: `[ ฝั่งซ้าย: โมเดลกราฟ ] G = (V, E) ──▶ DFS Traces\\n[ ฝั่งขวา: ตัวชี้วัด 5 มิติ ] N_paths | S_points | P_endings | D_ends & L_plot | V_evol`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section III & IV"
        },
        slideImage: 'assets/slides/slide-3.png',
        scriptHtml: `
          <p><strong>[1:15 - 2:05 · แบบจำลองกราฟและตัวชี้วัด (The Proposed Model & Metrics)]</strong></p>
          <p>
            เพื่อแก้ปัญหาดังกล่าว ผู้เขียนได้เสนอแบบจำลองออกเป็น 2 ส่วนหลักตามสไลด์ครับ: <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            <strong>ฝั่งซ้าย — แบบจำลองโครงเรื่องด้วยกราฟ (Graph Representation):</strong><br>
            1. แปลงเนื้อเรื่องเป็น Directed Graph <span class="highlight-key">G = (V, E)</span> โดยให้ <strong>Passage (แต่ละฉาก) เป็นโหนด V</strong> ที่บรรจุบทสนทนาและคำสั่งตัวแปร และให้ <strong>Link (ทางเลือก) เป็นเส้นเชื่อม E</strong> ที่มีเงื่อนไขตัวแปรกำกับ หรือ Guarded Edges<br>
            2. ใช้อัลกอริทึม <span class="highlight-key">DFS (Depth-First Search)</span> เริ่มท่องตั้งแต่จุดเริ่มต้นไปจนสุดฉากจบทีละเส้นทาง เพื่อรวบรวม Playthrough Traces ทุกเส้นทางที่เป็นไปได้แบบอัตโนมัติ
          </p>
          <p>
            <strong>ฝั่งขวา — ตัวชี้วัดคุณภาพโครงเรื่อง 5 ด้าน (Narrative Metrics):</strong><br>
            1. <span class="highlight-key">Number of Paths (N<sub>paths</sub>):</span> นับผลรวมเส้นทางการเล่นที่เป็นไปได้ทั้งหมดตั้งแต่จุดเริ่มจนถึงฉากจบ<br>
            2. <span class="highlight-key">Stroke Points (S<sub>points</sub>):</span> ฉากสำคัญที่ <em>ทุกเส้นทางต้องไหลผ่าน</em> เพื่อยืนยันว่าผู้เล่นได้รับสารหลักตามเจตจำนงของผู้แต่ง<br>
            3. <span class="highlight-key">Endings Hit Percentage (P<sub>endings</sub>):</span> คำนวณสัดส่วนความน่าจะเป็นในการเข้าถึงฉากจบแต่ละแบบ และตรวจหาฉากจบที่เข้าไม่ถึง<br>
            4. <span class="highlight-warn">Dead-Ends (D<sub>ends</sub>) & Lost Plot (L<sub>plot</sub>):</span> ตรวจจับฉากทางตันที่ไปต่อไม่ได้ และฉากที่ไม่สามารถเข้าถึงได้จริงเนื่องจากเงื่อนไขตัวแปรขัดแย้ง<br>
            5. <span class="highlight-key">Evolution of Variables (V<sub>evol</sub>):</span> พล็อต Dotted Chart ติดตามการเปลี่ยนแปลงของตัวแปรตลอดเส้นเรื่อง เพื่อตรวจจับค่าหลุดกรอบครับ
          </p>
        `
      },
      {
        id: 3,
        start: 125,
        end: 175,
        title: "4. กรณีศึกษา & Persona",
        timeLabel: "2:05 - 2:55",
        slide: {
          num: "Slide 4 / 7",
          title: "กรณีศึกษา The Murder Case และการจำลองพฤติกรรมผู้เล่น",
          bullets: [
            "The Murder Case (TMC): 14 Passages · 20 Paths · 3 ฉากจบ · 3 ตัวแปรอารมณ์ (Anger, Confusion, Fear)",
            "ฝังบั๊กจงใจ 5 จุด: เส้นทาง #7, #14 (Dead-End), เส้นทาง #8 (Infinite Loop), Ending 1 และ Choice 6 (Lost Plot)",
            "Player Personas: Heuristic Greedy Search คำนวณ Score(L) = Σ(wi × vi)",
            "Aggressive (Anger=0.75) vs Paranoid (Fear=0.70) ช่วยพยากรณ์การเจอบั๊กของผู้เล่นแต่ละกลุ่ม"
          ],
          diagram: `[ ฝั่งซ้าย TMC ] 14 Passages · 20 Paths · 3 Endings · 5 Injected Bugs\\n[ ฝั่งขวา Persona ] Heuristic Greedy: Score(L) = Σ(w_i × v_i) ──▶ Aggressive vs Paranoid`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section V"
        },
        slideImage: 'assets/slides/slide-4.png',
        scriptHtml: `
          <p><strong>[2:05 - 2:55 · กรณีศึกษา The Murder Case และการจำลองพฤติกรรมผู้เล่น]</strong></p>
          <p>
            สไลด์ที่ 4 คืองานทดสอบและไฮไลต์สำคัญ แบ่งออกเป็น 2 ฝั่งครับ: <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            <strong>ฝั่งซ้าย — ฉากทดสอบ The Murder Case (TMC):</strong><br>
            เป็นบทสนทนาแนวสืบสวนสอบปากคำผู้ต้องสงสัยคดีฆาตกรรม กำกับด้วยตัวแปรอารมณ์ 3 ด้าน คือ โกรธ (Anger), สับสน (Confusion), และกลัว (Fear) ขนาดเรื่อง 14 ฉาก, 20 เส้นทาง, และ 3 ฉากจบ โดยผู้วิจัยได้จงใจฝังบั๊กไว้ 5 จุด ได้แก่:<br>
            • บั๊ก 1 & 3: เส้นทาง #7 และ #14 เกิด Dead-End ที่ Choice 5<br>
            • บั๊ก 2: เส้นทาง #8 เกิด Loop วนซ้ำไม่รู้จบ<br>
            • บั๊ก 4 & 5: ฉาก Ending 1 และ Choice 6 เข้าไม่ถึงจริง (Lost Plot)
          </p>
          <p>
            <strong>ฝั่งขวา — การจำลองพฤติกรรมผู้เล่น (Player Personas):</strong><br>
            ความพิเศษของงานนี้คือการจำลองผู้เล่น 2 บุคลิกด้วยสูตร <span class="highlight-key">Heuristic Greedy Search</span> ทางขวา โดยคำนวณคะแนนของแต่ละทางเลือกจากผลคูณของน้ำหนักอารมณ์กับค่าตัวแปร:<br>
            <code>Score(L) = &Sigma;(w<sub>i</sub> &times; v<sub>i</sub>), &nbsp; L* = arg max Score(L)</code><br>
            • <strong>Aggressive Persona:</strong> ให้น้ำหนักความโกรธสูง 0.75<br>
            • <strong>Paranoid Persona:</strong> ให้น้ำหนักความกลัวสูง 0.70<br>
            ช่วยให้นักเขียนพยากรณ์ได้ล่วงหน้าว่า ผู้เล่นที่มีสไตล์การตัดสินใจต่างกัน จะหลุดเข้าไปเจอบั๊กตัวใดบ้าง ก่อนที่จะเปิดทดสอบกับคนจริงครับ
          </p>
        `
      },
      {
        id: 4,
        start: 175,
        end: 225,
        title: "5. ผลทดสอบ & SUS",
        timeLabel: "2:55 - 3:45",
        slide: {
          num: "Slide 5 / 7",
          title: "ผลการทดสอบกับผู้ใช้และการตรวจจับข้อผิดพลาด",
          bullets: [
            "ภาพที่ 2: ระบบตรวจพบ Choice 5 เกิด Dead-End บนผังต้นไม้, บั๊ก 1, 3, 4, 5 พบคบ 100% ผ่าน Lost Plot",
            "สถิติสำคัญ: เวลาตรวจพบบั๊ก 52.3s (σ=22.7s) | เวลาแก้ปัญหา 146.2s (σ=31.8s) | SUS 92.4 (Truly Superior)",
            "ตรวจด้วยตาเปล่าล้มเหลว: ผู้ใช้ 15% ที่ไม่เปิดตัวกรองหาบั๊กไม่พบเพราะกวาดตาดูเอง",
            "บั๊ก 5 แก้ยากสุด (ผู้ใช้ 25% ติดขัด) และการเพิ่ม Tooltips ดันคะแนน SUS จาก 83.5 สู่ 92.4"
          ],
          diagram: `[ ภาพที่ 2 Choice 5 Dead-End ] ──▶ บั๊ก 1, 3, 4, 5 พบครบ 100% ผ่าน Lost Plot\\n[ สถิติ 3 กล่อง ] เวลาพบบั๊ก 52.3 s | เวลาแก้ปัญหา 146.2 s | ความพึงพอใจ SUS 92.4 (Truly Superior)`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section V (Table I, Fig. 2)"
        },
        slideImage: 'assets/slides/slide-5.png',
        scriptHtml: `
          <p><strong>[2:55 - 3:45 · ผลการทดสอบกับผู้ใช้และการตรวจจับข้อผิดพลาด]</strong></p>
          <p>
            สไลด์ที่ 5 เป็นผลลัพธ์เชิงตัวเลขจากการทดลองกับผู้ใช้จริง 20 คนใน User Study 2 ครับ: <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            ภาพที่ 2 ด้านบน แสดงหน้าจอระบบ Story Validator ชี้ตำแหน่ง Choice 5 ที่เกิดปัญหา Dead-End บนผังต้นไม้อย่างแม่นยำ โดยบั๊กที่ 1, 3, 4, 5 <span class="highlight-key">ถูกตรวจพบได้ครบ 100% ทันทีผ่านตัวกรอง Lost Plot</span> ครับ
          </p>
          <p>
            ตัวเลขสถิติสำคัญ 3 ตัวบนการ์ดสีน้ำเงิน:<br>
            • <span class="highlight-key">52.3 วินาที:</span> เวลาเฉลี่ยในการตรวจพบบั๊ก (ส่วนเบี่ยงเบนมาตรฐาน 22.7 วินาที)<br>
            • <span class="highlight-key">146.2 วินาที:</span> เวลาเฉลี่ยในการคิดวิธีแก้ไขปัญหา (ส่วนเบี่ยงเบนมาตรฐาน 31.8 วินาที)<br>
            • <span class="highlight-key">92.4 / 100:</span> คะแนนความพึงพอใจการใช้งาน SUS ซึ่งอยู่ในเกรด Truly Superior หรือดีเยี่ยมอย่างยิ่งครับ
          </p>
          <p>
            ข้อค้นพบสำคัญ 3 ข้อด้านล่าง:<br>
            1. <span class="highlight-warn">ความล้มเหลวของการตรวจด้วยตาเปล่า:</span> ผู้ใช้ 3 คน (15%) ที่ไม่ยอมเปิดตัวกรองอัตโนมัติ หาบั๊กไม่พบเลยเพราะพยายามใช้สายตากวาดไล่ดูเอง พิสูจน์ว่าสายตามนุษย์ตรวจไม่ไหว<br>
            2. <span class="highlight-warn">ความยากในการแก้ไข:</span> บั๊กที่ 5 แก้ยากที่สุด (ผู้ใช้ 25% ติดขัด) เพราะเงื่อนไขตัวแปรซ้อนกันหลายชั้น<br>
            3. <span class="highlight-key">การพัฒนาเครื่องมือ:</span> การเพิ่ม Tooltips และหน้าต่างสรุปรายงาน ช่วยดันคะแนน SUS จาก 83.5 ใน Study 1 ขึ้นเป็น 92.4 ครับ
          </p>
        `
      },
      {
        id: 5,
        start: 225,
        end: 265,
        title: "6. การประยุกต์ใช้",
        timeLabel: "3:45 - 4:25",
        slide: {
          num: "Slide 6 / 7",
          title: "การมีส่วนร่วมทางวิชาการและการประยุกต์ใช้งาน",
          bullets: [
            "3 Academic Contributions: ตัวชี้วัดด้วยทฤษฎีกราฟ, สถาปัตยกรรมออฟไลน์ Verification, การจำลอง Persona",
            "โครงสร้าง Node & Edge ใน Game Engine: เชื่อมโยงกับ Unity หรือ Unreal Engine ได้ทันที",
            "การประเมินเงื่อนไขตัวแปรขณะเล่น: Guarded Edges สอดคล้องกับ Runtime State ใน Game Engine",
            "ระบบตรวจสอบคุณภาพใน CI/CD: ผสาน DFS สแกน Dead-Ends อัตโนมัติก่อนส่งมอบเกม"
          ],
          diagram: `[ Academic Contributions ] กราฟเมตริก + ออฟไลน์ Verification + Persona Simulation\\n[ Engine Applications ] Game Engine Node & Edge + Guarded Edges Runtime + CI/CD Automated QA`,
          citation: "Veloso & Prada 2021 · Contributions & Applications"
        },
        slideImage: 'assets/slides/slide-6.png',
        scriptHtml: `
          <p><strong>[3:45 - 4:25 · การมีส่วนร่วมทางวิชาการและการประยุกต์ใช้งาน]</strong></p>
          <p>
            สไลด์ที่ 6 คือคุณค่าทางวิชาการและการนำไปประยุกต์ใช้งานจริงครับ: <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            <strong>ฝั่งซ้าย — การมีส่วนร่วมทางวิชาการ (Academic Contributions) 3 ข้อ:</strong><br>
            1. <span class="highlight-key">การนิยามตัวชี้วัดด้วยทฤษฎีกราฟ:</span> แปลงการแต่งเรื่องที่เป็นนามธรรม ให้กลายเป็นตัวชี้วัดทางคณิตศาสตร์ เช่น Stroke Points, Lost Plot, Dead-Ends ที่โปรแกรมคำนวณซ้ำได้อัตโนมัติ<br>
            2. <span class="highlight-key">สถาปัตยกรรมการตรวจพิสูจน์แบบออฟไลน์:</span> ตรวจสอบกราฟได้ก่อนเข้าสู่ขั้นตอน Human Playtesting ช่วยลดต้นทุนมหาศาล<br>
            3. <span class="highlight-key">การจำลองพฤติกรรมผู้เล่นด้วย Persona:</span> นำ Heuristic Search มาพยากรณ์แนวโน้มการตัดสินใจเพื่อค้นหาบั๊กตามกลุ่มผู้เล่น
          </p>
          <p>
            <strong>ฝั่งขวา — การประยุกต์ใช้งานกับเกมเล่าเรื่อง (Applications) 3 ด้าน:</strong><br>
            1. <span class="highlight-key">โครงสร้าง Node & Edge ใน Game Engine:</span> สามารถนำโมเดล Directed Graph ไปเชื่อมต่อกับเอนจินเกมยุคใหม่ เช่น Unity หรือ Unreal Engine ได้ทันที<br>
            2. <span class="highlight-key">การประเมินเงื่อนไขตัวแปรขณะเล่น:</span> แนวคิด Guarded Edges สอดคล้องกับการตรวจประเมินค่าตัวแปรใน Game Runtime State ก่อนอนุญาตให้เลือกเส้นทาง<br>
            3. <span class="highlight-key">ระบบตรวจคุณภาพอัตโนมัติใน CI/CD:</span> ผสานอัลกอริทึม DFS Validation เข้ากับกระบวนการ Continuous Integration เพื่อสแกนหา Dead-Ends ก่อนส่งมอบเกมครับ
          </p>
        `
      },
      {
        id: 6,
        start: 265,
        end: 300,
        title: "7. ข้อจำกัด & สรุป",
        timeLabel: "4:25 - 5:00",
        slide: {
          num: "Slide 7 / 7",
          title: "ข้อจำกัด และบทสรุป",
          bullets: [
            "3 ข้อจำกัด: ขาด Control Baseline เทียบกับตรวจด้วยมือ, DFS เสี่ยง State Explosion, ชุดทดสอบขนาดเล็ก",
            "การยกระดับสู่ Automated QA: วางรากฐานทฤษฎีกราฟและ Persona ลดต้นทุน Playtesting",
            "การเชื่อมต่อ Game Engine เชิงพาณิชย์: พัฒนาปลั๊กอินสำหรับ Unity, Unreal และ Visual Novel Engine",
            "การใช้ AI/LLM ช่วยซ่อมแซมเนื้อเรื่อง: ผสาน Large Language Models แนะนำการแก้บั๊กโครงเรื่องอัตโนมัติ"
          ],
          diagram: `[ ข้อจำกัด ] ขาด Baseline เปรียบเทียบ · DFS State Explosion · ชุดทดสอบขนาดเล็ก\\n[ บทสรุป ] ยกระดับสู่ Automated QA · เชื่อมต่อ Commercial Game Engine · AI/LLM Narrative Repair`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section VI"
        },
        slideImage: 'assets/slides/slide-7.png',
        scriptHtml: `
          <p><strong>[4:25 - 5:00 · ข้อจำกัด และบทสรุป]</strong></p>
          <p>
            สไลด์สุดท้าย ข้อจำกัดและบทสรุปครับ: <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            <strong>ฝั่งซ้าย — ข้อจำกัดที่ระบุในบทความ (Limitations & Risks) 3 ข้อ:</strong><br>
            1. <span class="highlight-warn">ขาดกลุ่มควบคุมเปรียบเทียบ (No Control Baseline):</span> วัดเวลาตรวจบั๊กได้ 52.3 วินาที แต่ไม่ได้วัดเทียบกับกลุ่มที่ตรวจด้วยสายตาเปล่าใน Twine จึงยังไม่เห็น Speedup Ratio เปรียบเทียบเชิงสถิติ<br>
            2. <span class="highlight-warn">ปัญหา State-Space Explosion ของ DFS:</span> การท่องทุกเส้นทางด้วย DFS เหมาะกับเรื่องขนาดเล็ก หากกราฟมีหลายร้อยฉากและมีวงวน (Loops) จำนวนเส้นทางจะพุ่งสูงแบบ Exponential<br>
            3. <span class="highlight-warn">ขอบเขตชุดทดสอบมีขนาดเล็ก:</span> บั๊กทั้ง 5 จุดใน TMC ถูกตรวจพบด้วย Lost Plot เพียงอย่างเดียว ยังไม่ได้พิสูจน์คุณค่าของ Stroke Points หรือตัวแปรที่ซับซ้อนในระดับอุตสาหกรรม
          </p>
          <p>
            <strong>ฝั่งขวา — บทสรุปและการประยุกต์ใช้งาน (Conclusion & Applications) 3 ข้อ:</strong><br>
            1. <span class="highlight-key">การยกระดับสู่ Automated QA:</span> Story Validator วางรากฐานการนำทฤษฎีกราฟและการจำลอง Persona มาตรวจพิสูจน์เกมเล่าเรื่องแบบอัตโนมัติ ช่วยลดต้นทุน Playtesting และรักษาคุณภาพเนื้อเรื่อง<br>
            2. <span class="highlight-key">การเชื่อมต่อ Game Engine เชิงพาณิชย์:</span> พัฒนาปลั๊กอินเชื่อมต่อไปยัง Unity, Unreal Engine หรือ Visual Novel Engines ยอดนิยม<br>
            3. <span class="highlight-key">การใช้ AI/LLM ช่วยซ่อมแซมเนื้อเรื่อง:</span> นำ Large Language Models มาทำงานร่วมกับกราฟ เพื่อช่วยเสนอแนวทางแก้ไขเงื่อนไขตัวแปรหรือเส้นทางที่ติดตันโดยอัตโนมัติครับ
          </p>
          <p>
            กระผมขอจบการนำเสนอเท่านี้ ขอขอบพระคุณอาจารย์และพร้อมรับคำถามครับ
          </p>
        `
      }
    ],
    executive: [
      {
        id: 0,
        start: 0,
        end: 30,
        title: "1. หน้าปก",
        timeLabel: "0:00 - 0:30",
        slide: {
          num: "Slide 1 / 7",
          title: "Story Validator: Validating the Plot of Interactive Narrative Games",
          bullets: [
            "บทความวิจัย IEEE CoG 2021 โดยสถาบัน INESC-ID มหาวิทยาลัยลิสบอน",
            "โจทย์หลัก: การรับประกันคุณภาพและความถูกต้องของโครงเรื่องเกมที่มีการแตกกิ่ง",
            "มูลค่าทางธุรกิจ: ลดต้นทุน Playtesting มหาศาล และป้องกันผู้เล่นเผชิญบั๊ก Dead-End กลางคัน",
            "เป้าหมาย: พิมพ์เขียวสำหรับระบบ Automated Quality Assurance ของระบบเกมและนิยายภาพเชิงโต้ตอบ"
          ],
          diagram: `[ ปัญหาธุรกิจ ] ผู้เล่นเจอบั๊กเรื่องค้าง ──▶ เลิกเล่น/ขอเงินคืน\\n[ ทางแก้ ] Story Validator ตรวจสอบโครงสร้างเนื้อเรื่อง 100% ก่อน Publish`,
          citation: "Veloso & Prada, IEEE CoG 2021, DOI: 10.1109/CoG52621.2021.9618897"
        },
        slideImage: 'assets/slides/slide-1.png',
        scriptHtml: `
          <p><strong>[0:00 - 0:30 · ภาพรวมเชิงบริหารและการนำไปใช้จริง]</strong></p>
          <p>
            กราบเรียนท่านคณะกรรมการและอาจารย์ทุกท่านครับ ผมธีรภัทร ภู่ระย้า ขอนำเสนองานวิจัยจาก <strong>IEEE Conference on Games (CoG) ปี 2021</strong> เรื่อง <em>Story Validator: Validating the Plot of Interactive Narrative Games</em> ครับ <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            ในอุตสาหกรรมเกมและนิยายแบบโต้ตอบ การปล่อยให้เกมมีบั๊กทางตัน หรือเส้นทางที่เล่นแล้วไม่จบ สร้างความเสียหายต่อประสบการณ์ผู้เล่นและต้นทุนบริษัทอย่างมหาศาล งานวิจัยนี้นำเสนอโซลูชันแบบ Automated Quality Assurance เพื่อตรวจสอบความสมบูรณ์ของโครงเรื่องแบบ 100% ก่อนส่งมอบครับ
          </p>
        `
      },
      {
        id: 1,
        start: 30,
        end: 75,
        title: "2. ปัญหาอุตสาหกรรม",
        timeLabel: "0:30 - 1:15",
        slide: {
          num: "Slide 2 / 7",
          title: "ปัญหาและความท้าทายในการตรวจสอบ Interactive Story",
          bullets: [
            "ต้นทุน Playtesting สูง: ยิ่งเรื่องยาว เส้นทางยิ่งระเบิดแบบ Exponential",
            "76% ของนักพัฒนาบทเกมยังใช้ Microsoft Word หรือ Google Docs ในการทำงาน",
            "เครื่องมือปัจจุบันเน้นเพียงการจัดวางตัวอักษร แต่ขาดระบบ Formal Verification",
            "ผลลัพธ์คือข้อผิดพลาดเชิงตรรกะและทางตันหลุดรอดสู่มือผู้ใช้งานจริง"
          ],
          diagram: `ทีมเขียนบท (Word/Docs 76%) ──▶ ขาดเครื่องมือตรวจ ──▶ Playtesting ซ้ำซ้อน ──▶ บั๊กหลุดสู่ผู้เล่น`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section I & II"
        },
        slideImage: 'assets/slides/slide-2.png',
        scriptHtml: `
          <p><strong>[0:30 - 1:15 · Pain Point สำคัญของอุตสาหกรรม]</strong></p>
          <p>
            จากการสำรวจในบทความวิจัย พบว่า <span class="highlight-warn">76% ของผู้พัฒนาเนื้อเรื่องยังคงเขียนบทบน Word หรือ Google Docs</span> ทำให้ไม่มีเครื่องมือใดช่วยตรวจสอบความถูกต้องเชิงตรรกะ <span class="breath-mark">[สูดหายใจ]</span> เมื่อโครงเรื่องมีความซับซ้อนเพิ่มขึ้น การใช้มนุษย์มานั่งกดทดสอบซ้ำๆ เป็นกระบวนการที่กินเวลา เปลืองงบประมาณ และมี Human Error สูงมากครับ
          </p>
          <p>
            ความท้าทายหลัก 4 ด้าน ทั้ง State Explosion, Guarded Variables, และ High Playtesting Cost ชี้ชัดว่า อุตสาหกรรมต้องการระบบตรวจสอบอัตโนมัติเข้ามาช่วยคัดกรองตั้งแต่เนิ่นๆ ครับ
          </p>
        `
      },
      {
        id: 2,
        start: 75,
        end: 125,
        title: "3. โซลูชัน 4 ขั้นตอน",
        timeLabel: "1:15 - 2:05",
        slide: {
          num: "Slide 3 / 7",
          title: "แบบจำลองกราฟและตัวชี้วัดโครงเรื่อง (The Proposed Model & Metrics)",
          bullets: [
            "Graph Representation G = (V, E): Passage แทน Node, Link แทน Edge พร้อม Guarded Conditions",
            "DFS Playthrough Traces: ท่องตรวจร่องรอยการเล่นทุกเส้นทางแบบอัตโนมัติ",
            "5 Narrative Metrics: Total Paths, Stroke Points, Ending Reachability, Dead-Ends/Lost Plot, Variable Evolution",
            "Interactive Visual Feedback: แสดงแผนผังต้นไม้พร้อมระบุจุดผิดพลาดสีแดง"
          ],
          diagram: `Story Graph G=(V,E) ──▶ DFS Traces ──▶ 5 Metrics (N_paths, S_points, P_endings, D_ends, V_evol)`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section III & IV"
        },
        slideImage: 'assets/slides/slide-3.png',
        scriptHtml: `
          <p><strong>[1:15 - 2:05 · แบบจำลองกราฟและ 5 มิติวัดผลคุณภาพ]</strong></p>
          <p>
            Story Validator แก้ปัญหานี้ด้วยการแปลงโครงเรื่องเป็น <span class="highlight-key">Directed Graph G = (V, E)</span> และใช้อัลกอริทึม DFS ท่องรวบรวม Playthrough Traces ทุกเส้นทางอัตโนมัติ <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            พร้อมทั้งวัดผลคุณภาพโครงเรื่อง 5 ด้าน ได้แก่: จำนวนเส้นทางทั้งหมด, <span class="highlight-key">Stroke Points</span> ที่รับประกันว่าผู้เล่นจะได้รับสารสำคัญครบถ้วน, สัดส่วนความน่าจะเป็นของฉากจบ, การดักจับทางตัน Dead-Ends และ Lost Plot, ตลอดจนการพล็อต Dotted Chart ติดตามตัวแปรตลอดการเล่นครับ
          </p>
        `
      },
      {
        id: 3,
        start: 125,
        end: 175,
        title: "4. กรณีศึกษา & Persona",
        timeLabel: "2:05 - 2:55",
        slide: {
          num: "Slide 4 / 7",
          title: "กรณีศึกษา The Murder Case และการจำลองพฤติกรรมผู้เล่น",
          bullets: [
            "The Murder Case (TMC): 14 Passages · 20 Paths · 3 ฉากจบ · 3 ตัวแปรอารมณ์",
            "ฝังบั๊กจงใจ 5 จุด: Dead-Ends, Loops, Unreachable Endings",
            "Player Persona Simulation: ใช้อัลกอริทึม Heuristic Greedy Search จำลอง Aggressive vs Paranoid",
            "ประโยชน์เชิงธุรกิจ: พยากรณ์ล่วงหน้าว่าผู้เล่นแต่ละกลุ่มจะหลุดเข้าไปเจอบั๊กใด ก่อนเปิดทดสอบจริง"
          ],
          diagram: `TMC Testbed (5 Bugs) ──▶ Persona Simulation (Heuristic Greedy) ──▶ พยากรณ์บั๊กตามพฤติกรรมผู้เล่น`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section V"
        },
        slideImage: 'assets/slides/slide-4.png',
        scriptHtml: `
          <p><strong>[2:05 - 2:55 · การจำลองพฤติกรรมผู้เล่นด้วย Persona]</strong></p>
          <p>
            ในเชิงการทดสอบ ผู้วิจัยได้สร้างเรื่อง The Murder Case และฝังบั๊กไว้ 5 จุด เพื่อทดสอบทั้งทางตัน ลูปวนซ้ำ และฉากจบที่เข้าไม่ถึง <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            จุดเด่นคือการนำ <span class="highlight-key">Player Persona Simulation</span> โดยใช้ Heuristic Greedy Search ถ่วงน้ำหนักตัวแปรอารมณ์ จำลองผู้เล่นสายบุก Aggressive และสายระแวง Paranoid ช่วยให้ทีมพัฒนาสามารถพยากรณ์ล่วงหน้าได้ว่าผู้เล่นแต่ละสไตล์จะไปเจอบั๊กจุดไหน ช่วยลดความเสี่ยงก่อนเปิดตัวเกมจริงครับ
          </p>
        `
      },
      {
        id: 4,
        start: 175,
        end: 225,
        title: "5. ตัวเลขผลสัมฤทธิ์",
        timeLabel: "2:55 - 3:45",
        slide: {
          num: "Slide 5 / 7",
          title: "ผลการทดสอบกับผู้ใช้และการตรวจจับข้อผิดพลาด",
          bullets: [
            "เวลาตรวจพบบั๊กเฉลี่ย: เพียง 52.3 วินาที (SD 22.66 วินาที)",
            "เวลาคิดวิธีแก้ไข: เฉลี่ย 146.2 วินาที (SD 31.84 วินาที)",
            "ความพึงพอใจการใช้งาน SUS: 92.4 / 100 (เกรด A+ ระดับ Truly Superior)",
            "ข้อค้นพบ: 15% ของผู้ใช้ที่ตรวจด้วยตาเปล่าหาบั๊กไม่พบ พิสูจน์ความจำเป็นของเครื่องมืออัตโนมัติ"
          ],
          diagram: `Bug Detection: 52.3 s | Fix Formulation: 146.2 s | SUS Usability: 92.4 / 100 (Truly Superior)`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section V"
        },
        slideImage: 'assets/slides/slide-5.png',
        scriptHtml: `
          <p><strong>[2:55 - 3:45 · ผลลัพธ์เชิงตัวเลขและการยอมรับของผู้ใช้]</strong></p>
          <p>
            ผลลัพธ์จากการทดลองกับผู้ใช้จริง 20 คนยืนยันว่า <span class="highlight-key">เวลาในการค้นพบบั๊กทั้ง 5 จุดใช้เวลาเฉลี่ยเพียง 52.3 วินาที</span> และใช้เวลาคิดวิธีแก้เฉลี่ย 146.2 วินาที พร้อมได้คะแนนความพึงพอใจด้านการใช้งาน <span class="highlight-key">SUS สูงถึง 92.4 คะแนน</span> ซึ่งอยู่ในเกรด Truly Superior ครับ <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            ที่สำคัญคือ ผู้ใช้ 15% ที่พยายามตรวจด้วยตาเปล่าไม่สามารถหาบั๊กพบเลย ยืนยันว่าการใช้เครื่องมืออัตโนมัตินั้นมีประสิทธิภาพเหนือกว่าการตรวจด้วยมนุษย์อย่างชัดเจนครับ
          </p>
        `
      },
      {
        id: 5,
        start: 225,
        end: 265,
        title: "6. การนำไปใช้จริง",
        timeLabel: "3:45 - 4:25",
        slide: {
          num: "Slide 6 / 7",
          title: "การมีส่วนร่วมทางวิชาการและการประยุกต์ใช้งาน",
          bullets: [
            "แมปเข้ากับ Block & Choice Engine ของระบบ Interactive Narrative โดยตรง",
            "เสริมพลังให้ระบบ Moderation & Quality Assurance ตรวจสอบเนื้อหาก่อนการอนุมัติเผยแพร่",
            "สร้างความเชื่อมั่นให้นักอ่านและผู้เล่นว่าทุกผลงานบนแพลตฟอร์มสามารถเล่นจบได้จริง 100%",
            "ลดงานของทีมงานและนักพัฒนาในการตรวจทานเกมที่มีการแตกกิ่งซับซ้อน"
          ],
          diagram: `Creator Uploads Story ──▶ Verification Engine (Story Validator) ──▶ Approved & Published 100% Valid`,
          citation: "Veloso & Prada 2021 · Interactive Narrative Engine Integration"
        },
        slideImage: 'assets/slides/slide-6.png',
        scriptHtml: `
          <p><strong>[3:45 - 4:25 · การประยุกต์ใช้ใน Game Engine และ Workflow]</strong></p>
          <p>
            ในมุมมองของการนำไปใช้งานจริง สถาปัตยกรรมนี้สามารถนำไปต่อยอดได้ 3 มิติ: นำโมเดล Node & Edge ไปเชื่อมต่อกับเอนจินเกมอย่าง Unity และ Unreal Engine, ใช้แนวคิด Guarded Edges ตรวจประเมินตัวแปรใน Game Runtime State, และผสานเข้ากับ <span class="highlight-key">CI/CD Automated QA Pipeline</span> เพื่อสแกนหา Dead-Ends และ Lost Plot ก่อนส่งมอบเกมสู่ตลาดครับ <span class="breath-mark">[สูดหายใจ]</span>
          </p>
        `
      },
      {
        id: 6,
        start: 265,
        end: 300,
        title: "7. สรุปคุณค่าวิชาการ",
        timeLabel: "4:25 - 5:00",
        slide: {
          num: "Slide 7 / 7",
          title: "ข้อจำกัด และบทสรุป",
          bullets: [
            "บทพิสูจน์การนำ Graph Theory และ Verification มาแก้ปัญหา Creative Domain",
            "เป็นสาระแกนกลางสำหรับเขียนบทที่ 1 และ 2 ของเล่มโครงงานวิศวกรรมคอมพิวเตอร์",
            "แผนพัฒนาต่อยอด: การปรับแต่ง DFS เพื่อแก้ปัญหา State Explosion ในนิยายขนาดยาว",
            "พร้อมสำหรับการตรวจรับและนำไปประยุกต์ใช้จริง"
          ],
          diagram: `Creative Fiction + Formal Verification ──▶ Production-Ready Interactive Storytelling`,
          citation: "Veloso & Prada, IEEE CoG 2021, Section VI"
        },
        slideImage: 'assets/slides/slide-7.png',
        scriptHtml: `
          <p><strong>[4:25 - 5:00 · ข้อจำกัดและบทสรุป]</strong></p>
          <p>
            ในด้านข้อจำกัด เปเปอร์นี้ยังขาดกลุ่มควบคุมเปรียบเทียบ และการใช้ DFS มีความเสี่ยงต่อ State Explosion ในกราฟขนาดใหญ่ แต่ Story Validator ได้พิสูจน์แล้วว่าการนำทฤษฎีกราฟมาประยุกต์ใช้ สามารถเปลี่ยนงานศิลปะการเล่าเรื่องให้กลายเป็นโจทย์วิศวกรรมที่วัดผลและประกันคุณภาพได้จริง <span class="breath-mark">[สูดหายใจ]</span>
          </p>
          <p>
            และในอนาคต การต่อยอดร่วมกับ AI/LLM ในการแนะนำวิธีแก้บั๊กอัตโนมัติ จะเป็นก้าวสำคัญของวงการเกมครับ กระผมขอจบการนำเสนอเท่านี้ ขอบพระคุณครับ
          </p>
        `
      }
    ]
  }"""

clean_code = code[:start_idx] + new_story_validator_block + "\n};\n\n" + code[idx_class:]

with open('assets/js/presentation.js', 'w', encoding='utf-8') as f:
    f.write(clean_code)

print("Successfully written clean presentation.js!")
