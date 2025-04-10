import {test as base} from '@playwright/test';
import {UserNavigation} from '../page-objects/navigation/user-navigation';
import {AuthFixtures} from "../types/auth-fixtures";

export const test = base.extend<AuthFixtures>({
    authenticatedPage: async ({ page }, use) => {
        const userNavigation = new UserNavigation(page);
        await userNavigation.goto();
        await userNavigation.clickSignIn();

        await use({ page, userNavigation });

        await userNavigation.clickSignOut();
    },
    unauthenticatedPage: async ({ page }, use) => {
        const userNavigation = new UserNavigation(page);
        await userNavigation.goto();
        await userNavigation.clickSignOut();

        await use({ page, userNavigation });
    },
});

export { expect } from '@playwright/test';
