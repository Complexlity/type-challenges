/*
  9898 - Appear only once
  -------
  by X.Q. Chen (@brenner8023) #medium

  ### Question

  Find the elements in the target array that appear only once. For example：input: `[1,2,2,3,3,4,5,6,6,6]`，ouput: `[1,4,5]`.

  > View on GitHub: https://tsch.js.org/9898
*/

/* _____________ Your Code Here _____________ */

type RemainingFromFront<T extends any[], U, Remaining extends any[] = []>
  =
  T extends [infer First, ...infer Rest]?
  Equal<First, U> extends true ?
    Remaining['length']
  : RemainingFromFront<Rest, U, [...Remaining, First]>
  : 0

type p0 = RemainingFromFront<[1, 2, 3, 4,4, 5], 4>
type p1 = RemainingFromBehind<[1, 2, 3, 4,4, 5], 4>
//    ^?

type RemainingFromBehind<T extends any[], U, Index extends 1[] = []> =
  T extends [...infer First, infer Rest]
  ? Equal<Rest, U> extends true
  ? First['length']
  : RemainingFromBehind<First, U, [...Index, 1]>
  : 0



type FindEles<
  T extends any[],
  Acc extends any[] = [],
  Looper extends 1[] = [],
> =
  T['length'] extends Looper['length']
  ? Acc
  : RemainingFromFront<T, T[Looper['length']]> extends
  RemainingFromBehind<T, T[Looper['length']]> ?
  FindEles<T, [...Acc, T[Looper['length']]], [...Looper, 1]>
  : FindEles<T, Acc, [...Looper, 1]>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'
import { ExpectFalse, NotEqual } from '../utils'

type cases = [
  Expect<Equal<FindEles<[1, 2, 2, 3, 3, 4, 5, 6, 6, 6]>, [1, 4, 5]>>,
  Expect<Equal<FindEles<[2, 2, 3, 3, 6, 6, 6]>, []>>,
  Expect<Equal<FindEles<[1, 2, 3]>, [1, 2, 3]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9898/answer
  > View solutions: https://tsch.js.org/9898/solutions
  > More Challenges: https://tsch.js.org
*/
