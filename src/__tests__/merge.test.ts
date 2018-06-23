import { restToIterable } from "../restToIterable";
import { merge } from "../merge";
import iterableToArray from "../iterableToArray";

test("merge", async () => {
  const merged = merge(restToIterable(1, 2, 3), restToIterable(4, 5, 6));
  const result = (await iterableToArray(merged)).sort();
  expect(result).toEqual([1, 2, 3, 4, 5, 6]);
});
