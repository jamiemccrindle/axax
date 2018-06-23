/**
 * Helper function to turn an iterator into an iterable
 *
 * @param iterator An iteratable
 */
export async function* iteratorToIterable<T>(iterator: AsyncIterator<T>) {
  while (true) {
    const next = await iterator.next();
    if (next.done) return;
    yield next.value;
  }
}

/**
 * @param values values to be returned by the async iterable
 */
export async function* toIterable<T>(...values: Array<T>) {
  for (let item of values) {
    yield item;
  }
}

/**
 * Lookahead into the async iteratable
 *
 * @param source The source iterable to look into
 * @param howFar How far to look ahead
 */
export async function lookahead<T>(
  source: AsyncIterable<T>,
  howFar: number
): Promise<{ values: Array<T>; iterable: AsyncIterable<T> }> {
  const iterator = source[Symbol.asyncIterator]();
  const values: Array<T> = [];
  for (let i = 0; i < howFar; i++) {
    const next = await iterator.next();
    if (next.done) break;
    values.push(next.value);
  }
  return {
    values,
    iterable: iteratorToIterable(iterator)
  };
}

/**
 * A classic deferred
 */
export class Deferred<T> {
  resolve: (value?: T | PromiseLike<T>) => void = () => {};
  reject: (reason?: any) => void = () => {};
  promise: Promise<T>;

  constructor() {
    this.promise = new Promise<T>((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }
}

/** Provides a way for callbacks to signal early completion */
export class StopError extends Error {}

/**
 * Converts an async iterable into a series of callbacks. The function returns
 * a promise that resolves when the stream is done
 *
 * @param source the source iterable
 * @param callback the callback that gets called for each value
 */
export async function toCallbacks<T>(
  source: AsyncIterable<T>,
  callback: (result: IteratorResult<T>) => Promise<void>
) {
  const iterator = source[Symbol.asyncIterator]();
  while (true) {
    const result = await iterator.next();
    try {
      await callback(result);
    } catch (StopError) {
      return;
    }
    if (result.done) {
      return;
    }
  }
}

/**
 * The async iterator equivalent of a deferred
 */
export class DeferredIterable<T> {
  queue: IteratorResult<T>[] = [];
  deferreds: Deferred<IteratorResult<T>>[] = [];
  callback: (result: IteratorResult<T>) => Promise<void>;
  iterator: AsyncIterable<T>;
  done: boolean = false;
  backPressureDeferred = new Deferred<void>();

  constructor() {
    const self = this;
    this.callback = (result: IteratorResult<T>) => {
      if (result.done) {
        for (const deferred of self.deferreds) {
          deferred.resolve(result);
        }
        this.done = true;
        return Promise.resolve();
      }
      const deferred = self.deferreds.pop();
      if (deferred !== undefined) {
        deferred.resolve(result);
        return Promise.resolve();
      } else {
        this.queue.push(result);
        return self.backPressureDeferred.promise;
      }
    };

    this.iterator = {
      [Symbol.asyncIterator]() {
        return {
          next(value?: any) {
            if (self.done) {
              return Promise.resolve({
                done: true,
                value: {} as T
              });
            }
            const queuedItem = self.queue.pop();
            if (self.queue.length === 0) {
              self.backPressureDeferred.resolve();
              self.backPressureDeferred = new Deferred<void>();
            }
            if (queuedItem !== undefined) {
              return Promise.resolve(queuedItem);
            } else {
              const deferred = new Deferred<IteratorResult<T>>();
              self.deferreds.push(deferred);
              return deferred.promise;
            }
          }
        };
      }
    };
  }
}

/**
 * Merges iterables
 *
 * @param sources the iterables to merge
 */
export function merge<T>(...sources: AsyncIterable<T>[]) {
  const deferredIterable = new DeferredIterable<T>();
  sources.map(source => {
    return toCallbacks(source, deferredIterable.callback);
  });
  return deferredIterable.iterator;
}
