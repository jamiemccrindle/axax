export default function flatMap<TFrom, TTo>(
  mapper: (t: TFrom) => AsyncIterable<TTo>
) {
  return async function* inner(source: AsyncIterable<TFrom>) {
    for await (const item of source) {
      for await (const nestedItem of mapper(item)) {
        yield nestedItem;
      }
    }
  };
}
