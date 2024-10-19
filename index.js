import puppeteer from 'puppeteer';
// Or import puppeteer from 'puppeteer-core';
// Launch the browser and open a new blank page
const browser = await puppeteer.launch({headless: false});
const page = await browser.newPage();
// Navigate the page to a URL.
page.goto('https://reserve.pokemon-cafe.jp/reserve/step1');
// Set screen size.
page.setViewport({width: 1080, height: 1024});

//------- STEP 1 ---------
// select no. of people.
await page.waitForSelector('select[name="guest"]').then(() => {
  page.select('select[name="guest"]', "4");
});

//click next month
await page.waitForSelector('.calendar-pager');
await (await page.$$('.calendar-pager'))[1].click();

//click day
const day = "19";
await page.locator('div ::-p-text(19)').click();

//click 'Next step bttn'
await page.locator('.button-container').click();

//------- STEP 2 ---------
//select hour
const hour = "18:00";
await page.locator('div ::-p-text(18:00)').click();


// Close browser.
//await browser.close();



//Instead of constantly navigating to the same url you could use page.reload method in a loop, e.g.:
// await page.goto(url, { waitUntil: 'domcontentloaded' })
// let selectorExists = await page.$('#ourButton')
//
// while (selectorExists === null) {
//   await page.reload({ waitUntil: 'domcontentloaded' })
//   console.log('reload')
//   selectorExists = await page.$('#ourButton')
// }
// await page.click('#ourButton')
// code goes on...
