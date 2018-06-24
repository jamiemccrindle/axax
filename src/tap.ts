/**
 * Tap an iterable
 */
export function tap<T>(func: (t: T) => void) {
  return async function* inner(source: AsyncIterable<T>) {
    for await (const item of source) {
      func(item);
      yield item;
    }
  };
}

export default tap;
