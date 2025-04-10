import {expect, Page} from "@playwright/test";
import {ResponseTimer} from "../../utils/response-timer";

export class Navigation {
    constructor(private page: Page) {
    }

    async goto() {
        await this.page.goto('/');
    }

    async validateLargeScreenNavigationBar() {
        const navigationBar = this.page.getByTestId('navigation-bar');

        await expect(navigationBar.getByTestId('navigation-slide-over-toggle')).toBeHidden();
        await expect(navigationBar.getByTestId('navigation-bar-logo')).toBeVisible();
        await expect(navigationBar.getByTestId('navigation-bar-item-products')).toBeVisible();
        await expect(navigationBar.getByTestId('navigation-bar-user-section')).toBeVisible();
        await expect(navigationBar.getByTestId('product-search')).toBeVisible();
        await expect(navigationBar.getByTestId('shopping-cart-icon')).toBeVisible();
    }

    async navigateToLandingPageByClickingLogo() {
        const timer = new ResponseTimer();

        await this.page.getByTestId('navigation-bar-logo').click();
        await expect(this.page).toHaveURL(/\/products/);

        const responseTime = timer.elapsed;
        expect(responseTime).toBeLessThan(2000);
    }

    async navigateToProductsFromNavigationBar() {
        const timer = new ResponseTimer();

        await this.page.getByTestId('navigation-bar-item-products').click();

        await expect(this.page).toHaveURL(/\/products/);

        const responseTime = timer.elapsed;
        expect(responseTime).toBeLessThan(2000);
    }

    async validateSmallScreenNavigationBar() {
        const navigationBar = this.page.getByTestId('navigation-bar');

        await expect(navigationBar.getByTestId('navigation-slide-over-toggle')).toBeVisible();
        await expect(navigationBar.getByTestId('navigation-bar-logo')).toBeVisible();
        await expect(navigationBar.getByTestId('navigation-bar-item-products')).toBeHidden();
        await expect(navigationBar.getByTestId('navigation-bar-user-section')).toBeHidden();
        await expect(navigationBar.getByTestId('product-search')).toBeVisible();
        await expect(navigationBar.getByTestId('shopping-cart-icon')).toBeVisible();
    }

    async clickNavigationSlideOverToggle() {
        const navigationSlideOver = this.page.getByTestId('navigation-slide-over');
        await expect(navigationSlideOver).toBeHidden();

        await this.openNavigationSlideOver();

        await expect(navigationSlideOver.getByTestId('navigation-slide-over-item-products')).toBeVisible();
        await expect(navigationSlideOver.getByTestId('navigation-slide-over-user-section')).toBeVisible();
    }

    async closeNavigationSlideOverWithButton() {
        const navigationSlideOver = this.page.getByTestId('navigation-slide-over');

        await this.openNavigationSlideOver();

        const navigationSlideOverCloseButton = this.page.getByTestId('navigation-slide-over-close-button');
        await expect(navigationSlideOverCloseButton).toBeVisible();
        await navigationSlideOverCloseButton.click();

        await expect(navigationSlideOver).toBeHidden();
    }

    async closeNavigationSlideOverWithBackdropClick() {
        const navigationSlideOver = this.page.getByTestId('navigation-slide-over');

        await this.openNavigationSlideOver();

        const navigationSlideOverBackdrop = this.page.getByTestId('navigation-slide-over-backdrop');
        await expect(navigationSlideOverBackdrop).toBeVisible();
        await navigationSlideOverBackdrop.click();

        await expect(navigationSlideOver).toBeHidden();
    }

    async navigateToProductsAndCloseNavigationSlideOver() {
        const navigationSlideOver = this.page.getByTestId('navigation-slide-over');

        await this.openNavigationSlideOver();

        const productsRouteItem = navigationSlideOver.getByTestId('navigation-slide-over-item-products');
        await expect(productsRouteItem).toBeVisible();

        const timer = new ResponseTimer();
        await productsRouteItem.click();

        await expect(navigationSlideOver).toBeHidden();
        await expect(this.page).toHaveURL(/\/products/);

        const responseTime = timer.elapsed;
        expect(responseTime).toBeLessThan(2000);
    }

    async openNavigationSlideOver() {
        const navigationSlideOver = this.page.getByTestId('navigation-slide-over');

        if(await navigationSlideOver.isVisible()) {
            return;
        }

        const navigationSlideOverToggle = this.page.getByTestId('navigation-slide-over-toggle');
        expect(navigationSlideOverToggle).toBeTruthy();

        await navigationSlideOverToggle.click();
        await expect(navigationSlideOver).toBeVisible();
    }
}