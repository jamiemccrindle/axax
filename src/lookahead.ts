import { iteratorToIterable } from "./iteratorToIterable";
import insert from "./insert";

/**
 * Lookahead into the async iteratable
 *
 * @param source The source iterable to look into
 * @param howFar How far to look ahead
 */
export function lookahead<T>(howFar: number) {
  return async function inner(
    source: AsyncIterable<T>
  ): Promise<{ values: Array<T>; iterable: AsyncIterable<T> }> {
    const iterator = source[Symbol.asyncIterator]();
    const values: Array<T> = [];
    for (let i = 0; i < howFar; i++) {
      const next = await iterator.next();
      if (next.done) break;
      values.push(next.value);
    }
    return {
      values,
      iterable: insert(...values)(iteratorToIterable(iterator))
    };
  };
}

