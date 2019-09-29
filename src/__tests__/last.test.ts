import { last } from "../last";
import { of } from "../of";
import { toArray } from "../toArray";

test("last", async () => {
  const result = await toArray(last()(of(1, 2, 3, 4, 5, 6, 7)));
  expect(result).toEqual([7]);
});

test("last with predicate", async () => {
  const result = await toArray(
      last((value: number) => value % 2 === 0)(of(1, 2, 3, 4, 5, 6, 7)));
  expect(result).toEqual([6]);
});

test("last with no value fulfilling predicate", async () => {
  const result = await toArray(
      last((value: number) => value % 8 === 0)(of(1, 2, 3, 4, 5, 6)));
  expect(result).toEqual([]);
});

test("last with default value", async () => {
  const result = await toArray(
      last<number>((value: number) => value % 8 === 0, 42)(of(1, 2, 3, 4, 5, 6)));
  expect(result).toEqual([42]);
});
