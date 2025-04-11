import {test} from '../../../src/fixtures/auth.fixture';
import {VIEWPORT} from "../../../src/constants/viewport";
import {Navigation} from "../../../src/page-objects/navigation/navigation";

test.describe('Navigation tests', () => {
    test.describe('@largeScreen tests', () => {
        test.use({viewport: VIEWPORT['2xl']})

        test('user can see unauthenticated navigation bar', async ({unauthenticatedPage}) => {
            const {page} = unauthenticatedPage;
            const navigation = new Navigation(page);

            await navigation.validateLargeScreenNavigationBar();
        });

        test('user can see authenticated navigation bar', async ({authenticatedPage}) => {
            const {page} = authenticatedPage;
            const navigation = new Navigation(page);

            await navigation.validateLargeScreenNavigationBar({authenticated: true});
        });

        test('user can navigate to landing page', async ({unauthenticatedPage}) => {
            const {page} = unauthenticatedPage;
            const navigation = new Navigation(page);

            await navigation.navigateToLandingPageByClickingLogo();
        });

        test('user can navigate to products page', async ({unauthenticatedPage}) => {
            const {page} = unauthenticatedPage;
            const navigation = new Navigation(page);
            await navigation.goto();

            await navigation.navigateToProductsFromNavigationBar();
        });
    })

    test.describe('@smallScreen tests', () => {
        test.use({viewport: VIEWPORT.md})

        test('user can see navigation bar without navigation items', async ({unauthenticatedPage}) => {
            const {page} = unauthenticatedPage;
            const navigation = new Navigation(page);
            await navigation.goto();

            await navigation.validateSmallScreenNavigationBar();
        });

        test('user can open navigation slide over and see unauthenticated navigation items', async ({unauthenticatedPage}) => {
            const {page} = unauthenticatedPage;
            const navigation = new Navigation(page);
            await navigation.goto();

            await navigation.clickNavigationSlideOverToggle();
        });

        test('user can open navigation slide over and see authenticated navigation items', async ({authenticatedPage}) => {
            const {page} = authenticatedPage;
            const navigation = new Navigation(page);
            await navigation.goto();

            await navigation.clickNavigationSlideOverToggle({authenticated: true});
        });

        test('user can close navigation slide over via button click', async ({unauthenticatedPage}) => {
            const {page} = unauthenticatedPage;
            const navigation = new Navigation(page);
            await navigation.goto();

            await navigation.closeNavigationSlideOverWithButton();
        });

        test('user can close navigation slide over via backdrop click', async ({unauthenticatedPage}) => {
            const {page} = unauthenticatedPage;
            const navigation = new Navigation(page);
            await navigation.goto();

            await navigation.closeNavigationSlideOverWithBackdropClick();
        });

        test('user can navigate to products which will close navigation', async ({unauthenticatedPage}) => {
            const {page} = unauthenticatedPage;
            const navigation = new Navigation(page);
            await navigation.goto();

            await navigation.navigateToProductsAndCloseNavigationSlideOver();
        });
    });
})

