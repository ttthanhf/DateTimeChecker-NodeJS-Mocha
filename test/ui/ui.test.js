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

    it('Input valid date and submit then valid date must display true', async function () {
        await driver.findElement(By.id('day')).sendKeys('10');
        await driver.findElement(By.id('month')).sendKeys('10');
        await driver.findElement(By.id('year')).sendKeys('2022');

        await driver.findElement(By.id('form')).submit();

        let result = await driver.findElement(By.id('statusLabel')).getText();

        assert.equal(result, 'true');

    });

    it('Input out range date and submit then valid date must display false', async function () {
        await driver.findElement(By.id('day')).sendKeys('10431');
        await driver.findElement(By.id('month')).sendKeys('10431');
        await driver.findElement(By.id('year')).sendKeys('2022431');

        await driver.findElement(By.id('form')).submit();

        let result = await driver.findElement(By.id('statusLabel')).getText();

        assert.equal(result, 'false');

    });
});
