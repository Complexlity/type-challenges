/*
  4425 - Greater Than
  -------
  by ch3cknull (@ch3cknull) #medium #array

  ### Question

  In This Challenge, You should implement a type `GreaterThan<T, U>` like `T > U`

  Negative numbers do not need to be considered.

  For example

  ```ts
  GreaterThan<2, 1> //should be true
  GreaterThan<1, 1> //should be false
  GreaterThan<10, 100> //should be false
  GreaterThan<111, 11> //should be true
  ```

  Good Luck!

  > View on GitHub: https://tsch.js.org/4425
*/

/* _____________ Your Code Here _____________ */

type Arrayfy<T extends number,
  Acc extends 1[] = []> =
  Acc['length'] extends T
  ? Acc
  : Arrayfy<T, [...Acc, 1]>

// Hits recursion limit
type GreaterThan0<
  T extends number,
  U extends number> =
  T extends U
    ? false
    : T extends `-${number}`
        ? false
        : U extends `-${number}`
            ? false
            : Arrayfy<T> extends [...Arrayfy<U>, ...infer Tail]
                ? true
  : false

  // Doest not hit recursion limit
type StringToArray<T extends string> =
  T extends `${infer L extends number}${infer Rest}`
    ? [L, ...StringToArray<Rest>]
  : [];

type CreateArrayByNumber<
  T extends number,
  R extends any[] = []
> = R["length"] extends T ? R : CreateArrayByNumber<T, [...R, undefined]>;
type CompareOneDigit<T extends number, U extends number> =
  T extends U
  ? false
  : CreateArrayByNumber<T> extends [...CreateArrayByNumber<U>, ...infer _]
  // : CreateArrayByNumber<T> extends [...CreateArrayByNumber<U>, ...infer _]
  ? true
  : false;
type CompareAllNumber<
  T extends any[],
  U extends any[],
  CompareCount extends any[] = []
  > =
  T["length"] extends U["length"]
  ? CompareCount["length"] extends T["length"]
    ? false
    : CompareOneDigit<
        T[CompareCount["length"]],
        U[CompareCount["length"]]
      > extends true
    ? true
    : CompareAllNumber<T, U, [...CompareCount, 1]>
  : T[U["length"]] extends undefined
  ? false
  : true;

  // Method 2
type GreaterThan<T extends number, U extends number> =
  CompareAllNumber<
  StringToArray<`${T}`>,
  StringToArray<`${U}`>
>;
// Method 2 pseudocode
/*
1. Convert both numbers numbers into an array of numbers
i.e 12 => [1, 2], 231 => [2, 3, 1]
2. Check if the lenght of the array is the same
  false ? Check if first array is longer than second. Return true else false
3. Check greater than one digit at a time until you get to the end of the array
*/


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<GreaterThan<1, 0>, true>>,
  Expect<Equal<GreaterThan<5, 4>, true>>,
  Expect<Equal<GreaterThan<4, 5>, false>>,
  Expect<Equal<GreaterThan<0, 0>, false>>,
  Expect<Equal<GreaterThan<10, 9>, true>>,
  Expect<Equal<GreaterThan<20, 20>, false>>,
  Expect<Equal<GreaterThan<10, 100>, false>>,
  Expect<Equal<GreaterThan<111, 11>, true>>,
  Expect<Equal<GreaterThan<1234567891011, 1234567891010>, true>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4425/answer
  > View solutions: https://tsch.js.org/4425/solutions
  > More Challenges: https://tsch.js.org
*/
