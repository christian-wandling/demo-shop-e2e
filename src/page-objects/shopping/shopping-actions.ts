import {expect, Page} from "@playwright/test";
import {waitForElement} from "../../utils/wait-for-element";

export class ShoppingActions {
    constructor(private page: Page) {
    }

    async resetShoppingCart() {
        const shoppingCartIcon = this.page.getByTestId('shopping-cart-icon-count');
        const itemsInCart = await shoppingCartIcon.textContent();

        if(Number(itemsInCart) > 0) {
            await this.openShoppingCart();
            await this.clearShoppingCartItems();
        }

        await this.closeShoppingCart();
    }

    async openShoppingCart() {
        const shoppingCartSlideOver = this.page.getByTestId('shopping-cart-slide-over-container');
        const isSlideOverHidden = await shoppingCartSlideOver.isHidden();

        if (isSlideOverHidden) {
            await this.page.getByTestId('shopping-cart-icon').click();
        }

        await expect(shoppingCartSlideOver).toBeVisible();
    }

    async closeShoppingCart() {
        const shoppingCartSlideOver = this.page.getByTestId('shopping-cart-slide-over-container');
        const isSlideOverVisible = await shoppingCartSlideOver.isVisible();

        if (isSlideOverVisible) {
            await this.page.getByTestId('shopping-cart-slide-over-close-button').click();
        }

        await expect(shoppingCartSlideOver).toBeHidden();
    }

    async clearShoppingCartItems() {
        const shoppingCartSlideOver = this.page.getByTestId('shopping-cart-slide-over-container');

        while (true) {
            const removeButton = shoppingCartSlideOver.locator('[data-testid^="shopping-cart-items-remove-button"]');

            if (await removeButton.count() === 0) {
                break;
            }

            await removeButton.first().click();
            await this.page.waitForTimeout(500);
        }
    }

    async goToCheckoutPage() {
        const cartItemLink = this.page.locator('[data-testid^="shopping-cart-items-link"]').first();
        await waitForElement(cartItemLink);

        const cartItemElements = await this.page.locator('[data-testid^="shopping-cart-items-link"]').all();
        expect(cartItemElements).toHaveLength(1);

        await expect(this.page.locator('[data-testid^="shopping-cart-items-name"]').first()).toBeVisible();
        await expect(this.page.locator('[data-testid^="shopping-cart-items-price"]').first()).toBeVisible();

        await this.validateQuantity();
        await expect(this.page.locator('[data-testid^="shopping-cart-items-remove-button"]').first()).toBeVisible();

        const checkoutButton = this.page.getByTestId('shopping-cart-checkout-button')
        await expect(checkoutButton).toBeEnabled();

        await checkoutButton.click();

        expect(this.page.url()).toMatch(/\/checkout/);
    }

    async validateQuantity() {
        const shoppingCartSlideOver = this.page.getByTestId('shopping-cart-slide-over-container');
        const quantityElement = shoppingCartSlideOver.locator('[data-testid^="shopping-cart-items-quantity"]').first();
        await waitForElement(quantityElement);

        await expect(quantityElement).toBeVisible();
        const textContent = await quantityElement.textContent()
        const quantity = textContent.trim().match(/Qty\s+(\d+)/i)?.[1];

        expect(Number(quantity)).toBe(1);
    }
}