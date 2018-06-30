import { Subject } from "./subject";
import { toCallbacks } from "./toCallbacks";

export function spanAll<T>(predicate: (t: T) => boolean) {
  return function inner(source: AsyncIterable<T>) {
    const spanDeferredIterable = new Subject<AsyncIterable<T>>();
    let currentDeferredIterable = new Subject<T>();
    spanDeferredIterable.onNext(currentDeferredIterable.iterator);
    toCallbacks(source, result => {
      if (result.done) {
        currentDeferredIterable.onCompleted();
        spanDeferredIterable.onCompleted();
        return Promise.resolve();
      }
      if (predicate(result.value)) {
        currentDeferredIterable.onCompleted();
        currentDeferredIterable = new Subject<T>();
        spanDeferredIterable.onNext(currentDeferredIterable.iterator);
      } else {
        currentDeferredIterable.onNext(result.value);
      }
      // not handling back pressure at the moment
      return Promise.resolve();
    });
    return spanDeferredIterable.iterator;
  };
}
