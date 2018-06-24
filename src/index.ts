import { DeferredIterable } from "./deferredIterable";
import { restToIterable } from "./restToIterable";
import { merge } from "./merge";
import { lookahead } from "./lookahead";
import { toCallbacks } from "./toCallbacks";
import { iteratorToIterable } from "./iteratorToIterable";
import { map } from "./map";
import { flatMap } from "./flatMap";
import { interval } from "./interval";
import { insert } from "./insert";
import { zip } from "./zip";
import { iterableToArray } from "./iterableToArray";
import { filter } from "./filter";
import { concat } from "./concat";
import { fromEvent } from "./fromEvent";
import { tap } from "./tap";

export { DeferredIterable } from "./deferredIterable";
export { restToIterable } from "./restToIterable";
export { merge } from "./merge";
export { lookahead } from "./lookahead";
export { toCallbacks } from "./toCallbacks";
export { iteratorToIterable } from "./iteratorToIterable";
export { map } from "./map";
export { flatMap } from "./flatMap";
export { interval } from "./interval";
export { insert } from "./insert";
export { zip } from "./zip";
export { iterableToArray } from "./iterableToArray";
export { filter } from "./filter";
export { concat } from "./concat";
export { fromEvent } from "./fromEvent";
export { tap } from "./tap";

const windowAny: any = window;

if (typeof windowAny !== "undefined" && windowAny["Aix"] === undefined) {
  windowAny.Aix = {
    DeferredIterable,
    restToIterable,
    merge,
    lookahead,
    toCallbacks,
    iteratorToIterable,
    map,
    flatMap,
    interval,
    insert,
    zip,
    iterableToArray,
    filter,
    concat,
    fromEvent,
    tap
  };
}
