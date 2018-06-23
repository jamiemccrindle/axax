/**
 * Zips two iterables
 */
export default function zip<T>(first: AsyncIterable<T>) {
  return async function* inner(second: AsyncIterable<T>) {
    const iterators = [first, second].map(value =>
      value[Symbol.asyncIterator]()
    );
    while (true) {
      const [firstNext, secondNext] = await Promise.all(
        iterators.map(iterator => iterator.next())
      );
      if (firstNext.done || secondNext.done) {
        return;
      }
      yield [firstNext, secondNext];
    }
  };
}
