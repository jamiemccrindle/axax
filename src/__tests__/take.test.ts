import { of } from "../of";
import { take } from "../take";
import { toArray } from "../toArray";

test("take", async () => {
  const result = await toArray(take(2)(of(1, 2, 3, 4, 5, 6)));
  expect(result).toEqual([1, 2]);
});
