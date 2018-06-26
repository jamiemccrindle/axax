/**
 * Pipes an async iterator through a list of functions that take an async iterator
 * as an argument.
 * 
 * @param funcs a series of functions that operate on AsyncIterables
 */
export function pipe<T>(...funcs: ((iterable: AsyncIterable<any>) => any)[]) {
  return function inner(source: AsyncIterable<any>) {
    let current = source;
    for(const func of funcs) {
      current = func(current);
    }
    return current as AsyncIterable<T>;
  };
}
