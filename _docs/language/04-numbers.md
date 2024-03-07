---
title: Numbers
permalink: /docs/lang/numbers/
---

By default all of the Lua interpreters come with `double` as their default numeric type; While it is possible to compile Lua for embedded environments without support for floating point numbers by configuring Lua to use `int` or `long` as its underlying type, We assume it being always `double` in the Fuse programming language and any number literal is being treated as if it is reflecting the [IEEE 754 standard](https://en.wikipedia.org/wiki/IEEE_754).

__NOTE__: From Lua 5.3 and onward it has support for integer types(either 64-bit or 32-bit depending on the configuration in the build step), But it will break compatibility with alternative runtimes and also isn't backward compatible with older versions of Lua itself.

A number literal contains an integer part and an optional fractal part which are separated by a dot(`.`), We can also use decimal exponents in our numbers.
Here are some different ways to define `number` literals.

```fuse
let a = 1
let b = 0.5
let b = 9.8
let c = 5.43e-21
let d = 0.123e45
let e = 3e+14
let f = 100_000_000_000
let g = 0.000_000_000_001
```

__NOTE__: Underlines can be used freely within any number literal to enhance its readability!

We can also define numbers using `Hexadecimal` or `Binary` literals.

```fuse
let hex = 0xFF
let bin = 0b11111111
```

### Operations

All Fuse numbers come with a default implementation for all the standard arithmetic operators supported in Lua 5.4, These operators are addition(`+`), subtraction(`-`), multiplication(`*`), division(`/`), floor division(`//`), modulo(`%`), exponentiation(`^`) and unary minus(`-`).

```fuse
assert_eq(1 + 2, 3)
assert_eq(100_000 - 1, 99_999)
assert_eq(25 * 4, 100)
assert_eq(12 / 3, 4)
assert_eq(10 // 3, 3)
assert_eq(101 % 10, 1)
assert_eq(2 ^ 10, 1024)
assert_eq(-42, 0 - 42)
```

#### Bitwise

In addition to these arithmetic operators mentioned above, Numbers also implement bitwise operators. Bitwise operators will implicitly cast the number to an integer(either a native or simulated one in case of targeting runtimes with no support for integers).

```fuse
assert_eq(0xf0 & 0xff, 0xf0) -- bitwise AND
assert_eq(0x0f | 0xf0, 0xff) -- bitwise OR
assert_eq(0xff ! 0x0f == 0xf0) -- bitwise exclusive NOT
assert_eq(0xffff >> 8, 0xff) -- bitwise right shift
assert_eq(0xff << 8, 0xff00) -- bitwise left shift
assert_eq(!0xffffffffffffff0f | 0xf0, 0xff) -- unary bitwise NOT
```

#### Comparison

Numbers can be compared to each other using the following operations.

```fuse
assert_eq(5 == 5, true) -- equality operator
assert_eq(1 != 5, true) -- inequality operator
assert_eq(1 < 5, true) -- less than operator
assert_eq(1 > 5, false) -- greater than operator
assert_eq(5 <= 5, true) -- less than or equal operator
assert_eq(5 >= 5, true) -- greater than or equal operator
```

__NOTE__: You can alter how these operators behave by reimplementing their respective traits. Read more on that on the [Operator Traits](/docs/ops) page.
