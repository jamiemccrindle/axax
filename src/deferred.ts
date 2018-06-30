/**
 * A classic deferred
 */
export class Deferred<T> {

  public promise: Promise<T>;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  public resolve: (value?: T | PromiseLike<T>) => void = (value) => { return; };
  public reject: (reason?: any) => void = () => { return; };

}
