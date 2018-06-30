import { range } from "../range";
import { toArray } from "../toArray";

test("range", async () => {
  const result = await toArray(
    range(1, 3)
  );
  expect(result).toEqual([1, 2]);
});
