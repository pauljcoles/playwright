import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Login Page Tests', () => {
    const BASE_PATH = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
    const VALID_USERNAME = 'Admin';
    const VALID_PASSWORD = 'admin123';

    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_PATH);
    });

    test('it should log into the site', async ({ page }) => {
        await page.locator('input[name="username"]').fill(VALID_USERNAME);
        await page.locator('input[name="password"]').fill(VALID_PASSWORD);
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL(/.*dashboard/);
        await expect(page.locator('.oxd-userdropdown-name')).toBeVisible();
    });

    test('should show error message with invalid credentials', async ({ page }) => {
        await page.locator('input[name="username"]').fill('invalid_user');
        await page.locator('input[name="password"]').fill('invalid_pass');
        await page.getByRole('button', { name: 'Login' }).click();

        await expect(page.locator('.oxd-alert-content')).toBeVisible();
        await expect(page.locator('.oxd-alert-content')).toContainText('Invalid credentials');
    });
});