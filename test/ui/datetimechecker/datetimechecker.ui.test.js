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

    //
    let msgErrorsEmpty = {
        msgDayError: "",
        msgMonthError: "",
        msgYearError: "",
        msgDayInMonthLabelError: ""
    }
    //

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

        it('should return true for validDate and no any error labels display when input day 1 , month 1, year 1', async function () {

            await inputDateAndSubmit('1', '1', '1');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.deepEqual(msgErrors, msgErrorsEmpty);
            assert.equal(statusValidDate, 'true');

        });

        it('should return true for validDate and no any error labels display when input day 31 , month 12, year 3000', async function () {

            await inputDateAndSubmit('31', '12', '3000');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.deepEqual(msgErrors, msgErrorsEmpty);
            assert.equal(statusValidDate, 'true');

        });

        it('should return true for validDate and no any error labels display when input day 30 , month 4, year 3000', async function () {

            await inputDateAndSubmit('30', '4', '3000');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.deepEqual(msgErrors, msgErrorsEmpty);
            assert.equal(statusValidDate, 'true');

        });

        it('should return true for validDate and no any error labels display when input day 30 , month 11, year 3000', async function () {

            await inputDateAndSubmit('30', '11', '3000');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.deepEqual(msgErrors, msgErrorsEmpty);
            assert.equal(statusValidDate, 'true');

        });

        it('should return true for validDate and no any error labels display when input day 30 , month 9, year 3000', async function () {

            await inputDateAndSubmit('30', '9', '3000');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.deepEqual(msgErrors, msgErrorsEmpty);
            assert.equal(statusValidDate, 'true');

        });

        it('should return true for validDate and no any error labels display when input day 30 , month 6, year 3000', async function () {

            await inputDateAndSubmit('30', '6', '3000');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.deepEqual(msgErrors, msgErrorsEmpty);
            assert.equal(statusValidDate, 'true');

        });

        it('should return true for validDate and no any error labels display when input day 28 , month 2, non-leap year 2001', async function () {

            await inputDateAndSubmit('28', '2', '2021');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.deepEqual(msgErrors, msgErrorsEmpty);
            assert.equal(statusValidDate, 'true');

        });

        it('should return true for validDate and no any error labels display when input day 29 , month 2, leap year 2000', async function () {

            await inputDateAndSubmit('29', '2', '2000');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.deepEqual(msgErrors, msgErrorsEmpty);
            assert.equal(statusValidDate, 'true');

        });

    })

    context('Invalid input for day validation', async function () {

        it('should return false for validDate and error label display <Day out of range> when input day 32 out of allowed range with valid month and year', async function () {

            await inputDateAndSubmit('32', '1', '2021');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(msgErrors.msgDayError, 'Day out of range')
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate and error label display <Day out of range> when input day 0 out of allowed range with valid month and year', async function () {

            await inputDateAndSubmit('0', '1', '2021');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(msgErrors.msgDayError, 'Day out of range')
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate and error label display <Day is not a number> when input non-numeric values for day with valid month and year', async function () {

            await inputDateAndSubmit('swt', '2', '2022');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(msgErrors.msgDayError, 'Day is not a number')
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate and error label display <Day empty> when input empty values for day with valid month and year', async function () {

            await inputDateAndSubmit('', '3', '2023');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(msgErrors.msgDayError, 'Day empty')
            assert.equal(statusValidDate, 'false');

        });

    })

    context('Invalid input for month validation', async function () {

        it('should return false for validDate and error label display <Month out of range> when input month 13 out of allowed range with valid day and year', async function () {

            await inputDateAndSubmit('1', '13', '2021');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(msgErrors.msgMonthError, 'Month out of range')
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate and error label display <Month out of range> when input month 0 out of allowed range with valid day and year', async function () {

            await inputDateAndSubmit('1', '0', '2021');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(msgErrors.msgMonthError, 'Month out of range')
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate and error label display <Month is not a number> when input non-numeric values for month with valid day and year', async function () {

            await inputDateAndSubmit('2', 'fpt', '2022');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(msgErrors.msgMonthError, 'Month is not a number')
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate and error label display <Month empty> when input empty values for month with valid month day year', async function () {

            await inputDateAndSubmit('3', '', '2023');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(msgErrors.msgMonthError, 'Month empty')
            assert.equal(statusValidDate, 'false');

        });

    })

    context('Invalid input for year validation', async function () {

        it('should return false for validDate and error label display <Year out of range> when input year 0 out of allowed range with valid day and month', async function () {

            await inputDateAndSubmit('1', '1', '0');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(msgErrors.msgYearError, 'Year out of range')
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate and error label display <Year out of range> when input year 3001 out of allowed range with valid day and month', async function () {

            await inputDateAndSubmit('1', '1', '3001');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(msgErrors.msgYearError, 'Year out of range')
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate and error label display <Year is not a number> when input non-numeric values for year with valid day and month', async function () {

            await inputDateAndSubmit('2', '2', 'selenium');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(msgErrors.msgYearError, 'Year is not a number')
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate and error label display <Year empty> when input empty values for year with valid day and month', async function () {

            await inputDateAndSubmit('3', '3', '');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(msgErrors.msgYearError, 'Year empty')
            assert.equal(statusValidDate, 'false');

        });

    })

    context('Invalid input for date validation', async function () {

        it('should return false for validDate and error label display <February cannot have more than 29 days> when input more than 29 days in February', async function () {

            await inputDateAndSubmit('30', '2', '2023');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(msgErrors.msgDayInMonthLabelError, "February cannot have more than 29 days")
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate and error label display <April, June, September, and November do not have 31 days> when input day 31 in September', async function () {

            await inputDateAndSubmit('31', '9', '2023');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(msgErrors.msgDayInMonthLabelError, "April, June, September, and November do not have 31 days")
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate and error label display <April, June, September, and November do not have 31 days> when input day 31 in June', async function () {

            await inputDateAndSubmit('31', '6', '2023');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(msgErrors.msgDayInMonthLabelError, "April, June, September, and November do not have 31 days")
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate and error label display <April, June, September, and November do not have 31 days> when input day 31 in November', async function () {

            await inputDateAndSubmit('31', '11', '2023');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(msgErrors.msgDayInMonthLabelError, "April, June, September, and November do not have 31 days")
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate and error label display <April, June, September, and November do not have 31 days> when input day 31 in April', async function () {

            await inputDateAndSubmit('31', '4', '2023');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(msgErrors.msgDayInMonthLabelError, "April, June, September, and November do not have 31 days")
            assert.equal(statusValidDate, 'false');

        });

        it('should return false for validDate and error label display <February in non-leap year cannot have 29 days> when input day 29 in February on a non-leap year', async function () {

            await inputDateAndSubmit('29', '2', '2001');
            let { msgErrors, statusValidDate } = await getValidationMessages();
            assert.equal(msgErrors.msgDayInMonthLabelError, "February in non-leap year cannot have 29 days")
            assert.equal(statusValidDate, 'false');

        });
    })

});
