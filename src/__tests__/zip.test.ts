import { of } from "../of";
import { toArray } from "../toArray";
import { zip } from "../zip";

test("zip", async () => {
  const result = await toArray(zip(of(1, 3, 5))(of(2, 4, 6)));
  expect(result).toEqual([[1, 2], [3, 4], [5, 6]]);
});

test("zip with empty iterable", async () => {
  const result = await toArray(zip(of(1, 3, 5))(of<number>()));
  expect(result).toEqual([]);
});

test("zip empty iterable", async () => {
  const result = await toArray(zip(of<number>())(of(2, 4, 6)));
  expect(result).toEqual([]);
});

test("zip different lengths", async () => {
  const result = await toArray(zip(of(1, 3, 5))(of(2, 4)));
  expect(result).toEqual([[1, 2], [3, 4]]);
});
