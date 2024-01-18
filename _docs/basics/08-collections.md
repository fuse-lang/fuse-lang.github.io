---
title: Collections
permalink: /docs/collections/
---

Fuse have many different types of collections, In this page we are going to explore some of most useful data structures in the Fuse core library.

__Note__: All collections in the Fuse, Similar to Lua have 1-base indeces; This means in Fuse we start from index `1` and go up to the index `n` as opposed to starting from `0` and going up to `n-1`.

<a name="array" />
### Array

Arrays are the most basic collection type in the Fuse language, They can hold a finite number of elements with the same type. Unlike the other collections we do not need to import the `Array` type.

We can create an array using the brackets(`[]`) and comma seperated values.

```fuse
const empty_array = []
const numbers = [1, 2, 3]
const alphabet = ["A", "B", "C"]
const bools = [true, false, true]

const mix_types = ["A", 2, true] -- Compiler Error
```

Type annotation of an array is with the syntax `T[]`, where `T` can be any type.

```fuse
const numbers: number[] = [1, 2, 3]
const alphabet: string[] = ["A", "B", "C"]
const bools: boolean[] = [true, false, true]
```

If we want our array size to be `immutable` we can specify a fixed length in our type definition.

```fuse
const numbers: number[3] = [1, 2, 3]
const alphabet: string[3] = ["A", "B", "C"]
const bools: boolean[3] = [true, false, true]
```

__Note__: The length in the array type expression should be literal.

Array elements can be accessed using the `Index` operator(`[]`), We can mutate an array's elements however we can not change the number of elements in a fix size array; In another words the length of an array annotated by `T[N]` is `immutable` and as the result it dosn't provide methods for example `add` or `remove` that can modify the array's size.

```fuse
const array: number[3] = [1, 2, 3]

array[1] += 10
array[2] += 10
array[3] += 10

assert_eq(array[1], 11)
assert_eq(array[2], 12)
assert_eq(array[3], 13)

-- This won't compile
array[4] += 10
-- and neither this
assert_eq(array[4], 14)
```

While `T[]` and `T[N]` are 2 completly different types we can always use type conversion to change on into another.

```fuse
const fix_array: string[3] = ["A", "B", "C"]

const dyn_array: string[] = fix_array.into()
-- or
const dyn_array = string[]::from(fix_array.into())
```

<a name="hashmap" />
### HashMap

`HashMap` is a data structure 
