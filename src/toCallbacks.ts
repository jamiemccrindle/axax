/** Provides a way for callbacks to signal early completion */
export class StopError extends Error {}

/**
 * Converts an async iterable into a series of callbacks. The function returns
 * a promise that resolves when the stream is done
 *
 * @param callback the callback that gets called for each value
 */
export function toCallbacks<T>(
  callback: (result: IteratorResult<T>) => Promise<void>
) {
  return async function inner(source: AsyncIterable<T>) {
    const iterator = source[Symbol.asyncIterator]();
    while (true) {
      const result = await iterator.next();
      try {
        await callback(result);
      } catch (StopError) {
        return;
      }
      if (result.done) {
        return;
      }
    }
  };
}
