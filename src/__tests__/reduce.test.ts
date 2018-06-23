import { restToIterable } from "../restToIterable";
import iterableToArray from "../iterableToArray";
import reduce from "../reduce";

test("reduce", async () => {
  const result = await reduce(
    (accumulator: number, next: number) => accumulator + next,
    0
  )(restToIterable(1, 2, 3));
  expect(result).toEqual(6);
});
