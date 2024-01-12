---
title: Variables
permalink: /docs/variables/
---

Here's an example of creating a constant and initializing it:

```fuse
const name: string = "Sam"
```

This is an example of a variable definition:

```fuse
let name: string = "Sam"
```

Here are the different parts of a variable definition and assignment.

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
