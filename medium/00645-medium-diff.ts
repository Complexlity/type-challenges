/*
  645 - Diff
  -------
  by ZYSzys (@ZYSzys) #medium #object

  ### Question

  Get an `Object` that is the difference between `O` & `O1`

  > View on GitHub: https://tsch.js.org/645
*/

/* _____________ Your Code Here _____________ */

type Join<L extends Record<string, unknown>,
  R extends Record<string, unknown>> =
 {
    [P in keyof L | keyof R]: P extends keyof L
      ? L[P]
      : P extends keyof R
      ? R[P]
      : never;
  }

type Diff0<
  L extends Record<string, unknown>,
  R extends Record<string, unknown>
  > =
  {
    [P in keyof Join<L, R>
    as P extends keyof L & keyof R ? never : P]:
    Join<L, R>[P]
  }

type Diff1<L, R> = {
  [P in keyof L | keyof R as Exclude<P, keyof L & keyof R>]
  : (L & R)[P]
}

type Diff<L, R> = Omit<L & R, keyof (L | R)>

type x = Diff<Foo, Bar>;
//   ^?

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type Foo = {
  name: string
  age: string
}
type Bar = {
  name: string
  age: string
  gender: number
}
type Coo = {
  name: string
  gender: number
}

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/645/answer
  > View solutions: https://tsch.js.org/645/solutions
  > More Challenges: https://tsch.js.org
*/
