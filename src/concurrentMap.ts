import { toCallbacks } from "./toCallbacks";
import { Subject } from "./subject";
import { Deferred } from "./deferred";

/**
 * Runs a mapping function over an asynchronous iterable
 */
export function concurrentMap<TFrom, TTo>(
  mapper: (t: TFrom) => Promise<TTo>,
  concurrency: number
) {
  return function inner(source: AsyncIterable<TFrom>) {
    const subject = new Subject<TTo>();
    let running = 0;
    let deferred = new Deferred<void>();
    toCallbacks(source, result => {
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
    });
    return subject.iterator;
  };
}
