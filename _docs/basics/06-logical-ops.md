---
title: Logical Operators
permalink: /docs/logical-ops/
---

On this page, we are going to explore the following operators.

  - Logical OR(`or`)
  - Logical AND(`and`)
  - Logical NOT(`not`)

Logical operators will treat all values except `false` and `nil` as truthy values.

The negation operator(`not`) always returns `true` or `false`.

```fuse
assert_eq(not nil, true)
assert_eq(not false, true)
assert_eq(not true, false)
assert_eq(not "Hi", false)
assert_eq(not 1984, false)
assert_eq(not "", false) -- empty strings are truthy as they should be(looking at you JS)
assert_eq(not 0, false) -- even 0 is considered a truthy value
```

The conjunction operator(`and`) returns its first argument if this value is `false` or `nil`; Otherwise, it will return the second argument.

```fuse
assert_eq(true and 42, 42)
assert_eq(false and 42, false)
assert_eq(nil and 42, nil)
assert_eq("Hello" and 42, 42)
```

The disjunction operator(`or`) will return its first argument if it is a truthy value otherwise it will return the second argument.

```fuse
assert_eq(nil or 2048, 2048)
assert_eq(false or 2048, 2048)
assert_eq(true or 2048, true)
assert_eq("Hello" or 2048, "Hello")
```
One of the nice use cases of the `or` operator other than logical operations is to assign default values when one isn't provided, This will also help to narrow down the types.

```fuse
const default: string = "Default Value"
const value_a: string | nil = "Value"
const value_b: string | nil = nil

const result_a: string = value_a or default -- notice that we got rid of nil in our type
const result_b: string = value_b or default -- since this expression always provide a string

assert_eq(result_a, value_a)
assert_eq(result_b, default)
```

Logical operators don't support operator overloading and they do short-circuit the operation similar to the `Rust`, However, the reasoning may be somewhat different. According to the Rust documentation on the subject at hand, it says:

> Note that the `&&` and `||` operators are currently not supported for overloading. Due to their short circuiting nature, they require a different design from traits for other operators like `BitAnd`.

This isn't necessarily the case for Fuse as we have a lot of flexibility because of running in a VM, We just don't like the idea of changing the meaning behind logical operations.
Instead because of leaner logical operation, We get to treat all values except `false` and `nil` as truthy values which in return resolve most use cases for logical operator overloading. For other situations using a member function is going to produce more readable code and will prevent many bad design decisions we have seen in other languages such as `C++`.

