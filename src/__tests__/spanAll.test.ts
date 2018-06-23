import { restToIterable } from "../restToIterable";
import spanAll from "../spanAll";

test("spanAll", async () => {
  const iterables = spanAll((value: number) => value % 2 === 0)(
    restToIterable(1, 2, 3, 4, 5, 6)
  );
  const result = [];
  for await (const iterable of iterables) {
    const innerResult = [];
    for await (const item of iterable) {
      innerResult.push(item)
    }
    result.push(innerResult);
  }
  expect(result).toEqual([[1], [3], [5], []]);
});
