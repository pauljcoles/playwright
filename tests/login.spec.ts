import { test, expect } from '@playwright/test';
import { LoginPageElements as loginPageElements } from './pages/loginPage';
import { homePageElements } from './pages/homePage';

test.describe('OrangeHRM Login Page Tests', () => {
    const BASE_PATH = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
    const VALID_USERNAME = 'Admin';
    const VALID_PASSWORD = 'admin123';


    test.beforeEach(async ({ page }) => {
      await page.goto(BASE_PATH);
  });


    test('it should login successfully', async ({ page }) => {
        const loginPage = new loginPageElements(page);
        const homePage = new homePageElements(page);
        await loginPage.login(VALID_USERNAME, VALID_PASSWORD);
        await homePage.expectSuccessfulLogin();
    });

    test('it should show error message with invalid credentials', async ({ page }) => {
        const loginPage = new loginPageElements(page);        
        await loginPage.login('invalid_user', 'invalid_pass');
        const errorMessage = await loginPage.expectErrorMessage('Invalid credentials');
        expect(errorMessage).toContain('Invalid credentials');
    });
});