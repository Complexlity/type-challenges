/*
  9 - Deep Readonly
  -------
  by Anthony Fu (@antfu) #medium #readonly #object-keys #deep

  ### Question

  Implement a generic `DeepReadonly<T>` which make every parameter of an object - and its sub-objects recursively - readonly.

  You can assume that we are only dealing with Objects in this challenge. Arrays, Functions, Classes and so on do not need to be taken into consideration. However, you can still challenge yourself by covering as many different cases as possible.

  For example:

  ```ts
  type X = {
    x: {
      a: 1
      b: 'hi'
    }
    y: 'hey'
  }

  type Expected = {
    readonly x: {
      readonly a: 1
      readonly b: 'hi'
    }
    readonly y: 'hey'
  }

  type Todo = DeepReadonly<X> // should be same as `Expected`
  ```

  > View on GitHub: https://tsch.js.org/9
*/
type x = keyof bigint extends never ? true : false

/* _____________ Your Code Here _____________ */

// Doesn't pass the second case
type DeepReadonly1<T> =
  keyof T extends never
  ? T
  : {
   readonly [key in keyof T]:  DeepReadonly1<T[key]>
  }

  //Passes first and second but not third
    type DeepReadonly2<T> = T extends object
      ? T extends [infer A, ...infer B]
        ? readonly [DeepReadonly2<A>, ...DeepReadonly2<B>]
        : T extends Function
        ? T
        : {
            readonly [P in keyof T]: DeepReadonly<T[P]>;
          }
      : T;


// Passes first and second but not third
type DeepReadonly<T> = { readonly [P in keyof T]: keyof T[P] extends never ? T[P] : DeepReadonly<T[P]> }

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<DeepReadonly<X1>, Expected1>>,
  Expect<Equal<DeepReadonly<X2>, Expected2>>,
  // unpassable case
  //@ts-expect-error cannot pass for now
  Expect<Equal<DeepReadonly<X3>, Expected3>>
]

type p = DeepReadonly<X2>;

type A = DeepReadonly<{ a: any }>;
type Expected3 = {
  readonly a: any
}

type X1 = {
  a: () => 22
  false: string
  c: {
    d: boolean
    e: {
      g: {
        h: {
          i: true
          j: 'string'
        }
        k: 'hello'
      }
      l: [
        'hi',
        {
          m: ['hey']
        },
      ]
    }
  }
}

type X2 = { a: string } | { b: number }

type Expected1 = {
  readonly a: () => 22
  readonly false: string
  readonly c: {
    readonly d: boolean
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true
          readonly j: 'string'
        }
        readonly k: 'hello'
      }
      readonly l: readonly [
        'hi',
        {
          readonly m: readonly ['hey']
        },
      ]
    }
  }
}

type Expected2 = { readonly a: string } | { readonly b: number }

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9/answer
  > View solutions: https://tsch.js.org/9/solutions
  > More Challenges: https://tsch.js.org
*/
