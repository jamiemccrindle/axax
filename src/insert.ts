/**
 * Inserts values at the start of the iterable
 */
export default function insert<T>(...values: T[]) {
  return async function* inner(source: AsyncIterable<T>) {
    for (const value of values) {
      yield value;
    }
    for await (const item of source) {
      yield item;
    }
  };
}
