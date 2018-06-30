import { filter } from "../filter";
import { of } from "../of";
import { toArray } from "../toArray";

test("filter", async () => {
  const result = await toArray(
    filter((value: number) => value % 2 === 0)(of(1, 2, 3, 4, 5, 6))
  );
  expect(result).toEqual([2, 4, 6]);
});
