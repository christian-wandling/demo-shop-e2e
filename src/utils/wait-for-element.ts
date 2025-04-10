import {Locator} from "@playwright/test";
import {ELEMENT_STATE} from "../constants/elementState";

export async function waitForElement(...elements: Locator[]) {
    await Promise.all(elements.map(el => el.waitFor(ELEMENT_STATE.attached)));
}