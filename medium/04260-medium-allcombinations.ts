/*
  4260 - AllCombinations
  -------
  by 蛭子屋双六 (@sugoroku-y) #medium #template-literal #infer #union

  ### Question

  Implement type ```AllCombinations<S>``` that return all combinations of strings which use characters from ```S``` at most once.

  For example:

  ```ts
  type AllCombinations_ABC = AllCombinations<'ABC'>;
  // should be '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'
  ```

  > View on GitHub: https://tsch.js.org/4260
*/

/* _____________ Your Code Here _____________ */


type StringToUnion0<S extends string = ""> =
  S extends `${infer F}${infer R}`
  ? F | StringToUnion0<R>
  : S;

type x = StringToUnion0<"ABCD">;
//    ^?


type Combinations0<T extends string> =
  [T] extends [never]
  ? "" :
  "" |
  { [K in T]:
    `${K}${Combinations0<Exclude<T, K>>}` }[T];

type AllCombinations0<S extends string> =
  Combinations0<
    StringToUnion<S>
  >;

//  Method 2
// your answers

// 1. Convert the string into a union type
type StringToUnion<S extends string> =
  S extends `${infer L}${infer R}`
  ? L | StringToUnion<R>
  : S;
// 2. Combine union types in pairs
type Combination<
  A extends string,
  B extends string> =
     | A
     |B
     | `${A}${B}`
     | `${B}${A}`;
// 3eg


type test = Combination<'A'|'B', 'C'|'D'>
//       ^?

type test2 = Combination<'A' , 'B' |'C'>
//      ^?

type test3 = Combination<'B' , 'A' |'C'>
//      ^?

//4. Merger of union types, using union types to be disassembled by default
type UnionCombination<
  A extends string,
  B extends string = A> =
  A extends B ?
  Combination<A, UnionCombination<Exclude<B, A>>> : never;
//5. String merging
type AllCombinations<S extends string> = UnionCombination<StringToUnion<S>>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<AllCombinations<''>, ''>>,
  Expect<Equal<AllCombinations<'A'>, '' | 'A'>>,
  Expect<Equal<AllCombinations<'AB'>, '' | 'A' | 'B' | 'AB' | 'BA'>>,
  Expect<Equal<AllCombinations<'ABC'>, '' | 'A' | 'B' | 'C' | 'AB' | 'AC' | 'BA' | 'BC' | 'CA' | 'CB' | 'ABC' | 'ACB' | 'BAC' | 'BCA' | 'CAB' | 'CBA'>>,
  Expect<Equal<AllCombinations<'ABCD'>, '' | 'A' | 'B' | 'C' | 'D' | 'AB' | 'AC' | 'AD' | 'BA' | 'BC' | 'BD' | 'CA' | 'CB' | 'CD' | 'DA' | 'DB' | 'DC' | 'ABC' | 'ABD' | 'ACB' | 'ACD' | 'ADB' | 'ADC' | 'BAC' | 'BAD' | 'BCA' | 'BCD' | 'BDA' | 'BDC' | 'CAB' | 'CAD' | 'CBA' | 'CBD' | 'CDA' | 'CDB' | 'DAB' | 'DAC' | 'DBA' | 'DBC' | 'DCA' | 'DCB' | 'ABCD' | 'ABDC' | 'ACBD' | 'ACDB' | 'ADBC' | 'ADCB' | 'BACD' | 'BADC' | 'BCAD' | 'BCDA' | 'BDAC' | 'BDCA' | 'CABD' | 'CADB' | 'CBAD' | 'CBDA' | 'CDAB' | 'CDBA' | 'DABC' | 'DACB' | 'DBAC' | 'DBCA' | 'DCAB' | 'DCBA'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/4260/answer
  > View solutions: https://tsch.js.org/4260/solutions
  > More Challenges: https://tsch.js.org
*/
