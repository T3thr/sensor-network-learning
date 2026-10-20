async page => {
 await page.reload();await page.locator('#studio-reset').click();
 await page.locator('#studio-scrub').evaluate(e=>{e.value=24.8;e.dispatchEvent(new Event('input',{bubbles:true}));});
 await page.locator('#studio-play').click();await page.waitForTimeout(450);await page.locator('#studio-play').click();
 if(await page.locator('#studio-page').textContent()!=='2 / 7')throw Error('Automatic slide change at 0:25');
 await page.locator('#studio-font').click();await page.locator('#studio-scrub').evaluate(e=>{e.value=195;e.dispatchEvent(new Event('input',{bubbles:true}));});await page.locator('#studio-speed').selectOption('1');await page.locator('#studio-play').click();await page.waitForTimeout(200);await page.locator('#studio-play').click();
 if(await page.locator('#studio-prompter').evaluate(e=>e.scrollTop)<=0)throw Error('Teleprompter automatic scroll');
 await page.locator('#studio-reset').click();await page.locator('#v4-sec-rehearsal').evaluate(e=>e.scrollIntoView({behavior:'instant'}));await page.locator('#studio').screenshot({path:'uni-work/senior-subject/sensor-network/paper-4/output/playwright/studio-full.png'});
 for (const width of [320,1920]){await page.setViewportSize({width,height:900});if(!(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)))throw Error('Overflow '+width);}
 await page.setViewportSize({width:1440,height:1000});await page.evaluate(()=>scrollTo(0,0));
}
