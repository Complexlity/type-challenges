/*
  3 - Omit
  -------
  by Anthony Fu (@antfu) #medium #union #built-in

  ### Question

  Implement the built-in `Omit<T, K>` generic without using it.

  Constructs a type by picking all properties from `T` and then removing `K`

  For example

  ```ts
  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyOmit<Todo, 'description' | 'title'>

  const todo: TodoPreview = {
    completed: false,
  }
  ```

  > View on GitHub: https://tsch.js.org/3
*/

type MyExclude<T, U> = T extends U ? never : T

/* _____________ Your Code Here _____________ */

type MyOmit1<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]:  T[P]
}

type MyOmit<T, K extends keyof T> = {
  [P in MyExclude<keyof T, K>]: T[P]
}



/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '../utils'

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}

type x = MyOmit<Todo, "description">;


/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/3/answer
  > View solutions: https://tsch.js.org/3/solutions
  > More Challenges: https://tsch.js.org
*/
