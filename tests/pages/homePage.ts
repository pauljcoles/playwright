import type { Page, Locator } from '@playwright/test'

export class homePageElements {
    readonly page: Page
    readonly loggedInUser: Locator


    constructor(page: Page) {
        this.page = page
        this.loggedInUser = page.locator('.oxd-userdropdown-name')
    }

    async expectSuccessfulLogin() {
        await this.page.waitForURL(/.*dashboard/);
        await this.loggedInUser.waitFor({ state: 'visible' });
    }


}