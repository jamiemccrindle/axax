import { Subject } from "./subject";
import { toCallbacks } from "./toCallbacks";

/**
 * Merges iterables
 *
 * @param sources the iterables to merge
 */
export function merge<T>(...sources: AsyncIterable<T>[]) {
  const subject = new Subject<T>();
  sources.map(source => {
    return toCallbacks(
      source,
      subject.callback.bind(subject)
    );
  });
  return subject.iterator;
}
