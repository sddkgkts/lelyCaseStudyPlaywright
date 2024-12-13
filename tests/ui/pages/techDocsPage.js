// tests/ui/pages/techDocsPage.js

const { expect } = require("@playwright/test"); // Import the Playwright test assertion module
const fs = require("fs");
const path = require("path");
class TechDocsPage {
  constructor(page) {
    this.page = page;
    this.docSearchBar = page.locator("#select2-id_q-container");
    this.searchBarInput = page.locator(
      'input.select2-search__field[role="textbox"]'
    );
    this.documentLink = page.locator("//a[].button button-secondary icon-pdf"); // Update based on actual locator
  }

  async open() {
    await this.page.goto("https://www.lely.com/techdocs/");
    const acceptCookiesButton = this.page.locator(
      "a#cookienotice-button-accept"
    );
    await acceptCookiesButton.waitFor({ state: "visible" });
    await acceptCookiesButton.click();
    const pageHeader = await this.page
      .locator("h1.page-header-title")
      .textContent();
    return pageHeader;
  }

  async filterProduct(prodcutName, productGroupName, lang, docNumber) {
    await this.docSearchBar.click();
    await this.searchBarInput.fill(productGroupName);
    await this.page.getByRole("treeitem", { name: prodcutName }).click();
    await this.page.waitForTimeout(1000);
    await this.page.getByLabel("Choose a language").locator("b").click();
    await this.page.waitForTimeout(1000);
    await this.page.locator(`li[role="treeitem"]:has-text("${lang}")`).click();
    await this.page.waitForTimeout(1000);
    await this.page.locator("#select2-id_type_number-container").click();
    await this.page.waitForTimeout(1000);
    await this.page
      .locator(`li[role="treeitem"]:has-text("${docNumber}")`)
      .click();
  }

  async selectDropdownItem(dropdownLocator, text) {
    const dropdown = await page.locator(dropdownLocator);
    const item = await dropdown.locator("li", { hasText: text });
    await item.click();
  }

  async viewDocument() {
    await this.page.waitForTimeout(3000);

    const [newTab] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.page.locator("a", { hasText: "View this document" }).click(),
    ]);
    await this.page.waitForTimeout(6000);
    await newTab.waitForLoadState("domcontentloaded");
    const newTabUrl = newTab.url();

    expect(newTabUrl).toContain(".pdf");

    await newTab.close();
  }

  async downloadDocument() {
    // Wait for the download to start
    const downloadPromise = this.page.waitForEvent('download');
    
    // Use a valid selector for the link
    const documentLink = this.page.locator('//a[contains(@class, "button-secondary") and contains(@class, "icon-pdf")]');
    await documentLink.click(); // Trigger the download
    
    // Wait for the download to complete
    const download = await downloadPromise;
  
    const downloadPath = path.join(__dirname, 'downloads', 'document.pdf');
    
    // Save the file
    await download.saveAs(downloadPath); 
  
    console.log('Download complete: document.pdf');
  
    // Ensure the file exists
    expect(fs.existsSync(downloadPath)).toBe(true);
    await this.page.waitForTimeout(10000);
    // Optionally delete the file after validation
   fs.unlinkSync(downloadPath);
    console.log('File deleted: document.pdf');
  
    // Ensure the file is deleted
    expect(fs.existsSync(downloadPath)).toBe(false);
  }
}

module.exports = { TechDocsPage };
