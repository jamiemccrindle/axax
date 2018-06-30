import { Subject } from "./subject";
import { toCallbacks } from "./toCallbacks";

export function spanAll<T>(predicate: (t: T) => boolean) {
  return function inner(source: AsyncIterable<T>) {
    const spanDeferredIterable = new Subject<AsyncIterable<T>>();
    let currentDeferredIterable = new Subject<T>();
    spanDeferredIterable.value(currentDeferredIterable.iterator);
    toCallbacks(source, result => {
      if (result.done) {
        currentDeferredIterable.close();
        spanDeferredIterable.close();
        return Promise.resolve();
      }
      if (predicate(result.value)) {
        currentDeferredIterable.close();
        currentDeferredIterable = new Subject<T>();
        spanDeferredIterable.value(currentDeferredIterable.iterator);
      } else {
        currentDeferredIterable.value(result.value);
      }
      // not handling back pressure at the moment
      return Promise.resolve();
    });
    return spanDeferredIterable.iterator;
  };
}