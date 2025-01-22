# Playwright Test Automation - Employee Management

This repository contains automated tests for the Employee Management application using Playwright. It tests logging in and changing part of the employee's name

## Prerequisites

To run the tests, ensure you have the following installed:

- Node.js (>= 16.x)
- Playwright

You can install Playwright by running:

```bash
npm install playwright
```

## Install dependencies

```bash
npm install
```

## Run tests

```bash
npx playwright test
```

## Known issues

* Shared Data - The Orange HRM system is used by people to test automation, as such sometimes it gets broken. I've added something to catch an error when updating details, but it'll stop the test. The site refreshes after some time, so it should work later. Unfortunately, it stopped being broken after I added the catch, so I don't know if it will actually work...
* Slow Response Times - occasionally the site runs slowly, I've increased the default timeout in playwright for this.

## Improvements

* There's some repetition of the URL, log in details and navigation.