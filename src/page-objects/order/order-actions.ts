import {expect, Page} from "@playwright/test";

export class OrderActions {
    constructor(private page: Page) {
    }

    async goToOrderDetailPage() {
        const firstOrderElement = this.page.locator('[data-testid^="order-list-item-link"]').first();
        expect(firstOrderElement).toBeTruthy();

        await firstOrderElement.click();
    }
}