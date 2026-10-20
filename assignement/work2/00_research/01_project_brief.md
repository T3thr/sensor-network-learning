# สรุป DivWy จาก repository จริง
สำรวจวันที่ 21 กันยายน 2026; repository: /Users/3rapat/student/universty/NU/project/senior/webapp/Divwy/vertex-divwy-webapp
HEAD: `9ed7d7a8d09da178e973c138f3c132719dab63ad` แต่มี staged/unstaged changes เดิมจำนวนมาก การอ้างบรรทัดนี้อิง working tree ที่อ่าน ไม่ใช่เฉพาะ commit ดังกล่าว
วิธี: อ่าน README/package.json, UI editor/reader, services/schema, runtime และสกัดข้อความจากเล่ม .doc ด้วย textutil ไม่รัน build/tests หรือเข้าถึงระบบจริง

## ปัญหาและผู้ใช้
DivWy เป็นแพลตฟอร์มสร้างและอ่านนิยายภาพเชิงโต้ตอบ นักเขียนจัดฉาก บทสนทนา สื่อ ตัวเลือก และตัวแปรของเรื่อง; ผู้อ่านเลือกเส้นทางและอ่านต่อจากสถานะเดิม; ผู้ดูแลจัดการเนื้อหาและทรัพยากร เป้าหมายในเล่มคือเพิ่มการมีส่วนร่วมและรองรับหลายตอนจบ ไม่ใช่ระบบ IoT
หลักฐาน: [README.md:1](/Users/3rapat/student/universty/NU/project/senior/webapp/Divwy/vertex-divwy-webapp/README.md:1) และ [ข้อความเล่มที่สกัด](evidence/thesis-final-extracted.txt) หัวข้อ 1.1–1.3 และ 2.1.1
คำกล่าวในเล่มว่าระบบรวดเร็ว/ราบรื่นเป็นข้อความของเล่ม ยังไม่ถือเป็นผล benchmark ที่ยืนยันแล้ว

## ฟีเจอร์และสถานะหลักฐาน
| ส่วน | สิ่งที่พบจริง | หลักฐาน |
|---|---|---|
| Writer editor | React ครอบ iframe Tuesday; บันทึกและสื่อสารด้วย postMessage; แยกสถานะ saving/error | [src/app/(editor)/(writer)/novel-editor/_components/EditorClient.tsx:150](/Users/3rapat/student/universty/NU/project/senior/webapp/Divwy/vertex-divwy-webapp/src/app/(editor)/(writer)/novel-editor/_components/EditorClient.tsx:150); iframe ที่บรรทัด 1230 |
| กราฟเรื่อง | Tuesday สร้าง block และเส้น SVG; ยังไม่ใช่หลักฐานว่าใช้ xyflow | [public/tuesday/tuesday.js:511](/Users/3rapat/student/universty/NU/project/senior/webapp/Divwy/vertex-divwy-webapp/public/tuesday/tuesday.js:511) creation_block; [public/tuesday/tuesday.js:809](/Users/3rapat/student/universty/NU/project/senior/webapp/Divwy/vertex-divwy-webapp/public/tuesday/tuesday.js:809) creaton_line |
| Branching/เงื่อนไข | runtime อ่าน random_choice, legacy_choice, เปรียบเทียบตัวแปรแล้ว go_to; สร้างตัวเลือกผู้เล่น | [public/tuesday/player_runtime.js:391](/Users/3rapat/student/universty/NU/project/senior/webapp/Divwy/vertex-divwy-webapp/public/tuesday/player_runtime.js:391) และบรรทัด 675 |
| Reader runtime | iframe, ส่งข้อมูลเรื่อง/คำสั่งผ่าน postMessage และบันทึก progress | [src/app/(main)/(reader)/novels/[slug]/read/[episodeId]/_components/ReaderClient.tsx:197](/Users/3rapat/student/universty/NU/project/senior/webapp/Divwy/vertex-divwy-webapp/src/app/(main)/(reader)/novels/[slug]/read/[episodeId]/_components/ReaderClient.tsx:197) และบรรทัด 334, 832 |
| Progress/state | มี server actions trackSceneProgress, recordChoiceMade, saveStoryVariables | [src/app/actions/reading-progress.ts:25](/Users/3rapat/student/universty/NU/project/senior/webapp/Divwy/vertex-divwy-webapp/src/app/actions/reading-progress.ts:25), บรรทัด 124, 231 |
| Content model | novels, episodes, draft/editor state, scenes, userNovelStates, userReadingProgress และ choicesMadeJson | [src/db/schema.ts:658](/Users/3rapat/student/universty/NU/project/senior/webapp/Divwy/vertex-divwy-webapp/src/db/schema.ts:658), บรรทัด 725, 753, 795, 966, 995 |
| Publish validation | ตรวจว่ามีตอนแรก draft blocks และฉาก/ข้อความ; ไม่พบ exhaustive path validation ในฟังก์ชันนี้ | [src/services/novel-moderation.service.ts:88](/Users/3rapat/student/universty/NU/project/senior/webapp/Divwy/vertex-divwy-webapp/src/services/novel-moderation.service.ts:88) validateNovelContent |
| Assets | MediaService คัดหมวด/สิทธิ์และใช้ provider; R2 signed upload | [src/services/media.service.ts:45](/Users/3rapat/student/universty/NU/project/senior/webapp/Divwy/vertex-divwy-webapp/src/services/media.service.ts:45); [src/lib/storage/cloudflare-r2.provider.ts:92](/Users/3rapat/student/universty/NU/project/senior/webapp/Divwy/vertex-divwy-webapp/src/lib/storage/cloudflare-r2.provider.ts:92) |
| Image optimization | compressImage ใช้ Compressor; กรณีผิดพลาดคืนไฟล์เดิม | [src/app/(editor)/(writer)/novel-editor/_components/EditorClient.tsx:80](/Users/3rapat/student/universty/NU/project/senior/webapp/Divwy/vertex-divwy-webapp/src/app/(editor)/(writer)/novel-editor/_components/EditorClient.tsx:80) |
| Preload | โหลด UI/ฉากแรก และ prefetch ฉากลำดับ scene+1; ไม่ใช่ predictor ครบทุก branch | [public/tuesday/player_runtime.js:39](/Users/3rapat/student/universty/NU/project/senior/webapp/Divwy/vertex-divwy-webapp/public/tuesday/player_runtime.js:39) และบรรทัด 77 |
| Streaming | private media proxy ส่งต่อ Range และ upstream body; มี session/ownership check | [src/app/api/media/[mediaId]/route.ts:29](/Users/3rapat/student/universty/NU/project/senior/webapp/Divwy/vertex-divwy-webapp/src/app/api/media/[mediaId]/route.ts:29) |
| Watermark | มี embedLSB, embedWatermark, verifyWatermark; output PNG เพื่อรักษา LSB; official-media เรียกใช้ | [src/services/watermark.service.ts:158](/Users/3rapat/student/universty/NU/project/senior/webapp/Divwy/vertex-divwy-webapp/src/services/watermark.service.ts:158), บรรทัด 225, 258, 294; [src/app/api/official-media/[mediaId]/route.ts:111](/Users/3rapat/student/universty/NU/project/senior/webapp/Divwy/vertex-divwy-webapp/src/app/api/official-media/[mediaId]/route.ts:111) |
| Cache | cachedFetch และ invalidateTags ใช้จัดการ Redis cache | [src/lib/redis-cache.ts:101](/Users/3rapat/student/universty/NU/project/senior/webapp/Divwy/vertex-divwy-webapp/src/lib/redis-cache.ts:101), บรรทัด 185 |
| Mock ที่ระบุได้ | หน้าแรกมี MOCK_FALLBACK_SLIDES; ไม่ใช้รายการนี้เป็นหลักฐานว่ามีนิยายจริง | [src/app/(main)/page.tsx:34](/Users/3rapat/student/universty/NU/project/senior/webapp/Divwy/vertex-divwy-webapp/src/app/(main)/page.tsx:34) |

“มี implementation” หมายถึงพบโค้ดและจุดเชื่อมที่กล่าวไว้ ไม่เท่ากับยืนยันว่าทำงานถูกทุกกรณีใน production

## สถาปัตยกรรม
Browser → Next.js App Router (React UI, Server Actions/API) → services → Drizzle → PostgreSQL/Neon
Editor/Reader React ↔ iframe Tuesday.js ผ่าน postMessage; JSON เรื่องประกอบ blocks/scenes/dialogs/choices/variables
สื่อ → R2 หรือ Vercel Blob; Redis เป็นชั้น cache; Auth.js ควบคุม session; มีโค้ดระบบ coins/episode unlock และ Stripe ใน repository แต่รอบนี้ไม่ได้ตรวจธุรกรรมครบวงจร

| เทคโนโลยีที่ผู้ใช้ระบุ | ข้อสรุปจากหลักฐาน |
|---|---|
| Next.js 16 / React 19 | package.json ระบุ ^16.0.7 / 19.2.0 ที่บรรทัด 71, 76; เป็น declared versions ไม่ใช่การตรวจ deployed version |
| Drizzle/PostgreSQL | src/db/index.ts:2–30 ใช้ Neon Pool, drizzle และ schema PostgreSQL |
| Upstash | dependency package.json:54 และ redis-cache implementation |
| S3/R2 | R2 ใช้ S3-compatible SDK; standalone AWS S3 provider ยัง throw not implemented ที่ storage/index.ts:12 |
| xyflow | dependency package.json:58; ค้น src/public ไม่พบ import @xyflow หรือการใช้ ReactFlow จึงไม่อ้างว่า editor หลักใช้จริง |
| Inngest | dependency package.json:69; ไม่พบ createFunction/การเรียก Inngest ใน src/public ที่สำรวจ จึงยังไม่ยืนยัน background jobs |
| State management | Editor ใช้ React state/ref; saveGenRef ป้องกัน response เก่าทับสถานะใหม่ที่ EditorClient:178,783; Zustand พบใน useAuthModal.ts:52 ไม่เหมารวมว่าเป็น story state store |
| WebSocket | src/db/index.ts:8 เป็น transport ของ Neon; ไม่พบหลักฐาน live coauthoring/CRDT/OT ในส่วนที่สำรวจ |
| Web Worker | ไม่พบการสร้าง Worker ใน src/public ที่ค้น; worker-src ใน CSP เป็นเพียงสิทธิ์ที่อนุญาต ไม่ใช่ implementation |
| Tuesday.js | พบ editor/runtime และ React iframe integration จริง |

## ความต่างจากเล่มและช่องว่างวิจัย
เล่ม final.doc บทคัดย่อและขั้นดำเนินงานยังกล่าว MongoDB/JavaScript ขณะที่โค้ดใช้ Drizzle/PostgreSQL/TypeScript และบทที่ 2 ของเล่มเริ่มอธิบาย Neon/ORM แล้ว ควรปรับเอกสารให้สอดคล้องในรอบแก้เล่ม ไม่แก้ในงานนี้
ชื่อฟีเจอร์ในเอกสารหรือ dependency ไม่พอใช้ยืนยันว่าระบบเปิดใช้งานจริง รวมถึง AI generation, collaboration, Inngest และ workers

ช่องว่างที่เหมาะกับ CPE:
- ตรวจ destination ที่หายไป ฉากที่ไปไม่ถึง เงื่อนไขที่ไม่มีวันเป็นจริง และ loop ภายใต้ state; PRIMARY เกี่ยวข้องโดยตรง
- ทดสอบการเปลี่ยนแปลง variables/progress ให้ผลซ้ำได้ และเปรียบเทียบ preview กับ reader
- วัด preload แบบฉากถัดไปเทียบแบบตาม branch โดยใช้ latency/bytes/memory; ยังไม่มีตัวเลขยืนยันในชุดนี้
- ประเมิน usability ของเครื่องมือกราฟด้วยเวลาทำงาน จำนวนข้อผิดพลาด และแบบสอบถาม
- ประเมิน watermark หลัง resize/JPEG/crop; watermark และการซ่อน URL ไม่ใช่หลักฐานว่าป้องกันการคัดลอกได้ทั้งหมด

