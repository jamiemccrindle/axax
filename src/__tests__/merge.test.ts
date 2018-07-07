import { merge } from "../merge";
import { of } from "../of";
import { toArray } from "../toArray";

test("merge", async () => {
  const merged = merge(of(1, 2, 3, 4, 5), of(6), of(7, 8, 9));
  const result = (await toArray(merged)).sort();
  expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
});
