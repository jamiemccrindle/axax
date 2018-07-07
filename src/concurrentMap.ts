import { Deferred } from "./deferred";
import { Subject } from "./subject";
import { StopError, toCallbacks } from "./toCallbacks";

/**
 * Runs a mapping function over an asynchronous iterable
 */
export function concurrentMap<TFrom, TTo>(
  mapper: (t: TFrom) => Promise<TTo>,
  concurrency: number
) {
  return function inner(source: AsyncIterable<TFrom>) {
    const subject = new Subject<TTo>();
    let done = false;
    subject.finally(() => {
      done = true;
    });
    let running = 0;
    let deferred = new Deferred<void>();
    toCallbacks<TFrom>(result => {
      if (done) {
        throw new StopError();
      }
      if (!result.done) {
        running += 1;
        if (running >= concurrency) {
          deferred = new Deferred<void>();
        }
        mapper(result.value).then(value => {
          running -= 1;
          subject.onNext(value);
          if (running < concurrency) {
            deferred.resolve();
          }
        });
        return deferred.promise;
      } else {
        subject.onCompleted();
        return Promise.resolve();
      }
    })(source);
    return subject.iterator;
  };
}
