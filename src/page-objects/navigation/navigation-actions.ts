import {expect, Page} from "@playwright/test";

export class NavigationActions {
    constructor(private page: Page) {
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