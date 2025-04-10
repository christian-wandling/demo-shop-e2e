export const ELEMENT_STATE: Record<string, {
    state?: "attached" | "detached" | "visible" | "hidden",
    timeout?: number
}> = {
    attached: {state: 'attached', timeout: 2000}
}