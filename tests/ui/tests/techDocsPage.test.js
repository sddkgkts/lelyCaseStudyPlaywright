const { test, expect, chromium } = require('@playwright/test');
const { TechDocsPage } = require('../pages/techDocsPage');

test.describe('TechDocs Page', () => {
  let browser;
  let context;
  let page;
  let techDocsPage;


  test.beforeAll(async () => {
    browser = await chromium.launch(); 
    context = await browser.newContext(); 
    page = await context.newPage(); 
    techDocsPage = new TechDocsPage(page);
    const pageHeader = await techDocsPage.open();
    expect(pageHeader).toEqual('Technical documents');
  });
  
  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status === 'failed') {
      await page.screenshot({
        path: `failure-screenshot-${testInfo.title}.png`,
        fullPage: true, // or just `element.screenshot()` if you need specific elements
      });
    }
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test('should select catalog, view document and download', async () => {
    await techDocsPage.filterProduct('Luna (all documents)', 'Luna', 'tr', '5.4101.0050.1');
    await techDocsPage.viewDocument();
    await techDocsPage.downloadDocument();
  });
  

});
