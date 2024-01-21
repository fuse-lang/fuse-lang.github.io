---
title: Special Types
permalink: /docs/lang/special-types/
---

There are a few special types in Fuse that can be used to describe certain things that are not possible to be represented using any usual type. On this page, we are going to learn about these types.

### unsafe

An `unsafe` type can be used for any value, It is similar to the `any` type in `TypeScript` but there are a few exceptions.

```fuse
let a: unsafe = "string"
a = 12345
a = true
a = [1, 2, 3, 4, 5]
a = (1, 2, 3, 4, 5)
a = { key: "Value" }
```

One of the most obvious differences with `any` type is the naming, This name will make sure that anyone who wishes to make use of this type mull it over.
Since an `unsafe` type can contain anything that exists in a Lua runtime, It is the only type in Fuse that may hold a `nil` value directly.

```fuse
let a: unsafe = nil
```

That's why when we are using an `unsafe` value the compiler will always force an explicit `nil` check unless specifically instructed to.

```fuse
fn func(value: unsafe)
  value += 1 -- Compile error, value may be nil at this point.
end
```
We can either fix it with an explicit `nil` guard.

```fuse
fn func(value: unsafe)
  if value != nil then
    value += 1 -- now it would compile
  end
end
```

While the code above would compile fine we have no guarantee that the `value` is a `number` so we should either check for it explicitly or expect runtime panics.

```fuse
fn func(value: unsafe)
  if value != nil then
    value += 1
  end
end

func(10)
func("It will panic when trying to add a `number` to a `string` value")
```
