import {expect, Page} from "@playwright/test";
import {ResponseTimer} from "../../utils/response-timer";

export class ProductSearch {
    constructor(private page: Page) {
    }

    async goto() {
        await this.page.goto('/');
    }

    async validate() {
        const productSearch = this.page.getByTestId('product-search');

        await expect(productSearch.getByTestId('product-search-icon')).toBeVisible();
        await expect(productSearch.getByTestId('product-search-input')).toBeHidden();
    }

    async filterProducts() {
        const firstProductElement = this.page.locator('[data-testid^="product-list-item-name"]').first();
        expect(firstProductElement).toBeTruthy();

        const firstProductName = await firstProductElement.textContent()
        expect(firstProductName).toBeTruthy();

        const searchTerm = firstProductName.trim().split(' ')[0];
        expect(searchTerm).toBeTruthy();

        const searchIcon = this.page.getByTestId('product-search-icon');
        expect(searchIcon).toBeTruthy();

        await searchIcon.click();

        const searchInput = this.page.getByTestId('product-search-input');
        expect(searchInput).toBeTruthy();
        await expect(searchInput).toBeVisible();
        await searchInput.fill(searchTerm);

        const filteredProducts = await this.page.locator('[data-testid^="product-list-item-name"]').all();
        expect(filteredProducts.length).toBeGreaterThan(0);

        for (const product of filteredProducts) {
            const productName = await product.textContent();
            expect(productName.toLowerCase()).toContain(searchTerm.toLowerCase());
        }
    }
}