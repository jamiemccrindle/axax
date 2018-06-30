/**
 * Count the number of items in an async interable
 */
export async function count<T>(source: AsyncIterable<T>): Promise<number> {
  let total = 0;
  for await (const item of source) {
    total++;
  }
  return total;
}
