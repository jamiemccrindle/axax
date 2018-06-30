import { Deferred } from "./deferred";

/**
 * The async iterator equivalent of a deferred
 */
export class Subject<T> {
  public iterator: AsyncIterableIterator<T>;

  private doneValue = {
    done: true,
    value: {} as T
  };

  private queue: Array<IteratorResult<T>> = [];
  private deferreds: Array<Deferred<IteratorResult<T>>> = [];
  private done: boolean = false;
  private noMoreResults: boolean = false;
  private backPressureDeferred = new Deferred<void>();
  private finallyCallbacks: Array<() => void> = [];
  private error?: any = undefined;

  constructor() {
    const self = this;

    this.iterator = {
      throw(e?: any) {
        self.done = true;
        self.finallyCallbacks.map(cb => cb());
        // fail any waiting deferreds
        for (const deferred of self.deferreds) {
          deferred.reject(e);
        }
        return Promise.reject(e);
      },
      return(value?: any) {
        self.done = true;
        self.finallyCallbacks.map(cb => cb());
        // fail any waiting deferreds
        for (const deferred of self.deferreds) {
          deferred.resolve({
            done: true,
            value: {} as T
          });
        }
        return Promise.resolve(self.doneValue);
      },
      next(value?: any) {
        if (self.error) {
          return Promise.reject(self.error);
        }
        const queuedItem = self.queue.shift();
        if (self.queue.length === 0) {
          self.backPressureDeferred.resolve();
          self.backPressureDeferred = new Deferred<void>();
        }
        if (queuedItem !== undefined) {
          return Promise.resolve(queuedItem);
        } else {
          if (self.noMoreResults && !self.done) {
            self.done = true;
            self.finallyCallbacks.map(cb => cb());
          }
          if (self.done) {
            return Promise.resolve({
              done: true,
              value: {} as T
            });
          }
          const deferred = new Deferred<IteratorResult<T>>();
          self.deferreds.push(deferred);
          return deferred.promise;
        }
      },
      [Symbol.asyncIterator]() {
        return this;
      }
    };
  }

  public finally(callback: () => void) {
    this.finallyCallbacks.push(callback);
  }

  public onCompleted() {
    return this.callback({ done: true, value: {} as T });
  }

  public onNext(value: T) {
    return this.callback({ done: false, value });
  }

  public onError(error: any) {
    this.error = error;
    for (const queuedDeferred of this.deferreds) {
      queuedDeferred.reject(error);
    }
    this.noMoreResults = true;
  }

  public isDone() {
    return this.done;
  }

  public callback(result: IteratorResult<T>) {
    if (!(this && this instanceof Subject)) {
      const errorMessage = "This must be a Subject. Have you bound this?";
      // tslint:disable-next-line:no-console
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
    if (result.done) {
      for (const queuedDeferred of this.deferreds) {
        queuedDeferred.resolve(result);
      }
      this.noMoreResults = true;
      return Promise.resolve();
    }
    const deferred = this.deferreds.pop();
    if (deferred !== undefined) {
      deferred.resolve(result);
      return Promise.resolve();
    } else {
      this.queue.push(result);
      return this.backPressureDeferred.promise;
    }
  }
}
