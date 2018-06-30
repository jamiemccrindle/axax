# Async Iterator Extensions

A library of async iterator extensions for JavaScript including ```map```, ```reduce```,
```filter```, ```flatMap```, ```pipe``` and [more](https://github.com/jamiemccrindle/axax/blob/master/docs/API.md#functions).


# Installation

```bash
npm install axax # or yarn install axax
```

# Why Axax?

Async iterators are a useful way to handle asynchronous streams. This library adds a number
of utility methods similar to those found in lodash, underscore or Ramda.

## es5 vs esnext

Axax contains both transpiled es5 code as well as esnext code, the difference being that
esnext uses the native ```for await``` syntax. In nodejs 10.x that gives approximately a 40% speedup.

```javascript
// use es5 if you want to support more browsers
import { map } from "axax/es5/map"; 

// use esnext if you're only using node 10.x or supporting very new browsers
import { map } from "axax/esnext/map"; 
```

# Examples

## fromEvents

```fromEvents``` turns DOM events into an iterable.

```javascript
import { fromEvents } from "axax/es5/fromEvents";

const clicks = fromEvents(document, 'click');

for await (const click of clicks) {
    console.log('a button was clicked');
}
```

## DeferredIterable

```DeferredIterable``` makes it easy to turn stream of events into an iterable. The code below
is essentially how ```fromEvents``` was implemented.

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

# Reference Documentation

* [API Reference](https://github.com/jamiemccrindle/axax/blob/master/docs/API.md)
