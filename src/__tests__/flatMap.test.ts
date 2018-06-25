import { of } from "../of";
import { flatMap } from "../flatMap";
import { iterableToArray } from "../iterableToArray";

test("flatMap", async () => {
  const result = await iterableToArray(
    flatMap(async function*(value: number) {
      yield value * 2;
    })(of(1, 2, 3))
  );
  expect(result).toEqual([2, 4, 6]);
});
