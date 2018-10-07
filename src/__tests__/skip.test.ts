import { of } from "../of";
import { skip } from "../skip";
import { toArray } from "../toArray";

test("skip for valid return", async () => {
  const result = await toArray(skip(2)(of(1, 2, 3, 4, 5, 6)));
  expect(result).toEqual([3, 4, 5, 6]);
});

test("skip for single return", async () => {
  const result = await toArray(skip(5)(of(1, 2, 3, 4, 5, 6)));
  expect(result).toEqual([6]);
});

test("skip for empty return", async () => {
  const result = await toArray(skip(6)(of(1, 2, 3, 4, 5, 6)));
  expect(result).toEqual([]);
});
