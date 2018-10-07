import { of } from "../of";
import { skipWhile } from "../skipwhile";
import { toArray } from "../toArray";

test("skipWhile", async () => {
    const result = await toArray(
        skipWhile((value: number) => value < 2)(
            of(0, 1, 2, 3, 4, 5, 1, 2, 3, 4)
        )
    );
    expect(result).toEqual([2, 3, 4, 5, 1, 2, 3, 4]);
});

test("skipWhile", async () => {
    const result = await toArray(
        skipWhile((value: number) => value > 2)(
            of(0, 1, 2, 3, 4, 5, 1, 2, 3, 4)
        )
    );
    expect(result).toEqual([0, 1, 2, 3, 4, 5, 1, 2, 3, 4]);
});

test("skipWhile", async () => {
    const result = await toArray(
        skipWhile((value: number) => value <= 2 || value >= 10)(
            of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11)
        )
    );
    expect(result).toEqual([3, 4, 5, 6, 7, 8, 9, 10, 11]);
});

test("skipWhile", async () => {
    const result = await toArray(
        skipWhile((value: number) => value < 2 || value < 5)(
            of(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11)
        )
    );
    expect(result).toEqual([5, 6, 7, 8, 9, 10, 11]);
});
