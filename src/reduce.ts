/**
 * Reduces values
 */
export default function reduce<T, A>(
  reducer: (accumulator: A, next: T) => A,
  init: A
) {
  return async function inner(source: AsyncIterable<T>) {
    let accumulator = init;
    for await (const next of source) {
      accumulator = reducer(accumulator, next);
    }
    return accumulator;
  };
}
