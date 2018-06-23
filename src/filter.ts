/**
 * Filters items from an iterable
 *
 * @param source the source iterable to filter
 * @param predicate the predicate to apply to filter items
 */
export default function filter<T>(predicate: (t: T) => boolean) {
  return async function* inner(source: AsyncIterable<T>) {
    for await (const item of source) {
      if (predicate(item)) {
        yield item;
      }
    }
  };
}
