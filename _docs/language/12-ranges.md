---
title: Ranges
permalink: /docs/ranges/
---

Ranges are used to represent an inclusive range of numbers, They can be created either by use of the `Range` type or `start..end` syntax which would contain any numbers that is `start <= number <= end`.

```fuse
const range = 1..100
-- or
const range = Range::new(1, 100)

assert_eq(range.contains(1))
assert_eq(range.contains(50))
assert_eq(range.contains(100))

assert_eq(not range.contains(0))
assert_eq(not range.contains(101))
```

We can also use the `in` keyword to check if a number is in within a certain range.

```fuse
if n in 1..100 then
  print("${n} is in the range")
end
```

The `in` keyword can also be used as `not in` if we want to negate the result.

```fuse
if n not in 1..100 then
  print("${n} is **NOT** in the range")
end
```

We can use variables at either end of a range.

```fuse
if x in 1..y+1 then
  print("In range")
end
```
