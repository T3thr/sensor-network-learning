async page => {
const expected={"version": "20261007-wording3", "files": {"../assignement/work4/03_slides/Assignment_Paper_4_PublishTimeOpt_7_Slides.pptx": "141a09e2a43bdd40d2d602895f22dd6e34216ab9afbb0dec37bdf1cce688cce0", "../assignement/work4/03_slides/Assignment_Paper_4_PublishTimeOpt_7_Slides.pdf": "d1362ac53effbd3e2c46e3deeef87c821248cca7e5d0bc05d54389f20ae2fcbf", "assets/slides/slide-1.png?v=20261007-wording3": "f57feeeac61af348f84e12f53d6f562830871125dc1f01a16412ad6d8e154156", "assets/slides/slide-2.png?v=20261007-wording3": "6498b372610c182ac83c074ffa4e268b9f3a48542b87a1a7bb584d4f386af676", "assets/slides/slide-3.png?v=20261007-wording3": "95380e2570d9810bc563e2d7162f49484c6b1214d144c3bcaaa83a371c59e4fc", "assets/slides/slide-4.png?v=20261007-wording3": "f7ba7700721ea35700052b166a2e5a49410f2f1d3e3062606a261615236eb672", "assets/slides/slide-5.png?v=20261007-wording3": "f71065ee77dcbc8eab2fd67f35106b7cccccb6bee3819ad99f54e5739967f9e6", "assets/slides/slide-6.png?v=20261007-wording3": "ee058f83ee3f77a3de9e65117040bb738a6775f608166dd464e6647be947ec48", "assets/slides/slide-7.png?v=20261007-wording3": "1b6ca5fa278638da1150e2b5a766626f23e81cf552f98f1738c20db65229285c"}};
await page.reload();
if(await page.evaluate(()=>PUBTIME_STUDY.version)!==expected.version)throw Error('Outdated teaching data');
for(const [path,hash] of Object.entries(expected.files)){
 const actual=await page.evaluate(async path=>{const response=await fetch(path,{cache:'reload'});if(!response.ok)throw Error('HTTP '+response.status);const data=await response.arrayBuffer();return [...new Uint8Array(await crypto.subtle.digest('SHA-256',data))].map(b=>b.toString(16).padStart(2,'0')).join('');},path);
 if(actual!==hash)throw Error('Stale artifact '+path);
}
await page.locator('.study-nav [data-slide="6"]').click();
if(await page.locator('#studio-title').textContent()!=='สรุปผลและแนวทางวิจัยในอนาคต')throw Error('Last slide title');
if(!(await page.locator('#studio-prompter').textContent()).includes('ผลทดลองด้านซ้าย'))throw Error('Last slide speech');
await page.locator('#studio').screenshot({path:'uni-work/senior-subject/sensor-network/paper-4/output/playwright/studio-wording-last-slide.png'});
await page.locator('.study-nav [data-slide="1"]').click();
await page.locator('#studio').screenshot({path:'uni-work/senior-subject/sensor-network/paper-4/output/playwright/studio-wording-first-content.png'});
await page.evaluate(()=>sessionStorage.setItem('paper4-wording-verification','Current PDF/PPTX and 7 PNG SHA-256 verified; titles, speech, teaching synced.'));
}