import { of } from "../of";
import { toArray } from "../toArray";
import { flatten } from "../flatten";
import { pipe } from "../pipe";
import { map } from "../map";

test("pipe", async () => {
  const result = await toArray(
    pipe(
      map(x => of(x)),
      flatten
    )(of(1, 2, 3))
  );
  expect(result).toEqual([1, 2, 3]);
});
