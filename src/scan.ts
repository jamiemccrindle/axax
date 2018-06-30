/**
 * Goes through a iterable applying the scanner function to the accumulator
 * returning the accumulator at each step
 */
export function scan<T, A>(scanner: (accumulator: A, next: T) => Promise<A> | A, init: Promise<A> | A) {
  return async function* inner(source: AsyncIterable<T>) {
    let accumulator = await init;
    for await (const next of source) {
      yield accumulator;
      accumulator = await scanner(accumulator, next);
    }
    yield accumulator;
  };
}
