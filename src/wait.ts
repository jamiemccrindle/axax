export function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
