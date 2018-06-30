import { flatten } from "../flatten";
import { map } from "../map";
import { of } from "../of";
import { pipe } from "../pipe";
import { toArray } from "../toArray";

test("pipe", async () => {
  const result = await toArray(
    pipe(
      map(x => of(x)),
      flatten
    )(of(1, 2, 3))
  );
  expect(result).toEqual([1, 2, 3]);
});
