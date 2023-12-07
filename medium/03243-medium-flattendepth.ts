/*
  3243 - FlattenDepth
  -------
  by jiangshan (@jiangshanmeta) #medium #array

  ### Question

  Recursively flatten array up to depth times.

  For example:

  ```typescript
  type a = FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2> // [1, 2, 3, 4, [5]]. flattern 2 times
  type b = FlattenDepth<[1, 2, [3, 4], [[[5]]]]> // [1, 2, 3, 4, [[5]]]. Depth defaults to be 1
  ```

  If the depth is provided, it's guaranteed to be positive integer.

  > View on GitHub: https://tsch.js.org/3243
*/

/* _____________ Your Code Here _____________ */
type Flatten<T extends unknown[]> =

  T extends [infer Head, ...infer Tail]
  ? Head extends unknown[]
    ? [...Flatten<Head>, ...Flatten<Tail>]
    : [Head, ...Flatten<Tail>]
  : [];

type FlattenOnce<T extends unknown[], Acc extends unknown[] = []> =
  T extends [infer Head, ...infer Tail]
  ? Head extends unknown[]
    ? FlattenOnce<Tail, [...Acc, ...Head]>
    : FlattenOnce<Tail, [...Acc, Head]>
  : Acc




type FlattenDepth0<
  T extends unknown[],
  Depth extends number = 1,
  Count extends 1[] = []
  > =
  Count["length"] extends Depth
    ? T
    : FlattenOnce<T> extends T
      ? T
      : FlattenDepth0<
        FlattenOnce<T>,
        Depth,
        [...Count, 1]>

type FlattenDepth<
  T extends unknown[],
  Depth extends number = 1,
  Acc extends any[] = []
  > =
  // is the array empty?
  T extends [infer Head, ...infer Rest]
    // Is the first element an array?
    ? Head extends any[]
      // Do we need to flatten further?
      ? Acc["length"] extends Depth
      // We don't. Return the Head and flatten the rest (same depth and accumulator passed)
        ? [Head, ...FlattenDepth<Rest, Depth, Acc>]
        // We do!. Flatten the head but this time, increase the accumulator. Also flatten the rest but with the intial depth and accumulator values
        : [...FlattenDepth<Head, Depth, [0, ...Acc]>, ...FlattenDepth<Rest, Depth, Acc>]
    // Head is not an array. Flatten rest but leave the head
      : [Head, ...FlattenDepth<Rest, Depth, Acc>]
    : T;



/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'



type cases = [
  Expect<Equal<FlattenDepth<[]>, []>>,
  Expect<Equal<FlattenDepth<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
  Expect<Equal<FlattenDepth<[1, [2]]>, [1, 2]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]], 2>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, [[5]]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 3>, [1, 2, 3, 4, [5]]>>,
  Expect<Equal<FlattenDepth<[1, [2, [3, [4, [5]]]]], 19260817>, [1, 2, 3, 4, 5]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3243/answer
  > View solutions: https://tsch.js.org/3243/solutions
  > More Challenges: https://tsch.js.org
*/
