/**
 * Go through the elements of an iterable and return zero or more of them using
 * an async iterable.
 * 
 * @param mapper the mapper function to run over the async iterable
 */
export function flatMap<TFrom, TTo>(mapper: (t: TFrom) => AsyncIterable<TTo>) {
  return async function* inner(source: AsyncIterable<TFrom>) {
    for await (const item of source) {
      for await (const nestedItem of mapper(item)) {
        yield nestedItem;
      }
    }
  };
}
