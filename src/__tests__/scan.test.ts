import { of } from "../of";
import { scan } from "../scan";
import { toArray } from "../toArray";

test("scan", async () => {
  const result = await toArray(scan(
    (accumulator: number, next: number) => accumulator + next,
    0
  )(of(1, 2, 3)));
  expect(result).toEqual([0, 1, 3, 6]);
});
