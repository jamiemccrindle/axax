import { restToIterable } from "../restToIterable";
import iterableToArray from "../iterableToArray";
import reduce from "../reduce";
import { lookahead } from "../lookahead";

test("lookahead", async () => {
  const result = await lookahead(2)(restToIterable(1, 2, 3));
  expect(result.values).toEqual([1, 2]);
  expect(await iterableToArray(result.iterable)).toEqual([1, 2, 3]);
});
