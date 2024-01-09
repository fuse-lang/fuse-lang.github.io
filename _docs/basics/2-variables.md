---
title: Variables
permalink: /docs/variables/
---

Here's an example of creating a constant and initializing it:

```rust
const name = "Sam"
```

And this is an example of variable definition:

```rust
let name = "Sam"
```

First part of every variable definition is a keyword which can be either `let`, `const` or `global`, This keyword defines both the scope that which we are defining the variable in and the access level of the said variable.
All variables are `local` unless they are explicitly defined using the `global` keyword.
Fuse actully checks for read access to all variables and will warn the developer to switch to a constant instead of a variable whenever possible.

The second part of it is the name of our variable which should follow the [variable naming rules](#naming).

All values in Fuse are `first-class` values. It means that we can treat every value type in Fuse is assignable to variables, can be passed to functions, returned as results or get exported from a module.

In Fuse similar to Lua there are eight basic types: `nil`, `boolean`, `number`, `string`, `function`, `userdata`, `thread` and `table`. But in addition to these types we also introduced `ustring` which is a specific type for working with utf8 strings.

When we

<a name="naming" />
### Variable Naming Rules

