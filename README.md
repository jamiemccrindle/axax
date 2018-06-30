# Async Iterator Extensions

A library of async iterator extensions for JavaScript including ```map```, ```reduce```,
```filter```, ```flatMap```, ```pipe``` and [more](https://github.com/jamiemccrindle/axax/blob/master/docs/API.md#functions).


# Installation

```bash
npm install axax # or yarn add axax
```

# Why Axax?

Async iterators are a useful way to handle asynchronous streams. This library adds a number
of utility methods similar to those found in lodash, underscore, Ramda or RxJs.

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

## fromEvent

```fromEvent``` turns DOM events into an iterable.

```javascript
import { fromEvent } from "axax/es5/fromEvent";

const clicks = fromEvent(document, 'click');

for await (const click of clicks) {
    console.log('a button was clicked');
}
```

## Subject

```Subject``` makes it easy to turn stream of events into an iterable. The code below
is essentially how ```fromEvent``` was implemented.

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

# Reference Documentation

* [API Reference](https://github.com/jamiemccrindle/axax/blob/master/docs/API.md)
