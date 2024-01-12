---
title: Identifiers
permalink: /docs/identifiers/
---

Identifiers are any name that we assign to things like variables, types or functions.
Difference between identifiers and strings is that `string` is data but identifiers are a part of code. That's why we are bound to the limitations of the Lua programming language. In Fuse we can convert identifier names to string but in some situations we can access the identifier via parsing the string name.

### Naming Rules

Valid identifiers should follow these following rules, Otherwise the Fuse compile will produce an error.

  - Identifier must start with a letter or underscore(`_`).
  - Identifier can contain ANSI letters, decimal digit characters and underscores(`_`).
  - Identifier can not be one of the [reserved names](#reserved_names)(such as Fuse or Lua `keyword`s).

<a name="reserved_names" />
### Reserved Identifiers

As mentioned above, Identifiers cannot be a keyword from Fuse nor Lua language.

The following keywords are reserved and cannot be used as identifiers.

#### Fuse Keywords

```
and        as         break      const      do         else
elseif     end        enum       export     false      for
from       function   fn         if         impl       import
in         let        match      pub        nil        not
or         repeat     return     self       Self       static
struct     then       trait      true       type       until
when       while
```

#### Legacy Lua Keywords

```
local
```

#### Future Proof Reserves

These following keywords aren't a part of the language but they are reserved to keep current programs future proof and therefore one should not assume that all these keywords are comming in the upcomming releases of the Fuse language, Only a select few will get into the actual spec.

```
abstract   final      override   priv       prot       typeof
is         satisfies  virtual    async      await      try
catch      finally    yield      class      extend     defer
```

### Naming Conventions

In addition to the rules above, conventions for identifiers are used throughout the `@fuse` libraries, These conventions provide some much needed consistency for variables, functions, public methods and type names. However the compiler dosn't enfore these conventions so feel free to use whatever fit your needs.

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
| Generic Parameters | `PascalCase`, either single uppercase letter or starts with `T` |
