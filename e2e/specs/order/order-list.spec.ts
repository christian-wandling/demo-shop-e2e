import {test} from '../../../src/fixtures/auth.fixture';
import {OrderList} from "../../../src/page-objects/order/order-list";

test.describe('Order list tests', () => {
    let orderList: OrderList;

    test.beforeEach(async ({authenticatedPage}) => {
        const {page} = authenticatedPage;
        orderList = new OrderList(page);
        await page.goto('/orders');
    });

    test('user can see the orders in a list', async ({page}) => {
        await orderList.validate();
    });

    test('user can navigate to order detail page', async () => {
        await orderList.goToOrderDetailPage();
    });

    test('user can navigate to product detail page', async () => {
        await orderList.goToProductDetailPage();
    });
})

