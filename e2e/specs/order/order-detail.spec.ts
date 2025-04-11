import {test} from '../../../src/fixtures/auth.fixture';
import {OrderDetail} from "../../../src/page-objects/order/order-detail";

test.describe('Order detail tests', () => {
    let orderDetail: OrderDetail;

    test.beforeEach(async ({authenticatedPage}) => {
        const {page} = authenticatedPage;
        orderDetail = new OrderDetail(page);
        await orderDetail.goto();
    });


    test('user can see order details', async () => {
        await orderDetail.validate();
    });

    test('user can print the invoice', async ({authenticatedPage}) => {
        await orderDetail.printInvoice();
    });

    test('user can click on product thumbnail to go to product details page', async ({authenticatedPage}) => {
        await orderDetail.goToProductDetailPage();
    });
})

