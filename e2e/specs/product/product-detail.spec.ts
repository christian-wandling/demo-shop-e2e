import {test} from '../../../src/fixtures/auth.fixture';
import {ProductDetail} from "../../../src/page-objects/product/product-detail";

test.describe('Product detail tests', () => {
    test('user can see product details', async ({unauthenticatedPage}) => {
        const {page} = unauthenticatedPage;
        const productDetail = new ProductDetail(page);
        await productDetail.goto();

        await productDetail.validateUnauthenticated();
    });

    test('user can add product to cart', async ({authenticatedPage}) => {
        const {page} = authenticatedPage;
        const productDetail = new ProductDetail(page);
        await productDetail.goto();

        await productDetail.addProductToCart();
    });
})

