import {test} from '@playwright/test';
import {ShoppingCartIcon} from "../../../src/page-objects/shopping/shopping-cart-icon";

test.describe('Cart Icon tests', () => {
    let shoppingCartIcon: ShoppingCartIcon;

    test.beforeEach(async ({page}) => {
        shoppingCartIcon = new ShoppingCartIcon(page);
        await shoppingCartIcon.goto();
    });

    test('user can see the top shoppingCartIcon on large screens', async () => {
        await shoppingCartIcon.validate();
    });

    test('user can toggle shopping cart', async () => {
        await shoppingCartIcon.openShoppingCart();
    });
})

