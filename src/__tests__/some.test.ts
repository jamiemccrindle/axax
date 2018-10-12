import { of } from "../of";
import { some } from "../some";

test("some with inline predicate and with true as a result", async () => {
    const result = await some((value: number) => value % 2 === 0)(of(1, 2, 1));
    expect(result).toEqual(true);
});

test("some with inline predicate and with false as a result", async () => {
    const result = await some((value: number) => value % 2 === 0)(of(1, 3, 5));
    expect(result).toEqual(false);
});

test("some with Boolean predicate, number values, and with true as a result", async () => {
    const result = await some(Boolean)(of(0, 1, 0));
    expect(result).toEqual(true);
});

test("some with Boolean predicate, number values, and with false as a result", async () => {
    const result = await some(Boolean)(of(0, 0, 0));
    expect(result).toEqual(false);
});

test("some with Boolean predicate, array values, and with true as a result", async () => {
    const result = await some(Boolean)(of([], [1, 2, 3], []));
    expect(result).toEqual(true);
});

test("some with Boolean predicate, array values, and with false as a result", async () => {
    const result = await some(Boolean)(of([], [], []));
    expect(result).toEqual(true);
});

test("some with predicate and with true as a result : edge case scenario", async () => {
    const result = await some((value: number) => value % 2 === 0)(of(1, 3, 5, 7, 8));
    expect(result).toEqual(true);
});

test("some with predicate and with true as a result : edge case scenario", async () => {
    const result = await some((value: number) => value % 2 === 0)(of(2, 3, 5, 7, 9));
    expect(result).toEqual(true);
});
