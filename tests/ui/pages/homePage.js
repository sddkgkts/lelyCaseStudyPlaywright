// tests/ui/pages/homePage.js
const { expect } = require('@playwright/test'); // Import Playwright's assertion library

class HomePage {
  constructor(page) {
    this.page = page;
    this.searchSection = page.locator('div.menu-level-2-container', {
      has: page.locator('h3.global-search-container__title:has-text("What are you looking for?")')
    });
    
    this.searchLabel = page.locator('div.header-navigation-button__label:text("Search")'); 
    this.searchButton = page.locator('button.button-tertiary[type="submit"]');
    this.popularSearchLinks = page.locator('h3.search-form__title');  // All the popular search links
    this.searchBar = page.locator('p.form-field > input#global-search');
  }

  async open() {
    await this.page.goto('https://www.lely.com/en');
    
    // Accept cookies if the button is visible
    const acceptCookiesButton = this.page.locator('a#cookienotice-button-accept');
    await acceptCookiesButton.waitFor({ state: 'visible' });
    await acceptCookiesButton.click();
    
    // Assert that the cookies have been accepted by checking if the button is no longer visible
    await expect(acceptCookiesButton).not.toBeVisible();
  }

  async performSearch(query) {
    // Click on the search label to open the search section
    await this.searchLabel.click();
    
    // Assert that the search bar is visible before interacting
    await expect(this.searchBar).toBeVisible();
    
    // Fill the search bar and submit the search
    await this.searchBar.fill(query);
    await this.searchButton.click();
    
    // Assert that the search results page is loaded (you may customize this based on your site structure)
    const resultsHeader = this.page.locator('h1.page-section-title');
    await expect(resultsHeader).toBeVisible();
  }

  async verifySearchResultsContainQuery(query) {
    let nextButtonActive = true;
    
    while (nextButtonActive) {
      // Get the content of the page
      const listItems = this.page.locator('ul.item-list.search-results-list > li');
  
      // Check each item for the specified keyword
      const count = await listItems.count();
      for (let i = 0; i < count; i++) {
        const item = listItems.nth(i);
        await item.scrollIntoViewIfNeeded();
  
        // Get all the highlighted spans in the item
        const highlightedSpans = item.locator('span.highlighted');
        const countOfHighlightedSpans = await highlightedSpans.count();
        let foundKeyword = false;
  
        // Check each highlighted span for the keyword
        for (let l = 0; l < countOfHighlightedSpans; l++) {
          const textContent = await highlightedSpans.nth(l).textContent();
          if (textContent.toLowerCase() === query.toLowerCase()) {
            foundKeyword = true;
            break; // Exit the loop once the keyword is found
          }
        }
  
        // Assert that the keyword was found in the list item
        if (!foundKeyword) {
          throw new Error(`${query} keyword not found in list item ${i + 1} on this page.`);
        }
      }
  
      // Check if the "Next" button is active
      const nextButton = this.page.locator('li.page.page-next a.page-link');
      const isNextButtonVisible = await nextButton.isVisible();
      
      if (!isNextButtonVisible) {
        nextButtonActive = false; // Stop if the "Next" button is disabled
      } else {
        // Click on the "Next" button to go to the next page
        await nextButton.click();
        
        // Wait for the page to load (you may need to adjust this based on your site)
        await this.page.waitForTimeout(1000);  // Replace with a more robust wait, like `waitForNavigation`
      }
    }
  
    // Assert that all pages have been verified for the keyword
    console.log('All pages have been verified for the word "' + query + '"');
  }

  async isSearchSectionVisible() {
    await this.searchLabel.click();
    
    const searchMenu = await this.page.locator('.js.search-active');
    const isSearchMenuActive = await searchMenu.isVisible();
    expect(isSearchMenuActive).toBe(true); 
    // Wait for the search section to be visible
    await this.searchSection.waitFor({ state: 'visible' });
    
    // Assert that the search section is visible
    const isSearchSectionVisible = await this.searchSection.isVisible();
    expect(isSearchSectionVisible).toBe(true);

  }
}

module.exports = { HomePage };
