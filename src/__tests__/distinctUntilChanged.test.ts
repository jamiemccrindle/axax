import { distinctUntilChanged } from "../distinctUntilChanged";
import { of } from "../of";
import { toArray } from "../toArray";

test("distinctUntilChanged", async () => {
  const result = await toArray(distinctUntilChanged()(of(0, 1, 1, 1, 3, 3, 4, 5, 6, 6, 6, 6)));
  expect(result).toEqual([0, 1, 3, 4, 5, 6]);
});
