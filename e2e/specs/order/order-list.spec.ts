import {test} from '../../../src/fixtures/auth.fixture';
import {OrderList} from "../../../src/page-objects/order/order-list";

test.describe('Order list tests', () => {
    let orderList: OrderList;

    test.beforeEach(async ({authenticatedPage}) => {
        const {page} = authenticatedPage;
        orderList = new OrderList(page);
        await page.goto('/orders');
    });

    test('user can see orders in a list', async ({page}) => {
        await orderList.validate();
    });

    test('user can click on an order item and navigate to order detail page', async () => {
        await orderList.goToOrderDetailPage();
    });

    test('user can click on a thumbnail and navigate to product detail page', async () => {
        await orderList.goToProductDetailPage();
    });
})

