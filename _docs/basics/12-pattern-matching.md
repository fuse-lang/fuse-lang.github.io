---
title: Pattern Matching
permalink: /docs/pattern-matching/
---

The `match` expression can be used to exhaustively match a variable with its different possible values,

If you are are not familiar with the concept of `pattern matching` you can think of it as some kind of extended `switch ... case` expression.
We use it to `match` a variable or an expression with all of it's possible `pattern`s. For example this pattern matching expression can be used to match a single boolean type.

```fuse
match bool when
  true then "True" end
  false then "False" end
end
```
