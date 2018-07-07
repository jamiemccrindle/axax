/**
 * Take while a predicate holds true
 */
export function takeWhile<T>(predicate: (t: T) => boolean) {
  return async function* inner(source: AsyncIterable<T>) {
    for await (const item of source) {
      if (!predicate(item)) {
        break;
      }
      yield item;
    }
  };
}
