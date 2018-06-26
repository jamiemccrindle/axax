import { of } from "../of";
import { toArray } from "../toArray";
import { map } from "../map";

test("map", async () => {
  const result = await toArray(
    map((value: number) => value * 2)(of(1, 2, 3))
  );
  expect(result).toEqual([2, 4, 6]);
});
