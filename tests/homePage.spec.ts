import { test, expect } from '@playwright/test';
import { LoginPageElements as loginPageElements } from './pages/loginPage';
import { homePageElements } from './pages/homePage';

test.describe('OrangeHRM Home Page Tests', () => {
    const BASE_PATH = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
    const VALID_USERNAME = 'Admin';
    const VALID_PASSWORD = 'admin123';
    let homePage: homePageElements;

    test.beforeEach(async ({ page }) => {
      await page.goto(BASE_PATH);
      const loginPage = new loginPageElements(page);
      homePage = new homePageElements(page);
      await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
      await homePage.expectSuccessfulLogin();
  });

  test('It should save changes to employee details', async ({ page }) => {
   const newFirstname = await homePage.changeFirstName()
   await homePage.expectFirstNameChange(newFirstname)
  });
})