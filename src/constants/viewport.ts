import {ViewportSize} from "@playwright/test";

export const VIEWPORT: Record<string, ViewportSize> = {
    sm: {width: 640, height: 480},
    md: {width: 768, height: 576},
    lg: {width: 1024, height: 768},
    xl: {width: 1280, height: 960},
    '2xl': {width: 1536, height: 1152}
}