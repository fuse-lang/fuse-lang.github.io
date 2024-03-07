---
title: Tuples
permalink: /docs/lang/tuples/
---

In Fuse a `Tuple` is a finite sequence of items, Tuples can be created using the tuple constructor or writing values inside of parantecies separated by commas. Once a tuple is created we can not change its values or number of items inside the said tuple.

```fuse
let tuple: (number, number, number) = (1, 2, 3)
let tuple: (number, number, number) = Tuple::new(1, 2, 3)
```

When creating a tuple with only a single value(`1-tuple`) we need to either add a trailing comma or explicitly use the `Tuple` constructor.

```fuse
let tuple: (string) = ("Hi",) -- notice the trailing comma
let tuple: (string) = Tuple::new("Hi")
```

There can only exist one tuple of zero values(`0-tuple`) also known as `Unit` and `empty tuple`, Empty tuples can be used to express the concept of no return value from functions without introducing a nil return which is discouraged in Fuse.

### Retrieving Values

We can retrieve values in a tuple in 2 ways, We can either use the dot(`.`) notion followed by the position of an item or via the `Index` operator(`[]`).

```fuse
let tuple = (1, 2, 3)

assert_eq(tuple.1, 1)
assert_eq(tuple.2, 2)
assert_eq(tuple.3, 3)
-- or
assert_eq(tuple[1], 1)
assert_eq(tuple[2], 2)
assert_eq(tuple[3], 3)
```

### Named Tuples

When defining a tuple we can name its items, It is especially useful in situations where we have multiple items with the same type.

```fuse
-- we can either name items in the declaration
let point: (x: number, y: number) = (10, 20)
-- or we can do it in the construction part
let point = (x: 10, y: 20)
```

Named tuple items can be retrieved using their name in addition to the methods mentioned for the unnamed tuples.

```fuse
let point = (x: 10, y: 20)

assert_eq(point.x, 10)
assert_eq(point.y, 20)
```

### Deconstruct Tuples

A tuple can be expanded into its individual values using the following syntax.

```fuse
let tuple = (1, 2, 3)
let (a, b, c) = tuple
```

If we drop the definition keyword we can assign values to mutable variables already defined in our scope.

```fuse
let mut a: number = 0
let mut b: number = 0
let mut c: number = 0

-- ...

(a, b, c) = tuple
```

We can also mix and match new variable definitions with assignment to old variables, For this purpose we simply drop the variable definition keyword and instead write it for each new individual variable definitions inside parantecies.

```fuse
let mut a: number = 0
let mut c: number = 0

-- ...

(a, let b, c) = tuple
```
