import { Subject } from "./subject";

/**
 * Emit numbers in sequence
 */
export function interval<T>(
  period: number,
  timeout?: ((callback: () => void, delay: number) => void)
) {
  const subject = new Subject<number>();
  let counter = 0;
  async function inner() {
    if (!subject.done) {
      await subject.onNext(counter++);
      (timeout || setTimeout)(inner, period);
    }
  }
  inner();
  return subject.iterator;
}
