import { Subject} from "./subject";

export interface IEventSource<T> {
  addEventListener: (type: string, callback: (event: T) => void) => void;
  removeEventListener: (type: string, callback: any) => void;
}

export function fromEvent<T>(source: IEventSource<T>, type: string) {
  const subject = new Subject<T>();
  const callback = (event: T) => {
    subject.onNext(event);
  };
  source.addEventListener(type, callback);
  subject.finally(() => source.removeEventListener(type, callback));
  return subject.iterator;
}
