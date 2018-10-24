/**
 * Skip the first numberToSkip values
 */
export function skip<T>(numberToSkip: number) {
  return async function* inner(source: AsyncIterable<T>) {
    let count = 0;
    for await (const item of source) {
        if (count++ > numberToSkip) {
          yield item;
        }
    }
  };
}
