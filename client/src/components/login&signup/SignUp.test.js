const puppeteer = require('puppeteer')

//END TO END TESTING
test('should change input value for first name', ()=> {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
    })
    const page = await browser.newPage();
    await page.goto('https://stylistfind.now.sh/signup')
    await page.click('input#first_name')
    await page.type('input#Sandy')
    const finalText = await page.$eval('.first_name', el=>el.textContent);
    expect(finalText).toBe('Sandy')
})