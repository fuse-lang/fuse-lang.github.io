---
title: Variables
permalink: /docs/variables/
---

Here's an example of creating a constant and initializing it:

```fuse
const name = "Fuse"
```

This is an example of a variable definition:

```fuse
let name = "Fuse"
```

A `const` can't be reassigned after it's initialization. Attempts to do so will result in a compiler error:

```fuse
const name = "Fuse"
name = "Defuse" -- this won't compile!
```

However a `let` can be reassigned:

```fuse
let name = "Fuse"
name = "Defuse" -- this will compile.
```

### Variable Type

When we create a variable we can either explicitly declare its type or let the compiler to infer it.

```fuse
const g: number = 9.81 -- explicit type declaration.
const pi = 3.14 -- implicit type infered from the assigned value.
```

Type inference can help us to write more consice, type safe code with no addition annotations. All these examples are using type inference.

```fuse
const message = "Hello!"
-- same as
const message: string = "Hello!"

const n = 21
-- same as
const n: number = 21

const numbers = [1, 2, 3, 4, 5, 6]
-- same as
const numbers: number[] = [1, 2, 3, 4, 5, 6]

const table = { value: "My Value" }
-- same as
const table: { value: string } = { value: "My Value" }
```

In some situations we may want to explicitly annotate the type despite the inference, But in most cases it can result in a code which is more verbose than necessar.

### Overview

Given the example below here are the different parts of a variable declaration.

```fuse
const name: Type = value
----- ----  ---- - -----
  ^     ^     ^  ^   ^
  |     |     |  |   |
  1     2     3  4   5  
```

1. Keyword, which can be either `let`, `const`, or `global`.
  - This keyword defines both the scope of the variable and also its mutability. A variable is either immutable(`const`) or mutable(`let`).
  - All global variables are considered mutable since there is no universal method to provide global constants across all supported runtimes.
    - _With that said it is a trivial thing to implement user-level global constants by wrapping them inside of a struct or table._
  - All variables are `local` unless they are explicitly defined using the `global` keyword.
  - Fuse actually checks for read access to all variables and will warn the developer to switch to a constant instead of a variable whenever possible.

2. Identifier, The name of our variable which should follow the [identifier rules](/docs/identifiers).
3. Type, The type that can be any of the following and may be omitted in places where the compiler can infer the type from the assignment.
    - Primitive([string](/docs/string), [number](/docs/number), [boolean](/docs/boolean))
    - Type Definition(/docs/type)
    - Table
    - Struct
    - Trait
    - Special Types(`void`, `any`, `unknown`, `never`, etc. see [advance types])
4. Assignment Operator(`=`), This operator will act as the separator between the definition part of our variable and its initialization.
5. Assignment, The last part of a variable definition is its actual assignment.

__Note__: All values in Fuse are having `first-class` support. It means that they can be assigned to variables, have concrete types, passed to functions, returned as results, or exported from a module.
