import {expect, Page} from "@playwright/test";
import {isBelowLg} from "../../utils/viewport-queries";

export class NavigationActions {
    constructor(private page: Page) {
    }

    async prepareUserNavigation() {
        const isSmallScreen = isBelowLg(this.page);
        const userNavigation = this.page.getByTestId(
            isSmallScreen ? 'navigation-slide-over-user-section' : 'navigation-bar-user-section'
        );
        expect(userNavigation).toBeTruthy();

        if (isSmallScreen) {
            await this.openNavigationSlideOver();
        }

        return {
            signIn: userNavigation.getByTestId('user-navigation-sign-in'),
            register: userNavigation.getByTestId('user-navigation-register'),
            signOut: userNavigation.getByTestId('user-navigation-sign-out'),
            name: userNavigation.getByTestId('user-navigation-name')
        };
    }

    async openNavigationSlideOver() {
        const navigationSlideOver = this.page.getByTestId('navigation-slide-over');

        if (await navigationSlideOver.isVisible()) {
            return;
        }

        const navigationSlideOverToggle = this.page.getByTestId('navigation-slide-over-toggle');
        expect(navigationSlideOverToggle).toBeTruthy();

        await navigationSlideOverToggle.click();
        await expect(navigationSlideOver).toBeVisible();
    }
}