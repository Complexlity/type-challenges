/*
  9142 - CheckRepeatedChars
  -------
  by Hong (@RThong) #medium #union #string

  ### Question

  Implement type ```CheckRepeatedChars<S>``` which will return whether type ```S``` contains duplicated chars?

  For example:

  ```ts
  type CheckRepeatedChars<'abc'>   // false
  type CheckRepeatedChars<'aba'>   // true
  ```

  > View on GitHub: https://tsch.js.org/9142
*/

/* _____________ Your Code Here _____________ */

type CheckRepeatedChars0<
  T extends string,
  Union extends string
  = never,
  RESULT =
  T extends `${infer Head}${infer Tail }`
  ? Head extends Union
  ? true
  : CheckRepeatedChars0<Tail, Head | Union>
  : false
  > = RESULT

type CheckRepeatedChars<
  T extends string> =
  T extends `${infer Head}${infer Tail}`?
  Tail extends `${string}${Head}${string}`?
  true
  : CheckRepeatedChars<Tail>
  : false




/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'
import { ExpectFalse, NotEqual } from '../utils'

type cases = [
  Expect<Equal<CheckRepeatedChars<'abc'>, false>>,
  Expect<Equal<CheckRepeatedChars<'abb'>, true>>,
  Expect<Equal<CheckRepeatedChars<'cbc'>, true>>,
  Expect<Equal<CheckRepeatedChars<''>, false>>,
]


/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9142/answer
  > View solutions: https://tsch.js.org/9142/solutions
  > More Challenges: https://tsch.js.org
*/
