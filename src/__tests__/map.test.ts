import { restToIterable } from "../restToIterable";
import { iterableToArray } from "../iterableToArray";
import { map } from "../map";

test("map", async () => {
  const result = await iterableToArray(
    map((value: number) => value * 2)(restToIterable(1, 2, 3))
  );
  expect(result).toEqual([2, 4, 6]);
});
