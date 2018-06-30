# Axax API Reference

## Functions

- [of](#of)
- [map](#map)
- [concurrentMap](#concurrentmap)
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
- [pipe](#pipe)
- [fromEvent](#fromevent)
- [interval](#interval)
- [sum](#sum)
- [count](#count)

## Classes

- [Subject](#subject)
  - [Subject.callback](#subjectcallback)
  - [Subject.iterator](#subjectiterator)
  - [Subject.finally](#subjectfinally)
  - [Subject.onNext](#subjectonnext)
  - [Subject.onCompleted](#subjectoncompleted)

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

## concurrentMap

Concurrently go through each item in the iterable and run a mapping function.
The mapping function must return a promise. The result will be a new iterable with
the transformed values.

```javascript
import { map } from "axax/es5/map";
import { of } from "axax/es5/of";

const mapped = concurrentMap(
    async (value) => value * 2, // async mapping function
    2                           // run 2 concurrently
)(of(1, 2, 3));

for await(const item of mapped) {
    console.log(item); // outputs 2, 4, 6 in no particular order
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

## fromEvent

`fromEvents` turns DOM events into an iterable.

```javascript
import { fromEvent } from "axax/es5/fromEvent";

const clicks = fromEvent(document, 'click');

for await (const click of clicks) {
    console.log('a button was clicked');
}
```

## interval

Keep returning an incrementing number with a fixed delay between
each number.

```javascript
import { interval } from "axax/es5/interval";

for await (const item of interval(1000)) {
    console.log(item); // will output 0 to 10
    if(item >= 10) {
        break;         // stop the iterable
    }
}
```

## pipe

Pipe together a number of axax operators to use on a source async iterator.
Operators are applied left to right

```javascript
import { filter } from "axax/es5/filter";
import { pipe } from "axax/es5/pipe";
import { map } from "axax/es5/map";
import { of } from "axax/es5/of";

const piped = pipe(
    filter(value => value % 2 === 0),
    map(value => value * 2))
(of(1, 2, 3, 4));

for await(const item of piped) {
    console.log(item); // prints 4, 8
}
```

## sum

Sum the values returned by an async iterator

```javascript
import { sum } from "axax/es5/sum";
import { of } from "axax/es5/of";

const summed = await sum(of(1, 2, 3, 4));
console.log(summed); // outputs 10

```
## count

Counts the values returned by an async iterator

```javascript
import { count } from "axax/es5/count";
import { of } from "axax/es5/of";

const counted = await count(of(1, 2, 3, 4));
console.log(counted); // outputs 4
```

# Classes

## Subject

`Subject` makes it easy to turn stream of events into an interable.

You typically interact with `Subject` in 3 ways:

- To send data into the `Subject` call the `onNext` function with a value
- To complete sending data, call `onComplete`
- To read data from the `Subject` use the `iterable` property.

### Example

```javascript
import { Subject } from "axax/es5/subject";

const subject = new Subject();

// set up a callback that calls value on the subject
const callback = value => subject.onNext(value);

// attach the callback to the click event
document.addEventListener('click', callback);

// remove the callback when / if the iterable stops
subject.finally(() => document.removeEventListener('click', callback));

// go through all the click events
for await (const click of subject.iterator) {
    console.log('a button was clicked');
}
```

### Subject.callback

The callback to call to send a `IteratorResult` into the `Subject`. An `IteratorResult`
has a `done` boolean property and a `value` property.

```javascript
import { Subject } from "axax/es5/subject";

const subject = new Subject();
subject.callback({ done: false, value: 1 });
subject.callback({ done: false, value: 2 });
subject.callback({ done: false, value: 3 });
subject.callback({ done: true });

for await (const item of subject.iterator) {
    console.log(item); // prints 1, 2, 3
}
```

### Subject.iterable

An `AsyncIterable` that returns values supplied by calling `callback`.

```javascript
import { Subject } from "axax/es5/subject";

const subject = new Subject();
subject.callback({ done: false, value: 1 });
subject.callback({ done: false, value: 2 });
subject.callback({ done: false, value: 3 });
subject.callback({ done: true });

for await (const item of subject.iterable) {
    console.log(item); // prints 1, 2, 3
}
```

### Subject.finally

The callback supplied to `finally` is called when the iterable finishes either
because it's run out of values, it has returned or an error was thrown.

### Subject.onNext

A helper method to pass a value to the Subject. Calling
`subject.onNext('test')` is the same as calling
`subject.callback({ done: false, value: 'test'} )`.

### Subject.onCompleted

A helper method to signal the last value to Subject. Calling
`subject.onCompleted()` is the same as calling
`subject.callback({ done: true} )`.
