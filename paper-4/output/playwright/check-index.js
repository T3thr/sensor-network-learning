async page => {
 const checks=[], assert=(ok,name)=>{if(!ok)throw Error(name);checks.push(name);};
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.reload();await page.locator('#gl-body tr').first().waitFor();
 assert(await page.locator('main > section').count()===12,'12 sections');
 assert(await page.locator('#gl-body tr').count()===20,'20 glossary entries');
 await page.locator('#gl-search').fill('hydration');assert(await page.locator('#gl-body tr').count()===2,'live glossary search');
 await page.locator('#gl-search').fill('zz-no-match');assert(await page.locator('#gl-empty').isVisible(),'empty search state');await page.locator('#gl-search').fill('');
 await page.locator('#sim-baseline').click();await page.locator('#sim-run').click();
 const baseline=await page.locator('#sim-ttr').textContent();assert(baseline==='4,957.6','synthetic baseline formula');
 await page.locator('#sim-render').check();assert(await page.locator('#sim-prep').isChecked()&&await page.locator('#sim-cache').isChecked(),'cumulative optimizer selection');
 await page.locator('#sim-run').click();assert(await page.locator('#sim-ttr').textContent()==='808.1','Table 1 TTR ratio applied');
 assert(await page.locator('#sim-sc').textContent()==='48.48','storage ratio applied');
 await page.waitForFunction(()=>document.querySelectorAll('.sim-node.done').length===4,{},{timeout:5000});assert((await page.locator('#sim-log').textContent()).includes('[DONE]'),'ordered animation/log completion');
 await page.locator('#sim-cache').uncheck();assert(!(await page.locator('#sim-render').isChecked()),'dependent level cleared');
 await page.locator('#sim-rows').selectOption('10000');await page.locator('#sim-spec').selectOption('taxis');await page.locator('#sim-baseline').click();await page.locator('#sim-run').click();assert(await page.locator('#sim-ttr').textContent()==='468','dataset/spec selectors change model');
 await page.locator('#studio-reset').click();assert(await page.locator('#studio-clock').textContent()==='5:00','5 minute reset');
 await page.locator('#studio-play').click();await page.waitForTimeout(1200);await page.locator('#studio-play').click();assert(await page.locator('#studio-clock').textContent()!=='5:00','timer runs and pauses');
 await page.locator('#studio-next').click();assert(await page.locator('#studio-page').textContent()==='2 / 7','slide and notes synchronized');
 await page.locator('#studio-timeline button[data-slide="6"]').click();assert((await page.locator('#studio-title').textContent()).includes('ข้อสรุป'),'timeline seek last slide');assert((await page.locator('#studio-slide').getAttribute('src')).endsWith('slide-7.png'),'slide image sync');
 await page.locator('#studio-reset').click();await page.locator('#studio').focus();await page.keyboard.press('Space');await page.waitForTimeout(250);await page.keyboard.press('Space');assert(await page.locator('#studio-play').textContent()==='ซ้อมต่อ','space shortcut');await page.keyboard.press('ArrowRight');assert(await page.locator('#studio-page').textContent()==='2 / 7','arrow shortcut');
 await page.locator('#studio-font').click();await page.locator('#studio-next').click();assert(await page.locator('#studio-prompter p').evaluate(el=>getComputedStyle(el).fontSize)==='21.6px','large font persists after slide change');
 await page.locator('#studio-scrub').evaluate(el=>{el.value=299.8;el.dispatchEvent(new Event('input',{bubbles:true}));});await page.locator('#studio-play').click();await page.waitForTimeout(500);assert(await page.locator('#studio-status').textContent()==='ครบเวลา 5:00','timer stops at limit');await page.locator('#studio-reset').click();
 assert(await page.locator('#qa-list details').count()===15,'15 defense questions');await page.locator('#qa-filter').selectOption('สถาปัตยกรรมระบบ');assert(await page.locator('#qa-list details:visible').count()===5,'question category filter');await page.locator('#qa-expand').click();assert(await page.locator('#qa-list details[open]:visible').count()===5,'accordion open visible category');
 for(let i=0;i<5;i++)await page.locator(`input[name=q${i}][value="0"]`).check();await page.locator('#quiz-form button[type=submit]').click();assert((await page.locator('#quiz-score').textContent()).includes('1 / 5'),'wrong answers scored correctly');
 for(const [i,v] of [1,1,0,2,2].entries())await page.locator(`input[name=q${i}][value="${v}"]`).check();await page.locator('#quiz-form button[type=submit]').click();assert((await page.locator('#quiz-score').textContent()).includes('5 / 5'),'perfect quiz score');await page.locator('#quiz-reset').click();assert(await page.locator('#quiz-form input:checked').count()===0,'quiz reset');
 await page.locator('#bib-copy').click();await page.waitForFunction(()=>document.getElementById('bib-status').textContent.includes('คัดลอกแล้ว'));assert((await page.locator('#bib-status').textContent()).includes('คัดลอกแล้ว'),'BibTeX copy');
 const downloads=await page.locator('.pub-download').evaluateAll(es=>es.map(e=>e.href));for(const url of downloads)assert((await page.request.get(url)).ok(),'download HTTP 200 '+url.split('/').pop());
 for(const width of [1440,768,390]){await page.setViewportSize({width,height:900});await page.evaluate(()=>scrollTo(0,0));assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'index no horizontal overflow '+width);await page.screenshot({path:`uni-work/senior-subject/sensor-network/paper-4/output/playwright/index-${width}.png`});}
 await page.setViewportSize({width:1440,height:1000});await page.locator('#v4-sec-rehearsal').scrollIntoViewIfNeeded();await page.screenshot({path:'uni-work/senior-subject/sensor-network/paper-4/output/playwright/studio.png'});
 await page.locator('#studio-slide').click();assert(await page.locator('#figure-dialog').isVisible(),'slide zoom dialog');await page.keyboard.press('Escape');assert(!(await page.locator('#figure-dialog').isVisible()),'dialog escape closes');
 await page.locator('.theme-toggle-btn').click();assert(await page.locator('html').getAttribute('data-theme')==='dark','shared dark mode');await page.screenshot({path:'uni-work/senior-subject/sensor-network/paper-4/output/playwright/studio-dark.png'});await page.locator('.theme-toggle-btn').click();
 assert(errors.length===0,'no runtime errors');console.log(JSON.stringify({checks,errors},null,2));
}
