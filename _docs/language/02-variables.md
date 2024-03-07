---
title: Variables
permalink: /docs/lang/variables/
---

Here's an example of creating an immutable variable and initializing it:

```fuse
let name = "Fuse"
```

This is an example of a mutable variable definition:

```fuse
let mut name = "Fuse"
```

An immutable variable can't be reassigned after it's initialization. Attempts to do so will result in a compiler error:

```fuse
let name = "Fuse"
name = "Defuse" -- this won't compile!
```

However a mutable variable can be reassigned:

```fuse
let mut name = "Fuse"
name = "Defuse" -- this will compile.
```

### Variable Type

When we create a variable we can either explicitly declare its type or let the compiler infer it.

```fuse
let g: number = 9.81 -- explicit type declaration.
let pi = 3.14 -- implicit type inferred from the assigned value.
```

Type inference can help us to write more concise, type-safe code with no additional annotations. All these examples are using type inference.

```fuse
let message = "Hello!"
-- same as
let message: string = "Hello!"

let n = 21
-- same as
let n: number = 21

let numbers = [1, 2, 3, 4, 5, 6]
-- same as
let numbers: number[] = [1, 2, 3, 4, 5, 6]

let table = { value: "My Value" }
-- same as
let table: { value: string } = { value: "My Value" }
```

In some situations, we may want to explicitly annotate the type despite the inference, But in most cases, it can result in a code that is more verbose than necessary.

### Compile-time constants

In addition to variables we can define compile-time constants in Fuse, These would get compiled away and are only accessable from the Fuse and aren't present in the runtime environment.
We can define a constant similar to variables with the use of `const` keyword, Constants need an explicit type annotation and can only be a primitive ([string](/docs/string), [number](/docs/number), [boolean](/docs/boolean)) value.

```fuse
const PI: number = 3.14
const PATH: string = "assets/data/loading.png"
```
