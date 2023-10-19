const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('Housemate testing', function () {
    this.timeout(30000);

    let driver;

    before(async function () {
        let chromeOptions = new chrome.Options();
        // chromeOptions.addArguments('--headless');

        driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .build();
        await driver.get('https://housemate.site/login');
        await driver.wait(until.elementLocated(By.id('email')), 10000);
    });

    after(async function () {
        await driver.quit();
    });

    afterEach(async function () {
        if (driver) {
            const emailElements = await driver.findElements(By.id('email'));
            const passwordElements = await driver.findElements(By.id('password'));

            if (emailElements.length > 0) {
                await emailElements[0].sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE);
            }

            if (passwordElements.length > 0) {
                await passwordElements[0].sendKeys(Key.chord(Key.CONTROL, 'a'), Key.BACK_SPACE);
            }

            await new Promise(resolve => setTimeout(resolve, 1));
        }
    });

    async function checkErrorLabels(email, password) {
        await driver.findElement(By.id('email')).sendKeys(email);
        await driver.findElement(By.id('password')).sendKeys(password);
        await driver.findElement(By.css('form')).submit();
        await driver.sleep(500);

        let isEmailHelpDisplayed = false;
        let isPasswordHelpDisplayed = false;

        let emailHelpPromise = driver.wait(until.elementLocated(By.id('email_help')), 2000)
            .then(emailHelpElement => emailHelpElement.isDisplayed().then(displayed => isEmailHelpDisplayed = displayed))
            .catch(error => { if (error.name !== 'NoSuchElementError') throw error; });

        let passwordHelpPromise = driver.wait(until.elementLocated(By.id('password_help')), 2000)
            .then(passwordHelpElement => passwordHelpElement.isDisplayed().then(displayed => isPasswordHelpDisplayed = displayed))
            .catch(error => { if (error.name !== 'NoSuchElementError') throw error; });

        await Promise.race([emailHelpPromise, passwordHelpPromise]);
        await driver.sleep(500);

        return { isEmailHelpDisplayed, isPasswordHelpDisplayed }
    }

    it('Input invalid email and valid password in login, result should display error label in email', async function () {

        let { isEmailHelpDisplayed, isPasswordHelpDisplayed } = await checkErrorLabels('examplegmail.com', 'Password123')
        let rs = isEmailHelpDisplayed && !isPasswordHelpDisplayed;
        assert.equal(rs, true);

    });

    it('Input valid email and invalid password in login, result should display error label in password', async function () {

        let { isEmailHelpDisplayed, isPasswordHelpDisplayed } = await checkErrorLabels('example@gmail.com', 'password123')
        let rs = !isEmailHelpDisplayed && isPasswordHelpDisplayed;
        assert.equal(rs, true);

    });

    it('Input invalid email and invalid password in login, result should display error label in password', async function () {

        let { isEmailHelpDisplayed, isPasswordHelpDisplayed } = await checkErrorLabels('examplegmail.com', 'password')
        let rs = isEmailHelpDisplayed && isPasswordHelpDisplayed;
        assert.equal(rs, true);

    });

    it('Input empty email and valid password in login, result should display error label in email', async function () {

        let { isEmailHelpDisplayed, isPasswordHelpDisplayed } = await checkErrorLabels('', 'Password123')
        let rs = isEmailHelpDisplayed && !isPasswordHelpDisplayed;
        assert.equal(rs, true);

    });

    it('Input valid email and empty password in login, result should display error label in password', async function () {

        let { isEmailHelpDisplayed, isPasswordHelpDisplayed } = await checkErrorLabels('example@gmail.com', '')
        const rs = isPasswordHelpDisplayed && !isEmailHelpDisplayed;
        assert.equal(rs, true);

    });

    it('Input empty email and empty password in login, result should display error label in password', async function () {

        let { isEmailHelpDisplayed, isPasswordHelpDisplayed } = await checkErrorLabels('', '')
        const rs = isPasswordHelpDisplayed && isEmailHelpDisplayed;
        assert.equal(rs, true);
    });

    it('Input valid email and valid password in login but account not exist, result should display `Email or password not correct` label', async function () {
        await driver.findElement(By.id('email')).sendKeys('example@gmail.com');
        await driver.findElement(By.id('password')).sendKeys('Password123413');
        await driver.findElement(By.css('form')).submit();
        await driver.sleep(500);

        let isHelpDisplayed = false;

        let helpElements = await driver.wait(until.elementsLocated(By.className('ant-message-notice-content')), 10000);
        for (let i = 0; i < helpElements.length; i++) {
            let text = await helpElements[i].getAttribute('innerText');
            if (text === "Email or password not correct") {
                isHelpDisplayed = true;
                break;
            }
        }

        await driver.sleep(500);
        assert.equal(isHelpDisplayed, true);
    });

    // it('Input valid email and valid password in login with email in database and password correct, result should load the page', async function () {

    //     await driver.findElement(By.id('email')).sendKeys('example@gmail.com');
    //     await driver.findElement(By.id('password')).sendKeys('Password123');
    //     await driver.findElement(By.css('form')).submit();

    //     const expectedUrl = 'https://housemate.site/';

    //     await driver.wait(until.urlIs(expectedUrl), 10000);

    //     const currentUrl = await driver.getCurrentUrl();
    //     assert.equal(currentUrl, expectedUrl);
    // });

});