/**
 * Sums the values of the async iterable
 */
export async function sum(source: AsyncIterable<number>): Promise<number> {
  let total = 0;
  for await (const item of source) {
    total += item;
  }
  return total;
}
