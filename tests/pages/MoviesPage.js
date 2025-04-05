const { expect } = require('@playwright/test');

export class MoviePage {
    constructor(page) {
        this.page = page;
    }

    async isLoggedIn() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.page).toHaveURL('/.*admin/');
    }
}