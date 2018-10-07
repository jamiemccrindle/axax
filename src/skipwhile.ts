/**
 * Skipwhile emitted values from source until provided expression is false.
 */
export function skipWhile<T>(predicate: (t: T) => boolean = () => true) {
  return async function* inner(source: AsyncIterable<T>) {
    for await (const item of source) {
      if (!predicate(item)) {
        yield item;
      }
    }
  };
}
