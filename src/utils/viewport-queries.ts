import {Page} from "@playwright/test";
import {VIEWPORT} from "../constants/viewport";


export function isBelowLg(page: Page) {
    const {width} = page.viewportSize();

    return width < VIEWPORT.lg.width
}