---
title: Identifiers
permalink: /docs/lang/identifiers/
---

Identifiers are any name that we assign to things like variables, types, or functions.
The difference between identifiers and strings is that `string` is data but identifiers are a part of code. That's why we are bound to the limitations of the Lua programming language. In Fuse, we can not convert identifier names to strings but in some situations, we can access the identifier by parsing the string name.

### Naming Rules

Valid identifiers should follow the following rules, Otherwise, the Fuse compile will produce an error.

  - Identifier must start with a letter or underscore(`_`).
  - Identifier can contain ANSI letters, decimal digit characters, and underscores(`_`).
  - Identifier can not be one of the [reserved names](#reserved_names)(such as Fuse or Lua `keyword`s).

<a name="reserved_names" />
### Reserved Identifiers

As mentioned above, Identifiers cannot be a keyword from Fuse or Lua language.

The following keywords are reserved and cannot be used as identifiers.

#### Fuse Keywords

```
and        as         break      const      do         else
elseif     end        enum       export     false      for
from       function   fn         global     if         impl
import     in         let        match      never      nil
not        pub        or         repeat     return     self
Self       static     struct     then       trait      true
type       union      unknown    until      unsafe     when
while      
```

#### Legacy Lua Keywords

```
local
```

#### Future Proof Reserves

These following keywords aren't a part of the language but they are reserved to keep current programs future proof and therefore one should not assume that all these keywords are coming in the upcoming releases of the Fuse language, Only a select few will get into the actual spec.

```
abstract   async      await      defer      extends    final
is         override   priv       prot       satisfies  try
virtual    yield      where
```

### Naming Conventions

In addition to the rules above, conventions for identifiers are used throughout the `@fuse` libraries, These conventions provide some much-needed consistency for variables, functions, public methods, and type names. However, the compiler doesn't enforce these conventions so feel free to use whatever fit your needs.

| Item | Conventions |
|:-----|:-----------:|
| Lua Imports | undefined |
| Modules | `snake_case` |
| Types | `PascalCase` |
| Traits | `PascalCase` |
| Enum Variants | `PascalCase` |
| Functions | `snake_case` |
| Methods | `snake_case` |
| General Constructors | `new` or `with_more_details` |
| Conversion Constructors | `from_some_other_type` |
| Macros | `snake_case!` |
| Local Variables | `snake_case` |
| Local Constants | `snake_case` |
| Statics | `SCREAMING_SNAKE_CASE` |
| Constants | `SCREAMING_SNAKE_CASE` |
| Generic Parameters | `PascalCase`, either a single uppercase letter or starts with `T` |
