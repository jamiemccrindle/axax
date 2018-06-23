/**
 * @param values values to be returned by the async iterable
 */
export async function* restToIterable<T>(...values: Array<T>) {
  for (let item of values) {
    yield item;
  }
}
