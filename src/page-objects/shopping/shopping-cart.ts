import {expect, Page} from "@playwright/test";
import {ShoppingActions} from "./shopping-actions";

export class ShoppingCart {
    readonly shoppingActions: ShoppingActions;

    constructor(private page: Page) {
        this.shoppingActions = new ShoppingActions(page);
    }

    async validateEmptyCart() {
        await expect(this.page.getByTestId('shopping-cart-continue-shopping-button')).toBeVisible();
        await expect(this.page.getByTestId('shopping-cart-items')).toBeHidden();
        const checkoutButton = this.page.getByTestId('shopping-cart-checkout-button');

        await expect(checkoutButton).toHaveClass(/pointer-events-none/);

        const cartItemLink = await this.page.locator('[data-testid^="shopping-cart-items-link"]').all();
        expect(cartItemLink).toHaveLength(0);
    }

    async validateShoppingIcon() {
        const shoppingCartIcon = this.page.getByTestId('shopping-cart-icon');
        await expect(shoppingCartIcon).toBeVisible();

        const shoppingCartIconElement = shoppingCartIcon.getByTestId('shopping-cart-icon-count');
        const shoppingCartIconText = await shoppingCartIconElement.textContent();
        expect(shoppingCartIconText.trim()).toBe('0');
    }

    async clickShoppingCartIcon() {
        await this.shoppingActions.openShoppingCart();
    }

    async clickCloseCartButton() {
        const shoppingCartSlideOver = this.page.getByTestId('shopping-cart-slide-over-container');
        await expect(shoppingCartSlideOver).toBeVisible();

        await this.shoppingActions.closeShoppingCart();
        await expect(shoppingCartSlideOver).toBeHidden();
    }

    async clickContinueShoppingButton() {
        const shoppingCartSlideOver = this.page.getByTestId('shopping-cart-slide-over-container');

        const continueShoppingButton = shoppingCartSlideOver.getByTestId('shopping-cart-continue-shopping-button');
        await expect(continueShoppingButton).toBeVisible();

        await continueShoppingButton.click();
        await expect(shoppingCartSlideOver).toBeHidden();
    }

    async clickCheckout() {
        await this.shoppingActions.goToCheckoutPage();

        await this.page.waitForTimeout(1000);
    }
}