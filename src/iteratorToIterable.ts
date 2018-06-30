/**
 * Helper function to turn an iterator into an iterable
 *
 * @param iterator An iteratable
 */
export async function* iteratorToIterable<T>(iterator: AsyncIterator<T>) {
  while (true) {
    const next = await iterator.next();
    if (next.done) { return; }
    yield next.value;
  }
}
