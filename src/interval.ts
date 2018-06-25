import DeferredIterable from "./deferredIterable";

/**
 * Emit numbers in sequence
 */
export function interval<T>(
  period: number,
  timeout?: ((callback: () => void, delay: number) => void)
) {
  const deferredIterable = new DeferredIterable<number>();
  let counter = 0;
  async function inner() {
    if (!deferredIterable.done) {
      await deferredIterable.value(counter++);
      (timeout || setTimeout)(inner, period);
    }
  }
  inner();
  return deferredIterable.iterator;
}
