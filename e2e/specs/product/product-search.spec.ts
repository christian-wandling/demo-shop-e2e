import {test} from '@playwright/test';
import {ProductSearch} from "../../../src/page-objects/product/product-search";

test.describe('Product search tests', () => {
    let productSearch: ProductSearch;

    test.beforeEach(async ({page}) => {
        productSearch = new ProductSearch(page);
        await productSearch.goto();
    });

    test('user can see product search in navigation bar', async () => {
        await productSearch.validate();
    });

    test('user can filter products by typing into product search', async () => {
        await productSearch.filterProducts();
    });
})

