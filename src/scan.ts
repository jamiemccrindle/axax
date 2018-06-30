/**
 * Goes through a iterable applying the scanner function to the accumulator
 * returning the accumulator at each step
 */
export function scan<T, A>(scanner: (accumulator: A, next: T) => A, init: A) {
  return async function* inner(source: AsyncIterable<T>) {
    let accumulator = init;
    for await (const next of source) {
      yield accumulator;
      accumulator = scanner(accumulator, next);
    }
    yield accumulator;
  };
}
