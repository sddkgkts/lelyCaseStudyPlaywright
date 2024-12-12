# Playwright Test Framework - Lely Case Study

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Framework Structure](#framework-structure)
- [Scripts](#scripts)
  - [Run All Tests](#run-all-tests)
  - [Run UI Tests](#run-ui-tests)
  - [Run API Tests](#run-api-tests)
  - [Run Tests in Chrome](#run-tests-in-chrome)
  - [Run Tests in Headed Mode](#run-tests-in-headed-mode)
- [Dependencies](#dependencies)
- [Quick Start](#quick-start)
- [Author](#author)
- [License](#license)
- [How to Contribute](#how-to-contribute)
- [Support](#support)

## Overview

This repository contains a test automation framework for UI and API testing using [Playwright](https://playwright.dev/). The framework is designed to support testing workflows efficiently and provides easy-to-run scripts for executing tests.

## Prerequisites

To run this framework, you need the following:

- **Node.js**: Install the latest stable version of Node.js. You can download it from [here](https://nodejs.org/).
- **npm**: Comes bundled with Node.js.

## Installation

1. Clone this repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd lelycasestudy
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Framework Structure

- **`tests`**: Contains test files for UI and API.
- **`playwright.config.js`**: Configuration file for Playwright settings.
- **`package.json`**: Defines the project structure, scripts, and dependencies.

## Scripts

The following npm scripts are defined in the `package.json` file:

### Run All Tests

```bash
npm test
```

This will execute all tests in the framework using Playwright.

### Run UI Tests

```bash
npm run test:ui
```

This will execute tests specific to the `UI Tests - Chromium` project.

### Run API Tests

```bash
npm run test:api
```

This will execute tests specific to the `API Tests` project.

### Run Tests in Chrome

```bash
npx playwright test --project='UI Tests - Chromium' --browser=chrome
```

This will execute tests using Google Chrome.

### Run Tests in Headed Mode

```bash
npx playwright test --headed
```

This will execute tests in a headed mode, allowing you to see the browser interactions.

## Dependencies

### Dev Dependencies

- **@playwright/test**: A test framework for Playwright.
- **@types/node**: Provides type definitions for Node.js.

### Dependencies

- **axios**: A promise-based HTTP client for API testing.

## Quick Start

1. Install dependencies: `npm install`
2. Run all tests: `npm test`
3. Run tests in Chrome: `npx playwright test --project='UI Tests - Chromium' --browser=chrome`
4. Run tests in headed mode: `npx playwright test --headed`

## Author

- **Name**: sddk

## License

This project is licensed under the ISC License.

## How to Contribute

Contributions are welcome! If you want to contribute:

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## Support

If you encounter any issues or have questions, please open an issue in the repository.
