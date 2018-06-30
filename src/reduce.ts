/**
 * Reduces values
 */
export function reduce<T, A>(reducer: (accumulator: A, next: T) => Promise<A> | A, init: Promise<A> | A) {
  return async function inner(source: AsyncIterable<T>) {
    let accumulator = await init;
    for await (const next of source) {
      accumulator = await reducer(accumulator, next);
    }
    return accumulator;
  };
}
