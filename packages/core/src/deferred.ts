export interface DeferredLike<T> {
  resolve(value?: T | PromiseLike<T>): PromiseLike<T>;
  reject(reason?: any): PromiseLike<T>;
}

export class Deferred<T> implements DeferredLike<T> {
  private internalPromise: Promise<T>;
  private resolver: (value?: T | PromiseLike<T>) => void = () => null;
  private rejector: (reason?: any) => void = () => null;

  constructor() {
    this.internalPromise = new Promise<T>((res, rej) => {
      this.resolver = res;
      this.rejector = rej;
    });
  }
  get promise(): Promise<T> {
    return this.internalPromise;
  }
  resolve(value?: T | PromiseLike<T>) {
    this.resolver(value);
    return this.promise;
  }
  reject(reason?: any) {
    this.rejector(reason);
    return this.promise;
  }
}
