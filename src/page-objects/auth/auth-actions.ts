import {expect, Page} from "@playwright/test";
import {ResponseTimer} from "../../utils/response-timer";

export class AuthActions {
    constructor(private page: Page) {
    }

    async handleKeycloakSignIn() {
        const timer = new ResponseTimer();
        await this.page.waitForURL(/\/openid-connect/);

        const responseTime = timer.elapsed;
        expect(responseTime).toBeLessThan(2000);

        const url = new URL(this.page.url());
        expect(url.pathname).toContain('/realms/demo_shop/protocol/openid-connect/auth');
        expect(url.searchParams.get('client_id')).toBe('demo_shop_ui');

        await this.page.fill('#username', process.env.USERNAME);
        await this.page.fill('#password', process.env.PASSWORD);

        const loginTimer = new ResponseTimer();
        await this.page.click('#kc-login');
        await this.page.waitForURL(/\/products/);

        const loginResponseTime = loginTimer.elapsed;
        expect(loginResponseTime).toBeLessThan(2000);
    }

    async handleKeycloakRegister() {
        const timer = new ResponseTimer();
        await this.page.waitForURL(/\/openid-connect/);

        const responseTime = timer.elapsed;
        expect(responseTime).toBeLessThan(2000);

        const url = new URL(this.page.url());
        expect(url.pathname).toContain('/realms/demo_shop/protocol/openid-connect/registrations');
        expect(url.searchParams.get('client_id')).toBe('demo_shop_ui');
        expect(url.searchParams.get('redirect_uri')).toMatch(/\/products/);

        // TODO add actual register flow
    }

    async handleKeycloakSignOut() {
        const timer = new ResponseTimer();
        await this.page.waitForURL(/\/products/);

        const responseTime = timer.elapsed;
        expect(responseTime).toBeLessThan(2000);
    }
}
