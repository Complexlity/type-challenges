/*
  298 - Length of String
  -------
  by Pig Fang (@g-plane) #medium #template-literal

  ### Question

  Compute the length of a string literal, which behaves like `String#length`.

  > View on GitHub: https://tsch.js.org/298
*/

/* _____________ Your Code Here _____________ */

// type LengthOfString<S extends string, Acc extends 'wow'[] = []> =
//   S extends `${infer A}${infer B}`
//   ? A extends ''
//     ? Acc['length']
//     : LengthOfString<B, ['wow', ...Acc]>
//   :0
type LengthOfString0<
  S extends string,
  Acc extends "wow"[] = []
> = S extends `${string}${infer B}`
  ? LengthOfString0<B, ["wow", ...Acc]>
  : Acc["length"];

type StringToTuple<T extends string> = T extends `${string}${infer Rest}`
  ? [T, ...StringToTuple<Rest>]
  : [];

type LengthOfString<S extends string> = StringToTuple<S>["length"];

type Y = LengthOfString<"hello">;
/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../utils";

type cases = [
  Expect<Equal<LengthOfString<"">, 0>>,
  Expect<Equal<LengthOfString<"kumiko">, 6>>,
  Expect<Equal<LengthOfString<"reina">, 5>>,
  Expect<Equal<LengthOfString<"Sound! Euphonium">, 16>>
];

type X = LengthOfString<"hello">;
/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/298/answer
  > View solutions: https://tsch.js.org/298/solutions
  > More Challenges: https://tsch.js.org
*/
