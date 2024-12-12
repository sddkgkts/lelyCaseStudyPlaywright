// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

module.exports = defineConfig({
  testDir: './tests',
  timeout: 50000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    screenshot: 'only-on-failure', // Capture screenshot on failure
    trace: 'on-first-retry',
    // baseURL: 'http://127.0.0.1:3000',  // Uncomment if you need a base URL
  },

  projects: [
    // API tests (no browser)
    {
      name: 'API Tests',
      testDir: './tests/api/tests',
      use: {
        headless: true,  // No browser for API tests
        baseURL: 'https://gorest.co.in/public/v1', // API base URL
      },
    },

    // UI tests on Chromium (Desktop Chrome)
    {
      name: 'UI Tests - Chromium',
      testDir: './tests/ui/tests',
      use: {
        ...devices['Desktop Chrome'],
        screenshot: 'only-on-failure', // Capture screenshot on failure for UI tests
        trace: 'on-first-retry',
      },
    },

  //   // UI tests on Firefox (Desktop Firefox)
  //   {
  //     name: 'UI Tests - Firefox',
  //     testDir: './tests/ui/tests',
  //     use: {
  //       ...devices['Desktop Firefox'],
  //       screenshot: 'only-on-failure',
  //       trace: 'on-first-retry',
  //     },
  //   },

  //   // UI tests on WebKit (Desktop Safari)
  //   {
  //     name: 'UI Tests - WebKit',
  //     testDir: './tests/ui/tests',
  //     use: {
  //       ...devices['Desktop Safari'],
  //       screenshot: 'only-on-failure',
  //       trace: 'on-first-retry',
  //     },
  //   },
  ],

  // Optionally start a web server before running tests
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
