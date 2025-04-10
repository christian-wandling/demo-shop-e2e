import {test} from '@playwright/test';
import {Navigation} from "../../../src/page-objects/navigation/navigation";
import {ProductSearch} from "../../../src/page-objects/product/product-search";

test.describe('Product search tests', () => {
    let productSearch: ProductSearch;

    test.beforeEach(async ({page}) => {
        productSearch = new ProductSearch(page);
        await productSearch.goto();
    });

    test('user can see the top productSearch on large screens', async () => {
        await productSearch.validate();
    });

    test('user can filter products', async () => {
        await productSearch.filterProducts();
    });
})

