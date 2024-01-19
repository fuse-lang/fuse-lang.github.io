---
title: Control Flow
permalink: /docs/control-flow/
---

### If Expression

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

While we can have `if` conditions with early returns from functions, We have to provide an else block when we are using the if as an expression to assign a variable or return it from a function.

```fuse
fn validate(email: string) -> boolean
  if email == "" then
    return false  -- It is OK since we are explicitly returning a value from our function.
  end
  -- ...
end

-- we need an else block when using it as an expression
const validate = if email == "" then false end -- Compiler error, missing else block!

-- this will also raise a compiler error.
fn validate(email: string) -> boolean
  return if email == "" then -- missing else statement
    false
  end
end
```

Here's `FizzBuzz` with using `if` expression.

```fuse
```

### Match Expression

The `match` expression can be used to exhaustively match a variable with its different possible values,

If you are are not familiar with the concept of `pattern matching` you can think of it as some kind of extended `switch ... case` expression.
We use it to `match` a variable or an expression with all of it's possible `pattern`s. For example this pattern matching expression can be used instead of the last case mentioned for the condition above.

```fuse
match tuple when
  ()
end
```
