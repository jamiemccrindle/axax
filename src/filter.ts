/**
 * Filters items from an iterable
 *
 * @param source the source iterable to filter
 * @param predicate the predicate to apply to filter items
 */
export function filter<T>(predicate: (t: T) => Promise<boolean> | boolean) {
  return async function* inner(source: AsyncIterable<T>) {
    for await (const item of source) {
      if (await predicate(item)) {
        yield await item;
      }
    }
  };
}
