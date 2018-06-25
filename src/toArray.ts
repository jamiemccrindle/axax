export async function toArray<T>(source: AsyncIterable<T>) {
  const result = [];
  for await (const item of source) {
    result.push(item);
  }
  return result;
}
