---
title: Arrays
permalink: /docs/arrays/
---

Arrays are the most basic collection type in the Fuse language, They can hold a finite number of elements with the same type. Unlike the other collections, we do not need to import the `Array` type.

__Note__: All collections in the Fuse, Similar to Lua have 1-base indices; This means in Fuse we start from index `1` and go up to the index `n` as opposed to starting from `0` and going up to `n-1`.

We can create an array using the brackets(`[]`) and comma separated values.

```fuse
const empty_array = []
const numbers = [1, 2, 3]
const alphabet = ["A", "B", "C"]
const bools = [true, false, true]

const mix_types = ["A", 2, true] -- Compiler Error
```

Type annotation of an array is possible with the syntax `T[]`, where `T` can be any type. It is a syntax sugar for the generic type `Array<T>`.

```fuse
const numbers: number[] = [1, 2, 3]
const alphabet: string[] = ["A", "B", "C"]
const bools: boolean[] = [true, false, true]
-- or use the generic type
const numbers: Array<number> = [1, 2, 3]
const alphabet: Array<string> = ["A", "B", "C"]
const bools: Array<boolean> = [true, false, true]
```

Array elements can be accessed using the `Index` operator(`[]`).

```fuse
const array: number[] = [1, 2, 3]

array[1] += 10
array[2] += 10
array[3] += 10

assert_eq(array[1], 11)
assert_eq(array[2], 12)
assert_eq(array[3], 13)
```

If we want our array elements to be `immutable` we can specify it with the keyword `const` in our type definition(`T[const]`). It is the same as if we had annotated the variable with the `ConstArray<T>` type. Constant arrays have a fixed length and all of their elements are read-only; In other words, the length of an array annotated by `T[const]` is `immutable` and as a result, it doesn't provide methods such as `add` or `remove` that can modify the array's size. It also implements the `IndexConst` trait which permits assignments to the indices.

```fuse
const names: string[const] = ["Alex", "Sarah", "Zack"]
-- or use the generic type
const names: ConstArray<number> = ["Alex", "Sarah", "Zack"]

assert_eq(names[2], "Sarah") -- Ok since we are only reading the element
names[2] = "Sam" -- Compile error, Can not assign to a const value

names.add("Lucy") -- Compile error, add function isn't defined for ConstArray
```

While constant arrays can be used to prevent modification to the array's elements, Similar to `const` variables it will only enforce the immutability of the variable itself and it is still possible to change fields on a reference type.

```fuse
const tables: any[const] = [{ value: "Value" }]

table[1] = nil -- Compile error, Can not assign to a const value
tables[1].value = "Modified" -- It will compile and run with no error

assert_eq(tables[1].value, "Modified")
```

__Note__: The length in the array type expression should be literal.


While `T[]` and `T[const]` are 2 completely different types in Fuse, It is only enforced by the type system and both of these types will result in the same Lua code and have no extra cost at runtime.

Since they have the same Lua representation we can cast them to each other without any performance drawback.

```fuse
const settings: string[] = ["dark_mode=true", "user=rhett"]
export fn settings() -> string[const]
  return settings as string[const]
end
```
