import {test} from '../../../src/fixtures/auth.fixture';
import {VIEWPORT} from "../../../src/constants/viewport";

test.describe.serial('User Navigation tests', () => {

    test.describe.serial('@largeScreen', () => {
        test.use({viewport: VIEWPORT['2xl']})

        test('user can see the unauthenticated user section in navigation bar', async ({unauthenticatedPage}) => {
            const {userNavigation} = unauthenticatedPage;
            await userNavigation.validateUnauthenticated();
        });

        test('user can see the authenticated user section in navigation bar', async ({authenticatedPage}) => {
            const {userNavigation} = authenticatedPage;
            await userNavigation.validateAuthenticated();
        });

        test('user can go to the register page via navigation bar', async ({unauthenticatedPage}) => {
            const {userNavigation} = unauthenticatedPage;
            await userNavigation.clickRegister();
        });

        test('user can go to the sign in page via navigation bar', async ({unauthenticatedPage}) => {
            const {userNavigation} = unauthenticatedPage;
            await userNavigation.clickSignIn();
        });

        test('user can sign out via navigation bar', async ({authenticatedPage}) => {
            const {userNavigation} = authenticatedPage;
            await userNavigation.clickSignOut();
        });
    });


    test.describe.serial('@smallScreen', () => {
        test.use({viewport: VIEWPORT.md})

        test('user can see the user section in navigation slide over', async ({unauthenticatedPage}) => {
            const {userNavigation} = unauthenticatedPage;
            await userNavigation.validateUnauthenticated();
        });

        test('user can see the authenticated user section in navigation slide over', async ({authenticatedPage}) => {
            const {userNavigation} = authenticatedPage;
            await userNavigation.validateAuthenticated();
        });

        test('user can go to the register page via navigation slide over', async ({unauthenticatedPage}) => {
            const {userNavigation} = unauthenticatedPage;
            await userNavigation.clickRegister();
        });

        test('user can go to the sign page via navigation slide over', async ({unauthenticatedPage}) => {
            const {userNavigation} = unauthenticatedPage;
            await userNavigation.clickSignIn();
        });

        test('user can sign out via navigation slide over', async ({authenticatedPage}) => {
            const {userNavigation} = authenticatedPage;
            await userNavigation.clickSignOut();
        });
    });
})

