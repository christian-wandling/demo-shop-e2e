import {test} from '@chromatic-com/playwright';
import {ProductList} from "../../../src/page-objects/product/product-list";

test.describe('Product list tests', () => {
    let productList: ProductList;

    test.beforeEach(async ({page}) => {
        productList = new ProductList(page);
        await productList.goto();
    });

    test('user can see the products in a grid', async () => {
        await productList.validate();
    });

    test('user can click on a product image and navigate to product detail page', async () => {
        await productList.goToProductDetailPage();
    });
})

