/*
  4471 - Zip
  -------
  by キリサメ qianxi (@qianxi0410) #medium #tuple

  ### Question

  In This Challenge, You should implement a type `Zip<T, U>`, T and U must be `Tuple`
  ```ts
  type exp = Zip<[1, 2], [true, false]> // expected to be [[1, true], [2, false]]
  ```

  > View on GitHub: https://tsch.js.org/4471
*/

/* _____________ Your Code Here _____________ */

// My Initial Solution
type Zip0<
  T extends unknown[],
  U extends unknown[],
  Acc extends any[] = [],
  Current extends 1[] = []
  > =
  T['length'] extends 0
    ? Acc
    : Current['length'] extends U['length']
      ? Acc
  : Zip0<
    T,
    U,
    [...Acc, [T[Current['length']], U[Current['length']]]],
    [...Current, 1]>

// Same solution but cleaner
type Zip1<
  T extends unknown[],
  U extends unknown[],
  Acc extends any[] = [],
  > =
  Acc['length'] extends T['length'] | U['length']
    ? Acc
  : Zip1<
    T,
    U,
    [...Acc, [T[Acc['length']], U[Acc['length']]]]
    >

// Tests
type x = Zip0<[1, 2], ['A', 'B']>
//    ^?
type y = Zip1<[1, 2], ['A', 'B']>
//    ^?
type z = Zip<[1, 2], ['A', 'B']>
//    ^?

//Cleanest solution
type Zip<T extends any[], U extends any[]> =
  [T, U] extends [
  [infer L, ...infer RestT],
  [infer R, ...infer RestU]
]
  ? [[L, R], ...Zip<RestT, RestU>]
  : [];


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<Zip1<[], []>, []>>,
  Expect<Equal<Zip1<[1, 2], [true, false]>, [[1, true], [2, false]]>>,
  Expect<Equal<Zip1<[1, 2, 3], ['1', '2']>, [[1, '1'], [2, '2']]>>,
  Expect<Equal<Zip1<[], [1, 2, 3]>, []>>,
  Expect<Equal<Zip1<[[1, 2]], [3]>, [[[1, 2], 3]]>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4471/answer
  > View solutions: https://tsch.js.org/4471/solutions
  > More Challenges: https://tsch.js.org
*/
