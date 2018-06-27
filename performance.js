const { range } = require("./lib/range");
const { map } = require("./lib/map");
const { filter } = require("./lib/filter");

async function time(promise) {
  const start = Date.now();
  await promise();
  return Date.now() - start;
}

async function run() {
  const timing = await time(async function() {
    let count = 0;
    for await (const item of filter(value => value > -1)(
      map(value => value)(range(1000000))
    )) {
      count += 1;
    }
    console.log(count);
  });
  console.log(timing + "ms");
}

run().catch(e => console.log(e));
