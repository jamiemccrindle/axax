/**
 * Turn an async iterable to a promise of an array. The promise will resolve
 * only when the async iterator returns
 *
 * @param source an async interable
 */
export async function toArray<T>(source: AsyncIterable<T>) {
  const result = [];
  for await (const item of source) {
    result.push(item);
  }
  return result;
}
