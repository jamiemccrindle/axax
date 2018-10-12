/**
 * If any values pass predicate before completion return true, else false.
 *
 * @param predicate the predicate to apply to the source iterable
 */
export function some<T>(predicate: (t: T) => boolean = () => true) {
  return async function inner(source: AsyncIterable<T>) {
    for await (const item of source) {
      if (predicate(item)) {
        return true;
      }
    }
    return false;
  };
}
