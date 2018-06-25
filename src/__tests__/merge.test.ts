import { of } from "../of";
import { merge } from "../merge";
import { toArray } from "../toArray";

test("merge", async () => {
  const merged = merge(of(1, 2, 3), of(4, 5, 6));
  const result = (await toArray(merged)).sort();
  expect(result).toEqual([1, 2, 3, 4, 5, 6]);
});
