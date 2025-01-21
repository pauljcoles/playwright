import type { Page, Locator } from '@playwright/test';

export class LoginPageElements {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly loginError: Locator;
    readonly loggedInUser: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('input[name="username"]');
        this.password = page.locator('input[name="password"]');
        this.loginButton = page.getByRole('button', { name: 'Login' }); 
        this.loginError = page.locator('.oxd-alert-content');
    }

    async login(username: string, password: string) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async expectErrorMessage(message: string) {
        await this.loginError.waitFor({ state: 'visible' });
        return this.loginError.textContent();
    }

}