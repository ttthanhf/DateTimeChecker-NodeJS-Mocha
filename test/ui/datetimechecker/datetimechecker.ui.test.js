const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('Date Time Checker Date Validation', function () {
    this.timeout(10000);

    let driver;

    before(async function () {
        let chromeOptions = new chrome.Options();
        // chromeOptions.addArguments('--headless');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .build();

        await driver.get('http://127.0.0.1:5500/web/index.html');
        await driver.sleep(1);
    });

    after(async function () {
        await driver.quit();
    });

    afterEach(async function () {
        await new Promise(resolve => setTimeout(resolve, 0));
        await clearAllInput();
    });

    //function-head
    async function clearAllInput(delay = 0) {
        await driver.findElement(By.id('day')).clear();
        await driver.findElement(By.id('month')).clear();
        await driver.findElement(By.id('year')).clear();
        await driver.sleep(delay)
    }

    async function inputDateAndSubmit(day, month, year, delay = 0) {
        await driver.findElement(By.id('day')).sendKeys(day);
        await driver.sleep(delay)
        await driver.findElement(By.id('month')).sendKeys(month);
        await driver.sleep(delay)
        await driver.findElement(By.id('year')).sendKeys(year);
        await driver.sleep(delay)
        await driver.findElement(By.id('form')).submit();
    }

    async function getValidationMessages() {
        let msgDayError = await driver.findElement(By.id('DayLabelError')).getText();
        let msgMonthError = await driver.findElement(By.id('MonthLabelError')).getText();
        let msgYearError = await driver.findElement(By.id('YearLabelError')).getText();
        let msgDayInMonthLabelError = await driver.findElement(By.id('DayInMonthLabelError')).getText();
        let statusValidDate = await driver.findElement(By.id('statusLabel')).getText();
        return {
            msgErrors: {
                msgDayError, msgMonthError, msgYearError, msgDayInMonthLabelError
            },
            statusValidDate
        }
    }
    //function-footer

    //testing-head
    context('Valid input for day, month, and year validation', async function () {
        it('should return true for validDate when input day 1 , month 1, year 2023', async function () {

            await inputDateAndSubmit('1', '1', '2023');
            let { statusValidDate } = await getValidationMessages();
            assert.equal(statusValidDate, 'true');

        });

        it('should return true for validDate when input day 31 , month 3, year 2022', async function () {

            await inputDateAndSubmit('31', '3', '2022');
            let { statusValidDate } = await getValidationMessages();
            assert.equal(statusValidDate, 'true');

        });

        it('should return true for validDate when input day 30 , month 4, year 2021', async function () {

            await inputDateAndSubmit('30', '4', '2021');
            let { statusValidDate } = await getValidationMessages();
            assert.equal(statusValidDate, 'true');

        });

        it('should return true for validDate when input day 28 , month 2, year 2001', async function () {

            await inputDateAndSubmit('28', '2', '2021');
            let { statusValidDate } = await getValidationMessages();
            assert.equal(statusValidDate, 'true');

        });

        it('should return true for validDate when input day 29 , month 2, year 2000', async function () {

            await inputDateAndSubmit('29', '2', '2000');
            let { statusValidDate } = await getValidationMessages();
            assert.equal(statusValidDate, 'true');

        });

    })

    context('Invalid input for day validation', async function () {

        it('should return false for validDate when input day out of allowed range with valid month and year', async function () {

            await inputDateAndSubmit('32', '1', '2021');
            let { statusValidDate } = await getValidationMessages();
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate when input non-numeric values for day with valid month and year', async function () {

            await inputDateAndSubmit('swt', '2', '2022');
            let { statusValidDate } = await getValidationMessages();
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate when input empty values for day with valid month and year', async function () {

            await inputDateAndSubmit('', '3', '2023');
            let { statusValidDate } = await getValidationMessages();
            assert.equal(statusValidDate, 'false');

        });
    })

    context('Invalid input for month validation', async function () {
        it('should return false for validDate when input month out of allowed range with valid day and year', async function () {

            await inputDateAndSubmit('1', '13', '2021');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate when input non-numeric values for month with valid day and year', async function () {

            await inputDateAndSubmit('2', 'fpt', '2022');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate when input empty values for month with valid month day year', async function () {

            await inputDateAndSubmit('3', '', '2023');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(statusValidDate, 'false');

        });
    })

    context('Invalid input for year validation', async function () {

        it('should return false for validDate when input year out of allowed range with valid day and month', async function () {

            await inputDateAndSubmit('1', '1', '-1');
            let { statusValidDate } = await getValidationMessages();
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate when input non-numeric values for year with valid day and month', async function () {

            await inputDateAndSubmit('2', '2', 'selenium');
            let { statusValidDate } = await getValidationMessages();
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate when input empty values for year with valid day and month', async function () {

            await inputDateAndSubmit('3', '3', '');
            let { statusValidDate } = await getValidationMessages();
            assert.equal(statusValidDate, 'false');

        });
    })

    context('Invalid input for date validation', async function () {

        it('should return false for validDate when input more than 29 days in February', async function () {

            await inputDateAndSubmit('30', '2', '2023');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(msgErrors.msgDayInMonthLabelError, "February cannot have more than 29 days.")
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate when input day 31 in April, June, September or November', async function () {

            await inputDateAndSubmit('31', '11', '2023');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(msgErrors.msgDayInMonthLabelError, "April, June, September, and November do not have 31 days.")
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate when input day 29 in February on a non-leap year', async function () {

            await inputDateAndSubmit('29', '2', '2001');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(msgErrors.msgDayInMonthLabelError, "February in non-leap year cannot have 29 days.")
            assert.equal(statusValidDate, 'false');

        });
    })

});
