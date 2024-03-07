---
title: Advance Typing
permalink: /docs/lang/advance-typing/
---

The `type` keyword is used for creating an alias for one or more types that already exist.

```fuse
type Id = number
```

Fuse has a type semantic type system which means, Because of this verbose type system we should be able to describe anything that can exist in a dynamically typed language like Lua.

For example, we can have an `Id` type that can be either a `number` or `string`.

```fuse
type Id = number | string
```

The `type` keyword can also be used to describe a compound type based on smaller building blocks.

This type alias describes a type that has both `TraitA` and `CustomTable`.

```fuse
type MyType = TraitA & CustomTable
```

An alias can also contain [generic type](/docs/language/generic/) parameters.

```fuse
type Api<T> = Backend<DatabaseType, T>
```

### Type erasure

When we assign a value with a known type to an implemented trait type or an ambiguous type we lose some information about that said value's type.
After assigning a value to such variable we have to cast it back to our desired type, Type casting in `Fuse` happens using the `as` keyword. A cast operation would only allow a value to be assigned to the cast type but doesn't provide any checks either in compilation or runtime.

Let's say we have a value that can either be a number or a string representing a number. Here is one way to describe it.

```fuse
type AmbigiusType = string | number

let a: AmbigiusType = 1
let b: AmbigiusType = "2"

let mut num1: number = a as number -- compiles and runs
let mut num2: number = b as number -- this would also compiles and run

num1 += 1 -- it will run fine
num2 += 1 -- it will panic in runtime, attempt to add 'string' to 'number'
```

So we should always value `union` types over an ambiguous type with an `|` operator, this kind of type needs manual type checking by the developer and compiler some checks while compiling.

Here is the same code using actual manual type checking.

```fuse
fn add1(n: number | string) -> number
  if typeof(n) == "number" then
    (n as number) + 1
  else
    tonumber(n) + 1
  end
end
```

However these checks aren't enforced by the compiler and are best for describing types from `Lua` modules, Here is the same example using `union` types.

```fuse
fn add1(n: NumUntion) -> number
  match n when
    Numeric(n) then n + 1 end
    String(n) then tonumber(n) + 1 end
end
```

This time we have both compile time and runtime checks in place to ensure that our type is always the thing we are expecting it to be.
