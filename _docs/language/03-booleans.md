---
title: Booleans
permalink: /docs/lang/booleans/
---

The type `boolean` represents boolean values, These can be either `true` or `false`.

Booleans support all [Logical Operators](/docs/logical-ops) as expected.

```fuse
const my_true: boolean = true
const my_false: boolean = false

assert_eq(my_true or my_false, true)
assert_eq(my_true and my_false, false)
assert_eq(not my_false, true)
```
