import { of } from "../of";
import { iterableToArray } from "../iterableToArray";
import { filter } from "../filter";

test("filter", async () => {
  const result = await iterableToArray(
    filter((value: number) => value % 2 === 0)(of(1, 2, 3, 4, 5, 6))
  );
  expect(result).toEqual([2, 4, 6]);
});
