import {expect, Page} from "@playwright/test";
import {OrderActions} from "./order-actions";
import {waitForElement} from "../../utils/wait-for-element";

export class OrderDetail {
    readonly orderActions: OrderActions;

    constructor(private page: Page) {
        this.orderActions = new OrderActions(page);
    }

    async goto() {
        await this.page.goto('/orders');
        await this.orderActions.goToOrderDetailPage();
    }

    async validate() {
        const orderDetail = this.page.getByTestId('order-detail');
        await expect(orderDetail).toBeVisible();

        await expect(orderDetail.getByTestId('order-detail-username')).toBeVisible();
        await expect(orderDetail.getByTestId('order-detail-address1')).toBeVisible();
        await expect(orderDetail.getByTestId('order-detail-address2')).toBeVisible();
        await expect(orderDetail.getByTestId('order-detail-address3')).toBeVisible();
        await expect(orderDetail.getByTestId('order-detail-id')).toBeVisible();
        await expect(orderDetail.getByTestId('order-status')).toBeVisible();
        await expect(orderDetail.getByTestId('date-time')).toBeVisible();
        await expect(orderDetail.getByTestId('order-detail-print-invoice-button')).toBeVisible();
        await expect(orderDetail.getByTestId('order-detail-total-price')).toBeVisible();

        const firstItem = orderDetail.locator('[data-testid^="order-detail-item-product-link"]').first();
        await waitForElement(firstItem);

        const items = await orderDetail.locator('[data-testid^="order-detail-item-product-link"]').all();
        expect(items.length).toBeGreaterThan(0);

        const firstItemImage = orderDetail.locator('[data-testid^="order-detail-item-image"]').first();
        await expect(firstItemImage).toBeVisible();

        const firstItemProduct = orderDetail.locator('[data-testid^="order-detail-item-product-info"]').first();
        await waitForElement(firstItemProduct);
        await expect(firstItemProduct).toBeVisible();

        const firstItemQuantity = orderDetail.locator('[data-testid^="order-detail-item-quantity"]').first();
        await expect(firstItemQuantity).toBeVisible();

        const firstItemUnitPrice = orderDetail.locator('[data-testid^="order-detail-item-unit-price"]').first();
        await expect(firstItemUnitPrice).toBeVisible();

        const firstItemTotalPrice = orderDetail.locator('[data-testid^="order-detail-item-total-price"]').first();
        await expect(firstItemTotalPrice).toBeVisible();
    }

    async goToProductDetailPage() {
        const firstItemProductLink = this.page.locator('[data-testid^="order-detail-item-product-link"]').first();
        await expect(firstItemProductLink).toBeVisible();
        await firstItemProductLink.click();

        expect(this.page.url().match(/^\/orders\/(.+)/));
    }

    async printInvoice() {
        const downloadPromise = this.page.waitForEvent('download');

        const printInvoiceButton = this.page.getByTestId('order-detail-print-invoice-button');
        await expect(printInvoiceButton).toBeVisible();
        await printInvoiceButton.click();

        const download = await downloadPromise;

        expect(download.suggestedFilename()).toMatch(/invoice-\d+\.pdf/);
    }
}