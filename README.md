# Async Iterator Extensions

A library of async iterator extensions for JavaScript

# Installation

    npm install aix

# Why Aix?

Async iterators are a useful way to handle asynchronous streams. This library adds a number
of utility methods similar to those found in lodash, underscore or Ramda.

# Examples

## fromEvents

    import { fromEvents } from "aix/fromEvents";

    const clicks = fromEvents(document, 'click');

    for await (const click of clicks) {
        console.log('a button was clicked');
    }

## DeferredIterable

    import { DeferredIterable } from "aix/deferredIterable";

    const deferredIterable = new DeferredIterable();

    document.addEventListener('click', deferredIterable.value);

    deferredIterable.finally(() => document.removeEventListener('click', deferredIterable.value));

    for await (const click of deferredIterable.iterable) {
        console.log('a button was clicked');
    }
