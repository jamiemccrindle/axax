import { of } from "../of";
import { spanAll } from "../spanAll";

test("spanAll", async () => {
  const iterables = spanAll((value: number) => value % 2 === 0)(
    of(1, 2, 3, 4, 5, 6)
  );
  const result = [];
  for await (const iterable of iterables) {
    const innerResult = [];
    for await (const item of iterable) {
      innerResult.push(item);
    }
    result.push(innerResult);
  }
  expect(result).toEqual([[1], [3], [5], []]);
});

test("spanAll break", async () => {
  const iterables = spanAll((value: number) => value % 2 === 0)(
    of(1, 1, 1, 2, 3, 3, 3)
  );
  const result = [];
  for await (const iterable of iterables) {
    for await (const item of iterable) {
      result.push(item);
      break;
    }
  }
  expect(result).toEqual([1, 3]);
});
