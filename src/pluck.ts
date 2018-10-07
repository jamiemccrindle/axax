/**
 * Maps the source objects to their values at the path specified
 */
export function pluck<TFrom, TTo = any>(...path: string[]) {
  return async function* inner(source: AsyncIterable<TFrom>) {
    for await (const item of source) {
      let value: any = item;
      for (const key of path) {
        if (value[key] === undefined) {
          value = undefined;
          break;
        }
        value = value[key];
      }
      yield value as TTo;
    }
  };
}
