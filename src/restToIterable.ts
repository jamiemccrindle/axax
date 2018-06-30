/**
 * @param values values to be returned by the async iterable
 */
export async function* restToIterable<T>(...values: T[]) {
  for (const item of values) {
    yield item;
  }
}
