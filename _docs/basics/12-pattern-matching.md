---
title: Pattern Matching
permalink: /docs/pattern-matching/
---

The `match` expression can be used to exhaustively match a variable with its different possible values.
If you are are not familiar with the concept of `pattern matching` you can think of it as some kind of extended `switch ... case` expression.

We use it to `match` a variable or an expression with all of it's possible `pattern`s. For example this pattern matching expression can be used to match a single enum type of seasons.

```fuse
const name = match season when
  Spring then "Spring" end
  Summer then "Summer" end
  Autumn then "Autumn" end
  Winter then "Winter" end
end
```

Since a `match` expression must be exhaustive, We need to either check every possible values or if we cann't or don't need to we should include a `else` block, You can think of it as `default` in good old switch cases.

```fuse
match season when
  Summer then ":)" end
  else ":'("
end
```

If we cant to match a block to multiple patterns we can use `and` and `or` operator.

```fuse
match season when
  Summer or Autumn then ":)" end
  else ":'("
end
```

A type system with support for pattern matching should enforce the exhaustion of the subject of match. It means if we start using a product variable such as a `Tuple` or `struct` we get to check product value of all possible pattern for every value in our compund type.
For example while a `boolean` have 2 possible values `true` or `false`, and our Season enum contains 4 possible values; If we create a tuple of `(Season, boolean)` we have to check for `2 x 4 = 8` possible values. That's what we call a `product` type.

```fuse
match tuple when
  (Spring, true) then "Spring and True" end
  (Spring, false) then "Spring and False" end

  (Summer, true) then "Summer and True" end
  (Summer, false) then "Summer and False" end

  (Autumn, true) then "Autumn and True" end
  (Autumn, false) then "Autumn and False" end

  (Winter, true) then "Winter and True" end
  (Winter, false) then "Winter and False" end
end
```
