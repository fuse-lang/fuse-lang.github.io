---
title: If Expression
permalink: /docs/if-expression/
---

The `if` statement in Fuse is an expression and always will return a value. This value is always the last expression inside of the if block, the if expression can be used as a substitution for the ternary operator(`? :`).

```fuse
const a = 10
const b = 20

let is_even = false
if a % 2 == 0 then
  is_even = true
end

let max = a
if a > b then
  max = a
else
  max = b
end

-- or assign using the expression syntax
let max = if a > b then a else b end

-- elseif syntax
if a > b then
  print("a")
elseif a < b then
  print("b")
else
  print("equal")
end
```

When an `if` block is used as an expression to assign a variable or return a value from a function, It must contain an `else` block.

```fuse
-- we need an else block when using if as an expression
const validate = if email == "" then false end -- Compiler error, missing else block!
```

Here's `FizzBuzz` implemented using `if` expression.

```fuse
const result = if n % 15 then
    "FizzBuzz"
  elseif n % 3 then
    "Fizz"
  elseif n % 5 then
    "Buzz"
  else
    n.tostring()
end
```
