---
title: Arrays
permalink: /docs/lang/arrays/
---

Arrays are the most basic collection type in the Fuse language, They can hold a finite number of elements with the same type. Unlike the other collections, we do not need to import the `Array` type.

__Note__: All collections in the Fuse, Similar to Lua have 1-base indices; This means in Fuse we start from index `1` and go up to the index `n` as opposed to starting from `0` and going up to `n-1`.

We can create an array using the brackets(`[]`) and comma separated values.

```fuse
let empty_array = []
let numbers = [1, 2, 3]
let alphabet = ["A", "B", "C"]
let bools = [true, false, true]
```

Type annotation of an array is possible with the syntax `T[]`, where `T` can be any type. It is a syntax sugar for the generic type `Array<T>`.

```fuse
let numbers: number[] = [1, 2, 3]
let alphabet: string[] = ["A", "B", "C"]
let bools: boolean[] = [true, false, true]
-- or use the generic type
let numbers: Array<number> = [1, 2, 3]
let alphabet: Array<string> = ["A", "B", "C"]
let bools: Array<boolean> = [true, false, true]
```

Array elements can be accessed using the `Index` operator(`[]`).

```fuse
let array: number[] = [1, 2, 3]


assert_eq(array[1], 1)
assert_eq(array[2], 2)
assert_eq(array[3], 3)

array.push(4) -- error, push don't exists on `number[]` type.
```

If we want our array elements to be `mutable` we can declare it using the `mut` keyword.

```fuse
let array: number[] = [1, 2, 3]

array[1] += 10
array[2] += 10
array[3] += 10
array.push(14)

assert_eq(array[1], 11)
assert_eq(array[2], 12)
assert_eq(array[3], 13)
assert_eq(array[4], 14)
```
