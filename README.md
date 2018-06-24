# Async Iterator Extensions

A library of async iterator extensions for JavaScript

# Installation

    npm install aix

# Why Aix?

Async iterators are a useful way to handle asynchronous streams. This library adds a number
of utility methods similar to those found in lodash, underscore or Ramda.

# Examples

    import { fromEvents } from "aix/fromEvents";

    const clicks = fromEvents(document, 'click');

    for await (const click of clicks) {
        console.log('a button was clicked');
    }