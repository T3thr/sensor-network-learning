# บทเรียนเจาะลึก Zero-to-Hero: ทฤษฎีและการประยุกต์ใช้ Story Validator

เอกสารการเรียนรู้ฉบับสมบูรณ์สำหรับนิสิตวิศวกรรมคอมพิวเตอร์ เพื่อทำความเข้าใจโครงสร้างทางคณิตศาสตร์และวิศวกรรมซอฟต์แวร์ของบทความ **Validating the plot of Interactive Narrative games** (IEEE CoG 2021) และการเชื่อมโยงสู่การพัฒนาเอนจินเกมการเล่าเรื่องเชิงโต้ตอบ (Interactive Fiction / Visual Novel Engine)

---

## บทที่ 1: ทฤษฎีกราฟกับ Interactive Storytelling

### 1.1 โครงสร้างของเรื่องเล่าแบบโต้ตอบ (Interactive Narrative As a Graph)
ในทางวิศวกรรมคอมพิวเตอร์ เรื่องเล่าที่มีการแตกแขนง (Branching Narrative) สามารถนิยามให้อยู่ในรูป **กราฟระบุทิศทาง (Directed Graph $G = (V, E)$)**:
- **เซตของจุดยอด ($V$ - Vertices หรือ Nodes):** คือฉากหรือข้อความแต่ละตอน ใน Twine เรียกว่า **Passage** และในระบบเอนจินเกมทั่วไปเรียกว่า **Scene Block**
- **เซตของเส้นเชื่อม ($E$ - Edges หรือ Links):** คือทางเลือกหรือการตัดสินใจของผู้เล่น (Choices) ที่เชื่อมโยงจากฉากปัจจุบันไปยังฉากถัดไป $(v_i, v_j) \in E$
- **จุดเริ่มต้น ($v_{start}$):** จุดยอดเริ่มต้นที่ผู้เล่นทุกคนเริ่มอ่าน
- **เซตของฉากจบ ($V_{term} \subseteq V$):** จุดยอดปลายทางที่ไม่มีเส้นเชื่อมออกจากโหนดอีก (Out-degree $= 0$) ซึ่งเป็นฉากจบที่ถูกต้องของเรื่อง

### 1.2 ตัวแปรสภาวะและเส้นเชื่อมแบบมีเงื่อนไข (Guarded Transitions)
เรื่องเล่าในเกมไม่ใช่เพียงกราฟสถิต (Static Graph) แต่มี **สภาวะของระบบ (Game State $S$)** กำกับอยู่:
$$S = \{ x_1, x_2, \dots, x_k \}$$
โดยที่ $x_i$ คือตัวแปรทางอารมณ์ ค่าความสัมพันธ์ หรือไอเทมที่ผู้เล่นครอบครอง
เส้นเชื่อมแต่ละเส้น $e = (u, v)$ จะถูกกำกับด้วย:
1. **Guard Condition ($C_e(S) \rightarrow \{True, False\}$):** นิพจน์บูลีนที่ตรวจสอบค่าตัวแปร เช่น $x_{anger} > 5$ ทางเลือกนี้จะปรากฏให้ผู้เล่นเลือกได้ก็ต่อเมื่อเงื่อนไขเป็นจริงเท่านั้น
2. **State Mutation Function ($M_e(S) \rightarrow S'$):** การเปลี่ยนแปลงค่าตัวแปรเมื่อผู้เล่นก้าวผ่านเส้นเชื่อมนี้ เช่น $x_{anger} \leftarrow x_{anger} + 2$

---

## บทที่ 2: ปัญหาความผิดปกติของโครงเรื่อง (Narrative Anomalies)

เมื่อกราฟเรื่องเริ่มมีความยาวและซับซ้อน จะเกิดข้อผิดพลาดทางตรรกะที่ผู้แต่งมองไม่เห็นด้วยตาเปล่า:

### 2.1 Lost Plot (ฉากที่เข้าไม่ถึง / Unreachable Nodes)
นิยาม: โหนด $v \in V$ ใด ๆ ที่ไม่มีทางเดิน (Path) ที่ถูกต้องจาก $v_{start}$ ไปถึง $v$ ได้เลยภายใต้เงื่อนไขตัวแปรที่เป็นไปได้ทั้งหมด:
$$\forall \text{ valid path } P = (v_{start}, \dots, v_n), \quad v \notin P$$
**สาเหตุ:** ผู้แต่งสร้างฉากขึ้นมา แต่ลืมสร้าง Link จากฉากอื่นมาชี้ หรือเงื่อนไข Guard Condition ขัดแย้งกันเองจนไม่มีทางเป็นจริงได้ (เช่น $x > 10 \land x < 5$)

### 2.2 Dead-End (ทางตันที่ผิดพลาด)
นิยาม: โหนด $u \in V$ ที่ไม่มีทางเลือกเชื่อมต่อไปยังโหนดอื่นได้ ($Out\text{-}degree(u) = 0$) แต่โหนด $u$ นั้น**ไม่ได้ถูกนิยามให้เป็นฉากจบจริง** ($u \notin V_{term}$):
$$Out\text{-}degree(u) = 0 \quad \land \quad u \notin V_{term}$$
**ผลกระทบ:** ผู้เล่นจะติดอยู่หน้านั้น ไม่สามารถกดไปต่อและไม่ปรากฏปุ่มจบเกม ส่งผลให้เกมค้างในมุมมองของผู้เล่น

### 2.3 Infinite Loops & Starvation (การวนซ้ำไม่รู้จบ)
เส้นทางที่วนกลับมายังโหนดเดิม $(v_i, \dots, v_j, v_i)$ โดยที่การเปลี่ยนแปลงของตัวแปรในวงรอบไม่สามารถทำให้ Guard Condition เพื่อออกจากลูปเป็นจริงได้ ทำให้ผู้เล่นไม่มีวันไปถึงฉากจบ

---

## บทที่ 3: สถาปัตยกรรม Story Validator และอัลกอริทึม

### 3.1 การสำรวจเส้นทางด้วย Depth-First Search (DFS)
Story Validator นำเข้าไฟล์ JSON ของเรื่อง จากนั้นเริ่มต้นจาก $v_{start}$ และใช้ DFS ท่องไปตามโหนดลูก:
- บันทึก Playthrough Stack ปัจจุบัน
- จำลองการปรับปรุงค่าตัวแปร $S$ ตลอดเส้นทาง
- เมื่อถึงโหนดปลายทาง จะบันทึก Playthrough Trace ทั้งหมดลงในฐานข้อมูลชั่วคราว
- ทำการ Backtrack เพื่อเปลี่ยนไปสำรวจทางเลือกอื่นจนครบทุกเส้นทาง

### 3.2 การจำลอง Persona ด้วย Heuristic Greedy Search
เพื่อทำนายว่าผู้เล่นประเภทต่าง ๆ จะเดินไปในทิศทางใด ผู้เขียนได้นิยามฟังก์ชันการให้คะแนนเส้นเชื่อม (Link Evaluation):
$$Total_l = \sum_{i=1}^n v_{i, l} \cdot w_i$$
โดยที่:
- $v_{i, l}$ คือค่าการเปลี่ยนแปลงของตัวแปรตัวที่ $i$ บนเส้นเชื่อม $l$
- $w_i$ คือค่าน้ำหนักความสนใจของผู้เล่นต่อตัวแปรตัวที่ $i$ ($\sum w_i = 1$)
ในแต่ละทางเลือก ระบบจะเลือกเส้นเชื่อมที่ให้ค่า $Total_l$ สูงสุด:
$$Chosen\_Link = \arg\max_{l} (Total_l)$$
อัลกอริทึมนี้จำลองการตัดสินใจของผู้เล่นแบบสายตาสั้น (Myopic Decision Making) เสมือนมนุษย์จริงที่เลือกสิ่งที่ตอบโจทย์ตนเองในขณะนั้นโดยไม่รู้เนื้อเรื่องล่วงหน้า

---

## บทที่ 4: ตัวชี้วัด 5 มิติ (Narrative Metrics)

| ตัวชี้วัด | สัญลักษณ์ทางคณิตศาสตร์ | ความหมายและการนำไปใช้ |
|---|---|---|
| **Total Paths** | $|Paths|$ | จำนวนเส้นทางที่เป็นไปได้ทั้งหมด ยิ่งตัวเลขสูง ความซับซ้อนของเกมยิ่งมาก |
| **Stroke Points** | $\{ v \in V \mid \forall P \in Paths, v \in P \}$ | จุดตัดบังคับผ่าน ตรวจว่าสารสำคัญของเรื่องถูกบังคับให้ทุกคนเห็นจริงหรือไม่ |
| **Lost Plot** | $\{ v \in V \mid In\text{-}degree(v) = 0 \land v \neq v_{start} \}$ | ฉากที่ถูกสร้างแต่ไม่มีผู้เล่นคนใดสามารถเข้าถึงได้ |
| **Dead-Ends** | $\{ v \in V \setminus V_{term} \mid Out\text{-}degree(v) = 0 \}$ | ทางตันที่ผู้เขียนลืมใส่ปุ่มทางเลือก |
| **Ending Reachability** | $P(E_k) = \frac{|Paths_{E_k}|}{|Paths|}$ | สัดส่วนความน่าจะเป็นในการเข้าถึงฉากจบ $E_k$ ตรวจสอบสมดุลของฉากจบ |

---

## บทที่ 5: การวิเคราะห์ผลการทดลองและการวัดคะแนน SUS

### 5.1 System Usability Scale (SUS)
SUS ประกอบด้วยคำถาม 10 ข้อ คะแนนรวม 0–100 จุดอ้างอิงทางสถิติ (Bangor et al., 2008):
- ต่ำกว่า 50: ไม่สามารถยอมรับได้ (Unacceptable)
- 68: ค่าเฉลี่ยมาตรฐาน (Marginal)
- 80 ขึ้นไป: ระดับยอดเยี่ยม (Excellent)
- 90 ขึ้นไป: ระดับเหนือกว่าอย่างแท้จริง (Truly Superior)

ในบทความ:
- **User Study 1:** SUS $= 83.5$ (SD 9.45) พบปัญหาผู้ใช้งงเมนูที่มีตัวเลือกมากเกินไป
- **การปรับปรุง:** เพิ่มปุ่ม Toggle Tooltips, ปุ่มพิมพ์รายงาน PDF, และการพล็อตตัวแปรพร้อมกัน
- **User Study 2:** SUS พุ่งขึ้นเป็น **92.4** (SD 4.76) และผู้ใช้ตรวจพบบั๊ก 5 จุดได้ในเวลาเฉลี่ย 52.3 วินาที

---

## บทที่ 6: พิมพ์เขียวการเชื่อมโยงสู่ซอฟต์แวร์เอนจินเกมจริง

### 6.1 Data Schema Mapping
ในเอนจินเกมเล่าเรื่องเชิงโต้ตอบ ข้อมูลเนื้อเรื่องถูกจัดเก็บในโครงสร้าง JSON:
```typescript
// Game Block Schema เทียบเท่า Passage ใน Story Validator
interface GameStoryBlock {
  id: string;              // Passage ID
  name: string;            // Passage Name / Title
  content: string;         // Story Text
  choices: GameStoryChoice[];  // Links
}

// Choice Schema เทียบเท่า Link พร้อม Guarded Condition
interface GameStoryChoice {
  text: string;
  targetBlockId: string;   // Link target
  condition?: {            // Guard Condition
    variable: string;
    operator: '>' | '<' | '=' | '!=';
    value: number;
  };
  actions?: {              // State Mutation
    variable: string;
    delta: number;
  }[];
}
```

### 6.2 จุดที่จะนำไปใช้จริงใน Moderation & CI/CD Pipeline
ในระบบบริหารจัดการเนื้อหา (CMS / Moderation Service):
```typescript
// ฟังก์ชันพื้นฐานเดิม: ตรวจสอบเพียงความครบถ้วนเบื้องต้น
export async function validateNovelContent(content: NovelDraftContent) {
  // ตรวจแค่ว่ามีตอน (episodes) และมีฉากพื้นหลัง
}

// เพิ่มฟังก์ชัน Narrative Integrity Check จาก Story Validator:
export function validateStoryPlotIntegrity(blocks: GameStoryBlock[]) {
  const visited = new Set<string>();
  const deadEnds: string[] = [];
  
  // รัน DFS ตรวจสอบ Unreachable Blocks และ Dead-Ends
  // แจ้งเตือนนักเขียนทันทีก่อนกด Publish เผยแพร่สู่นักอ่าน!
}
```

บทความนี้นอกจากจะให้คะแนนเต็มในเกณฑ์การวิเคราะห์แล้ว ยังทำหน้าที่เป็น Blueprint ทางวิศวกรรมจริงที่นำมาต่อยอดลงในผลิตภัณฑ์โครงงานจบได้ทันที
