import { of } from "../of";
import { takeWhile } from "../takeWhile";
import { toArray } from "../toArray";

test("takeWhile", async () => {
  const result = await toArray(takeWhile(value => value < 3)(of(1, 2, 3, 4, 5, 6)));
  expect(result).toEqual([1, 2]);
});
