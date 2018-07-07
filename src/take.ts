/**
 * Take the first x values from an async iterable
 */
export function take<T>(numberToTake: number) {
  return async function* inner(source: AsyncIterable<T>) {
    let index = 0;
    for await (const item of source) {
      if (index++ >= numberToTake) {
        break;
      }
      yield item;
    }
  };
}
