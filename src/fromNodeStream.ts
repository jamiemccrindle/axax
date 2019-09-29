import fs from "fs";
import { Subject } from "./subject";

export function fromNodeStream<T = Buffer | string>(stream: fs.ReadStream) {
  const subject = new Subject<T>();

  stream.on("data", (chunk: T) => subject.onNext(chunk));

  stream.on("end", () => subject.onCompleted());
  stream.on("error", e => subject.onError(e));

  return subject.iterator;
}
