import { Deferred } from "./deferred";

/**
 * The async iterator equivalent of a deferred
 */
export default class DeferredIterable<T> {

  doneValue = {
    done: true,
    value: {} as T
  }

  queue: IteratorResult<T>[] = [];
  deferreds: Deferred<IteratorResult<T>>[] = [];
  iterator: AsyncIterableIterator<T>;
  done: boolean = false;
  backPressureDeferred = new Deferred<void>();

  constructor() {
    const self = this;

    this.iterator = {
      throw(e?: any) {
        self.done = true;
        // fail any waiting deferreds
        for (const deferred of self.deferreds) {
          deferred.reject(e);
        }
        return Promise.reject(e);
      },
      return(value?: any) {
        self.done = true;
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
        const queuedItem = self.queue.shift();
        if (self.queue.length === 0) {
          self.backPressureDeferred.resolve();
          self.backPressureDeferred = new Deferred<void>();
        }
        if (queuedItem !== undefined) {
          return Promise.resolve(queuedItem);
        } else {
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

  close() {
    return this.callback({ done: true, value: {} as T });
  }

  value(value: T) {
    return this.callback({ done: false, value });
  }

  callback(result: IteratorResult<T>) {
    if (!(this && this instanceof DeferredIterable)) {
      const errorMessage =
        "This must be a DeferredIterable. Have you bound this?";
      console.log(errorMessage);
      throw new Error(errorMessage);
    }
    if (result.done) {
      for (const deferred of this.deferreds) {
        deferred.resolve(result);
      }
      this.done = true;
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
