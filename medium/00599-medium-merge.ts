/*
  599 - Merge
  -------
  by ZYSzys (@ZYSzys) #medium #object

  ### Question

  Merge two types into a new type. Keys of the second type overrides keys of the first type.

  For example

  ```ts
  type foo = {
    name: string
    age: string
  }
  type coo = {
    age: number
    sex: string
  }

  type Result = Merge<foo, coo> // expected to be {name: string, age: number, sex: string}
  ```

  > View on GitHub: https://tsch.js.org/599
*/

/* _____________ Your Code Here _____________ */

type Prettify<T> =
  {
    [K in keyof T]: T[K]
  }

type Merge0<F extends Record<PropertyKey, any>, S extends Record<PropertyKey, any>> =
  Prettify<Omit<F, keyof S> & S>

type Merge1<F extends Record<PropertyKey, any>, S extends Record<PropertyKey, any>> =
  {
    [K in keyof F | keyof S]:
    K extends keyof S
      ? S[K]
      : K extends keyof F
        ? F[K]
        : never
  }
type Merge<F extends Record<PropertyKey, any>, S extends Record<PropertyKey, any>> =
  {
    [K in keyof (F & S)]:
    K extends keyof S
      ? S[K]
      : F[K]
  }
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type Foo = {
  a: number
  b: string
}
type Bar = {
  b: number
  c: boolean
}

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
    a: number
    b: number
    c: boolean
  }>>,
]
type Z = Merge<Foo, Bar>
//   ^?
/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/599/answer
  > View solutions: https://tsch.js.org/599/solutions
  > More Challenges: https://tsch.js.org
*/
