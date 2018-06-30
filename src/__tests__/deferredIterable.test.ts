import { Subject } from "../subject";

test("Subject", async () => {
  const d = new Subject<number>();
  d.value(1);
  d.value(2);
  d.value(3);
  d.close();
  const result = [];
  for await (const item of d.iterator) {
    result.push(item);
  }
  expect(result).toEqual([1, 2, 3]);
});

test("Subject", async () => {
  const d = new Subject<number>();
  const iterator = d.iterator;
  const [, { value, done }] = await Promise.all([d.value(1), iterator.next()]);
  expect(done).toBeFalsy();
  expect(value).toBe(1);
});
