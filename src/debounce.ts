/**
 * Debounce an async iterator. Only emit values when no new value has been received during the provided timer duration.
 */
export function debounce<T>(timer: (value: T) => Promise<void>) {
  return async function* inner(source: AsyncIterable<T>) {
    const sourceIterator = source[Symbol.asyncIterator]();
    let itemPromise = sourceIterator.next();
    let pendingTimerPromise = null;
    let item = await itemPromise;
    let previousItem = item;
    while (!item.done) {
      pendingTimerPromise = pendingTimerPromise || timer(item.value);

      const raceResult = await Promise.race([itemPromise, pendingTimerPromise]);
      // raceResult is the value of the first promise to resolve. If raceResult
      // is not undefined, it _should_ be the result of the itemPromise since
      // pendingTimerPromise resolves to void. Just to be sure though, we check
      // that the result has the shape of an IteratorResult.
      if (raceResult && raceResult.hasOwnProperty("value") && raceResult.hasOwnProperty("done")) {
        // itemPromise won the race!
        previousItem = item;
        item = raceResult;
        itemPromise = sourceIterator.next();
      } else {
        // pendingTimerPromise won the race!
        yield item.value;
        pendingTimerPromise = null;
        previousItem = item;
        item = await itemPromise;
        itemPromise = sourceIterator.next();
      }
    }

    if (pendingTimerPromise) {
      await pendingTimerPromise;
      yield previousItem.value;
    }
  };
}
