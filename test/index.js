const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('Date Time Checker', function () {
    this.timeout(10000); // Thiết lập timeout

    let driver;

    before(async function () {
        let chromeOptions = new chrome.Options();
        chromeOptions.addArguments('--headless');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .build();

        await driver.get('http://127.0.0.1:5500/web/index.html');
        await driver.sleep(1); // Chờ load xong thẻ HTML
    });

    after(async function () {
        await driver.quit();
    });

    it('Input valid date and submit then message must display "Oke"', async function () {
        await driver.findElement(By.id('day')).sendKeys('10');
        await driver.findElement(By.id('month')).sendKeys('10');
        await driver.findElement(By.id('year')).sendKeys('2022');

        await driver.findElement(By.id('form')).submit();

        let result = await driver.findElement(By.id('Messagelabel')).getText();

        // Sử dụng assert
        assert.strictEqual(result, 'Oke', 'Kết quả không chính xác');

    });

    it('Input out range date and submit then message must display "Day out of range\nMonth out of range\nYear out of range"', async function () {
        await driver.findElement(By.id('day')).sendKeys('10431');
        await driver.findElement(By.id('month')).sendKeys('10431');
        await driver.findElement(By.id('year')).sendKeys('2022431');

        await driver.findElement(By.id('form')).submit();

        let result = await driver.findElement(By.id('Messagelabel')).getText();

        // Sử dụng assert
        assert.strictEqual(result, 'Day out of range\nMonth out of range\nYear out of range', 'Kết quả không chính xác');

    });
});
