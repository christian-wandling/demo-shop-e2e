import {test} from '../../../src/fixtures/auth.fixture';
import {ShoppingCart} from "../../../src/page-objects/shopping/shopping-cart";
import {ShoppingActions} from "../../../src/page-objects/shopping/shopping-actions";
import {ProductActions} from "../../../src/page-objects/product/product-actions";
import {Checkout} from "../../../src/page-objects/shopping/checkout";

test.describe.serial('Shopping cart tests', () => {
    let shoppingCart: ShoppingCart;
    let shoppingActions: ShoppingActions
    let productActions: ProductActions

    test.beforeEach(async ({authenticatedPage}) => {
        const {page} = authenticatedPage;
        shoppingCart = new ShoppingCart(page);
        shoppingActions = new ShoppingActions(page);
        productActions = new ProductActions(page);
    });

    test.beforeEach(async () => {
        await shoppingActions.resetShoppingCart();
    });

    test.afterEach(async () => {
        await shoppingActions.resetShoppingCart();
    })

    test('user can see an empty cart', async () => {
        await shoppingActions.openShoppingCart();

        await shoppingCart.validateEmptyCart();
    });

    test('user can close shopping cart with close button', async () => {
        await shoppingActions.openShoppingCart();

        await shoppingCart.clickCloseCartButton();
    });

    test('user can close shopping cart and continue shopping', async () => {
        await shoppingActions.openShoppingCart();

        await shoppingCart.clickContinueShoppingButton();
    });

    test('user can go to checkout page', async () => {
        await productActions.goToProductDetailPage();
        await productActions.addProductToCart();
        await shoppingActions.openShoppingCart();

        await shoppingCart.clickCheckout();
    });

    test('user can see the shopping cart icon in the navigation bar', async () => {
        await shoppingCart.validateShoppingIcon();
    });

    test('user can open shopping cart slide over', async () => {
        await shoppingCart.clickShoppingCartIcon();
    });

    test.describe.serial('Checkout tests', () => {
        let checkout: Checkout;

        test.beforeEach(async ({authenticatedPage}) => {
            const {page} = authenticatedPage;
            checkout = new Checkout(page);
        });

        test.beforeEach(async () => {
            await shoppingActions.resetShoppingCart();
            await productActions.goToProductDetailPage();
            await productActions.addProductToCart();
            await shoppingActions.openShoppingCart();
            await shoppingActions.goToCheckoutPage();
        });

        test.afterEach(async () => {
            await shoppingActions.resetShoppingCart();
        })

        test('user can go to the checkout page and see the shipping information and shopping cart items', async () => {
            await checkout.validate();
        });

        test('user can checkout and create an order by clicking checkout button', async () => {
            await checkout.finishCheckout();
        });

        test('user can update the phone number', async () => {
            await checkout.updatePhone();
        });

        test('user can update the shipping address', async () => {
            await checkout.updateAddress();
        });

    })
});

