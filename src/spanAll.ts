import { Subject } from "./subject";
import { toCallbacks } from "./toCallbacks";
import { StopError } from "../es5/toCallbacks";

export function spanAll<T>(predicate: (t: T) => boolean) {
  return function inner(source: AsyncIterable<T>) {
    let done = false;
    const spanSubject = new Subject<AsyncIterable<T>>();
    spanSubject.finally(() => {
      done = true;
    });
    let currentSubject = new Subject<T>();
    spanSubject.onNext(currentSubject.iterator);
    toCallbacks<T>(result => {
      if (done) {
        throw new StopError();
      }
      if (result.done) {
        currentSubject.onCompleted();
        spanSubject.onCompleted();
        return Promise.resolve();
      }
      if (predicate(result.value)) {
        currentSubject.onCompleted();
        currentSubject = new Subject<T>();
        spanSubject.onNext(currentSubject.iterator);
      } else {
        currentSubject.onNext(result.value);
      }
      // not handling back pressure at the moment
      return Promise.resolve();
    })(source);
    return spanSubject.iterator;
  };
}
