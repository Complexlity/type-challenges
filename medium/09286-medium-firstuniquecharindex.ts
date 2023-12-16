import type { Equal, Expect } from '../utils'
/*
  9286 - FirstUniqueCharIndex
  -------
  by jiangshan (@jiangshanmeta) #medium #string

  ### Question

  Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1. (Inspired by [leetcode 387](https://leetcode.com/problems/first-unique-character-in-a-string/))

  > View on GitHub: https://tsch.js.org/9286
*/

/* _____________ Your Code Here _____________ */



type RepeatCharCount<T extends string, U extends string, N extends any[] = []> = U extends `${infer F}${infer E}`
  ? T extends F
    ? RepeatCharCount<T, E, [...N, '']>
    : RepeatCharCount<T, E, [...N]>
  : N['length']


type FirstUniqueCharIndex<T extends string, N extends string[] = [], O extends string = T> = T extends `${infer F}${infer E}`
  ? RepeatCharCount<F, O> extends 1
    ? N['length']
    : FirstUniqueCharIndex<E, [...N, ''], T>
  : -1


/* __________ Test Cases _____________ */


type cases = [
  Expect<Equal<FirstUniqueCharIndex<'leetcode'>, 0>>,
  Expect<Equal<FirstUniqueCharIndex<'loveleetcode'>, 2>>,
  Expect<Equal<FirstUniqueCharIndex<'aabb'>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<''>, -1>>,
  Expect<Equal<FirstUniqueCharIndex<'aaa'>, -1>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/9286/answer
  > View solutions: https://tsch.js.org/9286/solutions
  > More Challenges: https://tsch.js.org
*/
