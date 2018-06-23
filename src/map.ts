/**
 * Concatenates to iterables
 */
export default function map<TFrom, TTo>(mapper: (t: TFrom, index: number) => TTo) {
  return async function* inner(source: AsyncIterable<TFrom>) {
    let index = 0;
    for await (const item of source) {
      yield mapper(item, index++);
    }
  };
}
