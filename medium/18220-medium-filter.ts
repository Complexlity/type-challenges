/*
  18220 - Filter
  -------
  by Muhun Kim (@x86chi) #medium #array #filter

  ### Question

  Implement the type `Filter<T, Predicate>` takes an Array `T`, primitive type or union primitive type `Predicate` and returns an Array include the elements of `Predicate`.

  > View on GitHub: https://tsch.js.org/18220
*/

/* _____________ Your Code Here _____________ */

type Filter0<
  T extends any[],
  P,
  Acc extends any[] = []
    > =
  T extends [infer Head, ...infer Rest] ?
  Head extends P ?
  Filter0<Rest, P, [...Acc, Head]>
  : Filter0<Rest, P, Acc>
  : Acc

// Without any accumulator
type Filter<T extends unknown[], P> =
  T extends [infer Head, ...infer Rest]?
  Head extends P?
  [Head, ...Filter<Rest, P>]
  : Filter<Rest, P>
  : []

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type Falsy = false | 0 | '' | null | undefined

type cases = [
  Expect<Equal<Filter<[0, 1, 2], 2>, [2]>>,
  Expect<Equal<Filter<[0, 1, 2], 0 | 1>, [0, 1]>>,
  Expect<Equal<Filter<[0, 1, 2], Falsy>, [0]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/18220/answer
  > View solutions: https://tsch.js.org/18220/solutions
  > More Challenges: https://tsch.js.org
*/
