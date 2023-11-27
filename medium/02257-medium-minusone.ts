/*
  2257 - MinusOne
  -------
  by Mustafo Faiz (@fayzzzm) #medium #math

  ### Question

  Given a number (always positive) as a type. Your type should return the number decreased by one.

  For example:

  ```ts
  type Zero = MinusOne<1> // 0
  type FiftyFour = MinusOne<55> // 54
  ```

  > View on GitHub: https://tsch.js.org/2257
*/

/* _____________ Your Code Here _____________ */

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

type PrevDigit = [9, 0, 1, 2, 3, 4, 5, 6, 7, 8];
type NextDigit = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

/** Reverses the string */
type Rev<T extends string> = T extends `${infer L}${infer R}`
  ? `${Rev<R>}${L}`
  : "";

/** Decreases positive number `T` by one */
type Decr<T extends number> = Rev<
  RevStrMinus<Rev<`${T}`>>
> extends `${infer N extends number}`
  ? N
  : 0;

type RevStrMinus<T extends string> =
  T extends `${infer D extends Digit}${infer Rest}`
    ? Rest extends ""
      ? D extends 1
        ? "" // If the digit is 1 and there are no more digits, return an empty string
        : `${PrevDigit[D]}` // Otherwise, return the previous digit
      : D extends 0
      ? `9${RevStrMinus<Rest>}` // If the digit is 0, carry over to the next digit and recursively call RevStrMinus
      : `${PrevDigit[D]}${Rest}` // Otherwise, return the previous digit followed by the remaining digits
    : never;

/** Increases positive number `T` by one */
type Incr<T extends number> = Rev<
  RevStrPlus<Rev<`${T}`>>
> extends `${infer N extends number}`
  ? N
  : 0;

  
type RevStrPlus<T extends string> =
  T extends `${infer D extends Digit}${infer Rest}`
    ? D extends 9
      ? `0${Rest extends "" ? "1" : RevStrPlus<Rest>}` // If the digit is 9, carry over to the next digit and recursively call RevStrPlus
      : `${NextDigit[D]}${Rest}` // Otherwise, return the next digit followed by the remaining digits
    : never;

type MinusOne<T extends number> = T extends 0
  ? -1 // If the number is 0, return -1
  : `${T}` extends `-${infer P extends number}`
  ? `-${Incr<P>}` // If the number is negative, increment the positive value and add a negative sign
  : Decr<T>; // Otherwise, decrement the positive number

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<MinusOne<1>, 0>>,
  Expect<Equal<MinusOne<55>, 54>>,
  Expect<Equal<MinusOne<3>, 2>>,
  Expect<Equal<MinusOne<100>, 99>>,
  Expect<Equal<MinusOne<1101>, 1100>>,
  Expect<Equal<MinusOne<0>, -1>>,
  Expect<Equal<MinusOne<9_007_199_254_740_992>, 9_007_199_254_740_991>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/2257/answer
  > View solutions: https://tsch.js.org/2257/solutions
  > More Challenges: https://tsch.js.org
*/
