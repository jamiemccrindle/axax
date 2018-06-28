# Axax API Reference

## Classes

- [DeferredIterable](#deferrediterable)
    - [DeferredIterable.callback](#deferrediterablecallback)
    - [DeferredIterable.iterator](#deferrediterableiterator)
    - [DeferredIterable.finally](#deferrediterablefinally)
    - [DeferredIterable.value](#deferrediterablevalue)
    - [DeferredIterable.close](#deferrediterableclose)

## Functions

- [of](#of)
- [map](#map)
- [filter](#filter)
- [flatMap](#flatmap)
- [concat](#concat)
- [reduce](#reduce)
- [merge](#merge)
- [insert](#insert)
- [tap](#tap)
- [zip](#zip)
- [range](#range)
- [scan](#scan)
- [flatten](#flatten)

# Classes

## DeferredIterable

`DeferredIterable` makes it easy to turn stream of events into an interable.

You typically interact with `DeferredIterable` in 2 ways:

- To send data into the `DeferredIterable` call the `callback` function to send an `IteratorResult`
- To read data from the `DeferredIterable` use the `iterable` property.

### Example

```javascript
import { DeferredIterable } from "axax/es5/deferredIterable";

const deferredIterable = new DeferredIterable();

// set up a callback that calls value on the deferredIterable
const callback = value => deferredIterable.value(value);

// attach the callback to the click event
document.addEventListener('click', callback);

// remove the callback when / if the iterable stops
deferredIterable.finally(() => document.removeEventListener('click', deferredIterable.value));

// go through all the click events
for await (const click of deferredIterable.iterator) {
    console.log('a button was clicked');
}
```

### DeferredIterable.callback

The callback to call to send a `IteratorResult` into the `DeferredIterable`. An `IteratorResult`
has a `done` boolean property and a `value` property.

```javascript
import { DeferredIterable } from "axax/es5/deferredIterable";

const deferredIterable = new DeferredIterable();
deferredIterable.callback({ done: false, value: 1 });
deferredIterable.callback({ done: false, value: 2 });
deferredIterable.callback({ done: false, value: 3 });
deferredIterable.callback({ done: true });

for await (const item of deferredIterable.iterator) {
    console.log(item); // prints 1, 2, 3
}
```

### DeferredIterable.iterable

An ```AsyncIterable``` that returns values supplied by calling ```callback```.

```javascript
import { DeferredIterable } from "axax/es5/deferredIterable";

const deferredIterable = new DeferredIterable();
deferredIterable.callback({ done: false, value: 1 });
deferredIterable.callback({ done: false, value: 2 });
deferredIterable.callback({ done: false, value: 3 });
deferredIterable.callback({ done: true });

for await (const item of deferredIterable.iterable) {
    console.log(item); // prints 1, 2, 3
}
```

### DeferredIterable.finally

The callback supplied to ```finally``` is called when the iterable finishes either 
because it's run out of values, it has returned or an error was thrown.

### DeferredIterable.value

A helper method to pass a value to the DeferredIterable. Calling
```deferredIterable.value('test')``` is the same as calling 
```deferredIterable.callback({ done: false, value: 'test'} )```.

### DeferredIterable.close

A helper method to signal the last value to DeferredIterable. Calling
```deferredIterable.close()``` is the same as calling 
```deferredIterable.callback({ done: true} )```.

# Functions

## of

Construct a new async iterable from a series
of values.

```javascript
import { of } from "axax/es5/of";

const values = of(1, 2, 3);

for await(const item of values) {
    console.log(item); // outputs 1, 2, 3
}
```

## map

Go through each item in the iterable and run a mapping function. The result will be a new
iterable with the transformed values.

```javascript
import { map } from "axax/es5/map";
import { of } from "axax/es5/of";

const mapped = map(value => value * 2)(of(1, 2, 3));

for await(const item of mapped) {
    console.log(item); // outputs 2, 4, 6
}
```

## flatMap

Go through each item in the iterable and run a mapping function that returns an async iterable. The
result is then flattened.

```javascript
import { flatMap } from "axax/es5/flatMap";
import { of } from "axax/es5/of";

const mapped = flatMap(
    async function* (value) {
        yield value;
        yield value;
    }
)(of(1, 2, 3);

for await(const item of mapped) {
    console.log(item); // outputs 1, 1, 2, 2, 3, 3
}
```

## filter

Filter an iterable based on some criteria.

```javascript
import { filter } from "axax/es5/filter";
import { of } from "axax/es5/of";

const filtered = filter(
    value => value % 2 === 0
)(of(1, 2, 3, 4, 5, 6));

for await(const item of filtered) {
    console.log(item); // outputs 2, 4, 6
}
```

## concat

Concatenate 2 iterables in order

```javascript
import { concat } from "axax/es5/concat";
import { of } from "axax/es5/of";

const concatted = concat(
    of(1, 2)
)(of(3, 4));

for await(const item of concatted) {
    console.log(item); // outputs 1, 2, 3, 4
}
```

## reduce

Reduce a series of values to a single result. The series of values is
reduced by a function that compbines a running total or accumulator with
the next value to produce the new total or accumulator.

```javascript
import { reduce } from "axax/es5/reduce";
import { of } from "axax/es5/of";

const reduced = reduce(
    (accumulator, next) => accumulator + next, // sum the values together
    0
)(of(1, 2, 3));

console.log(reduced); // 6
```

## merge

Merge a number of async iterators into one concurrently. Order is not important.

```javascript
import { merge } from "axax/es5/merge";
import { of } from "axax/es5/of";

const merged = merge(
    of(1, 2), of(3, 4)
);

for await(const item of merged) {
    console.log(item); // outputs 1, 2, 3, 4 in no particular order
}
```

## insert

Insert values at the beginning of an async iterable.

```javascript
import { insert } from "axax/es5/insert";
import { of } from "axax/es5/of";

const inserted = insert(
    1, 2, 3
)(of(4, 5, 6));

for await(const item of inserted) {
    console.log(item); // outputs 1, 2, 3, 4, 5, 6
}
```

## tap

'Taps' an async iterable. Allows you to run a function for
every item in the iterable but doesn't do anything with the 
result of the function. Typically used for side effects like
logging.

```javascript
import { tap } from "axax/es5/tap";
import { of } from "axax/es5/of";

const tapped = tap(
    value => console.log(value) // prints 1, 2, 3
)(of(1, 2, 3));

for await(const item of tapped) {
    console.log(item); // prints 1, 2, 3
}
```

## zip

Creates a new iterable out of the two supplied by pairing up equally-positioned items from both iterables. The returned iterable is truncated to the length of the shorter of the two input iterables.

```javascript
import { zip } from "axax/es5/zip";
import { of } from "axax/es5/of";

const zipped = zip(
    of(1, 2)
)(of(1, 2));

for await(const item of zipped) {
    console.log(item); // prints [1, 1], [2, 2]
}
```

## range

 Creates an iterable of numbers (positive and/or negative)
 progressing from start up to, but not including, end. A step
 of -1 is used if a negative start is specified without an end
 or step. If end is not specified, it's set to start with start
 then set to 0.

```javascript
import { range } from "axax/es5/range";
import { of } from "axax/es5/of";

const ranged = range(1, 3);

for await(const item of ranged) {
    console.log(item); // prints 1, 2
}
```

## scan

Similar to a reduce except that it outputs the accumulator as it goes.

```javascript
import { scan } from "axax/es5/scan";
import { of } from "axax/es5/of";

const scanned = scan((accumulator, value) => accumulator + value, 0)(of(1, 2, 3));

for await(const item of scanned) {
    console.log(item); // prints 0, 1, 3, 6
}
```

## flatten

Flattens an async iterable of async iterables.

```javascript
import { flatten } from "axax/es5/flatten";
import { of } from "axax/es5/of";

const flattened = flatten(of(of(1), of(2, 3)));

for await(const item of flattened) {
    console.log(item); // prints 1, 2, 3
}
```
