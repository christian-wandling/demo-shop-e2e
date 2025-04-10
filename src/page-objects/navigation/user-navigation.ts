import {expect, Page} from "@playwright/test";
import {Navigation} from "./navigation";
import {AuthActions} from "../auth/auth-actions";
import {waitForElement} from "../../utils/wait-for-element";
import {isBelowLg} from "../../utils/viewport-queries";

export class UserNavigation {
    readonly navigation: Navigation;
    readonly authActions: AuthActions;

    constructor(private page: Page) {
        this.navigation = new Navigation(page);
        this.authActions = new AuthActions(page);
    }

    async goto() {
        await this.page.goto('/');
    }

    async validateUnauthenticated() {
        const {signIn, register, signOut, name} = await this.prepareNavigation();
        await waitForElement(signIn, register);

        await expect(signIn).toBeVisible();
        await expect(register).toBeVisible();
        await expect(signOut).toBeHidden();
        await expect(name).toBeHidden();
    }

    async validateAuthenticated() {
        const {signIn, register, signOut, name} = await this.prepareNavigation();
        await waitForElement(signOut, name);

        await expect(signOut).toBeVisible();
        await expect(name).toBeVisible();
        await expect(signIn).toBeHidden();
        await expect(register).toBeHidden();
    }

    async clickSignIn() {
        const {signIn} = await this.prepareNavigation();
        await waitForElement(signIn);

        if (await signIn.isHidden()) {
            return;
        }

        await signIn.click();
        await this.authActions.handleKeycloakSignIn();
    }

    async clickRegister() {
        const {register} = await this.prepareNavigation();
        await waitForElement(register);
        await expect(register).toBeVisible();

        await register.click();
        await this.authActions.handleKeycloakRegister();
    }

    async clickSignOut() {
        const {signOut} = await this.prepareNavigation();
        await waitForElement(signOut).catch(() => false)

        if (await signOut.isHidden()) {
            return;
        }

        await signOut.click();
        await this.authActions.handleKeycloakSignOut();
    }

    private async prepareNavigation() {
        const isSmallScreen = isBelowLg(this.page);
        const userNavigation = this.page.getByTestId(
            isSmallScreen ? 'navigation-slide-over-user-section' : 'navigation-bar-user-section'
        );
        expect(userNavigation).toBeTruthy();

        if (isSmallScreen) {
            await this.navigation.openNavigationSlideOver();
        }

        return {
            signIn: userNavigation.getByTestId('user-navigation-sign-in'),
            register: userNavigation.getByTestId('user-navigation-register'),
            signOut: userNavigation.getByTestId('user-navigation-sign-out'),
            name: userNavigation.getByTestId('user-navigation-name')
        };
    }
}
