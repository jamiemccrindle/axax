import { toArray } from "../toArray";
import { range } from "../range";

test("range", async () => {
  const result = await toArray(
    range(1, 3)
  );
  expect(result).toEqual([1, 2]);
});
