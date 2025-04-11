import {expect, Page} from "@playwright/test";
import {OrderActions} from "./order-actions";
import {waitForElement} from "../../utils/wait-for-element";

export class OrderList {
    readonly orderActions: OrderActions;

    constructor(private page: Page) {
        this.orderActions = new OrderActions(page);
    }

    async goto() {
        await this.page.goto('/orders');
    }

    async validate() {
        const orderList = this.page.getByTestId('order-list');
        await expect(orderList).toBeVisible();

        const username = orderList.getByTestId('order-list-username');
        await expect(username).toBeVisible();
        const address1 = orderList.getByTestId('order-list-address1');
        await expect(address1).toBeVisible();
        const address2 = orderList.getByTestId('order-list-address2');
        await expect(address2).toBeVisible();
        const address3 = orderList.getByTestId('order-list-address3');
        await expect(address3).toBeVisible();

        const firstOrder = orderList.locator('[data-testid^="order-list-item-link"]').first();
        await waitForElement(firstOrder);
        await expect(firstOrder).toBeVisible();

        const orders = await orderList.locator('[data-testid^="order-list-item-link"]').all();
        expect(orders.length).toBeGreaterThan(0);

        const firstOrderId = firstOrder.locator('[data-testid^="order-list-item-id"]').first();
        await expect(firstOrderId).toBeVisible();

        const productLinks = await firstOrder.locator('[data-testid^="order-list-item-product-link"]').all();
        expect(productLinks.length).toBeGreaterThan(0);

        const firstOrderProductLink = productLinks[0];
        await expect(firstOrderProductLink).toBeVisible();

        const thumbnails = await firstOrder.locator('[data-testid^="order-list-item-thumbnails"]').all();
        expect(thumbnails.length).toBeGreaterThan(0);

        const firstThumbnail = productLinks[0];
        await expect(firstThumbnail).toBeVisible();

        const firstOrderStatus = firstOrder.locator('[data-testid^="order-list-item-status"]').first();
        await expect(firstOrderStatus).toBeVisible();

        const firstOrderAmount = firstOrder.locator('[data-testid^="order-list-item-amount"]').first();
        await expect(firstOrderAmount).toBeVisible();

        const firstOrderDate = firstOrder.locator('[data-testid^="order-list-item-date"]').first();
        await expect(firstOrderDate).toBeVisible();
    }

    async goToOrderDetailPage() {
        await this.orderActions.goToOrderDetailPage();
        expect(this.page.url().match(/^\/orders\/(.+)/));
    }

    async goToProductDetailPage() {
        const firstItemProductLink = this.page.locator('[data-testid^="order-list-item-product-link"]').first();
        await expect(firstItemProductLink).toBeVisible();
        await firstItemProductLink.click();

        expect(this.page.url().match(/^\/products\/(.+)/));
    }
}