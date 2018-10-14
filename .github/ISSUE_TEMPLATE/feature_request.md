---
name: Feature request
about: Suggest an idea for this project

---

**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Provide links to other libraries that implement similar functionality**
e.g. RxJS, lodash, most etc.

**Additional context**
Add any other context about the feature request here.

**Describe the feature**
A clear and concise description of what the feature is.

**Check out the contributing guide**
The [contributing guide](https://github.com/jamiemccrindle/axax/blob/master/CONTRIBUTING.md) will help you get started.

**Have a look at how axax operators are written**
Please have a look at how the other methods are written in axax e.g. they typically are curried e.g. here's map:

```javascript
/**
 * Runs a mapping function over an asynchronous iterable
 */
export function map<TFrom, TTo>(
  mapper: (t: TFrom, index: number) => Promise<TTo> | TTo
) {
  return async function* inner(source: AsyncIterable<TFrom>) {
    let index = 0;
    for await (const item of source) {
      yield await mapper(item, index++);
    }
  };
}
```
