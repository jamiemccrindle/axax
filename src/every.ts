/**
 * If all values pass predicate before completion emit true, else false.
 */
export function every<T>(predicate: (t: T) => boolean = () => true) {
  return async function* inner(source: AsyncIterable<T>) {
    let status = true;
    for await (const item of source) {
      if (! predicate(item)) {
        status = false;
      }
    }
    yield status;
  };
}
