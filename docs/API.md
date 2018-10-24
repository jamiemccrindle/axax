# Axax API Reference

## Functions

- [concat](#concat)
- [concurrentMap](#concurrentmap)
- [count](#count)
- [debounce](#debounce)
- [distinctUntilChanged](#distinctuntilchanged)
- [every](#every)
- [filter](#filter)
- [first](#first)
- [flatMap](#flatmap)
- [flatten](#flatten)
- [from](#from)
- [fromEvent](#fromevent)
- [fromLineReader](#fromlinereader)
- [fromNodeStream](#fromnodestream)
- [insert](#insert)
- [interval](#interval)
- [last](#last)
- [map](#map)
- [merge](#merge)
- [of](#of)
- [pipe](#pipe)
- [pluck](#pluck)
- [range](#range)
- [reduce](#reduce)
- [scan](#scan)
- [skip](#skip)
- [skipWhile](#skipWhile)
- [some](#some)
- [sum](#sum)
- [take](#take)
- [takeWhile](#takewhile)
- [tap](#tap)
- [throttle](#throttle)
- [zip](#zip)


## Classes

- [Subject](#subject)
  - [Subject.callback](#subjectcallback)
  - [Subject.iterator](#subjectiterator)
  - [Subject.finally](#subjectfinally)
  - [Subject.onNext](#subjectonnext)
  - [Subject.onCompleted](#subjectoncompleted)
  - [Subject.onError](#subjectononerror)

# Functions

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

```javascript
// call signature
function concat(first: AsyncIterable): (second: AsyncIterable) => AsyncIterableIterator
```

## concurrentMap

Concurrently go through each item in the iterable and run a mapping function.
The mapping function must return a promise. The result will be a new iterable with
the transformed values.

```javascript
import { concurrentMap } from "axax/es5/concurrentMap";
import { of } from "axax/es5/of";

const mapped = concurrentMap(
    async (value) => value * 2, // async mapping function
    2                           // run 2 concurrently
)(of(1, 2, 3));

for await(const item of mapped) {
    console.log(item); // outputs 2, 4, 6 in no particular order
}
```

```javascript
// call signature
function concurrentMap(
    mapper: (value) => Promise,
    concurrency: number
    ): (source: AsyncIterable) => AsyncIterableIterator
```

## count

Counts the values returned by an async iterator

```javascript
import { count } from "axax/es5/count";
import { of } from "axax/es5/of";

const counted = await count(of(1, 2, 3, 4));
console.log(counted); // outputs 4
```

```javascript
// call signature
function count(source: AsyncIterable): Promise<number>
```

## Debounce

Prevents emitting of values until the promise returned by the timer is resolved.
When the timer resolves, emit the latest value from the async iterator.

```javascript
import { debounce } from "axax/es5/debounce";
import { interval } from "axax/es5/interval";
import { take } from "axax/es5/take";
import { wait} from "axax/es5/wait";

const timer = () => wait(100);
const counterToTenFiveMsIntervals = take(10)(interval(5));
const debounced = debounce(timer)(counterToTenFiveMsIntervals);

for await (const item of debounced) {
  console.log(item); // prints 1, 3, 5, 7, 9
}
```

```javascript
// call signature
function debounce(timer: (value) => Promise<void>): (source: AsyncIterable) => AsyncIterableIterator
```

## distinctUntilChanged

Only emit when the current value is different than the last.

```javascript
import { distinctUntilChanged } from "axax/es5/distinctUntilChanged";

const distinct = await distinctUntilChanged(of(0, 1, 1, 1, 3, 3, 4, 5, 6, 6, 6, 6));
console.log(distinct); // outputs 0, 1, 3, 4, 5, 6
```

```javascript
// call signature
function distinctUntilChanged(): (source: AsyncIterable) => AsyncIterableIterator
```

## every

If all values pass predicate before completion return true, else false.

```javascript
import { every } from "axax/es5/every";

const everyFalseCase = await every(value => value % 2 === 0)(of(1, 2, 3, 4, 5, 6));
console.log(everyFalseCase); // outputs false

const everyTrueCase = await every(value => value % 2 === 0)(of( 2, 4, 6));
console.log(everyTrueCase); // outputs true
```

```javascript
// call signature
function every(predicate?: (value) => boolean): (source: AsyncIterable) => Promise<boolean>
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

```javascript
// call signature
function filter(predicate: (value) => boolean | Promise<boolean>): (source: AsyncIterable) => AsyncIterableIterator
```

## first

Take the first value of ansync iterable that fullfills the predicate. If not predicate is provided, it returns the first value of the async iterable.

```javascript
import { first } from "axax/es5/first";
import { of } from "axax/es5/of";

const firsted = first(
    value => value % 2 === 0
)(of(1, 2, 3, 4, 5, 6));

for await(const item of firsted) {
    console.log(item); // outputs 2
}
```

```javascript
// call signature
function first(predicate?: (value) => boolean): (source: AsyncIterable) => AsyncIterableIterator
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

```javascript
// call signature
function flatMap(mapper: (value) => AsyncIterable): (source: AsyncIterable) => AsyncIterableIterator
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

```javascript
// call signature
function flatten(source: AsyncIterable<AsyncIterable>): AsyncIterableIterator
```

## from

Turn an array into an async iterable

```javascript
import { from } from "axax/es5/from";

const values = from([1, 2, 3]);

for await(const item of values) {
    console.log(item); // outputs 1, 2, 3
}
```

```javascript
// call signature
function from(values: Array): AsyncIterableIterator
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
## fromLineReader
Turns a readline event listener from the package `readline` into an iterable.

```javascript
import { fromLineReader } from "axax/es5/fromLineReader"

const rl = readline('./foo.txt')
const iterable = fromLineReader(rl);
for await (const item of iterable) {
    console.log(item); // outputs line in file
}
```

```javascript
// call signature
function fromEvent(eventSource, type: string): AsyncIterableIterator
```

## fromNodeStream
Turns a Node stream into an iterable
```javascript
import { fromNodeStream } from "axax/es5/fromNodeStream"

const stream = fs.createReadStream('foo.txt');
const iterable = fromNodeStream(stream);
for await (const item of iterable) {
    console.log(item); // outputs chunk of buffer
}

```

```javascript
// call signature
function fromNodeStream(stream: fs.ReadStream): AsyncIterableIterator<string | Buffer>
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

```javascript
// call signature
function insert(...values: Array): (source: AsyncIterable) => AsyncIterableIterator
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

```javascript
// call signature
function interval<T>(period: number, timeout?: (callback: () => void, delay: number) => void): AsyncIterableIterator<number>
```

## last

Take the last value of ansync iterable that fullfills the predicate. If not predicate is provided, it returns the last value of the async iterable. Optionally include a second argument that will be returned if no value of the async iterable fulfills the predicate.

```javascript
import { last } from "axax/es5/last";
import { of } from "axax/es5/of";

const lasted = last(
    value => value % 2 === 0
)(of(1, 2, 3, 4, 5, 6, 7));

for await(const item of lasted) {
    console.log(item); // outputs 6
}
```

```javascript
// call signature
function last(predicate?: (value) => boolean, defaultValue?): (source: AsyncIterable) => AsyncIterableIterator<T>
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

```javascript
// call signature
function map(mapper: (value, index: number) => T | Promise<T>): (source: AsyncIterable) => AsyncIterableIterator
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

```javascript
// call signature
function merge(...sources: AsyncIterable[]): AsyncIterableIterator
```

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

```javascript
// call signature
function of(...values: Array): AsyncIterableIterator
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

```javascript
// call signature
function pipe(...funcs: ((iterable: AsyncIterable) => any)[]): (source: AsyncIterable) => AsyncIterable
```

## pluck

Map source objects to a property specified by the given keys.
Returns the unchanged source on empty input or undefined
when any property in the path is undefined.

```javascript
import { from } from "axax/es5/from";
import { pipe } from "axax/es5/pipe";
import { pluck } from "axax/es5/pluck";

const persons = [
    {
        name: "Anna",
        age: 29,
    },
    {
        name: "Max",
        age: 41,
    },
]

const piped = pipe(
    pluck("name"))
(from(persons));

for await(const item of piped) {
    console.log(item); // prints "Anna", "Max"
}

```

```javascript
// call signature
function pluck(...path: string[]): (source: AsyncIterable) => AsyncIterableIterator
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

```javascript
// call signature
function range(startOrEnd: number, end: number, step?: number): AsyncIterableIterator<number>
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

```javascript
// call signature
function reduce(reducer: (accumulator, next) => A | Promise<A>, init: A | Promise<A>): (source: AsyncIterable) => Promise
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

```javascript
// call signature
function scan<(scanner: (accumulator, next) => A | Promise<A>, init: A | Promise<A>): (source: AsyncIterable) => AsyncIterableIterator
```

## skip

skips the first x values from an async iterable

```javascript
import { skip } from "axax/es5/skip";

const skip = await skip(2)(of(1, 2, 3, 4));
console.log(skip); // outputs 3, 4
```

```javascript
// call signature
function scan<(scanner: (accumulator, next) => A | Promise<A>, init: A | Promise<A>): (source: AsyncIterable) => AsyncIterableIterator
```

## skipWhile

Skipwhile emitted values from source until provided expression is false.

```javascript
import { skipWhile } from "axax/es5/skipWhile";

const skip = await skipWhile(value => value < 2)(of(0, 1, 2, 3, 4, 5, 6, 1, 2));
console.log(skip); // outputs  2, 3, 4, 5, 6, 1, 2
```

```javascript
// call signature
function skipWhile(predicate?: (value) => boolean): (source: AsyncIterable) => AsyncIterableIterator
```

## some

If any values pass predicate before completion return true, else false.

```javascript
import { some } from "axax/es5/some";

const someFalseCase = await some(value => value % 2 === 0)(of(1, 3, 5, 7, 9));
console.log(someFalseCase); // outputs false

const someTrueCase = await some(value => value % 2 === 0)(of(1, 2, 3));
console.log(someTrueCase); // outputs true
```

```javascript
// call signature
function some(predicate?: (value) => boolean): (source: AsyncIterable) => Promise<boolean>
```

## sum

Sum the values returned by an async iterator

```javascript
import { sum } from "axax/es5/sum";
import { of } from "axax/es5/of";

const summed = await sum(of(1, 2, 3, 4));
console.log(summed); // outputs 10
```

```javascript
// call signature
function sum(source: AsyncIterable<number>): Promise<number>
```

## take

Take the first x values from the async iterator

```javascript
import { take } from "axax/es5/take";
import { of } from "axax/es5/of";

const taken = await take(2)(of(1, 2, 3, 4));
console.log(taken); // outputs 1, 2
```

```javascript
// call signature
function take(numberToTake: number): (source: AsyncIterable) => AsyncIterableIterator
```

## takeWhile

Take values while a predicate holds true

```javascript
import { takeWhile } from "axax/es5/takeWhile";
import { of } from "axax/es5/of";

const taken = await takeWhile(value => value < 3)(of(1, 2, 3, 4));
console.log(taken); // outputs 1, 2
```

```javascript
// call signature
function takeWhile(predicate: (value) => boolean): (source: AsyncIterable) => AsyncIterableIterator
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

```javascript
// call signature
function tap(func: (value) => void): (source: AsyncIterable) => AsyncIterableIterator
```

## Throttle
Emits a value and then drops all values until the promise returned by the timer is resolved.

 ```javascript
import { interval } from "axax/es5/interval";
import { take } from "axax/es5/take";
import { throttle } from "axax/es5/throttle";
import { wait} from "axax/es5/wait";

const timer = () => wait(100);
const counterToTenFiveMsIntervals = take(10)(interval(5));
const throttled = throttle(timer)(counterToTenFiveMsIntervals);
for await (const item of throttled) {
  console.log(item); // prints 0, 2, 4, 6, 8
}
```

```javascript
// call signature
function throttle(timer: (value) => Promise<void>): (source: AsyncIterable) => AsyncIterableIterator
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

```javascript
// call signature
function zip(first: AsyncIterable): (second: AsyncIterable) => AsyncIterableIterator
```

# Classes

## Subject

`Subject` makes it easy to turn stream of events into an iterable.

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

### Subject.onError

Signal that an error has occured.

```javascript
import { Subject } from "axax/es5/subject";

const subject = new Subject();
subject.onNext(1);
subject.onError("something went wrong");

try {
    for await (const item of subject.iterable) {
        console.log(item); // outputs 1
    }
} catch(e) {
    console.log(e); // outputs "something went wrong"
}
```
