import {expect, Page} from "@playwright/test";
import {ResponseTimer} from "../../utils/response-timer";

export class ShoppingCartIcon {
    constructor(private page: Page) {
    }

    async goto() {
        await this.page.goto('/');
    }

    async validate() {
        const shoppingCartIcon = this.page.getByTestId('shopping-cart-icon');
        await expect(shoppingCartIcon).toBeVisible();

        const shoppingCartIconElement = shoppingCartIcon.getByTestId('shopping-cart-icon-count');
        const shoppingCartIconText = await shoppingCartIconElement.textContent();
        expect(shoppingCartIconText).toBe('0');
    }

    async openShoppingCart() {
        const shoppingCartSlideOver = this.page.getByTestId('shopping-cart-slide-over');
        await expect(shoppingCartSlideOver).toBeHidden();

        await this.page.getByTestId('shopping-cart-icon').click();
        await expect(shoppingCartSlideOver).toBeVisible();
    }
}