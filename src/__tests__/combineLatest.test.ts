import { combineLatest } from "../combineLatest";
import { Subject } from "../subject";
import { toArray } from "../toArray";

test("combineLatest", async () => {
  const subjects = [
    new Subject<number>(),
    new Subject<number>(),
    new Subject<number>(),
  ];
  const combined = combineLatest(...subjects.map(s => s.iterator));
  subjects[0].onNext(1);
  subjects[1].onNext(2);
  subjects[2].onNext(3);
  subjects[0].onCompleted();
  subjects[1].onCompleted();
  subjects[2].onCompleted();
  const result = (await toArray(combined)).sort();
  expect(result).toEqual([[1, 2, 3]]);
});

test("combineLatest not enough values", async () => {
  const subjects = [
    new Subject<number>(),
    new Subject<number>(),
    new Subject<number>(),
  ];
  const combined = combineLatest(...subjects.map(s => s.iterator));
  subjects[1].onNext(2);
  subjects[2].onNext(3);
  subjects[0].onCompleted();
  subjects[1].onCompleted();
  subjects[2].onCompleted();
  const result = (await toArray(combined)).sort();
  expect(result).toEqual([]);
});
