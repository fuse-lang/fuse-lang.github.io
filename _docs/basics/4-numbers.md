---
title: Numbers
permalink: /docs/numbers/
---

By default all of the Lua interpreters come with `double` as their default numberic type; While it is possible to compile Lua for embeded environments without support for floating point numbers by configuring Lua to use `int` or `long` as it underlying type, We assume it being always `double` in the Fuse programming language and any number literal is being treater as if it is reflecting the [IEEE 754 standard](https://en.wikipedia.org/wiki/IEEE_754).

__NOTE__: From Lua 5.3 and onward it has support for integer types(either 64-bit or 32-bit depending on configuration in build step), But it will break compatblity with alternative runtimes and also isn't backward compatible with older versions of Lua itself.

A number literal contains a integer part and an optional fractal part which are seperated by a dot(`.`), We can also use decimal exponents in our numbers.
Here are some different ways to define `number` literals.

```fuse
const a = 1
const b = 0.5
const b = 9.8
const c = 5.43e-21
const d = 0.123e45
const e = 3e+14
const f = 100_000_000_000
const g = 0.000_000_000_001
```

We can also define numbers using `Hexadecimal` and `Binary` literals.

```fuse
const hex = 0xFF
const hex = 0xff
const bin = 0b11111111
```
