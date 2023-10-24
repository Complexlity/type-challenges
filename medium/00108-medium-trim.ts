/*
  108 - Trim
  -------
  by Anthony Fu (@antfu) #medium #template-literal

  ### Question

  Implement `Trim<T>` which takes an exact string type and returns a new string with the whitespace from both ends removed.

  For example

  ```ts
  type trimmed = Trim<'  Hello World  '> // expected to be 'Hello World'
  ```

  > View on GitHub: https://tsch.js.org/108
*/
type WhiteSpace = '\n' | '\t' | ' ' | '\r'
/* _____________ Your Code Here _____________ */

type Trim0<S extends string> =
  // Trim Left
  S extends `${WhiteSpace}${infer U}`
  // Recurse
  ? Trim0<U>
  // Trim Right
    : S extends `${infer T}${WhiteSpace}`
  // Recurse
  ? Trim0<T>
  // Base Case
        : S

// Same solution but cleaner
type Trim<S extends string> =
  S extends
  | `${WhiteSpace}${infer U}`
  | `${infer U}${WhiteSpace}`
  ? Trim<U>
  : S


/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<Trim<'str'>, 'str'>>,
  Expect<Equal<Trim<' str'>, 'str'>>,
  Expect<Equal<Trim<'     str'>, 'str'>>,
  Expect<Equal<Trim<'str   '>, 'str'>>,
  Expect<Equal<Trim<'     str     '>, 'str'>>,
  Expect<Equal<Trim<'   \n\t foo bar \t'>, 'foo bar'>>,
  Expect<Equal<Trim<''>, ''>>,
  Expect<Equal<Trim<' \n\t '>, ''>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/108/answer
  > View solutions: https://tsch.js.org/108/solutions
  > More Challenges: https://tsch.js.org
*/
