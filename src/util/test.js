const webdriver = require('selenium-webdriver');



// username: Username can be found at automation dashboard
const USERNAME = "kazan.hoangtom.99";

// Accesskey:  Accesskey can be generated from automation dashboard or profile section
const KEY = 'RN5pShvDmU6iZAee3FVN8TTPqTgd3b7IQqcP95A0E3hbwZj1wK';

// gridUrl: gridUrl can be found at automation dashboard
const GRID_HOST = 'hub.lambdatest.com/wd/hub';

function searchTextOnGoogle() {
    // Setup Input capabilities
    const capabilities = {
        platform: 'Windows 10',
        browserName: 'Chrome',
        version: '92.0',
        resolution: '1024x768',
        network: true,
        visual: true,
        console: true,
        video: true,
        name: 'Test 1', // name of the test
        build: 'NodeJS build' // name of the build
    }

    // URL: https://{username}:{accessKey}@{GRID_HOST}
    const gridUrl = 'https://' + USERNAME + ':' + KEY + '@' + GRID_HOST;

    // setup and build selenium driver object
    const driver = new webdriver.Builder()
        .usingServer(gridUrl)
        .withCapabilities(capabilities)
        .build();

    // navigate to a url, click on the first and second list items and add a new one in the list.
    driver.get('https://lambdatest.github.io/sample-todo-app/').then(function () {
        driver.findElement(webdriver.By.name('li1')).click().then(function () {
            console.log("Successfully clicked first list item.");
        });
        driver.findElement(webdriver.By.name('li2')).click().then(function () {
            console.log("Successfully clicked second list item.");
        });

        driver.findElement(webdriver.By.id('sampletodotext')).sendKeys('Complete Lambdatest Tutorial').then(function () {
            driver.findElement(webdriver.By.id('addbutton')).click().then(function () {
                console.log("Successfully added a new task.");
            })
        });

    }).catch(function (err) {
        console.log("test failed with reason " + err)
        driver.executeScript('lambda-status=failed');
        driver.quit();
    });
}


module.exports = { searchTextOnGoogle };