import { restToIterable } from "../restToIterable";
import { lookahead } from "../lookahead";
import { toArray } from "../toArray";

test("lookahead", async () => {
  const result = await lookahead(2)(restToIterable(1, 2, 3));
  expect(result.values).toEqual([1, 2]);
  expect(await toArray(result.iterable)).toEqual([1, 2, 3]);
});
