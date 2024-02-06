---
title: Pattern Matching
permalink: /docs/lang/pattern-matching/
---

The `match` expression can be used to exhaustively match a variable with its different possible values.
If you are not familiar with the concept of `pattern matching` you can think of it as some kind of extended `switch ... case` expression.

We use it to `match` a variable or an expression with all of its possible `pattern`s. For example, this pattern-matching expression can be used to match a single enum type of seasons.

```fuse
const name = match season when
  Spring then "Spring" end
  Summer then "Summer" end
  Autumn then "Autumn" end
  Winter then "Winter" end
end
```

Since a `match` expression must be exhaustive, We need to either check every possible value or if we can't or don't need to we should include an `else` block, You can think of it as `default` in good old switch cases.

```fuse
match season when
  Summer then ":)" end
  else ":'("
end
```

If we can't match a block to multiple patterns we can use the `and` and `or` operator.

```fuse
match season when
  Summer or Autumn then ":)" end
  else ":'("
end
```

A type system with support for pattern matching should enforce the exhaustion of the subject of the match. It means if we start using a product variable such as a `Tuple` or `struct` we get to check the product value of all possible patterns for every value in our compound type.
For example while a `boolean` has 2 possible values `true` or `false`, and our Season enum contains 4 possible values; If we create a tuple of `(Season, boolean)` we have to check for `2 x 4 = 8` possible values. That's what we call a `product type`.

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

A pattern on product types can check only some of the values and capture others to use in the branch.
For example, if we don't care about our boolean value and only want to match our Season we can do this.

```fuse
match tuple when
  (Spring, bool) then "Spring and ${bool}" end
  (Summer, bool) then "Summer and ${bool}" end
  (Autumn, bool) then "Autumn and ${bool}" end
  (Winter, bool) then "Winter and ${bool}" end
end
```

A `pattern` can also contain an optional condition to further expand the pattern.

For a tuple of `(Season, number)` containing the current season and day in that season, We can write the following match expression to only print the word `Yay!` for the second month of `Autumn` and `Spring`.

```fuse
match tuple when
  (Spring or Autumn, day) if day > 30 and day <= 60 then print("Yay!") end
  else end -- do nothing
end
```

Or we can use a range for that purpose.

```fuse
match tuple when
  (Spring or Autumn, in 31..60) then print("Yay!") end
  else end -- do nothing
end
```
