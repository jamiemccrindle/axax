import DeferredIterable from "./deferredIterable";

export interface EventSource<T> {
  addEventListener: (type: string, callback: (event: T) => void) => void;
  removeEventListener: (type: string, callback: any) => void;
}

export function fromEvent<T>(source: EventSource<T>, type: string) {
  const deferredIterable = new DeferredIterable<T>();
  const callback = (event: T) => {
    deferredIterable.value(event);
  };
  source.addEventListener(type, callback);
  deferredIterable.finally(() => source.removeEventListener(type, callback));
  return deferredIterable.iterator;
}
