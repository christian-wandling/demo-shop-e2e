import {expect, Page} from "@playwright/test";
import {ResponseTimer} from "../../utils/response-timer";
import {NavigationActions} from "./navigation-actions";

export class Navigation {
    readonly navigationActions: NavigationActions;

    constructor(private page: Page) {
        this.navigationActions = new NavigationActions(page);
    }

    async goto() {
        await this.page.goto('/');
    }

    async validateLargeScreenNavigationBar(options: { authenticated?: boolean } = {}) {
        const navigationBar = this.page.getByTestId('navigation-bar');

        await expect(navigationBar.getByTestId('navigation-slide-over-toggle')).toBeHidden();
        await expect(navigationBar.getByTestId('navigation-bar-logo')).toBeVisible();
        await expect(navigationBar.getByTestId('navigation-bar-item-products')).toBeVisible();
        await expect(navigationBar.getByTestId('navigation-bar-user-section')).toBeVisible();
        await expect(navigationBar.getByTestId('product-search')).toBeVisible();
        await expect(navigationBar.getByTestId('shopping-cart-icon')).toBeVisible();

        if (options.authenticated) {
            await expect(navigationBar.getByTestId('navigation-bar-item-orders')).toBeVisible();
        } else {
            await expect(navigationBar.getByTestId('navigation-bar-item-orders')).toBeHidden();
        }
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

    async clickNavigationSlideOverToggle(options: { authenticated?: boolean } = {}) {
        const navigationSlideOver = this.page.getByTestId('navigation-slide-over');
        await expect(navigationSlideOver).toBeHidden();

        await this.navigationActions.openNavigationSlideOver();

        await expect(navigationSlideOver.getByTestId('navigation-slide-over-item-products')).toBeVisible();
        await expect(navigationSlideOver.getByTestId('navigation-slide-over-user-section')).toBeVisible();

        if (options?.authenticated) {
            await expect(navigationSlideOver.getByTestId('navigation-slide-over-item-orders')).toBeVisible();
        } else {
            await expect(navigationSlideOver.getByTestId('navigation-slide-over-item-orders')).toBeHidden();
        }
    }

    async closeNavigationSlideOverWithButton() {
        const navigationSlideOver = this.page.getByTestId('navigation-slide-over');

        await this.navigationActions.openNavigationSlideOver();

        const navigationSlideOverCloseButton = this.page.getByTestId('navigation-slide-over-close-button');
        await expect(navigationSlideOverCloseButton).toBeVisible();
        await navigationSlideOverCloseButton.click();

        await expect(navigationSlideOver).toBeHidden();
    }

    async closeNavigationSlideOverWithBackdropClick() {
        const navigationSlideOver = this.page.getByTestId('navigation-slide-over');

        await this.navigationActions.openNavigationSlideOver();

        const navigationSlideOverBackdrop = this.page.getByTestId('navigation-slide-over-backdrop');
        await expect(navigationSlideOverBackdrop).toBeVisible();
        await navigationSlideOverBackdrop.click();

        await expect(navigationSlideOver).toBeHidden();
    }

    async navigateToProductsAndCloseNavigationSlideOver() {
        const navigationSlideOver = this.page.getByTestId('navigation-slide-over');

        await this.navigationActions.openNavigationSlideOver();

        const productsRouteItem = navigationSlideOver.getByTestId('navigation-slide-over-item-products');
        await expect(productsRouteItem).toBeVisible();

        const timer = new ResponseTimer();
        await productsRouteItem.click();

        await expect(navigationSlideOver).toBeHidden();
        await expect(this.page).toHaveURL(/\/products/);

        const responseTime = timer.elapsed;
        expect(responseTime).toBeLessThan(2000);
    }
}