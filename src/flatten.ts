/**
 * Flattens an iterable of iterables
 */
export async function* flatten<T>(source: AsyncIterable<AsyncIterable<T>>) {
  for await (const child of source) {
    for await (const item of child) {
      yield item;
    }
  }
}
