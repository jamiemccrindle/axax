import { interval } from "../interval";

test("interval", async () => {
  const iterable = interval(100, (cb, delay) => {
    cb();
  });
  const result = [];
  for await (const item of iterable) {
    result.push(item);
    if (item === 5) {
      break;
    }
  }
  expect(result).toEqual([0, 1, 2, 3, 4, 5]);
});
