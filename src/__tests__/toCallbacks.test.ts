import { of } from "../of";
import { toCallbacks } from "../toCallbacks";
import { wait } from "../wait";

test("toCallback", async () => {
  let callbackCounter = 0;
  const callback = async (result: IteratorResult<number>) => {
    // add some race condition when first value appears
    if (callbackCounter === 0) {
      await wait(10);
    }

    expect(result.value).toEqual(callbackCounter);
    callbackCounter += 1;
  };

  const values = [0, 1, 2];
  await toCallbacks(callback)(of(...values));

  expect(callbackCounter).toEqual(values.length);
});
