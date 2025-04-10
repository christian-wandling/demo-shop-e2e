import {Page} from "@playwright/test";
import {UserNavigation} from "../page-objects/navigation/user-navigation";

export type AuthFixtures = {
    authenticatedPage: {
        page: Page;
        userNavigation: UserNavigation;
    };
    unauthenticatedPage: {
        page: Page;
        userNavigation: UserNavigation;
    };
};