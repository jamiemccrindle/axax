export async function iterableToArray<T>(source: AsyncIterable<T>) {
  const result = [];
  for await (const item of source) {
    result.push(item);
  }
  return result;
}

export default iterableToArray;
