import { Subject } from "./subject";
import { StopError, toCallbacks } from "./toCallbacks";

/**
 * Merges iterables
 *
 * @param sources the iterables to merge
 */
export function merge<T>(...sources: Array<AsyncIterable<T>>) {
  const subject = new Subject<T>();
  let done = false;
  subject.finally(() => {
    done = true;
  });
  let doneCount = 0;
  sources.map(source => {
    return toCallbacks<T>(result => {
      if (result.done) {
        doneCount += 1;
        if (doneCount >= sources.length) {
          done = true;
          return subject.callback(result);
        }
      }
      if (done) {
        throw new StopError();
      } else if (!result.done) {
        return subject.callback(result);
      } else {
        return Promise.resolve();
      }
    })(source);
  });
  return subject.iterator;
}
