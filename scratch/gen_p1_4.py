# scratch/gen_p1_4.py
# Pages 1 to 4 of OmniLedger (IEEE S&P 2018) translation

def get_page_1():
    return """
      <!-- ────────────────── หน้า 1 ────────────────── -->
      <article class="thai-page-article" data-page="1">
        <div class="thai-page-badge-row">
          <span class="badge badge-accent" style="background: var(--accent2); color: white;">หน้า 1 / 16</span>
          <span class="badge" style="background: var(--paper2); color: var(--ink-soft); border: 1px solid var(--rule);">Title, Abstract &amp; Section I: Introduction</span>
        </div>
        <h2 class="thai-section-heading">หน้า 1: ชื่อบทความ คณะผู้ประพันธ์ บทคัดย่อ และบทนำ (Section I)</h2>
        
        <div class="thai-summary-box">
          <strong>สรุปสาระสำคัญประจำหน้า 1 (Executive Summary):</strong>
          <ul style="margin: 6px 0 0 18px; padding: 0; line-height: 1.8;">
            <li><strong>ข้อมูลตีพิมพ์ระดับสากล:</strong> ตีพิมพ์ในการประชุมวิชาการความมั่นคงปลอดภัยชั้นนำอันดับหนึ่งของโลก 2018 IEEE Symposium on Security and Privacy (S&amp;P), DOI: 10.1109/SP.2018.00017 โดย Eleftherios Kokoris-Kogias, Philipp Jovanovic, Linus Gasser, Nicolas Gailly, Bryan Ford จากสถาบัน EPFL ประเทศสวิตเซอร์แลนด์ ร่วมกับ Ewa Syta จาก Trinity College ประเทศสหรัฐอเมริกา</li>
            <li><strong>วิกฤตคอขวดของการขยายขนาด (Scalability Bottleneck):</strong> ระบบบัญชีแบบกระจายศูนย์แบบไร้การอนุญาต (Permissionless Distributed Ledgers) เช่น Bitcoin มีขีดจำกัดการประมวลผลธุรกรรมเพียง 7 ธุรกรรมต่อวินาที (TPS) ในขณะที่เครือข่ายศูนย์กลางระดับโลกอย่าง Visa ต้องรองรับเฉลี่ย 2,000 ถึง 56,000 TPS ในช่วงเทศกาล</li>
            <li><strong>ความล้มเหลวของการเพิ่มขนาดแนวดิ่ง (Scale-Up Limitations):</strong> ความพยายามเพิ่ม Throughput โดยปรับค่าพารามิเตอร์ เช่น เพิ่มขนาดบล็อก หรือลดช่วงเวลาสร้างบล็อก ส่งผลเสียร้ายแรงโดยทำให้อัตราการเกิดบล็อกแยกสาย (Fork Rate) พุ่งสูง และผลักดันให้โหนดทั่วไปหลุดออกจากเครือข่ายจนสูญเสียความเป็นศูนย์กระจาย</li>
            <li><strong>การขยายขนาดแนวนอนด้วย Sharding (Linear Scale-Out):</strong> OmniLedger เสนอแนวทางกระจายภาระงานโดยแบ่งโหนดออกเป็นกลุ่มย่อย (Shards) ที่ทำงานขนานกัน เพื่อให้อัตราการประมวลผลรวมเพิ่มขึ้นเป็นสัดส่วนเชิงเส้นตามจำนวนโหนดผู้ตรวจสอบที่เข้าร่วม</li>
            <li><strong>ผลลัพธ์เชิงประจักษ์:</strong> การทดสอบต้นแบบจริงบนสภาพแวดล้อมจำลองระดับโลกยืนยันว่า OmniLedger สามารถรองรับภาระงานระดับเดียวกับ Visa และก้าวข้ามไปสู่ระดับหมื่น TPS ได้ โดยยืนยันธุรกรรมทั่วไปได้ภายในเวลาต่ำกว่า 2 วินาที</li>
          </ul>
        </div>

        <!-- Presentation Cue Card -->
        <div class="exam-cue-card">
          <div class="exam-cue-title">
            <span>จุดโฟกัสสำหรับการนำเสนอหน้าชั้นเรียน (Presentation Cue Card: หน้า 1)</span>
          </div>
          <ul class="exam-cue-list">
            <li><strong>คำถามเปิดประเด็น (Opening Hook):</strong> &ldquo;ทำไมเทคโนโลยีบล็อกเชนที่ทั่วโลกเชื่อมั่นว่าปลอดภัยที่สุดอย่าง Bitcoin จึงประมวลผลได้ช้ากว่าบัตรเครดิต Visa ถึงพันเท่า? และมีทางใดที่จะทำให้บล็อกเชนเร็วเท่า Visa โดยไม่ต้องยอมเสียความเป็นศูนย์กระจายหรือไม่?&rdquo;</li>
            <li><strong>แก่นของปัญหา (The Blockchain Trilemma):</strong> ใช้รูป Fig. 1 ในการเปิดภาพรวมว่าระบบเดิมติดกับดักสามเหลี่ยม (Decentralization vs Scale-Out vs Security) เลือกระบบหนึ่งต้องเสียอีกระบบหนึ่ง แต่ OmniLedger เสนอว่าสามารถทำได้ครบทั้งสามด้าน</li>
            <li><strong>ตัวเลขสำคัญที่ต้องเอ่ยถึง:</strong> Bitcoin รองรับเพียง 7 TPS ขณะที่ OmniLedger ทำได้เกิน 6,000 ถึง 13,000 TPS บนโหนดทดสอบจริง</li>
          </ul>
        </div>

        <div class="thai-trans-block">
          
          <!-- Unit 1: Title & Abstract -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">ชื่อบทความวิจัย คณะผู้ประพันธ์ และบทคัดย่อ (Title &amp; Abstract)</span>
              <span class="unit-en-ref">IEEE S&amp;P 2018 · Page 583 (Col. 1)</span>
            </div>
            <div class="original-en-quote">
              &ldquo;OmniLedger: A Secure, Scale-Out, Decentralized Ledger via Sharding&hellip; Designing a secure permissionless distributed ledger (blockchain) that performs on par with centralized payment processors, such as Visa, is a challenging task. Most existing distributed ledgers are unable to scale-out, i.e., to grow their total processing capacity with the number of validators; and those that do, compromise security or decentralization.&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลภาษาไทย:</strong><br>
              <strong>OmniLedger: ระบบบัญชีแบบกระจายศูนย์ที่ปลอดภัย ขยายขนาดแนวนอนได้จริง ผ่านการแบ่งส่วนข้อมูล (Sharding)</strong><br><br>
              <strong>บทคัดย่อ:</strong> การออกแบบระบบบัญชีแบบกระจายศูนย์ (บล็อกเชน) ชนิดไร้การอนุญาตที่มีความมั่นคงปลอดภัย และมีสมรรถนะเทียบเคียงได้กับผู้ประมวลผลการชำระเงินแบบรวมศูนย์ เช่น วีซ่า (Visa) ถือเป็นภารกิจที่มีความท้าทายอย่างยิ่ง ระบบบัญชีแบบกระจายศูนย์ส่วนใหญ่ที่มีอยู่ในปัจจุบันไม่สามารถขยายขนาดแนวนอน (Scale-Out) ได้ ซึ่งหมายถึงความสามารถในการเพิ่มขีดความสามารถในการประมวลผลรวมตามจำนวนผู้ตรวจสอบ (Validators) ที่เพิ่มขึ้น ส่วนระบบที่พยายามขยายขนาดได้นั้น ก็มักจะต้องแลกมาด้วยการยอมลดทอนความมั่นคงปลอดภัยหรือสูญเสียความเป็นศูนย์กระจายไป<br><br>
              เราขอนำเสนอ <strong>OmniLedger</strong> ซึ่งเป็นระบบบัญชีแบบกระจายศูนย์แนวใหม่ที่ขยายขนาดแนวนอนได้อย่างแท้จริง และยังคงรักษาความมั่นคงปลอดภัยในระยะยาวภายใต้การทำงานแบบไร้การอนุญาต ระบบรับประกันความมั่นคงปลอดภัยและความถูกต้องแม่นยำโดยใช้โปรโตคอลสร้างค่าสุ่มสาธารณะที่ต้านทานการแทรกแซงหรือบิดเบือน เพื่อใช้ในการคัดเลือกกลุ่มย่อย (Shards) ที่มีขนาดใหญ่และมีตัวแทนทางสถิติที่ปลอดภัยสำหรับการประมวลผลธุรกรรม อีกทั้งยังนำเสนอโปรโตคอลผูกมัดธุรกรรมข้ามกลุ่มย่อย (Cross-Shard Commit Protocol) ที่มีประสิทธิภาพสูง ซึ่งจัดการธุรกรรมที่เกี่ยวข้องกับหลายกลุ่มย่อยได้อย่างเป็นหน่วยเดียวยกเลิกไม่ได้ (Atomically)<br><br>
              นอกจากนี้ OmniLedger ยังเพิ่มประสิทธิภาพการทำงานผ่านการประมวลผลธุรกรรมคู่ขนานภายในกลุ่มย่อย การตัดแต่งขนาดบัญชีผ่านบล็อกสถานะที่ร่วมกันลงนาม (State Blocks) และการตรวจสอบแบบมองโลกในแง่ดีความหน่วงต่ำที่เรียกว่า &ldquo;เชื่อมั่นแต่ตรวจทาน&rdquo; (Trust-but-Verify) สำหรับธุรกรรมมูลค่าต่ำ จากการประเมินผลระบบต้นแบบเชิงทดลองพบว่า อัตราการประมวลผล (Throughput) ของ OmniLedger ขยายตัวแบบเชิงเส้นตามจำนวนผู้ตรวจสอบที่ทำงานอยู่ สามารถรองรับภาระงานระดับเดียวกับ Visa และสูงกว่านั้นได้ ในขณะที่ยืนยันธุรกรรมทั่วไปได้ภายในเวลาต่ำกว่าสองวินาที
            </div>
            <div class="engineering-annotation">
              <strong>บทวิเคราะห์เชิงวิศวกรรม:</strong> บทคัดย่อสรุปเสาหลัก 5 ด้านของงานวิจัยอย่างรัดกุม: (1) การแก้ปัญหา Trilemma (2) การใช้ Bias-Resistant Randomness ป้องกันการเลือก Shard แบบฉ้อฉล (3) Atomix สำหรับ Cross-shard Transactions (4) State Blocks สำหรับจัดการ Storage Bloat และ (5) Trust-but-Verify สำหรับ Micro-payments
            </div>
          </div>

          <!-- Unit 2: Section I Introduction -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">บทนำ (Section I: Introduction)</span>
              <span class="unit-en-ref">Section I · Paragraphs 1-4</span>
            </div>
            <div class="original-en-quote">
              &ldquo;The scalability of distributed ledgers (DLs), in both total throughput and storage footprint, is one of the most critical challenges facing blockchain technology today. Bitcoin processes at most 7 transactions per second (tps) globally, whereas mainstream payment processors like Visa handle thousands of tps on average and tens of thousands during peak loads&hellip;&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลภาษาไทย:</strong><br>
              ความสามารถในการขยายขนาดของระบบบัญชีแบบกระจายศูนย์ ทั้งในแง่ของอัตราการประมวลผลรวม (Throughput) และขนาดพื้นที่จัดเก็บข้อมูล (Storage Footprint) ถือเป็นหนึ่งในความท้าทายที่วิกฤตที่สุดที่เทคโนโลยีบล็อกเชนกำลังเผชิญอยู่ในปัจจุบัน บิตคอยน์ (Bitcoin) สามารถประมวลผลธุรกรรมได้ไม่เกิน 7 ธุรกรรมต่อวินาทีทั่วโลก ในขณะที่ผู้ประมวลผลการชำระเงินกระแสหลักอย่าง Visa สามารถรองรับธุรกรรมได้หลายพันรายการต่อวินาทีโดยเฉลี่ย และพุ่งสูงถึงหลายหมื่นรายการในช่วงที่มีการใช้งานสูงสุด<br><br>
              ระบบบล็อกเชนในยุคบุกเบิกใช้สถาปัตยกรรมที่ทุกโหนดต้องจัดเก็บสำเนาประวัติบัญชีทั้งหมด (Full Replication) และผู้ตรวจสอบทุกคนต้องประมวลผลและตรวจสอบทุกธุรกรรมซ้ำเหมือนกันทั้งหมด สถาปัตยกรรมเช่นนี้ทำให้ระบบไม่สามารถขยายขนาดแนวนอนได้เลย เพราะแม้เราจะเพิ่มคอมพิวเตอร์เข้ามาในเครือข่ายอีกนับพันเครื่อง ขีดความสามารถในการประมวลผลรวมของทั้งระบบก็ยังคงถูกจำกัดอยู่ที่ขีดความสามารถของเครื่องคอมพิวเตอร์เพียงเครื่องเดียว ยิ่งไปกว่านั้น ขนาดข้อมูลของบล็อกเชนที่บวมโตขึ้นเรื่อยๆ ยังสร้างภาระมหาศาลแก่ผู้ตรวจสอบหน้าใหม่ ทำให้การเริ่มต้นเข้าร่วมเครือข่าย (Bootstrapping) ต้องใช้เวลาดาวน์โหลดข้อมูลหลายวันหรือหลายสัปดาห์
            </div>
          </div>

          <!-- Unit 3: Fig. 1 Blockchain Trilemma Analysis -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">การวิเคราะห์แผนภาพ Fig. 1: การแลกเปลี่ยนคุณสมบัติในระบบบัญชีกระจายศูนย์ (Trade-offs in Current DL Systems)</span>
              <span class="unit-en-ref">Fig. 1 Analysis · Page 583</span>
            </div>
            <div class="thai-full-translation">
              <strong>คำอธิบายแผนภาพ Fig. 1:</strong><br>
              ผู้วิจัยได้นำเสนอแผนภาพสามเหลี่ยมเพื่อแสดงจุดยืนและข้อแลกเปลี่ยน (Trade-offs) ของระบบบัญชีกระจายศูนย์ในยุคปัจจุบัน โดยวางอยู่บนแกนคุณสมบัติ 3 ด้าน:
              <ol style="margin: 6px 0 6px 18px; padding: 0; line-height: 1.8;">
                <li><strong>Decentralization (การกระจายศูนย์อย่างแท้จริง):</strong> ทุกคนสามารถเข้าร่วมเป็นโหนดตรวจสอบได้โดยไม่ต้องขออนุญาตจากองค์กรใด</li>
                <li><strong>Scale-Out (การขยายขนาดแนวนอน):</strong> ความสามารถในการเพิ่ม Throughput ตามจำนวนโหนดที่เพิ่มเข้ามาในระบบ</li>
                <li><strong>Security (ความมั่นคงปลอดภัย):</strong> ความคงทนต่อการโจมตีจากผู้ประสงค์ร้าย โดยมีอัตราความผิดพลาดต่ำมากในระยะยาว</li>
              </ol>
            </div>
            <div class="engineering-annotation">
              <strong>ตารางวิเคราะห์เปรียบเทียบระบบใน Fig. 1:</strong><br>
              <ul style="margin: 6px 0 0 18px; padding: 0; line-height: 1.75;">
                <li><strong>Bitcoin [42]:</strong> ได้ Decentralization + Security แต่ไร้ Scale-Out (ได้เพียง 7 TPS)</li>
                <li><strong>ByzCoin [32]:</strong> ได้ Decentralization + Security ลดความหน่วงลงเหลือระดับวินาที แต่ยังคงประมวลผลทุกโหนดพร้อมกัน จึงไร้ Scale-Out</li>
                <li><strong>Elastico [34]:</strong> บุกเบิกการทำ Sharding เพื่อ Scale-Out แต่ขนาด Shard เล็กเกินไป ทำให้ Security พังทลาย (มีโอกาสถูกยึด Shard สูงถึง 97% ภายใน 6 รอบ)</li>
                <li><strong>RSCoin [16]:</strong> ได้ Scale-Out + Security สูง แต่เป็นระบบรวมศูนย์ภายใต้ธนาคารกลาง (Permissioned) จึงสูญเสีย Decentralization</li>
                <li><strong>OmniLedger (งานวิจัยนี้):</strong> อยู่ตรงจุดศูนย์กลางของสามเหลี่ยม สามารถบรรลุคุณสมบัติทั้ง 3 ด้านพร้อมกันได้อย่างสมดุล</li>
              </ul>
            </div>
          </div>

        </div>
      </article>
    """

def get_page_2():
    return """
      <!-- ────────────────── หน้า 2 ────────────────── -->
      <article class="thai-page-article" data-page="2" style="display: none;">
        <div class="thai-page-badge-row">
          <span class="badge badge-accent" style="background: var(--accent2); color: white;">หน้า 2 / 16</span>
          <span class="badge" style="background: var(--paper2); color: var(--ink-soft); border: 1px solid var(--rule);">Section I (Cont.), Section II: Background &amp; Related Work</span>
        </div>
        <h2 class="thai-section-heading">หน้า 2: นวัตกรรมหลัก 6 ประการ และรากฐานทางเทคโนโลยี (Section II.A - II.D)</h2>
        
        <div class="thai-summary-box">
          <strong>สรุปสาระสำคัญประจำหน้า 2 (Executive Summary):</strong>
          <ul style="margin: 6px 0 0 18px; padding: 0; line-height: 1.8;">
            <li><strong>6 นวัตกรรมสถาปัตยกรรมของ OmniLedger:</strong> 1. การสุ่มสาธารณะต้านทานการบิดเบือน (RandHound + VRF) 2. การจัด Shard แบบหน้าต่างเลื่อน (Sliding-Window Epoch) 3. โปรโตคอลธุรกรรมข้าม Shard แบบอะตอมมิก (Atomix) 4. ฉันทามติทนทานการโจมตีปฏิเสธการบริการ (ByzCoinX) 5. การตัดแต่งประวัติบัญชี (State Blocks) 6. ระบบยืนยันสองระดับ (Trust-but-Verify)</li>
            <li><strong>ByzCoin และข้อจำกัด:</strong> พัฒนาต่อยอดจาก PBFT โดยใช้ Collective Signing (CoSi) รวบรวมลายเซ็น Schnorr ผ่านโครงสร้างต้นไม้ 4 ระดับ แต่มีจุดอ่อนร้ายแรงคือหากโหนดผู้นำในสายต้นไม้เป็นผู้ประสงค์ร้าย จะทำให้ระบบเกิดความล่าช้าจากการทำ View-Change ซ้ำซาก</li>
            <li><strong>โมเดลบัญชีแบบ UTXO (Unspent Transaction Output):</strong> OmniLedger เลือกใช้โมเดล UTXO ของ Bitcoin แทนระบบ Account-Based ของ Ethereum เนื่องจากแต่ละ UTXO มีความเป็นอิสระต่อกันโดยสมบูรณ์ ทำให้สามารถกระจายไปยัง Shards ต่างๆ และประมวลผลคู่ขนานได้ง่ายโดยไม่เกิดปัญหา Nonce Dependencies</li>
            <li><strong>ภัยคุกคามจากการบิดเบือนค่าสุ่ม (Randomness Bias Attacks):</strong> การใช้ค่าแฮชของบล็อกเป็นค่าสุ่มเปิดโอกาสให้นักขุดที่ประสงค์ร้ายสามารถทิ้งบล็อกที่ไม่พึงประสงค์ (Selective Block Withholding) เพื่อบิดเบือนการจัดสรรโหนดเข้าสู่ Shard OmniLedger จึงต้องใช้ Publicly Verifiable Secret Sharing (PVSS)</li>
            <li><strong>การต้านทานการโจมตีแบบ Sybil (Sybil-Resistant Identities):</strong> สามารถใช้งานร่วมกับ Proof-of-Work (PoW), Proof-of-Stake (PoS) หรือ Proof-of-Personhood (PoP) เพื่อลงทะเบียนตัวตนผู้ตรวจสอบลงใน Identity Blockchain</li>
          </ul>
        </div>

        <!-- Presentation Cue Card -->
        <div class="exam-cue-card">
          <div class="exam-cue-title">
            <span>จุดโฟกัสสำหรับการนำเสนอหน้าชั้นเรียน (Presentation Cue Card: หน้า 2)</span>
          </div>
          <ul class="exam-cue-list">
            <li><strong>ประเด็นหลักที่ต้องฉายภาพ:</strong> OmniLedger ไม่ใช่แค่เรื่องการแบ่ง Shard ทั่วไป แต่เป็นการบูรณาการสถาปัตยกรรม 6 ด้านเข้าด้วยกันเพื่อปิดจุดอ่อนของบล็อกเชนรุ่นก่อนหน้าอย่างรอบด้าน</li>
            <li><strong>การเปรียบเทียบเชิงวิศวกรรม:</strong> ชี้ให้เห็นความแตกต่างที่ชัดเจนว่า ทำไมการทำ Sharding บน UTXO จึงง่ายและมีประสิทธิภาพสูงกว่า Account-Based เพราะ UTXO แต่ละก้อนใช้แล้วทิ้ง (Immutable) ไม่มีปัญหาการเข้าคิวปรับยอดเงินในบัญชีเดียวกัน</li>
            <li><strong>จุดควรระวัง:</strong> อธิบายให้ชัดเจนว่าทำไมการสุ่มธรรมดาถึงไม่พอ และทำไมต้องใช้ Bias-Resistant Randomness เพราะหากผู้โจมตีบิดเบือนค่าสุ่มได้แม้เพียงเล็กน้อย ก็จะสามารถยัดโหนดชั่วร้ายของตนเข้าไปยึด Shard ใด Shard หนึ่งได้สำเร็จ</li>
          </ul>
        </div>

        <div class="thai-trans-block">
          
          <!-- Unit 1: Six Key Contributions -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">การสังเคราะห์นวัตกรรม 6 ประการของ OmniLedger</span>
              <span class="unit-en-ref">Section I · Page 584 (Col. 1)</span>
            </div>
            <div class="original-en-quote">
              &ldquo;OmniLedger introduces several performance and scalability refinements we found to be instrumental in achieving its usability goals. OmniLedger&rsquo;s consensus protocol, ByzCoinX, enhances the PBFT-based consensus in ByzCoin [32]&hellip; OmniLedger adapts classic distributed checkpointing principles [20] to produce consistent, state blocks periodically. Finally, to minimize transaction latency&hellip; OmniLedger supports optional trust-but-verify validation&hellip;&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลภาษาไทย:</strong><br>
              เพื่อตอบสนองต่อเป้าหมายด้านความปลอดภัยและการใช้งานจริงอย่างสมบูรณ์แบบ OmniLedger ได้นำเสนอนวัตกรรมและการปรับปรุงทางวิศวกรรม 6 มิติหลัก:
              <ol style="margin: 8px 0 8px 18px; padding: 0; line-height: 1.85;">
                <li><strong>โปรโตคอลสุ่มค่าสาธารณะต้านทานการแทรกแซง (Bias-Resistant Randomness):</strong> ผสมผสาน RandHound เข้ากับฟังก์ชันสุ่มที่พิสูจน์ยืนยันได้ (VRF) เพื่อให้ได้ค่าสุ่มที่คาดเดาไม่ได้และไม่สามารถถูกชักจูงโดยฝ่ายตรงข้าม สำหรับใช้จัดสรรผู้ตรวจสอบเข้าสู่ Shards</li>
                <li><strong>สถาปัตยกรรมการแบ่งส่วนข้อมูลแบบขยายขนาดแนวนอน (Scale-Out Sharding Protocol):</strong> ออกแบบให้แต่ละ Shard ประมวลผลธุรกรรมที่เป็นอิสระต่อกัน และมีกลไกสลับเปลี่ยนโหนดแบบหน้าต่างเลื่อน (Sliding-Window Reconfiguration) เพื่อรักษาความต่อเนื่องของระบบ</li>
                <li><strong>โปรโตคอลผูกมัดธุรกรรมข้ามกลุ่มย่อยอย่างเป็นหน่วยเดียว (Atomix: Cross-Shard Commit):</strong> รับประกันความสอดคล้องของธุรกรรมที่เกี่ยวข้องกับหลาย Shard ป้องกันการจ่ายเงินซ้ำ (Double-Spending) และป้องกันเงินถูกล็อกค้างตลอดกาล โดยให้ฝั่งไคลเอนต์เป็นผู้ประสานงาน</li>
                <li><strong>โปรโตคอลฉันทามติ ByzCoinX:</strong> พัฒนาต่อยอดจาก ByzCoin ให้มีความทนทานต่อการโจมตีปฏิเสธการบริการ (DoS Attacks) โดยใช้โครงสร้างการสื่อสารแบบต้นไม้ 3 ระดับร่วมกับการตรวจสอบโหนดผู้นำกลุ่มย่อย</li>
                <li><strong>การตัดแต่งประวัติบัญชีผ่านบล็อกสถานะ (Ledger Pruning via State Blocks):</strong> ประยุกต์ใช้หลักการ Checkpointing สรุปยอด UTXO ปัจจุบันเป็น Merkle Tree ลงใน State Block เพื่อให้โหนดใหม่สามารถเริ่มทำงานได้ทันทีโดยไม่ต้องโหลดประวัติเก่าตั้งแต่ต้น</li>
                <li><strong>การตรวจสอบแบบเชื่อมั่นแต่ตรวจทาน (Trust-but-Verify Validation):</strong> ระบบสองระดับ โดยระดับแรกเป็นกลุ่มย่อยขนาดเล็กยืนยันธุรกรรมมูลค่าต่ำได้ใน 1.38 วินาที และส่งต่อให้ Shard เต็มตรวจสอบซ้ำในระดับที่สองเพื่อความมั่นคงในระยะยาว</li>
              </ol>
            </div>
          </div>

          <!-- Unit 2: Section II Background & UTXO -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">บริบทพื้นฐานและงานวิจัยที่เกี่ยวข้อง (Section II.A - II.D)</span>
              <span class="unit-en-ref">Section II · Page 584 (Col. 1-2)</span>
            </div>
            <div class="original-en-quote">
              &ldquo;A. Scalable Byzantine Consensus in ByzCoin&hellip; ByzCoin [32] modifies PBFT [13] to make it suitable for permissionless blockchains by introducing a scalable collective signing protocol (CoSi) [57]&hellip; B. Transaction Processing and the UTXO model: OmniLedger adopts the Unspent Transaction Output (UTXO) model used in Bitcoin. In this model, transactions consume existing outputs and create new ones&hellip;&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลภาษาไทย:</strong><br>
              <strong>A. ฉันทามติไบแซนไทน์ที่ปรับขยายขนาดได้ใน ByzCoin:</strong> ByzCoin ได้นำโปรโตคอล PBFT ดั้งเดิมมาปรับปรุงให้ทำงานบนเครือข่ายบล็อกเชนแบบไร้การอนุญาตได้ โดยใช้ Collective Signing (CoSi) รวบรวมลายเซ็นมัลติซิกเนเจอร์ของ Schnorr ผ่านโครงสร้างต้นไม้ ซึ่งลดขนาดข้อความและลายเซ็นรวมลงเหลือขนาดคงที่ แต่ยังคงมีข้อจำกัดด้านความเปราะบางหากโหนดภายในต้นไม้ไม่ส่งต่อข้อความ<br><br>
              <strong>B. การประมวลผลธุรกรรมและโมเดล UTXO:</strong> OmniLedger เลือกใช้โมเดล Unspent Transaction Output (UTXO) เหมือนกับ Bitcoin โดยธุรกรรมหนึ่งจะใช้ UTXO ที่มีอยู่เดิมเป็นข้อมูลขาเข้า (Inputs) และสร้าง UTXO ใหม่เป็นข้อมูลขาออก (Outputs) สถานะของบัญชีคือเซตของ UTXO ที่ยังไม่ถูกใช้ ประโยชน์มหาศาลของ UTXO ในระบบ Sharding คือความเป็นอิสระของข้อมูล ทำให้การตรวจสอบธุรกรรมไม่ต้องพึ่งพาลำดับ Nonce ในบัญชีแบบ Account-Based ส่งผลให้การแยกประมวลผลขนานกันในแต่ละ Shard ทำได้อย่างมีประสิทธิภาพสูงสุด<br><br>
              <strong>C. การสร้างค่าสุ่มแบบกระจายตัวที่ปลอดภัย:</strong> ในระบบกระจายศูนย์ การสร้างค่าสุ่มที่ไม่อาจคาดเดาได้และต้านทานการบิดเบือนถือเป็นเรื่องท้าทายอย่างยิ่ง วิธีการแบบเดิมที่ใช้แฮชของบล็อกในอดีต (เช่น ใน Elastico) เปิดช่องให้นักขุดที่มีสัดส่วนพลังขุดสูงสามารถเลือกทิ้งบล็อกที่ไม่เป็นใจ เพื่อบิดเบือนผลการเลือก Shard ได้ OmniLedger จึงนำ RandHound ซึ่งเป็นโปรโตคอลสุ่มค่าสาธารณะที่ใช้การแบ่งปันความลับที่ตรวจสอบได้โดยสาธารณะ (PVSS) มาใช้งาน<br><br>
              <strong>D. อัตลักษณ์ที่ต้านทานการโจมตีแบบ Sybil:</strong> ในระบบไร้การอนุญาต ผู้โจมตีสามารถสร้างตัวตนปลอมขึ้นมานับล้านตัวตน (Sybil Attack) ได้อย่างง่ายดาย OmniLedger จึงกำหนดให้ผู้ตรวจสอบต้องสร้างตัวตนผ่าน Identity Blockchain โดยใช้หลักฐานที่ต้องแลกด้วยต้นทุนจริง เช่น Proof-of-Work (PoW), Proof-of-Stake (PoS), หรือ Proof-of-Personhood (PoP)
            </div>
            <div class="engineering-annotation">
              <strong>ข้อสังเกตเชิงเทคนิค:</strong> โมเดล UTXO ของ OmniLedger ทำหน้าที่เหมือนหน่วยข้อมูลแบบคงที่ (Immutable Records) ซึ่งเมื่อถูกใช้แล้วจะเปลี่ยนสถานะเป็น Spent ทันที ทำให้การตรวจสอบความถูกต้องไม่ต้องมีการล็อกสถานะของตัวแปรส่วนกลาง (Global State Lock) แตกต่างจากระบบ Smart Contract ของ Ethereum ที่การทำ Sharding ประสบปัญหาคอขวดอย่างรุนแรง
            </div>
          </div>

        </div>
      </article>
    """

def get_page_3():
    return """
      <!-- ────────────────── หน้า 3 ────────────────── -->
      <article class="thai-page-article" data-page="3" style="display: none;">
        <div class="thai-page-badge-row">
          <span class="badge badge-accent" style="background: var(--accent2); color: white;">หน้า 3 / 16</span>
          <span class="badge" style="background: var(--paper2); color: var(--ink-soft); border: 1px solid var(--rule);">Section II.E: Elastico, Section III: Problem Statement &amp; Threat Model</span>
        </div>
        <h2 class="thai-section-heading">หน้า 3: ข้อบกพร่องร้ายแรงของ Elastico และแบบจำลองภัยคุกคาม (Section II.E &amp; III)</h2>
        
        <div class="thai-summary-box">
          <strong>สรุปสาระสำคัญประจำหน้า 3 (Executive Summary):</strong>
          <ul style="margin: 6px 0 0 18px; padding: 0; line-height: 1.8;">
            <li><strong>บทเรียนความล้มเหลวจาก Elastico (CCS 2016):</strong> Elastico เป็นระบบแรกที่บุกเบิกการทำ Sharding บนบล็อกเชนไร้การอนุญาต แต่มีข้อบกพร่องเชิงสถาปัตยกรรม 5 ประการสำคัญ: 1. ขนาด Shard เล็กเกินไป (100 โหนด) 2. กระบวนการเลือก Shard สามารถถูกแทรกแซงได้ 3. ขาดการรับประกันความเป็นหน่วยเดียวยกเลิกไม่ได้ (Atomicity) ของธุรกรรมข้าม Shard 4. บังคับให้ทุกโหนดต้องเก็บประวัติทั่วโลก 5. ความหน่วงในการยืนยันธุรกรรมสูงถึง 10 นาที</li>
            <li><strong>วิกฤตความน่าจะเป็นที่ Shard จะพังทลาย:</strong> ด้วยขนาด Shard เพียง 100 โหนดใน Elastico ภายใต้สมมติฐานว่ามีผู้โจมตี 25% ในเครือข่าย ความน่าจะเป็นที่ Shard ใด Shard หนึ่งจะมีโหนดไม่ดีเกินเกณฑ์ 1/3 สูงถึง <strong>2.76% ต่อบล็อก</strong> และเมื่อขยายเป็น 16 Shards โอกาสล้มเหลวสะสมจะพุ่งสูงถึง <strong>97% ภายในเวลาเพียง 6 Epochs</strong> (ไม่ถึงหนึ่งวัน)!</li>
            <li><strong>ปัญหาเงินค้างถาวร (Deadlock of Funds):</strong> ใน Elastico หากธุรกรรมข้าม Shard ถูกยอมรับใน Shard ต้นทางแต่ถูกปฏิเสธใน Shard ปลายทาง เงินใน Shard ต้นทางจะถูกล็อกค้างเติ่งตลอดกาลโดยไม่มีกลไกคืนเงิน</li>
            <li><strong>แบบจำลองระบบและเครือข่าย (System &amp; Network Model):</strong> OmniLedger กำหนดสมมติฐานเครือข่ายแบบกึ่งประสานเวลา (Partially Synchronous Network) โดยข้อความระหว่างโหนดซื่อสัตย์จะส่งถึงกันภายในเวลา Delta ในช่วงเวลาประสาน และอนุญาตให้มีความล่าช้าตามอำเภอใจในช่วงเครือข่ายไม่ประสานเวลา</li>
            <li><strong>แบบจำลองภัยคุกคาม (Threat Model):</strong> รองรับผู้โจมตีแบบไบแซนไทน์ที่มีอำนาจควบคุมโหนดไม่เกิน 1/3 (หรือ 25% ในการประเมินความปลอดภัยเข้มงวด) และเป็นผู้โจมตีที่ปรับตัวช้า (Slowly-Adaptive Adversary) ไม่สามารถโยกย้ายพลังโจมตีข้าม Shard ได้ในทันทีทันใด</li>
          </ul>
        </div>

        <!-- Presentation Cue Card -->
        <div class="exam-cue-card">
          <div class="exam-cue-title">
            <span>จุดโฟกัสสำหรับการนำเสนอหน้าชั้นเรียน (Presentation Cue Card: หน้า 3)</span>
          </div>
          <ul class="exam-cue-list">
            <li><strong>สถิติสะเทือนใจที่ต้องเน้น:</strong> ตัวเลข 2.76% ต่อบล็อก และ 97% ภายใน 6 รอบของ Elastico เป็นจุดชี้ขาดที่แสดงว่า Sharding รุ่นแรกไม่ปลอดภัยสำหรับระบบการเงินจริง</li>
            <li><strong>การตอบข้อซักถามเรื่อง Threat Model:</strong> หากถูกถามว่าทำไมผู้โจมตีจึงย้ายโหนดข้าม Shard ทันทีไม่ได้? ให้ตอบว่า เพราะการจัดสรรโหนดถูกล็อกด้วยค่าสุ่มของ Epoch นั้นๆ ผู้โจมตีไม่สามารถเลือกย้ายตนเองตามใจชอบได้</li>
            <li><strong>หลักการ 6 ข้อของ OmniLedger:</strong> ท่องจำให้ขึ้นใจ: Decentralization, Shard Robustness, Secure Transactions, Scale-Out, Low Storage, Low Latency</li>
          </ul>
        </div>

        <div class="thai-trans-block">
          
          <!-- Unit 1: Section II.E Elastico Failure Analysis -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">การวิเคราะห์ข้อจำกัดของระบบ Sharding รุ่นก่อนหน้า: กรณีศึกษา Elastico</span>
              <span class="unit-en-ref">Section II.E · Page 585 (Col. 1)</span>
            </div>
            <div class="original-en-quote">
              &ldquo;E. Prior Sharded Ledgers: Elastico&hellip; OmniLedger addresses several challenges that Elastico leaves unsolved. First, Elastico&rsquo;s relatively small shards (e.g., 100 validators per shard in experiments) yield a high failure-probability of 2.76% per shard per block under a 25% adversary&hellip; For 16 shards, the failure probability is 97% over only 6 epochs. Second, Elastico&rsquo;s shard selection is not strongly bias-resistant&hellip; Third, Elastico does not ensure transaction atomicity across shards, leaving funds in one shard locked forever&hellip;&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลภาษาไทย:</strong><br>
              <strong>ข้อจำกัดของระบบ Sharding รุ่นก่อนหน้า: กรณีศึกษา Elastico</strong><br>
              OmniLedger พัฒนาขึ้นโดยต่อยอดบทเรียนจาก Elastico [34] ซึ่งเป็นงานวิจัยแรกที่บุกเบิกการทำ Sharding ในระบบบล็อกเชนแบบไร้การอนุญาต ในแต่ละรอบการทำงาน Elastico ใช้บิตท้ายของผลลัพธ์ Proof-of-Work ในการสุ่มแจกจ่ายนักขุดเข้าสู่ Shards ต่างๆ จากนั้นแต่ละ Shard จะรัน PBFT เพื่อหาข้อตกลงร่วมกัน และมี Shard ผู้นำทำหน้าที่ตรวจสอบลายเซ็นทั้งหมดเพื่อสร้างบล็อกกลางของทั้งระบบ<br><br>
              อย่างไรก็ดี OmniLedger ได้ชี้ให้เห็นช่องโหว่และปัญหาที่ยังไม่ได้รับการแก้ไขใน Elastico อย่างน้อย 5 ประการ:
              <ol style="margin: 6px 0 6px 18px; padding: 0; line-height: 1.8;">
                <li><strong>ขนาด Shard ที่เล็กเกินไปทำให้ความน่าจะเป็นที่ระบบล้มเหลวสูงจนยอมรับไม่ได้:</strong> ในการทดลองของ Elastico กำหนดขนาด Shard ไว้เพียง 100 โหนด ซึ่งเมื่อเผชิญกับผู้โจมตีที่มีสัดส่วนพลัง 25% จะมีโอกาสสูงถึง <strong>2.76% ต่อบล็อกต่อ Shard</strong> ที่โหนดไม่ดีจะเกินเกณฑ์ 1/3 และหากระบบมี 16 Shards ความน่าจะเป็นที่ระบบจะล้มเหลวสะสมจะพุ่งสูงถึง <strong>97% ภายในเวลาเพียง 6 Epochs</strong> เท่านั้น ซึ่งถือเป็นหายนะสำหรับระบบบัญชีการเงิน</li>
                <li><strong>การเลือก Shard สามารถถูกบิดเบือนได้:</strong> การใช้บิตท้ายของ PoW ไม่ต้านทานการบิดเบือน เพราะนักขุดสามารถเลือกทิ้งผลลัพธ์ที่ไม่ถูกใจแล้วขุดใหม่เพื่อให้ตนเองได้ไปอยู่ใน Shard เป้าหมาย</li>
                <li><strong>ขาดการรับประกันความเป็นหน่วยเดียวของธุรกรรมข้าม Shard:</strong> หากธุรกรรมใช้เงินจาก Shard หนึ่งไปยังอีก Shard หนึ่ง แล้ว Shard ปลายทางปฏิเสธ เงินใน Shard ต้นทางจะถูกล็อกค้างตลอดกาล</li>
                <li><strong>ภาระการจัดเก็บข้อมูลสูง:</strong> โหนดต้องสลับ Shard ตลอดเวลา ทำให้ทุกโหนดต้องเก็บประวัติสถานะทั่วโลก (Global State)</li>
                <li><strong>ความหน่วงในการยืนยันธุรกรรมสูง:</strong> ต้องใช้เวลาประมาณ 10 นาทีเทียบเท่ากับรอบเวลาของ Bitcoin</li>
              </ol>
            </div>
            <div class="engineering-annotation">
              <strong>การตรวจสอบคณิตศาสตร์ของ Elastico:</strong> ค่า 2.76% (0.02759) คำนวณจากการแจกแจงทวินามสะสม (Cumulative Binomial Distribution) โดยกำหนด $N = 100$, สัดส่วนผู้โจมตี $P = 0.25$ และจำนวนโหนดชั่วร้าย $X \ge 34$ (เกิน $1/3$):
              $$\sum_{k=34}^{100} \binom{100}{k} (0.25)^k (0.75)^{100-k} \approx 0.02759 \approx 2.76\%$$
              เมื่อมี 16 Shards โอกาสที่ทุก Shard ปลอดภัยใน 1 บล็อกคือ $(1 - 0.02759)^{16} \approx 0.638$ และใน 6 รอบคือ $(0.638)^6 \approx 0.068$ ดังนั้นโอกาสล้มเหลวคือ $1 - 0.068 = 0.932 \approx 97\%$ ตรงตามที่ระบุในเปเปอร์
            </div>
          </div>

          <!-- Unit 2: Section III Problem Statement & Threat Model -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">นิยามปัญหา แบบจำลองระบบ และภัยคุกคาม (Section III)</span>
              <span class="unit-en-ref">Section III.A - III.E · Pages 585-586</span>
            </div>
            <div class="original-en-quote">
              &ldquo;III. PROBLEM STATEMENT AND THREAT MODEL&hellip; System Model: We consider a permissionless distributed ledger consisting of a dynamically changing set of nodes&hellip; Threat Model: We assume an adversary that controls a fraction f of the total voting power in the system, where f &lt; 1/3 (or f &lt; 1/4 in our conservative evaluation)&hellip; System Goals: 1. Full decentralization, 2. Shard robustness, 3. Secure transactions, 4. Scale-out, 5. Low storage overhead, 6. Low latency.&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลภาษาไทย:</strong><br>
              <strong>แบบจำลองระบบ (System Model):</strong> เครือข่ายประกอบด้วยโหนดผู้ตรวจสอบที่สามารถเข้าร่วมหรือออกจากระบบได้อย่างอิสระ การทำงานของระบบแบ่งออกเป็นช่วงเวลาเรียกว่า &ldquo;Epoch&rdquo; ซึ่งมีความยาวคงที่ และในแต่ละ Epoch จะมีชุดของผู้ตรวจสอบที่ลงทะเบียนถูกต้องทำหน้าที่ร่วมกัน<br><br>
              <strong>แบบจำลองเครือข่าย (Network Model):</strong> สมมติฐานเครือข่ายแบบกึ่งประสานเวลา (Partially Synchronous) ซึ่งเป็นมาตรฐานสำหรับระบบ BFT ทั่วโลก โหนดสื่อสารผ่านเครือข่ายแบบกระจายข้อมูล (Gossip Network) โดยข้อความระหว่างโหนดที่ซื่อสัตย์จะส่งถึงกันภายในกรอบเวลาที่ทราบค่า $\Delta$ เมื่อเครือข่ายอยู่ในสภาวะประสานเวลา<br><br>
              <strong>แบบจำลองภัยคุกคาม (Threat Model):</strong> ผู้โจมตีสามารถเป็นฝ่ายประสงค์ร้ายแบบสมบูรณ์ (Byzantine) สามารถส่งข้อความเท็จ ปิดกั้นข้อความ หรือไม่ตอบสนองได้ โดยมีสัดส่วนพลังการลงคะแนนรวมไม่เกิน $f < 1/3$ (หรือ $f \le 25\%$ ตามเกณฑ์ความปลอดภัยขั้นสูงของเปเปอร์) และผู้โจมตีเป็นแบบ Slowly-Adaptive ที่ต้องใช้เวลาอย่างน้อยหนึ่ง Epoch ในการซื้อตัวหรือควบคุมโหนดใหม่ จึงไม่สามารถโยกย้ายอำนาจโจมตีระหว่าง Shards ภายใน Epoch เดียวกันได้ทันที<br><br>
              <strong>6 เป้าหมายการออกแบบของ OmniLedger:</strong>
              <ul style="margin: 6px 0 0 18px; padding: 0; line-height: 1.75;">
                <li><strong>1. Full Decentralization:</strong> ไม่มีจุดล้มเหลวเดี่ยว (Single Point of Failure) และไม่มีโหนดใดมีอภิสิทธิ์ถาวร</li>
                <li><strong>2. Shard Robustness:</strong> แต่ละ Shard ต้องดำเนินงานได้อย่างถูกต้องและต่อเนื่อง ไม่หยุดชะงัก</li>
                <li><strong>3. Secure Transactions:</strong> ธุรกรรมต้องสำเร็จแบบ Atomic หรือยกเลิกทั้งหมด ป้องกันการจ่ายเงินซ้ำ 100%</li>
                <li><strong>4. Scale-Out:</strong> Throughput รวมต้องเพิ่มขึ้นเป็นสัดส่วนเชิงเส้นตามจำนวนโหนดผู้ตรวจสอบ</li>
                <li><strong>5. Low Storage Overhead:</strong> โหนดไม่ต้องเก็บประวัติบล็อกเชนทั้งหมด ใช้พื้นที่จัดเก็บต่ำ</li>
                <li><strong>6. Low Latency:</strong> ยืนยันธุรกรรมได้รวดเร็วในระดับไม่กี่วินาที</li>
              </ul>
            </div>
          </div>

        </div>
      </article>
    """

def get_page_4():
    return """
      <!-- ────────────────── หน้า 4 ────────────────── -->
      <article class="thai-page-article" data-page="4" style="display: none;">
        <div class="thai-page-badge-row">
          <span class="badge badge-accent" style="background: var(--accent2); color: white;">หน้า 4 / 16</span>
          <span class="badge" style="background: var(--paper2); color: var(--ink-soft); border: 1px solid var(--rule);">Section IV: System Architecture Overview</span>
        </div>
        <h2 class="thai-section-heading">หน้า 4: ภาพรวมสถาปัตยกรรม 4 เสาหลัก และ Fig. 2 Overview (Section IV.A)</h2>
        
        <div class="thai-summary-box">
          <strong>สรุปสาระสำคัญประจำหน้า 4 (Executive Summary):</strong>
          <ul style="margin: 6px 0 0 18px; padding: 0; line-height: 1.8;">
            <li><strong>ภาพรวมสถาปัตยกรรม Fig. 2:</strong> แสดงกลไกการทำงานร่วมกันของ OmniLedger ในแต่ละรอบ Epoch ประกอบด้วย Identity Blockchain สำหรับบันทึกตัวตน, RandHound สำหรับสร้างค่าสุ่มระดับเครือข่าย, การจัดสรร Validator เข้าสู่ Shards 1 ถึง $m$, ฉันทามติ ByzCoinX ภายใน Shard, โปรโตคอล Atomix ข้าม Shard และ State Blocks สำหรับตัดแต่งประวัติ</li>
            <li><strong>จุดบกพร่องของโปรโตคอลจำลอง (Strawman Protocol):</strong> หากสร้างระบบ Sharding แบบพื้นฐานที่ใช้บุคคลที่สามที่เชื่อถือได้ (Trusted Third Party) ในการสร้างค่าสุ่ม, สลับโหนดใหม่หมด 100% ทุกรอบ Epoch และใช้ 2-Phase Commit (2PC) แบบดั้งเดิม ระบบจะล้มเหลวทันทีเนื่องจากขาดการกระจายศูนย์ และเครือข่ายต้องหยุดประมวลผลธุรกรรมทั้งหมดระหว่างการปรับโครงสร้าง Shard</li>
            <li><strong>การลงทะเบียนตัวตน (Identity Registration):</strong> ในช่วงก่อนสิ้นสุด Epoch $e-1$ โหนดใหม่ที่ต้องการเป็นผู้ตรวจสอบจะเสนอหลักฐานตัวตนเข้าสู่เครือข่าย และเมื่อเริ่ม Epoch $e$ ผู้นำจะนำเสนอ Identity Block ให้โหนดที่มีอยู่เดิมร่วมลงนามรับรองเข้าสู่ Identity Blockchain</li>
            <li><strong>การแจกแจงเข้าสู่ Shard ด้วยค่าสุ่มสาธารณะ:</strong> นำค่าสุ่มที่ได้จาก RandHound มาเป็น Seed ในการสับเปลี่ยนลำดับ (Permutation) ของโหนดทั้งหมด แล้วแบ่งเป็นกลุ่มย่อย $m$ กลุ่มอย่างสุ่มและเป็นกลางทางสถิติ</li>
            <li><strong>การรักษาอัตราส่วนความปลอดภัย:</strong> การสุ่มแบบเป็นกลางรับประกันด้วยความน่าจะเป็นสูงยิ่งว่า สัดส่วนของโหนดไม่ดีในแต่ละ Shard จะใกล้เคียงกับสัดส่วนผู้โจมตีในเครือข่ายรวม ทำให้ไม่มี Shard ใดถูกยึดอำนาจเกินเกณฑ์ $1/3$</li>
          </ul>
        </div>

        <!-- Presentation Cue Card -->
        <div class="exam-cue-card">
          <div class="exam-cue-title">
            <span>จุดโฟกัสสำหรับการนำเสนอหน้าชั้นเรียน (Presentation Cue Card: หน้า 4)</span>
          </div>
          <ul class="exam-cue-list">
            <li><strong>แผนภาพศูนย์กลาง (Master Architecture Diagram):</strong> ใช้ Fig. 2 ในหน้านี้เป็นภาพใหญ่ในการอธิบายตลอดการพรีเซนต์ ชี้ให้เห็นว่า Shards 1, 2, 3 สื่อสารกันอย่างไรผ่าน Atomix</li>
            <li><strong>แนวคิด Strawman vs Reality:</strong> ชี้ให้ผู้ฟังเห็นว่าการคิดระบบแบบง่ายๆ (สลับโหนดทั้งหมด, พึ่งเซิร์ฟเวอร์สุ่มกลาง) จะทำให้ระบบพังอย่างไร เพื่อขับเน้นความชาญฉลาดของการออกแบบใน OmniLedger</li>
            <li><strong>คำศัพท์ทางเทคนิคที่ต้องจำ:</strong> Identity Blockchain, Shard Assignment, Permutation, RandHound Beacon</li>
          </ul>
        </div>

        <div class="thai-trans-block">
          
          <!-- Unit 1: Fig. 2 Architecture Diagram Analysis -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">การวิเคราะห์แผนผังสถาปัตยกรรม Fig. 2: OmniLedger Architecture Overview</span>
              <span class="unit-en-ref">Fig. 2 Analysis · Page 586</span>
            </div>
            <div class="original-en-quote">
              &ldquo;Fig. 2: OmniLedger architecture overview: At the beginning of an epoch e, all validators (shard membership is visualized through the different colors) (1) run RandHound to re-assign randomly a certain threshold of validators to new shards and assign new validators who registered to the identity blockchain in epoch e-1. Validators ensure (2) consistency of the shards&rsquo; ledgers via ByzCoinX while clients ensure (3) consistency of their cross-shard transactions via Atomix&hellip;&rdquo;
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลและคำอธิบายแผนภาพ Fig. 2:</strong><br>
              แผนภาพแสดงขั้นตอนการทำงานหลัก 3 ขั้นตอนที่สอดประสานกันอย่างเป็นระบบ:
              <ol style="margin: 8px 0 8px 18px; padding: 0; line-height: 1.85;">
                <li><strong>(1) การสุ่มจัดสรรโหนดเข้าสู่ Shard (Epoch Reconfiguration):</strong> เมื่อเริ่มต้นรอบ Epoch $e$ โหนดผู้ตรวจสอบทั้งหมด (แสดงด้วยสีต่างๆ ตาม Shard) จะร่วมกันรันโปรโตคอล RandHound เพื่อสุ่มสลับโหนดบางส่วนไปยัง Shard ใหม่ และจัดสรรโหนดหน้าใหม่ที่เพิ่งลงทะเบียนใน Identity Blockchain ของ Epoch $e-1$ เข้าสู่ Shard ต่างๆ</li>
                <li><strong>(2) ฉันทามติภายใน Shard (Intra-Shard Consistency):</strong> ผู้ตรวจสอบภายในแต่ละ Shard จะใช้โปรโตคอล <strong>ByzCoinX</strong> เพื่อสร้างฉันทามติรับรองบล็อกธุรกรรมใหม่ และตัดแต่งประวัติข้อมูลเก่าเป็นระยะด้วย <strong>State Blocks</strong></li>
                <li><strong>(3) ธุรกรรมข้าม Shard ด้วย Atomix (Cross-Shard Coordination):</strong> ฝั่งไคลเอนต์ทำหน้าที่เป็นผู้ขับเคลื่อนโปรโตคอล <strong>Atomix</strong> (ในรูปตัวอย่าง ไคลเอนต์ใช้เงินจาก Shard 1 และ Shard 2 เพื่อโอนเงินเข้าสู่บัญชีใหม่ใน Shard 3) โดยติดต่อขอหลักฐานการล็อกเงิน (Lock Proofs) จาก Shard ต้นทาง แล้วนำไปส่งมอบให้ Shard ปลายทางเพื่อสร้างเงินใหม่อย่างปลอดภัย</li>
              </ol>
            </div>
            <div class="engineering-annotation">
              <strong>ข้อสังเกตการแบ่งหน้าที่ (Separation of Concerns):</strong> OmniLedger แยกความรับผิดชอบอย่างชาญฉลาด: เครือข่าย Shards ดูแลเฉพาะความถูกต้องของข้อมูลภายในกลุ่มตนเอง ส่วนการประสานงานข้าม Shard ถูกผลักให้เป็นภาระของไคลเอนต์ ทำให้โหนดใน Shard ไม่ต้องรับภาระเชื่อมต่อเครือข่ายข้าม Shard ให้ซับซ้อน
            </div>
          </div>

          <!-- Unit 2: Strawman vs Real Protocol -->
          <div class="trans-section-unit">
            <div class="trans-unit-header">
              <span class="unit-title">โปรโตคอลแบบพื้นฐาน (Strawman) และจุดที่ทำให้ระบบล้มเหลว</span>
              <span class="unit-en-ref">Section IV · Page 586 (Col. 2)</span>
            </div>
            <div class="thai-full-translation">
              <strong>บทแปลและวิเคราะห์:</strong><br>
              เพื่อให้เข้าใจถึงความจำเป็นของสถาปัตยกรรม OmniLedger ผู้วิจัยได้นำเสนอโปรโตคอลแบบพื้นฐาน (Strawman Protocol) ที่เรียกว่า <strong>SLedger</strong> ซึ่งทำงานโดย:<br>
              1. พึ่งพาบริการสุ่มค่าภายนอกที่เชื่อถือได้ (Trusted Third Party Randomness Beacon)<br>
              2. สลับเปลี่ยนโหนดผู้ตรวจสอบทั้งหมด 100% ในทุกๆ รอบ Epoch<br>
              3. ใช้โปรโตคอล 2-Phase Commit (2PC) แบบดั้งเดิมที่ให้ Shard ต้นทางส่งข้อความหา Shard ปลายทางโดยตรง<br><br>
              <strong>ทำไม SLedger ถึงใช้การไม่ได้ในโลกความเป็นจริง?</strong><br>
              - <em>การมีจุดล้มเหลวเดี่ยว:</em> การพึ่งพา Trusted Beacon ขัดแย้งกับหลักการบล็อกเชนไร้ศูนย์ หาก Beacon ถูกโจมตี ระบบจะล่มสลายทันที<br>
              - <em>ระบบต้องหยุดชะงัก (Service Interruption):</em> การสลับโหนดใหม่หมด 100% ทำให้เครือข่ายต้องหยุดรับธุรกรรมไประยะเวลาหนึ่ง เพื่อรอให้โหนดใหม่ดาวน์โหลดประวัติและตั้งไข่ (Bootstrap) จนครบ<br>
              - <em>ปัญหา Deadlock จาก 2PC ดั้งเดิม:</em> หาก Shard หรือโหนดที่เกี่ยวข้องเกิดขัดข้องหรือเกิดปัญหาเครือข่ายชั่วคราว เงินจะติดค้างในสถานะรอการยืนยันโดยไม่มีทางปลดล็อกได้
            </div>
          </div>

        </div>
      </article>
    """
