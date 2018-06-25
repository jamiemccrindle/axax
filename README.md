# Async Iterator Extensions

A library of async iterator extensions for JavaScript

# Installation

    npm install aix # or yarn install aix

# Why Aix?

Async iterators are a useful way to handle asynchronous streams. This library adds a number
of utility methods similar to those found in lodash, underscore or Ramda.

# Examples

## fromEvents

```fromEvents``` turns DOM events into an iterable.

```javascript
import { fromEvents } from "aix/fromEvents";

const clicks = fromEvents(document, 'click');

for await (const click of clicks) {
    console.log('a button was clicked');
}
```

## DeferredIterable

```DeferredIterable``` makes it easy to turn stream of events into an interable. The code below
is essentially how ```fromEvents``` was implemented.

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