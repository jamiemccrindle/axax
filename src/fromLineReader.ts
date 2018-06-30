import readline from "readline";
import { Subject } from "./subject";

export function fromLineReader(lineReader: readline.ReadLine) {
  const subject = new Subject<string>();

  lineReader.on("line", (line: string) => subject.onNext(line));

  lineReader.on("close", () => subject.onCompleted());

  return subject.iterator;
}
