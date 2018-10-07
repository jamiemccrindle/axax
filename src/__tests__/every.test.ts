import { every } from "../every";
import { of } from "../of";
import { toArray } from "../toArray";

test("every with predicate and with false as a result", async () => {
  const result = await every((value: number) => value % 2 === 0)(of(1, 2, 3, 4, 5, 6));
  expect(result).toEqual(false);
});

test("every with predicate and with true as a result", async () => {
  const result = await every((value: number) => value % 2 === 0)(of(2, 4, 6));
  expect(result).toEqual(true);
});

test("every with predicate and with false as a result : edge case scenario", async () => {
  const result = await every((value: number) => value % 2 === 0)(of(2, 4, 6, 7));
  expect(result).toEqual(false);
});

test("every with predicate and with false as a result : edge case scenario", async () => {
  const result = await every((value: number) => value % 2 === 0)(of(1, 3, 5, 6));
  expect(result).toEqual(false);
});

test("every with predicate and with false as a result : edge case scenario", async () => {
  const result = await every((value: number) => value % 2 === 0)(of(2, 3, 5, 7));
  expect(result).toEqual(false);
});

test("every with predicate and with false as a result : edge case scenario", async () => {
  const result = await every((value: number) => value % 2 === 0)(of(1, 2, 4, 6));
  expect(result).toEqual(false);
});
