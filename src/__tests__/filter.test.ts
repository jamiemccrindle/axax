import { restToIterable } from "../restToIterable";
import filter from "../filter";
import iterableToArray from "../iterableToArray";

test("filter", async () => {
  const result = await iterableToArray(
    filter((value: number) => value % 2 === 0)(restToIterable(1, 2, 3, 4, 5, 6))
  );
  expect(result).toEqual([2, 4, 6]);
});
