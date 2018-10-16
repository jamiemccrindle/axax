/**
 * Throttles an async iterator. Emits a value and then prevents emits until timer has completed.
 */
export function throttle<T>(timer: (value: T) => Promise<void>) {
  return async function* inner(source: AsyncIterable<T>) {
    let pendingTimerPromise = null;
    for await (const item of source) {
      if (!pendingTimerPromise) {
        yield item;
        pendingTimerPromise = timer(item).then(() => {
          pendingTimerPromise = null;
        });
      }
    }
  };
}
