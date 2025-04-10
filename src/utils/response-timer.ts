export class ResponseTimer {
    private readonly start = Date.now();

    get elapsed() {
        return Date.now() - this.start;
    }
}