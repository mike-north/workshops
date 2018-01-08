export declare class Deferred<T> {
    private internalPromise;
    private resolver;
    private rejector;
    constructor();
    readonly promise: Promise<T>;
    resolve(value?: T | PromiseLike<T>): Promise<T>;
    reject(reason?: any): Promise<T>;
}
