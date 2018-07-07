/**
 * Converts array to an async iterable
 */
export async function* from<T>(values: T[]) {
  for (const item of values) {
    yield item;
  }
}
