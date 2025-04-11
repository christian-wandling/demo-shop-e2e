import {expect, Page} from "@playwright/test";

export class ProductActions {
    constructor(private page: Page) {
    }

    async goToProductDetailPage() {
        const firstProductElement = this.page.locator('[data-testid^="product-list-item-link"]').first();
        expect(firstProductElement).toBeTruthy();

        await firstProductElement.click();
    }
}