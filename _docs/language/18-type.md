---
title: Types
permalink: /docs/types/
---

### Type Alias

The `type` keyword is used for creating an alias for one or more types that already exist.

```fuse
type Id = number
```

Fuse has a type semetic type system which means, Because of this verbose type system we should be able to describe anything that can exist on a dynamically typed language like Lua.

For example we can have an `Id` type that can be either `number` or `string`.

```fuse
type Id = number | string
```

The `type` keyword can also be used to describe a table 
