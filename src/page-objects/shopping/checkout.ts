import {expect, Page} from "@playwright/test";
import {ShoppingActions} from "./shopping-actions";
import {OrderActions} from "../order/order-actions";

export class Checkout {
    readonly shoppingActions: ShoppingActions;
    readonly orderActions: OrderActions;

    constructor(private page: Page) {
        this.shoppingActions = new ShoppingActions(page);
        this.orderActions = new OrderActions(page);
    }

    async validate() {
        const checkoutContainer = this.page.getByTestId('checkout-container');
        const userNameLocator = this.page.getByTestId('user-navigation-name');
        const userNameTextContent = await userNameLocator.textContent();
        const [firstname, lastname] = userNameTextContent.trim().replace(/\s+/g, ' ').split(' ');

        expect(await checkoutContainer.getByTestId('checkout-form-element-firstname').inputValue()).toBe(firstname);
        await expect(checkoutContainer.getByTestId('checkout-form-element-firstname')).toBeDisabled()

        expect(await checkoutContainer.getByTestId('checkout-form-element-lastname').inputValue()).toBe(lastname);
        await expect(checkoutContainer.getByTestId('checkout-form-element-lastname')).toBeDisabled();

        expect(await checkoutContainer.getByTestId('checkout-form-element-email').inputValue()).toBe(process.env.USERNAME);
        await expect(checkoutContainer.getByTestId('checkout-form-element-email')).toBeDisabled();

        await expect(checkoutContainer.getByTestId('checkout-update-shipping-information-button')).toBeDisabled();
        await expect(checkoutContainer.getByTestId('shopping-cart-items')).toBeVisible();
        await expect(checkoutContainer.getByTestId('checkout-finish-button')).toBeEnabled();

        await this.page.reload();
    }

    async finishCheckout() {
        const itemNameLocators = await this.page.locator('[data-testid^="shopping-cart-items-name"]').all();
        const itemNames = await Promise.all(itemNameLocators.map(el => el.textContent()));
        const totalPrice = await this.page.getByTestId('checkout-total-price').first().textContent();

        const checkoutButton = this.page.getByTestId('checkout-finish-button');
        await expect(checkoutButton).toBeEnabled();

        await checkoutButton.click();
        await this.page.waitForTimeout(1000);
        expect(this.page.url()).toMatch(/\/products/);

        await this.page.goto('/orders');
        await this.orderActions.goToOrderDetailPage();

        for (const name of itemNames) {
            expect(this.page.getByText(name.trim())).toBeTruthy();
        }

        expect(await this.page.getByTestId('order-detail-total-price').textContent()).toMatch(totalPrice);
    }

    async updatePhone() {
        const phone = this.page.getByTestId('checkout-form-element-phone');
        const currentValue = await phone.inputValue();
        const newValue = '+' + (+currentValue + 1)

        await phone.fill(newValue);

        const updateButton = this.page.getByTestId('checkout-update-shipping-information-button');
        await expect(updateButton).toBeEnabled();
        const checkoutButton = this.page.getByTestId('checkout-finish-button');
        await expect(checkoutButton).toBeDisabled();

        await updateButton.click();
        await this.page.waitForTimeout(1000);
        expect(await phone.inputValue()).toMatch(newValue);
        await expect(updateButton).toBeDisabled();
        await expect(checkoutButton).toBeEnabled();
    }

    async updateAddress() {
        const countrySelect = this.page.locator('[data-testid="checkout-form-element-country"]');
        const currentValue = await countrySelect.inputValue();
        const options = await countrySelect.locator('option').allTextContents();
        const newValue = options.find(option => option !== currentValue);
        if (!newValue) {
            throw new Error('No alternative option to select.');
        }

        await countrySelect.selectOption({label: newValue});

        const updateButton = this.page.getByTestId('checkout-update-shipping-information-button');
        await expect(updateButton).toBeEnabled();
        const checkoutButton = this.page.getByTestId('checkout-finish-button');
        await expect(checkoutButton).toBeDisabled();

        await updateButton.click();
        await this.page.waitForTimeout(1000);
        expect(await countrySelect.inputValue()).toMatch(newValue);
        await expect(updateButton).toBeDisabled();
        await expect(checkoutButton).toBeEnabled();
    }
}