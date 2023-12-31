/*
  527 - Append to object
  -------
  by Andrey Krasovsky (@bre30kra69cs) #medium #object-keys

  ### Question

  Implement a type that adds a new field to the interface. The type takes the three arguments. The output should be an object with the new field.

  For example

  ```ts
  type Test = { id: '1' }
  type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
  ```

  > View on GitHub: https://tsch.js.org/527
*/

/* _____________ Your Code Here _____________ */

type Prettify<T> = {
  [K in keyof T]: T[K];
};

//Using prettify to remove intersection
type AppendToObject3<
  T extends Record<PropertyKey, any>,
  U extends PropertyKey,
  V extends unknown
> = Prettify<
  {
    [P in keyof T]: T[P];
  } & { [K in U]: V }
>;

type AppendToObject0<
  T extends Record<PropertyKey, any>,
  U extends PropertyKey,
  V extends unknown
> = Prettify<T & Record<U, V>>;

// Casting the types inline
type AppendToObject1<
  T extends Record<PropertyKey, any>,
  U extends PropertyKey,
  V extends unknown
> = {
  [P in keyof T | U]: (T & Record<U, V>)[P];
};

type AppendToObject2<
  T extends Record<PropertyKey, any>,
  U extends PropertyKey,
  V extends unknown
> = {
  [P in keyof T | U]: P extends keyof T ? T[P] : V;
};

//Using Omit
type AppendToObject<
  T extends Record<PropertyKey, any>,
  U extends PropertyKey,
  V extends unknown
> = Omit<T & { [P in U]: V }, never>;

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from "../utils";

type test1 = {
  key: "cat";
  value: "green";
};

type testExpect1 = {
  key: "cat";
  value: "green";
  home: boolean;
};

type test2 = {
  key: "dog" | undefined;
  value: "white";
  sun: true;
};

type testExpect2 = {
  key: "dog" | undefined;
  value: "white";
  sun: true;
  home: 1;
};

type test3 = {
  key: "cow";
  value: "yellow";
  sun: false;
};

type testExpect3 = {
  key: "cow";
  value: "yellow";
  sun: false;
  moon: false | undefined;
};

type X = AppendToObject<test1, "home", boolean>;

type cases = [
  Expect<Equal<AppendToObject<test1, "home", boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, "home", 1>, testExpect2>>,
  Expect<Equal<AppendToObject<test3, "moon", false | undefined>, testExpect3>>
];

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/527/answer
  > View solutions: https://tsch.js.org/527/solutions
  > More Challenges: https://tsch.js.org
*/
