import { interval } from "../interval";
import { of } from "../of";
import { take } from "../take";
import { throttle } from "../throttle";
import { toArray } from "../toArray";
import { wait } from "../wait";

test("throttle", async () => {
  const result = await toArray(
    throttle(() => wait(100))(of(1, 2, 3, 4, 5, 6))
  );
  expect(result).toEqual([1]);
});

test("throttle one value", async () => {
  const startTime = Date.now();
  const result = await toArray(
    throttle(() => wait(100))(of(1))
  );
  const endTime = Date.now();
  expect(result).toEqual([1]);
  expect(endTime - startTime).toBeLessThan(100);
});

// todo: fix these

// test("throttle interval", async () => {
//   const result = await toArray(
//     throttle(() => wait(100))(take(50)(interval(10)))
//   );
//   expect(result).toEqual([0, 10, 20, 30, 40]);
// });

test("throttle timer count", async () => {
  let counter = 0;
  const result = await toArray(
    throttle(() => {
      counter++;
      return wait(100);
    })(take(50)(interval(10)))
  );
  expect(counter).toBeLessThan(10);
});

test("throttle increasing timeout", async () => {
  const result = await toArray(
    throttle<number>(val => wait(200 * (val + 1)))(take<number>(10)(interval(100)))
  );
  expect(result).toEqual([0, 2, 8]);
});
