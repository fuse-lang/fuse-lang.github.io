---
title: Motivation
permalink: /docs/motivation/
---

The motivation behind the `Fuse` language is creating a modern experience using the `Lua` ecosystem.

## Syntax

The syntax itself is inspired by multiple languages such as `Lua`, `Luau`, `TypeScript`, `Rust`, `Go` and many others!
`Fuse`'s purpose is to create an alternative language to Lua that can be used across multiple different runtimes.

#### Possible Target Runtimes/Languages

- Lua 5.1
- Lua 5.2
- Lua 5.3
- Lua 5.4
- LuaJIT
- Luau
- Lune

### Why not use `Luau` syntax?

One may ask why not just transpile `Luau`'s syntax into `Lua` and call it a day. It is actually a really good choice and was the initial idea behind this project but `Luau` has some quirks that make transpiling it to `Lua` a little bit tricky; For example, it supports some features of recent versions of `Lua` but doesn't support others and also it is designed based on the idea of running in a sandbox environment with different assumptions which currently doesn't make it impossible to transpile to `Lua 5.1` syntax, But in the future, they can easily break the compatibility since they don't rely on `Lua` interpreter.

On the other hand with the introduction of a new syntax for `Fuse` we can achieve many more convenience features that both vanilla `Lua` and `Luau` are missing, For example, `Fuse` has things like `pattern matching`, `inline try`, `extern function*`, `macros`, `multiple return value`, `trait` among other stuff. 

### Type Checking

Since `Fuse` doesn't come with its runtime and relies on multiple other interpreters to provide the environment and the ecosystem, It needs to be gradually typed; TypeScript is among few languages that have gradual typing as a result the type system in `Fuse` is going to feel similar to `TypeScript`. While the overall design of the `Fuse` type system is close to the one in `TypeScript` it does not mean they are the same.

### Traits Instead of Classes

Speaking of differences between `Fuse` and `TypeScript` type systems, Here is a major one: 

> Fuse doesn't support classes natively

That may upset some portion of people which is understandable but here is our reasoning behind this relatively bold move.
Lua already doesn't support classes, There are many workarounds out there to make it behave similar to a truly object-oriented language but it is not by nature even tho it says so on its Wikipedia page, You don't need many lines of code to set up a prototype base inheritance in it but it isn't same as first-class support of object-oriented programming such as the ones we have seen in `C++`, `Java` and `TypeScript` so it is better for us to also leave that part as is After all every third party solution for supporting classes are also available for `Fuse` and it is also possible to create a more seamless implementation of classes in `Fuse` using the macro system.

Trait, on the other hand, brings most of the good reasons we use `OO` without any extra runtime cost in a compiled language like `Fuse`. 9 out of 10 times we reach out for classes we just want objects with functions attached to them, While `inheritance` may make sense to reason about it isn't maintainable in the long run as opposed to something like `composition`.

Besides the previous point, the introduction of classes creates more clutter in the generated output and it will make it almost unreadable while with the use of libraries like `MiddleClass`, `30Log`, and `Common-Class` we can ensure both compatibility with the vanilla `Lua` codes and also keep the generated result clean.
