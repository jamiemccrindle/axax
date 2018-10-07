/**
 * Only emit when the current value is different than the last.
 */
export function distinctUntilChanged<T>() {
  return async function* inner(source: AsyncIterable<T>) {
    let previousItem;
    for await (const item of source) {
      if (previousItem !== item) {
        yield item;
      }
      previousItem = item;
    }
  };
}
