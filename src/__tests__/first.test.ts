import { first } from "../first";
import { of } from "../of";
import { toArray } from "../toArray";

test("first", async () => {
  const result = await toArray(first()(of(1, 2, 3, 4, 5, 6)));
  expect(result).toEqual([1]);
});

test("first with predicate", async () => {
  const result = await toArray(
      first((value: number) => value % 5 === 0)(of(1, 2, 3, 4, 5, 6)));
  expect(result).toEqual([5]);
});
