import { flatten } from "../flatten";
import { of } from "../of";
import { toArray } from "../toArray";

test("flatten", async () => {
  const result = await toArray(flatten(of(of(1), of(2), of(3))));
  expect(result).toEqual([1, 2, 3]);
});
