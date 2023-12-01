/*
  3188 - Tuple to Nested Object
  -------
  by jiangshan (@jiangshanmeta) #medium #object #tuple

  ### Question

  Given a tuple type ```T``` that only contains string type, and a type ```U```, build an object recursively.

  ```typescript
  type a = TupleToNestedObject<['a'], string> // {a: string}
  type b = TupleToNestedObject<['a', 'b'], number> // {a: {b: number}}
  type c = TupleToNestedObject<[], boolean> // boolean. if the tuple is empty, just return the U type
  ```

  > View on GitHub: https://tsch.js.org/3188
*/

/* _____________ Your Code Here _____________ */

// Utility type to actually make the object
type GiveValue0<A extends any, B extends any[], U extends any> = {
  [K in A as A extends PropertyKey ? A: never]:
   B extends [infer Head, ...infer Tail]
  ? GiveValue0<Head, Tail, U>
  : U
}

// Final type calling the utility type
type TupleToNestedObject0<T extends unknown[], U extends unknown> = T extends [
  infer Head,
  ...infer Tail
]
  ? GiveValue0<Head, Tail, U>
  : U;


// Recursing in a single type
type TupleToNestedObject1<T extends unknown[], U extends unknown> =
   T extends [infer Head, ...infer Tail]
      ? {
          [K in Head as Head extends PropertyKey ? Head : never]:
            Tail extends unknown[]
              ? TupleToNestedObject1<Tail, U>
              : U;
        }
  : U;

// Truncated solution
type TupleToNestedObject<T extends PropertyKey[], U extends unknown> =
  T extends [
    infer Head extends PropertyKey,
    ...infer Tail extends PropertyKey[]
  ]
  ? { [P in Head]: TupleToNestedObject<Tail, U>}
  : U





type x = TupleToNestedObject<['a', 'b', 'c'], boolean>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<TupleToNestedObject<['a'], string>, { a: string }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b'], number>, { a: { b: number } }>>,
  Expect<Equal<TupleToNestedObject<['a', 'b', 'c'], boolean>, { a: { b: { c: boolean } } }>>,
  Expect<Equal<TupleToNestedObject<[], boolean>, boolean>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3188/answer
  > View solutions: https://tsch.js.org/3188/solutions
  > More Challenges: https://tsch.js.org
*/
