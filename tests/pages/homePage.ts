import { type Page, type Locator, expect } from '@playwright/test'

export class homePageElements {
    readonly page: Page;
    readonly loggedInUser: Locator;
    readonly myInfo: Locator;
    readonly dashboard: Locator;
    readonly lastName: Locator;
    readonly myInfoSubmitButton: Locator;
    private currentName: string;
    readonly employeeDetailsForm: Locator;
    readonly errorMessage: Locator;


    constructor(page: Page) {
        this.page = page
        this.loggedInUser = page.locator('.oxd-userdropdown-name')
        this.myInfo = page.getByRole('link', { name: 'My Info' })
        this.dashboard = page.getByRole('link', { name: 'Dashboard'})
        this.lastName = page.locator('input[name="lastName"]')
        this.myInfoSubmitButton = page.getByRole('button', { name: 'Save'}).first();
        this.employeeDetailsForm = page.locator('.orangehrm-edit-employee-content');
        this.errorMessage = page.locator('.oxd-text--span.oxd-input-field-error-message');
    }

    async expectSuccessfulLogin() {
        await this.page.waitForURL(/.*dashboard/);
        await this.loggedInUser.waitFor({ state: 'visible' });
    }

    async changeFirstName(baseName: string = 'Bob'): Promise<string> {
        const randomChars = Math.random().toString(36).substring(2, 7);
        this.currentName = `${baseName}_${randomChars}`;
        await this.myInfo.click()
        await this.page.waitForURL(/.*viewPersonalDetails/);
        await this.page.waitForLoadState('domcontentloaded')
        await this.employeeDetailsForm.waitFor({state : 'attached'})
        await this.lastName.waitFor({state: 'attached'})
        await this.page.waitForFunction(() => {
            const input = document.querySelector('input[name="lastName"]') as HTMLInputElement;
            return input?.value !== '';
        });
        await this.lastName.fill(this.currentName);
        await this.myInfoSubmitButton.click();

// Wait for any error message to appear
    const errorVisible = await this.errorMessage.isVisible();

    // If an error message is visible, throw an error and exit the test
    if (errorVisible) {
        const errorText = await this.errorMessage.innerText();
        throw new Error(`Test failed someone has broken the data: ${errorText}`);
    }
        await this.dashboard.click();
        await this.page.waitForURL(/.*dashboard/)
        return this.currentName
    }

    async expectFirstNameChange(expectedName: string) {
        await this.myInfo.click()
        await this.page.waitForURL(/.*viewPersonalDetails/);
        await expect(this.lastName).toHaveValue(expectedName)
    }
}
