import { Subject } from "../subject";

test("Subject", async () => {
  const d = new Subject<number>();
  d.onNext(1);
  d.onNext(2);
  d.onNext(3);
  d.onCompleted();
  const result = [];
  for await (const item of d.iterator) {
    result.push(item);
  }
  expect(result).toEqual([1, 2, 3]);
});

test("Subject", async () => {
  const d = new Subject<number>();
  const iterator = d.iterator;
  const [, { value, done }] = await Promise.all([d.onNext(1), iterator.next()]);
  expect(done).toBeFalsy();
  expect(value).toBe(1);
});
