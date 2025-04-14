import {expect, Page} from "@playwright/test";
import {ProductActions} from "./product-actions";

export class ProductDetail {
    readonly productActions: ProductActions;

    constructor(private page: Page) {
        this.productActions = new ProductActions(page);
    }

    async goto() {
        await this.page.goto('/products');
        await this.productActions.goToProductDetailPage();
    }

    async validateUnauthenticated() {
        const productDetail = this.page.getByTestId('product-detail');
        await expect(productDetail).toBeVisible();

        const productDetailImage = this.page.getByTestId('product-detail-image');
        const productDetailName = this.page.getByTestId('product-detail-name');
        const productDetailPrice = this.page.getByTestId('product-detail-price');
        const productDetailAddToCartButton = this.page.getByTestId('product-detail-add-to-cart-button');
        const productDetailDescription = this.page.getByTestId('product-detail-description');

        await expect(productDetailImage).toBeVisible();
        await expect(productDetailName).toBeVisible();
        await expect(productDetailPrice).toBeVisible();
        await expect(productDetailAddToCartButton).toBeVisible();
        await expect(productDetailAddToCartButton).toBeDisabled();
        await expect(productDetailDescription).toBeVisible();
    }

    async addProductToCart() {
        const shoppingCartIcon = this.page.getByTestId('shopping-cart-icon');
        expect(shoppingCartIcon).toBeTruthy();
        const currentCount = Number(await shoppingCartIcon.textContent());

        await this.productActions.addProductToCart();

        const newCount = Number(await shoppingCartIcon.textContent());
        expect(newCount).toBe(currentCount + 1)
    }
}