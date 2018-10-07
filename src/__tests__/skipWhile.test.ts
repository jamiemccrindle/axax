import { of } from "../of";
import { skipWhile } from "../skipWhile";
import { toArray } from "../toArray";

test("skipWhile", async () => {
  const result = await toArray(skipWhile((value: number) => value < 4)(of(1, 2, 3, 4, 5, 6, 7)));
  expect(result).toEqual([4, 5, 6, 7]);
});

test("skipWhile should return everything after predicate is false", async () => {
  const result = await toArray(skipWhile((value: number) => value < 4 || value > 5)(of(1, 2, 3, 4, 5, 6, 7)));
  expect(result).toEqual([4, 5, 6, 7]);
});

test("skipWhile should return everything with falsy predicate", async () => {
  const result = await toArray(skipWhile(() => false)(of(1, 2, 3, 4, 5, 6, 7)));
  expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
});

test("skipWhile should return nothing with truthy predicate", async () => {
  const result = await toArray(skipWhile(() => true)(of(1, 2, 3, 4, 5, 6, 7)));
  expect(result).toEqual([]);
});
