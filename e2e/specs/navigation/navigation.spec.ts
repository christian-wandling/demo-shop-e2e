import {test} from '@playwright/test';
import {Navigation} from "../../../src/page-objects/navigation/navigation";
import {describe} from "node:test";
import {VIEWPORT} from "../../../src/constants/viewport";

test.describe('Navigation tests', () => {
    let navigation: Navigation;

    test.beforeEach(async ({page}) => {
        navigation = new Navigation(page);
        await navigation.goto();
    });

    test.describe('@largeScreen tests', () => {
        test.use({viewport: VIEWPORT['2xl']})

        test('user can see navigation bar', async () => {
            await navigation.validateLargeScreenNavigationBar();
        });

        test('user can navigate to landing page', async () => {
            await navigation.navigateToLandingPageByClickingLogo();
        });

        test('user can navigate to products page', async () => {
            await navigation.navigateToProductsFromNavigationBar();
        });
    })

    test.describe('@smallScreen tests', () => {
        test.use({viewport: VIEWPORT.md})

        test('user can see navigation bar on @smallScreen', async () => {
            await navigation.validateSmallScreenNavigationBar();
        });

        test('user can open navigation slide over', async () => {
            await navigation.clickNavigationSlideOverToggle();
        });

        test('user can close navigation slide over via button click', async () => {
            await navigation.closeNavigationSlideOverWithButton();
        });

        test('user can close navigation slide over via backdrop click', async () => {
            await navigation.closeNavigationSlideOverWithBackdropClick();
        });

        test('user can navigate to products which will close navigation', async () => {
            await navigation.navigateToProductsAndCloseNavigationSlideOver();
        });
    });
})

