import { from } from "../from";
import { of } from "../of";
import { pluck } from "../pluck";
import { toArray } from "../toArray";

test("pluck", async () => {
  const source = {
    a: "plucked",
    x: 1,
    y: 2,
    z: {},
  };

  const result = await toArray(
    pluck<typeof source, string>("a")(of(source))
  );

  expect(result).toEqual(["plucked"]);
});

test("pluck with multiple items", async () => {
  const source = [
    {
      a: "item1",
      x: 1,
    },
    {
      a: "item2",
      x: 1,
    }
  ];

  const result = await toArray(
    pluck<typeof source[0], string>("a")(from(source))
  );

  expect(result).toEqual(["item1", "item2"]);
});

test("pluck with nested properties", async () => {
  const source = {
    a: {
      b: 1
    },
    x: 2,
  };

  const result = await toArray(
    pluck<typeof source, number>("a", "b")(of(source))
  );

  expect(result).toEqual([1]);
});

test("pluck with undefined properties", async () => {
  const source = {
    a: {
      b: 2
    },
    b: 3,
    x: 4,
  };

  const result = await toArray(
    pluck("a", "b", "c")(of(source))
  );

  expect(result).toEqual([undefined]);
});

test("pluck with no parameters", async () => {
  const source = {
    a: 1,
  };

  const result = await toArray(
    pluck()(of(source))
  );

  expect(result).toEqual([source]);
});

test("pluck with non-object sources", async () => {
  const source = [
    1,
    2,
    4,
  ];

  const result = await toArray(
    pluck("test")(of(source))
  );

  expect(result).toEqual([undefined]);
});
