/**
 * Skipwhile emitted values from source until provided expression is false.
 */
export function skipWhile<T>(predicate: (t: T) => boolean = () => true) {
  return async function* inner(source: AsyncIterable<T>) {
    let skipping = false;
    for await (const item of source) {
        if (skipping || !predicate(item)) {
          skipping = true;
          yield item;
        }
    }
  };
}
