/**
 * Skips items from the async interator until predicate becomes false. After that, all following values are returned.
 */
export function skipWhile<T>(
  predicate: (t: T) => boolean
) {
  return async function* inner(source: AsyncIterable<T>) {
    let predicateFulfilled = false;
    for await (const item of source) {
      if (predicateFulfilled || !predicate(item)) {
        predicateFulfilled = true;
        yield item;
      }
    }
  };
}
