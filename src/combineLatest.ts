import { Subject } from "./subject";
import { StopError, toCallbacks } from "./toCallbacks";

/**
 * Combines iterables
 *
 * @param sources the iterables to combine
 */
export function combineLatest<T>(...sources: Array<AsyncIterable<T>>) {
  const results = new Array<T>(sources.length);
  const resultsAvailable = new Array(sources.length).fill(false);
  const subject = new Subject<T[]>();
  let done = false;
  subject.finally(() => {
    done = true;
  });
  let doneCount = 0;
  sources.map((source, index) => {
    return toCallbacks<T>(result => {
      if (result.done) {
        doneCount += 1;
        if (doneCount >= sources.length) {
          done = true;
          return subject.callback({ done: true, value: [] as T[] });
        }
      }
      if (done) {
        throw new StopError();
      } else if (!result.done) {
        results[index] = result.value;
        resultsAvailable[index] = true;
        if (resultsAvailable.every(value => value)) {
          return subject.callback({ done: false, value: Array.from(results) });
        } else {
          return Promise.resolve();
        }
      } else {
        return Promise.resolve();
      }
    })(source);
  });
  return subject.iterator;
}
