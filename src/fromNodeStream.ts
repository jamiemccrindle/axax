import fs from "fs";
import { Subject } from "./subject";

export function fromNodeStream(stream: fs.ReadStream) {
  const subject = new Subject<Buffer | string>();

  stream.on("data", (chunk: Buffer | string) => subject.onNext(chunk));

  stream.on("end", () => subject.onCompleted());
  stream.on("error", e => subject.onError(e));

  return subject.iterator;
}
