/**
 * Take the last value or the last value to pass predicate from an async iterable
 */
export function last<T>(
  predicate: (t: T) => boolean = () => true,
  defaultValue?: T,
) {
  return async function* inner(source: AsyncIterable<T>) {
    let lastItem = defaultValue;
    for await (const item of source) {
      if (predicate(item)) {
        lastItem = item;
      }
    }

    if (lastItem) {
      yield lastItem;
    }
  };
}
