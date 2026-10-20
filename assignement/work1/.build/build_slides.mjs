import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const workspaceDir = "/Users/3rapat/student/internship/CODEFIN/project/cwms/vahalla-wealth/private-docs/other-project/uni-work";
const taskDir = path.join(workspaceDir, "senior-subject", "sensor-network", "assignement", "work1");
const SKILL_DIR = "/Users/3rapat/.codex/plugins/cache/openai-primary-runtime/presentations/26.905.11957/skills/presentations";
const TMP_DIR = path.join(taskDir, ".build");
const FINAL_PPTX = path.join(TMP_DIR, "final", "slides-final-v3.pptx");
const RUNTIME_PYTHON = "/Users/3rapat/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3";

const { applyPresentationChartFont, finalizePresentation, makeNativeBulletParagraphs } = await import(
  pathToFileURL(path.join(SKILL_DIR, "container_tools/artifact_tool_utils.mjs")).href,
);

const W = 1280;
const H = 720;
const FONT = "Tahoma";
const NAVY = "#102A43";
const BLUE = "#1E5A7A";
const TEAL = "#0F9D8B";
const ORANGE = "#F59E0B";
const RED = "#D94C4C";
const PAPER = "#F7F4EE";
const INK = "#14212B";
const MUTED = "#52616B";
const WHITE = "#FFFFFF";
const RULE = "#CCD6DD";

const presentation = Presentation.create({ slideSize: { width: W, height: H } });

function addText(slide, text, x, y, w, h, options = {}) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    position: { left: x, top: y, width: w, height: h },
    fill: "none",
    line: { fill: "none", width: 0 },
  });
  shape.text = text;
  shape.text.style = {
    typeface: FONT,
    fontSize: options.size ?? 24,
    bold: options.bold ?? false,
    color: options.color ?? INK,
    alignment: options.align ?? "left",
    verticalAlignment: options.valign ?? "top",
    autoFit: "shrinkText",
  };
  return shape;
}

function addBullets(slide, items, x, y, w, h, options = {}) {
  const shape = slide.shapes.add({
    geometry: "textbox",
    position: { left: x, top: y, width: w, height: h },
    fill: "none",
    line: { fill: "none", width: 0 },
  });
  shape.text = makeNativeBulletParagraphs(items, {
    marginLeftPoints: options.marginLeft ?? 20,
    hangingPoints: options.hanging ?? 10,
    spaceAfterPoints: options.spaceAfter ?? 8,
  });
  shape.text.style = {
    typeface: FONT,
    fontSize: options.size ?? 24,
    color: options.color ?? INK,
    autoFit: "shrinkText",
  };
  return shape;
}

function addTitle(slide, title, number) {
  addText(slide, title, 72, 42, 1090, 64, { size: 36, bold: true, color: NAVY });
  addText(slide, String(number).padStart(2, "0"), 1180, 48, 52, 36, { size: 18, bold: true, color: TEAL, align: "right" });
}

function addFooter(slide, source = "Yasaei et al., ICCAD 2020 · doi:10.1145/3400302.3415672") {
  addText(slide, source, 72, 681, 1136, 22, { size: 12, color: MUTED });
}

function setNotes(slide, body) {
  slide.speakerNotes.textFrame.setText(`${body}\n\nSource: R. Yasaei, F. Hernandez, and M. A. Al Faruque, “IoT-CAD,” ICCAD 2020, doi:10.1145/3400302.3415672. IEEE Xplore document 9256703.`);
}

function addMetric(slide, value, label, x, y, color = NAVY) {
  addText(slide, value, x, y, 190, 70, { size: 42, bold: true, color, align: "center" });
  addText(slide, label, x, y + 66, 190, 46, { size: 18, color: MUTED, align: "center" });
}

// Slide 1
{
  const slide = presentation.slides.add();
  slide.background.fill = NAVY;
  addText(slide, "IoT-CAD", 78, 128, 1120, 100, { size: 62, bold: true, color: WHITE });
  addText(slide, "Context-Aware Adaptive Anomaly Detection\nin IoT Systems Through Sensor Association", 82, 230, 1010, 126, { size: 34, color: "#DCEAF2" });
  addText(slide, "เมื่อเซนเซอร์รายงานค่าผิดปกติ เกิดเหตุจริง หรือเซนเซอร์เสีย", 82, 405, 1050, 62, { size: 27, bold: true, color: "#62D6C7" });
  addText(slide, "[กรอกชื่อ นามสกุล]   [กรอกรหัสนิสิต]\n305432 เครือข่ายเซนเซอร์", 82, 555, 800, 72, { size: 20, color: WHITE });
  addText(slide, "IEEE/ACM ICCAD 2020", 940, 585, 250, 30, { size: 17, color: "#B7C7D2", align: "right" });
  setNotes(slide, "เวลา 0:00–0:35 เปิดด้วยคำถามว่า หากเซนเซอร์อุณหภูมิรายงานค่าสูง เราจะรู้ได้อย่างไรว่าเกิดไฟจริงหรือเซนเซอร์เสีย บทความนี้เสนอให้ใช้เซนเซอร์อื่นเป็นพยานบริบทแทนการเชื่อเซนเซอร์ตัวเดียว");
}

// Slide 2
{
  const slide = presentation.slides.add();
  slide.background.fill = PAPER;
  addTitle(slide, "Environmental Anomaly และ Sensing Device Anomaly", 2);
  const bytes = new Uint8Array(await fs.readFile(path.join(TMP_DIR, "slide-assets", "figure2_ea_sda.png")));
  slide.images.add({ blob: bytes, contentType: "image/png", alt: "Figure 2: wastewater plant examples of EA and SDA", fit: "contain", position: { left: 78, top: 126, width: 1124, height: 360 } });
  addText(slide, "EA", 160, 512, 120, 54, { size: 34, bold: true, color: ORANGE, align: "center" });
  addText(slide, "หลายเซนเซอร์เปลี่ยนสอดคล้องกัน\nเหตุจากสภาพแวดล้อม", 80, 570, 300, 78, { size: 21, color: INK, align: "center" });
  addText(slide, "คำถามของงาน", 498, 506, 280, 42, { size: 23, bold: true, color: NAVY, align: "center" });
  addText(slide, "ค่าผิดปกติมาจากโลกจริง\nหรือมาจากอุปกรณ์", 475, 554, 330, 82, { size: 24, bold: true, color: NAVY, align: "center" });
  addText(slide, "SDA", 990, 512, 120, 54, { size: 34, bold: true, color: RED, align: "center" });
  addText(slide, "บางเซนเซอร์ขัดกับกลุ่ม\nเซนเซอร์เสียหรือถูกโจมตี", 900, 570, 300, 78, { size: 21, color: INK, align: "center" });
  addFooter(slide, "Figure 2 จาก Yasaei et al., ICCAD 2020");
  setNotes(slide, "เวลา 0:35–1:20 อธิบาย EA ว่าเป็นเหตุจริงที่ทำให้เซนเซอร์สัมพันธ์กันหลายตัวเปลี่ยนพร้อมกัน ส่วน SDA เกิดที่ตัวอุปกรณ์หรือข้อมูลของอุปกรณ์ จึงมักขัดกับรูปแบบของสมาชิกอื่นในกลุ่ม ภาพนี้เป็น motivational example ของโรงบำบัดน้ำเสียในบทความ");
}

// Slide 3
{
  const slide = presentation.slides.add();
  slide.background.fill = WHITE;
  addTitle(slide, "วิธีของ IoT-CAD", 3);
  const steps = [
    ["1", "Binary fingerprint", "เก็บรูปแบบการเปลี่ยน\nไม่ยึดหน่วยวัด", BLUE],
    ["2", "Sensor association", "Hamming distance\nและ clustering", TEAL],
    ["3", "Predictive model", "LSTM และ Gaussian\nตรวจ reconstruction error", ORANGE],
    ["4", "Consensus", "แยก EA กับ SDA\nแล้วปรับแบบจำลอง", RED],
  ];
  const boxes = [];
  for (let i = 0; i < steps.length; i++) {
    const [n, label, detail, color] = steps[i];
    const x = 70 + i * 300;
    const box = slide.shapes.add({ geometry: "roundRect", position: { left: x, top: 180, width: 250, height: 280 }, fill: "#F8FAFB", line: { style: "solid", fill: color, width: 3 }, borderRadius: 18 });
    boxes.push(box);
    const circle = slide.shapes.add({ geometry: "ellipse", position: { left: x + 88, top: 142, width: 74, height: 74 }, fill: color, line: { fill: color, width: 0 } });
    addText(slide, n, x + 88, 148, 74, 56, { size: 34, bold: true, color: WHITE, align: "center", valign: "middle" });
    addText(slide, label, x + 22, 250, 206, 60, { size: 23, bold: true, color: NAVY, align: "center" });
    addText(slide, detail, x + 22, 326, 206, 96, { size: 20, color: MUTED, align: "center" });
  }
  for (let i = 0; i < boxes.length - 1; i++) {
    slide.shapes.connect(boxes[i], boxes[i + 1], { kind: "straight", fromSide: "right", toSide: "left", line: { style: "solid", fill: "#8A9BA8", width: 3 }, tail: { type: "triangle", width: "sm", length: "sm" } });
  }
  addText(slide, "ข้อมูลปกติ", 80, 520, 180, 34, { size: 20, bold: true, color: TEAL });
  addText(slide, "ฝึกแบบ unsupervised แต่ใช้ validation anomalies เพื่อปรับ threshold α", 240, 520, 920, 40, { size: 21, color: INK });
  addText(slide, "ข้อมูลใหม่", 80, 578, 180, 34, { size: 20, bold: true, color: ORANGE });
  addText(slide, "ทำนายค่าปกติ ตรวจ anomaly ลงมติใน cluster และ retrain เมื่อระบบเปลี่ยน", 240, 578, 920, 48, { size: 21, color: INK });
  addFooter(slide);
  setNotes(slide, "เวลา 1:20–2:45 อธิบายสี่ขั้นตอน ขั้นแรกแปลงค่าต่างหน่วยเป็นลำดับบิตของการเปลี่ยน ขั้นสองจัดกลุ่มเซนเซอร์ที่มีบริบทร่วม ขั้นสาม LSTM ทำนายพฤติกรรมปกติและ Gaussian ประเมิน error ขั้นสี่ใช้เสียงส่วนใหญ่ในกลุ่มแยก EA กับ SDA พร้อม retrain เมื่อข้อมูลหรือจำนวนเซนเซอร์เปลี่ยน");
}

// Slide 4
{
  const slide = presentation.slides.add();
  slide.background.fill = PAPER;
  addTitle(slide, "Testbed และขอบเขตการทดลอง", 4);
  const bytes = new Uint8Array(await fs.readFile(path.join(TMP_DIR, "slide-assets", "figure8_testbed.png")));
  slide.images.add({ blob: bytes, contentType: "image/png", alt: "Figure 8: IoT-CAD experimental testbed", fit: "contain", position: { left: 70, top: 132, width: 500, height: 470 } });
  addMetric(slide, "62", "เซนเซอร์", 620, 142, BLUE);
  addMetric(slide, "13", "ตัวแปรทางกายภาพ", 835, 142, TEAL);
  addMetric(slide, "8 วัน", "ข้อมูลปกติ", 1050, 142, ORANGE);
  addText(slide, "ประมาณ 2.3 ล้านค่าการวัด", 650, 300, 540, 56, { size: 32, bold: true, color: NAVY, align: "center" });
  addBullets(slide, [
    "IEEE 802.15.4 และ Raspberry Pi gateway",
    "Intel Core i5 และ RAM 8 GB เป็น fog node",
    "ประเมินด้วย synthetic anomalies",
  ], 650, 390, 540, 190, { size: 22, spaceAfter: 11 });
  addFooter(slide, "Figure 8 และ Section 4.2 จาก Yasaei et al., ICCAD 2020");
  setNotes(slide, "เวลา 2:45–3:35 งานนี้มี testbed จริง 62 เซนเซอร์ 13 ชนิด สื่อสารผ่าน IEEE 802.15.4 และ Raspberry Pi แล้วประมวลผลบนแล็ปท็อปที่ทำหน้าที่ fog node ผู้เขียนเก็บข้อมูลปกติ 8 วันประมาณ 2.3 ล้านค่า แต่ความผิดปกติที่ใช้ประเมินเป็นข้อมูลสังเคราะห์ ซึ่งต้องจำไว้ตอนวิจารณ์");
}

// Slide 5
{
  const slide = presentation.slides.add();
  slide.background.fill = WHITE;
  addTitle(slide, "ผลเปรียบเทียบ Precision และ Recall", 5);
  const chart = slide.charts.add("bar", {
    position: { left: 70, top: 145, width: 760, height: 450 },
    categories: ["IoT-CAD", "LSTM", "ConvLSTM", "One-Class SVM"],
    series: [
      { name: "Precision", values: [92, 64, 51, 89], fill: BLUE },
      { name: "Recall", values: [56, 44, 95, 25], fill: ORANGE },
    ],
    barOptions: { direction: "bar", grouping: "clustered", gapWidth: 55 },
    hasLegend: true,
    legend: { position: "bottom", overlay: false, textStyle: { typeface: FONT, fontSize: 16, fill: INK } },
    xAxis: { min: 0, max: 100, majorUnit: 20, numberFormatCode: "0\"%\"", majorGridlines: { style: "solid", fill: "#D8E0E5", width: 1 }, textStyle: { typeface: FONT, fontSize: 14, fill: MUTED } },
    yAxis: { textStyle: { typeface: FONT, fontSize: 16, fill: INK }, line: { style: "solid", fill: RULE, width: 1 } },
    dataLabels: { showValue: true, position: "outEnd", textStyle: { typeface: FONT, fontSize: 14, fill: INK, bold: true } },
    chartFill: "#FFFFFF",
    chartLine: { fill: "none", width: 0 },
    plotAreaFill: "#FFFFFF",
  });
  applyPresentationChartFont(chart, { fontFamily: FONT });
  addText(slide, "92%", 920, 160, 250, 72, { size: 52, bold: true, color: BLUE, align: "center" });
  addText(slide, "Precision", 920, 226, 250, 38, { size: 20, color: MUTED, align: "center" });
  addText(slide, "56%", 920, 315, 250, 72, { size: 52, bold: true, color: ORANGE, align: "center" });
  addText(slide, "Recall", 920, 381, 250, 38, { size: 20, color: MUTED, align: "center" });
  addText(slide, "แจ้งแล้วมักถูก\nแต่ยังพลาด anomaly จริง 44%", 885, 485, 330, 96, { size: 23, bold: true, color: NAVY, align: "center" });
  addFooter(slide, "Table 2 จาก Yasaei et al., ICCAD 2020");
  setNotes(slide, "เวลา 3:35–4:30 IoT-CAD ให้ precision 92 เปอร์เซ็นต์ ซึ่งสูงสุดในชุดเปรียบเทียบ และ F1 เท่ากับ 70 เปอร์เซ็นต์ แต่ recall มีเพียง 56 เปอร์เซ็นต์ อย่าพูดว่าโมเดลตรวจได้ถูกต้อง 92 เปอร์เซ็นต์ทุกกรณี ความหมายที่ถูกคือ เมื่อระบบแจ้งเตือน ส่วนใหญ่แจ้งถูก แต่ยังพลาด anomaly จริง 44 เปอร์เซ็นต์ในชุดประเมิน");
}

// Slide 6
{
  const slide = presentation.slides.add();
  slide.background.fill = PAPER;
  addTitle(slide, "Contribution และความเกี่ยวข้องกับ AI", 6);
  addText(slide, "Contribution ของผู้เขียน", 78, 142, 510, 44, { size: 27, bold: true, color: NAVY });
  addBullets(slide, [
    "จัดกลุ่มเซนเซอร์ต่างชนิดจาก contextual variation",
    "ใช้ consensus แยก EA กับ SDA และระบุต้นทาง",
    "ปรับโมเดลเมื่อสภาพแวดล้อมหรือโหนดเปลี่ยน",
  ], 78, 205, 540, 275, { size: 22, spaceAfter: 12 });
  addText(slide, "เหตุผลที่ยังมี impact", 690, 142, 500, 44, { size: 27, bold: true, color: TEAL });
  addText(slide, "AI ที่รับข้อมูลจากโลกจริงต้องรู้ว่า\nข้อมูลจากเซนเซอร์น่าเชื่อถือหรือไม่", 690, 215, 500, 110, { size: 30, bold: true, color: NAVY });
  addBullets(slide, [
    "Sensor integrity ก่อนการตัดสินใจ",
    "Concept drift และการปรับโมเดล",
    "Edge AI ที่ประมวลผลใกล้หน้างาน",
  ], 690, 365, 470, 185, { size: 22, spaceAfter: 10 });
  addText(slide, "LSTM ไม่ใช่โมเดลใหม่ล่าสุด แต่โจทย์ยังไม่ล้าสมัย", 230, 600, 820, 44, { size: 25, bold: true, color: RED, align: "center" });
  addFooter(slide);
  setNotes(slide, "เวลา 4:30–5:25 Contribution หลักมีสามข้อ ได้แก่ sensor association ที่รองรับหลาย modality, consensus ที่บอกชนิดและต้นทางของ anomaly และ adaptive model ที่รองรับการเปลี่ยนระบบ ในยุค AI คุณค่าอยู่ที่ความน่าเชื่อถือของข้อมูลก่อน AI ตัดสินใจ รวมถึง concept drift และ edge deployment ไม่ได้อยู่ที่การใช้ LSTM ว่าใหม่ที่สุด");
}

// Slide 7
{
  const slide = presentation.slides.add();
  slide.background.fill = NAVY;
  addText(slide, "ข้อจำกัดที่ต้องพูดให้ชัด", 76, 48, 900, 58, { size: 38, bold: true, color: WHITE });
  addText(slide, "07", 1180, 52, 52, 36, { size: 18, bold: true, color: "#62D6C7", align: "right" });
  addBullets(slide, [
    "Recall 56% ยังต่ำสำหรับเหตุที่ false negative มีต้นทุนสูง",
    "ข้อมูล anomaly เป็น synthetic และเก็บข้อมูลปกติ 8 วัน",
    "ต้องมีเซนเซอร์สัมพันธ์กันอย่างน้อย 3 ตัว",
    "Coordinated attack และ model poisoning ยังเป็นความเสี่ยง",
  ], 80, 150, 700, 330, { size: 24, color: WHITE, spaceAfter: 13 });
  addText(slide, "0.532 s", 900, 176, 270, 80, { size: 54, bold: true, color: "#62D6C7", align: "center" });
  addText(slide, "เวลาตรวจหนึ่งรอบ\nเฉพาะ testbed ของบทความ", 890, 260, 290, 76, { size: 20, color: "#DCEAF2", align: "center" });
  addText(slide, "ข้อสรุป", 80, 520, 170, 40, { size: 24, bold: true, color: "#62D6C7" });
  addText(slide, "IoT-CAD ทำให้สัญญาณเตือนมีบริบทมากขึ้น\nแต่หลักฐานยังไม่พอสำหรับระบบ safety-critical", 80, 570, 1060, 82, { size: 31, bold: true, color: WHITE });
  addText(slide, "doi:10.1145/3400302.3415672", 920, 681, 290, 22, { size: 12, color: "#B7C7D2", align: "right" });
  setNotes(slide, "เวลา 5:25–6:10 วิจารณ์สี่ข้อ Recall 56 เปอร์เซ็นต์ ข้อมูล anomaly สังเคราะห์ ระยะเก็บข้อมูลสั้น และข้อจำกัดของ consensus หากผู้โจมตีควบคุมหลายเซนเซอร์ ปิดด้วยข้อสรุปว่า IoT-CAD ช่วยให้ anomaly detector ใช้บริบททางกายภาพ แต่ต้องมีข้อมูลจริงและการทดสอบด้านความปลอดภัยมากกว่านี้ก่อนใช้ในระบบ safety-critical");
}

await fs.mkdir(TMP_DIR, { recursive: true });
const stagingDir = path.join(TMP_DIR, "staging");
await fs.mkdir(stagingDir, { recursive: true });
await fs.mkdir(path.dirname(FINAL_PPTX), { recursive: true });
await fs.mkdir(path.join(TMP_DIR, "receipts"), { recursive: true });
const candidatePath = path.join(stagingDir, "candidate.pptx");
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);

const requirements = {
  explicitTotalSlideCount: 7,
  requiredNativeTableOwnerSlides: [],
  requiredNativeChartOwnerSlides: [5],
  materializeLiteralChartWorkbooks: true,
  nativeChartTargetApplication: "powerpoint",
};

const result = await finalizePresentation({
  ...requirements,
  workspaceDir,
  candidatePath,
  finalPath: FINAL_PPTX,
  pythonExecutable: RUNTIME_PYTHON,
  integrityValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(SKILL_DIR, "container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs: [
    "--expected-slide-size-emu", "12192000,6858000",
    "--validate-bullet-geometry",
    "--validate-heading-fit",
  ],
  requiredNativeTableOwnerSlides: [],
  fontPolicy: { basis: "design", families: [FONT] },
  verifyArtifactToolImport: true,
  receiptPath: path.join(TMP_DIR, "receipts", "slides-final-v3.validation.json"),
});

console.log(JSON.stringify({ finalPath: FINAL_PPTX, result }, null, 2));
