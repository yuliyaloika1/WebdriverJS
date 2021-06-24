const {Builder, By, Key, until} = require('selenium-webdriver');
const chromedriver = require('chromedriver');


(async function seleniumTest() {
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let driver = await new Builder().forBrowser('chrome').build();
    try {
        driver.manage().window().maximize();
        await driver.get('https://www.epam.com');
        await driver.wait(until.elementLocated(By.css('button.cookie-disclaimer__button'), 5000));
        await driver.findElement(By.css('button.cookie-disclaimer__button')).click();
        await driver.findElement(By.css('li a[href *= careers]')).click();
        const skillsArrow = driver.findElement(By.css('div.selected-params'));
        await skillsArrow.click();
        await sleep(100);
        await driver.findElement(By.xpath('//span[contains(text(), \'Management\')]')).click();
        await skillsArrow.click();
        const managementItem = driver.findElement(By.css('ul.selected-items li[data-value=\'Management\']'));
        expect(managementItem).not.null();
    }
    finally {
        await driver.quit();
    }
})();

