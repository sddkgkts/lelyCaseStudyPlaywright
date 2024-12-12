// tests/ui/tests/homePage.test.js
const { test, expect, chromium } = require('@playwright/test');
const { HomePage } = require('../pages/homePage');

test.describe('Home Page Search', () => {
  let browser;
  let context;
  let page;
  let homePage;

  test.beforeAll(async () => {
    browser = await chromium.launch(); 
    context = await browser.newContext(); 
    page = await context.newPage(); 
    homePage = new HomePage(page);
    await homePage.open();
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      await page.screenshot({
        path: `failure-screenshot-${testInfo.title}.png`,
        fullPage: true, // or just `element.screenshot()` if you need specific elements
      });
    }
  });

  test('should Click the search button and verify search area appeared', async () => {
    await homePage.isSearchSectionVisible()
    const query = 'europe';
    await homePage.performSearch(query);
    await homePage.verifySearchResultsContainQuery(query);
  });

});
