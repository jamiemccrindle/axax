import { debounce } from "../debounce";
import { interval } from "../interval";
import { of } from "../of";
import { take } from "../take";
import { toArray } from "../toArray";
import { wait } from "../wait";

test("debounce", async () => {
  const result = await toArray(
    debounce(() => wait(100))(of(1, 2, 3, 4, 5, 6))
  );
  expect(result).toEqual([6]);
});

test("debounce one value", async () => {
  const startTime = Date.now();
  const result = await toArray(
    debounce(() => wait(100))(of(1))
  );
  const endTime = Date.now();
  expect(result).toEqual([1]);
  expect(endTime - startTime).toBeGreaterThanOrEqual(100);
});

// test("debounce interval", async () => {
//   const result = await toArray(
//     debounce(() => wait(100))(take(50)(interval(10)))
//   );
//   expect(result).toEqual([9, 19, 29, 39, 49]);
// });

test("debounce timer count", async () => {
  let counter = 0;
  const result = await toArray(
    debounce(() => {
      counter++;
      return wait(100);
    })(take(50)(interval(10)))
  );
  expect(counter).toBeLessThan(10);
});

test("debounce increasing timeout", async () => {
  const result = await toArray(
    debounce<number>(val => wait(200 * (val + 1)))(take<number>(10)(interval(100)))
  );
  expect(result).toEqual([1, 7, 9]);
});
