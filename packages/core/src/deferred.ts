
export class Deferred<T> {
  private internalPromise: Promise<T>;
  private resolver: (value?: T | PromiseLike<T>) => void;
  private rejector: (reason?: any) => void;

  constructor() {
    this.internalPromise = new Promise<T>((res, rej) => {
      this.resolver = res;
      this.rejector = rej;
    })
  }
  get promise(): Promise<T>{ return this.internalPromise; }
  resolve(value?: T | PromiseLike<T>) {
    this.resolver(value);
    return this.promise;
  }
  reject(reason?: any) {
    this.rejector(reason);
    return this.promise;
  }
}