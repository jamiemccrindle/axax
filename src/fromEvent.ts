import DeferredIterable from "./deferredIterable";

interface EventSource<T> {
  addEventListener: (callback: (event: T) => void) => void;
  removeEventListener: (callback: any) => void;
}

export default function fromEvent<T>(source: EventSource<T>) {
  const deferredIterable = new DeferredIterable<T>();
  const callback = (event: T) => {
    deferredIterable.value(event);
  };
  source.addEventListener(callback);
  deferredIterable.finally(() => source.removeEventListener(callback));
  return deferredIterable.iterator;
}
