/**
 * Runs a mapping function over an asynchronous iterable
 */
export function map<TFrom, TTo>(mapper: (t: TFrom, index: number) => Promise<TTo> | TTo) {
  return async function* inner(source: AsyncIterable<TFrom>) {
    let index = 0;
    for await (const item of source) {
      yield await mapper(item, index++);
    }
  };
}
