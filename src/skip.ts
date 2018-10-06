/**
 * skips the first x values from an async iterable
 */
export function skip<T>(numberToSkip: number) {
  return async function* inner(source: AsyncIterable<T>) {
    let index = 0;
    for await (const item of source) {
      if (index++ >= numberToSkip) {
        yield item;
      }
    }
  };
}
