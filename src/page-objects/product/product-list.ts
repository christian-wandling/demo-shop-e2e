import {expect, Page} from "@playwright/test";
import {ProductActions} from "./product-actions";
import {waitForElement} from "../../utils/wait-for-element";

export class ProductList {
    readonly productActions: ProductActions;

    constructor(private page: Page) {
        this.productActions = new ProductActions(page);
    }

    async goto() {
        await this.page.goto('/products');
    }

    async validate() {
        const productList = this.page.getByTestId('product-list');
        await expect(productList).toBeVisible();

        const firstElement = productList.locator('[data-testid^="product-list-item-link"]').first();
        await waitForElement(firstElement);

        const elements = await productList.locator('[data-testid^="product-list-item-link"]').all();
        expect(elements.length).toBeGreaterThan(0);

        const firstElementImage = firstElement.locator('[data-testid^="product-list-item-image"]').first();
        await expect(firstElementImage).toBeVisible();

        const firstElementName = firstElement.locator('[data-testid^="product-list-item-name"]').first();
        await expect(firstElementName).toBeVisible();

        const firstElementPrice = firstElement.locator('[data-testid^="product-list-item-price"]').first();
        await expect(firstElementPrice).toBeVisible();
    }

    async goToProductDetailPage() {
        await this.productActions.goToProductDetailPage();
        expect(this.page.url().match(/^\/products\/(.+)/));
    }
}