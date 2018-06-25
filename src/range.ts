/**
 * Creates an iterable of numbers (positive and/or negative)
 * progressing from start up to, but not including, end. A step
 * of -1 is used if a negative start is specified without an end
 * or step. If end is not specified, it's set to start with start
 * then set to 0.
 */
export async function* range(
  startOrEnd: number,
  end: number,
  step: number = 1
) {
  let actualStart: number;
  let actualEnd: number;
  if (end === undefined) {
    actualStart = 0;
    actualEnd = startOrEnd;
  } else {
    actualStart = startOrEnd;
    actualEnd = end;
  }
  for (
    let i = actualStart;
    step > 0 ? i < actualEnd : i > actualEnd;
    i += step
  ) {
    yield i;
  }
}
