import { concurrentMap } from "../concurrentMap";
import { of } from "../of";
import { range } from "../range";
import { toArray } from "../toArray";
import { wait } from "../wait";

test("concurrentMap", async () => {
  const result = await toArray(
    concurrentMap(async (value: number) => value * 2, 2)(of(1, 2, 3))
  );
  result.sort();
  expect(result).toEqual([2, 4, 6]);
});

test("concurrentMap async", async () => {
  let maxInParallel = 0;
  let currentInParallel = 0;
  const increment = () => {
    currentInParallel += 1;
    if (currentInParallel > maxInParallel) {
      maxInParallel = currentInParallel;
    }
  };
  const decrement = () => {
    currentInParallel -= 1;
  };
  for await (const item of concurrentMap(async () => {
    increment();
    await wait(100);
    decrement();
  }, 4)(range(1, 10))) {
    // noop
  }
  expect(maxInParallel).toEqual(4);
});
