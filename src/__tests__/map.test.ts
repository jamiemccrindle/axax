import { map } from "../map";
import { of } from "../of";
import { toArray } from "../toArray";

test("map", async () => {
  const result = await toArray(
    map((value: number) => value * 2)(of(1, 2, 3))
  );
  expect(result).toEqual([2, 4, 6]);
});
