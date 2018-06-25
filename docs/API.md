# Aix API Reference

## Classes

* [DeferredIterable](##DeferredIterable)

## Functions

* [of](#of)
* [map](#map)
* [filter](#filter)
* [flatMap](#flatMap)
* [concat](#concat)

# Classes

## DeferredIterable

```DeferredIterable``` makes it easy to turn stream of events into an interable.

You typically interact with ```DeferredIterable``` in 2 ways:

* To send data into the ```DeferredIterable``` call the ```callback``` function to send an ```IteratorResult```
* To read data from the ```DeferredIterable``` use the ```iterable``` property.

### Example

```javascript
import { DeferredIterable } from "aix/deferredIterable";

const deferredIterable = new DeferredIterable();

// set up a callback that calls value on the deferredIterable
const callback = value => deferredIterable.value(value);

// attach the callback to the click event
document.addEventListener('click', callback);

// remove the callback when / if the iterable stops
deferredIterable.finally(() => document.removeEventListener('click', deferredIterable.value));

// go through all the click events
for await (const click of deferredIterable.iterable) {
    console.log('a button was clicked');
}
```

# Functions

## of

Construct a new async iterable from a series
of values.

```javascript
import { of } from "aix/of";

const values = of(1, 2, 3);

for await(const item of mapped) {
    console.log(item); // outputs 1, 2, 3
}
```

## map

Go through each item in the iterable and run a mapping function. The result will be a new 
iterable with the transformed values.

```javascript
import { map } from "aix/map";
import { of } from "aix/of";

const mapped = map(value => value * 2)(of(1, 2, 3));

for await(const item of mapped) {
    console.log(item); // outputs 2, 4, 6
}
```

## flatMap

Go through each item in the iterable and run a mapping function that returns an async iterable. The 
result is then flattened.

```javascript
import { flatMap } from "aix/flatMap";
import { of } from "aix/of";

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
import { filter } from "aix/filter";
import { of } from "aix/of";

const filtered = filter(
    value => value % 2 === 0
)(of(1, 2, 3, 4, 5, 6);

for await(const item of filtered) {
    console.log(item); // outputs 2, 4, 6
}
```

## concat

Concatenate 2 iterables in order

```javascript
import { concat } from "aix/concat";
import { of } from "aix/of";

const concatted = concat(
    of(1, 2)
)(of(3, 4);

for await(const item of concatted) {
    console.log(item); // outputs 1, 2, 3, 4
}
```
