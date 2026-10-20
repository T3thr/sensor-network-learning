(() => {
 'use strict';
 const $=id=>document.getElementById(id), checks=['sim-prep','sim-cache','sim-render'].map($);let timers=[];
 if (!$('sim-run')) return;
 checks.forEach((box,i)=>box.addEventListener('change',()=>{
  if(box.checked) checks.slice(0,i).forEach(x=>x.checked=true);
  else checks.slice(i+1).forEach(x=>x.checked=false);
 }));
 $('sim-baseline').addEventListener('click',()=>checks.forEach(x=>x.checked=false));
 function calculate(){
  const rows=Number($('sim-rows').value),spec=$('sim-spec').value,f=PUBTIME.models[spec],b=(rows/10000)**.72;
  const base={ttr:180*b*f,tta:300*b*f,sc:rows*40/1e6};
  const level=checks[2].checked?3:checks[1].checked?2:checks[0].checked?1:0;
  const ratios=[[1,1,1],[.994,.990,1],[.834,.677,1.211],[.163,.667,1.212]][level];
  return {rows,spec,level,base,ttr:base.ttr*ratios[0],tta:base.tta*ratios[1],sc:base.sc*ratios[2]};
 }
 $('sim-run').addEventListener('click',()=>{
  timers.forEach(clearTimeout);timers=[];
  const r=calculate(),fmt=n=>n.toLocaleString('en-US',{maximumFractionDigits:1});
  $('sim-ttr').textContent=fmt(r.ttr);$('sim-tta').textContent=fmt(r.tta);$('sim-sc').textContent=r.sc.toFixed(2);
  $('sim-comparison').textContent=`ระดับ ${['none','+prep','+cache','+most / +prerender'][r.level]} · เทียบฐานสมมติ TTR ${fmt(r.base.ttr)} ms / TTA ${fmt(r.base.tta)} ms / SC ${r.base.sc.toFixed(2)} MB`;
  const network=.15,render=r.level===3?.03:.40,hydrate=1-network-render;
  [['sim-network-bar',network],['sim-render-bar',render],['sim-hydrate-bar',hydrate]].forEach(([id,n])=>$(id).style.width=`${n*100}%`);
  $('sim-log').textContent=`[MODEL] ${r.spec} · ${r.rows.toLocaleString('en-US')} rows\n[MODEL] เวลาและพื้นที่เป็นค่าประมาณจากฐานสมมติ\n[MODEL] สัดส่วนแท่งเป็นภาพอธิบาย ไม่ใช่ Figure 4 ที่วัดจริง\n`;
  const nodes=[...document.querySelectorAll('.sim-node')];nodes.forEach(n=>n.classList.remove('active','done'));
  const logs=[r.level?'เตรียมทรัพยากรล่วงหน้าตามระดับที่เลือก':'Baseline: รอคำนวณที่ไคลเอนต์','ส่งทรัพยากรจาก Server ไป Browser',r.level===3?'แสดงภาพเริ่มต้นที่วาดล่วงหน้า':'คิวรีและวาดภาพฝั่ง Browser',r.level===3?'เริ่มคอมโพเนนต์ผ่าน hydration; พร้อมรับอินพุต':'เริ่มคอมโพเนนต์และตัวกลางคิวรี; พร้อมรับอินพุต'];
  nodes.forEach((node,i)=>{timers.push(setTimeout(()=>{
   if(i>0){nodes[i-1].classList.remove('active');nodes[i-1].classList.add('done');}
   node.classList.add('active');$('sim-log').textContent+=`[${i+1}/4] ${logs[i]}\n`;$('sim-log').scrollTop=$('sim-log').scrollHeight;
   if(i===3) timers.push(setTimeout(()=>{node.classList.remove('active');node.classList.add('done');$('sim-log').textContent+='[DONE] จบการจำลองแบบย่อเวลา\n';},500));
  },i*600));});
 });
})();
