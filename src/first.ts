/**
 * Take the first value or the first value to pass predicate from an async iterable
 */
export function first<T>(
    predicate: (t: T) => boolean = () => true,
) {
    return async function* inner(source: AsyncIterable<T>) {
        for await (const item of source) {
            if (predicate(item)) {
                yield item;
                break;
            }
        }
    };
}
