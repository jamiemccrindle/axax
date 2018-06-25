import { of } from "../of";
import { reduce } from "../reduce";

test("reduce", async () => {
  const result = await reduce(
    (accumulator: number, next: number) => accumulator + next,
    0
  )(of(1, 2, 3));
  expect(result).toEqual(6);
});
