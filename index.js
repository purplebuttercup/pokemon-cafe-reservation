import puppeteer from 'puppeteer';
// Or import puppeteer from 'puppeteer-core';

//config for preferences
const preferences = {
  guests: '4',
  day: '26',
  hour: '16:10'
}

//utility function for reload until element is present
async function waitForSelectorWithReload(selector, reloadType) {
  console.log(selector)
  let selectorExists = await page.waitForSelector(selector);
  console.log(selectorExists)
  while (selectorExists === null) {
   await page.reload({ waitUntil: 'domcontentloaded' })
   console.log('reload-----'+reloadType)
   selectorExists = await page.$(selector)
 }
}

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({headless: false});
const page = await browser.newPage();
// Navigate the page to a URL.
page.goto('https://reserve.pokemon-cafe.jp/reserve/step1');
// Set screen size.
page.setViewport({width: 1080, height: 1024});


//------- STEP 1 ---------
//RELOAD day selection
await waitForSelectorWithReload('select[name="guest"]', 'month selection');
// select no. of people.
await page.waitForSelector('select[name="guest"]').then(() => {
  page.select('select[name="guest"]', preferences.guests);
});

//click next month
await page.waitForSelector('.calendar-pager');
await (await page.$$('.calendar-pager'))[1].click();

//click day
await page.locator('div ::-p-text('+ preferences.day +')').click();

//click 'Next step bttn'
await page.locator('.button-container').click();


//------- STEP 2 ---------
const hour = "18:00";
//RELOAD hour selection
await waitForSelectorWithReload('select[name="guest"]', 'month selection');
//select hour
await page.locator('div ::-p-text('+ preferences.hour +')').click();


// Close browser.
//await browser.close();
