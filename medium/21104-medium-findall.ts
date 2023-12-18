/*
  21104 - FindAll
  -------
  by tunamagur0 (@tunamagur0) #medium #template-literal #string

  ### Question

  Given a pattern string P and a text string T, implement the type `FindAll<T, P>` that returns an Array that contains all indices (0-indexed) from T where P matches.

  > View on GitHub: https://tsch.js.org/21104
*/

/* _____________ Your Code Here _____________ */

type Contains<T extends string, U extends string> =
  U extends ''
  ? false
  : T extends `${string}${U}${string}`
  ? true
  : false


type _FindAll<
  T extends string,
  U extends string,
  Current extends 1[] = [],
Result extends number[] = []> =
  T extends `${string}${infer Tail}`
  ? T extends `${U}${string}`
  ? _FindAll<Tail, U, [...Current, 1], [...Result, Current['length']]>
  : _FindAll<Tail, U, [...Current, 1], Result>
  :Result


type FindAll<T extends string, U extends string> =
  Contains<T, U> extends true
  ? _FindAll<T, U>
  : []


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'Type'>, [14]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', 'pe'>, [16, 27]>>,
  Expect<Equal<FindAll<'Collection of TypeScript type challenges', ''>, []>>,
  Expect<Equal<FindAll<'', 'Type'>, []>>,
  Expect<Equal<FindAll<'', ''>, []>>,
  Expect<Equal<FindAll<'AAAA', 'A'>, [0, 1, 2, 3]>>,
  Expect<Equal<FindAll<'AAAA', 'AA'>, [0, 1, 2]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/21104/answer
  > View solutions: https://tsch.js.org/21104/solutions
  > More Challenges: https://tsch.js.org
*/
