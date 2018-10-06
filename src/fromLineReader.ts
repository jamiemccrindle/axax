import readline from "readline";
import { Subject } from "./subject";

export function fromLineReader(lineReader: readline.ReadLine) {
  const subject = new Subject<string>();

  lineReader.on("line", (line: string) => subject.onNext(line));

  lineReader.on("close", () => subject.onCompleted());

  subject.finally(() => lineReader.close());

  return subject.iterator;
}
