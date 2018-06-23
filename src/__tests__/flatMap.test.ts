import { restToIterable } from "../restToIterable";
import iterableToArray from "../iterableToArray";
import flatMap from "../flatMap";

test("flatMap", async () => {
  const result = await iterableToArray(
    flatMap(async function*(value: number) {
      yield value * 2;
    })(restToIterable(1, 2, 3))
  );
  expect(result).toEqual([2, 4, 6]);
});
