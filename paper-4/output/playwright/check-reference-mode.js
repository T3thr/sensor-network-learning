async page => {
 await page.locator('button[data-mode=thai]').click();
 if(!(await page.locator('#ref-22 .bibliographic-original').isVisible()))throw Error('Complete citation absent in Thai mode');
 if(!(await page.locator('#ref-22 .bibliographic-original').textContent()).includes('Mühleisen'))throw Error('Citation accent');
 await page.locator('button[data-mode=dual]').click();
 if(await page.locator('#ref-22 .bibliographic-original').isVisible())throw Error('Citation duplicated in dual view');
 await page.locator('#p1-01').evaluate(e=>e.scrollIntoView({behavior:'instant'}));
 await page.screenshot({path:'uni-work/senior-subject/sensor-network/paper-4/output/playwright/translation-paragraphs.png'});
 await page.evaluate(()=>scrollTo(0,0));
}
