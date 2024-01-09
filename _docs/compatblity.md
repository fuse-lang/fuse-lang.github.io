---
title: Compatblity
permalink: /docs/compatblity/
---

One of the big reasons behind the creation of `Fuse` is safety and ease of development in larger code bases. But another reason is to keep some ideal amount of compatibility with the existing LUA codes other than the ability to load and on this page, we are going to discuss what decisions have been made to achieve this balance between safety and compatibility.

### Agenda

`Lua` language has proven to be one of the most backward-compatible languages that have ever existed and it maintained a surprising amount of backward compatibility when migrating to newer versions which is an astonishing achievement on their side. Unfortunately, it comes at the cost of keeping some of the decisions that made sense in the early days of the language and ever since have lost their usefulness.

### Syntax

Fuse syntax tries to be compatible with `Lua 5.1` to some extent but we do not want to get 100% compatibility at the cost of inheriting all of the technical debt. Instead, we are aiming for a similar enough language that makes porting current Lua codebases one module at a time possible.
To provide such interoperability between Fuse and its target runtimes we have made sure to only support the highest common denominator between all of the different flavors of `Lua` so we can do things such as writing our code to run on `Lua 5.4` in customer's machine and have it on `LuaJIT` in production server.

### Limited Global Scope

Having global scopes in your files and especially having them as the default behavior of variable definition is reasonable in smaller codebases but since Lua is one of the most loved scripting languages and is so easy to embed in any project we are seeing a multitude of projects that have adopted Lua for their scripting needs as their domain-specific language.

We think that global scopes by default aren't one of those features that would help us to achieve our goals Since it only makes sense in the context of header files, which may be one of the reasons behind the origin of this decision from Lua team in the birth of the language.
It would've made sense for the early days of Lua but with the mass adoption of the language, We have seen a lot of abuse via bad use of global scope (or at times naive use).

Other than that it makes it hard to reason about dependencies and the origin of global variables in any given project.

But we cannot entirely remove global variables even tho it makes the inner workings of a reliable module system much easier and straightforward. There are already a lot of libraries written for Lua that are using the global scope and by isolating Fuse from accessing to global scope we are definitely going to break some legacy codes which is something we do not desire.

So what we propose is keeping the global scope but it is no longer the default scope of our variables, For example instead of doing the following in the Lua:

```lua
global_variable = "I'm a global variable"
local local_variable = "I'm a local variable"
```

We write this:

```rust
global_variable = "It will raise an error in compilation!"
global global_variable = "I'm a global variable"
const local_constant = "I'm a local constant"
-- or
let local_variable = "I'm a local variable"
```
As you can see in Fuse we have to explicitly define a variable as `global` with the keyword otherwise we get an error since it is the same as trying to write to an undefined variable.

We also don't allow access to global variables via the use of their name alone, Since global variables are side effects in nature and are unpredictable in the code what variable and with which type exists at this point in the program. These variables are really hard to keep track of since they can be defined inside of functions, files, chunks, or many other possible places.
To accommodate this issue we only allow users to access `global variables` using the `global` keyword or `_G` table.

As a result instead of writing this:

```lua
my_global = "HI!"

print(my_global)
```

We do this:

```rust
global my_global = "HI!"

print(_G.my_global)
-- or
print(global.my_global)
```

`global` when used as a table acts as an alias to `_G` for readability reasons.

Keep in mind that the `_G` table always has `any` type and it is literally impossible  to type the global scope at compile time but it is possible to either cast the variables into a known type or create a type definition for global scope and so the compiler can infer the types from that but it won't guarantee the existence of the given variable and it just provides auto-complete and type checking.


### Features beyond Lua 5.1

We have chosen the Lua 5.1 as our base syntax to build upon. This version of Lua is the most available set of features in the Lua ecosystem since anything that works in `5.1` can also work in `5.2`, `5.3`, `5.4` and `Luau` but it doesn't mean that we don't backport any features from newer versions of Lua or ideas from Luau interpreter that can work as a syntax sugar with our Lua 5.1 limitation that we applied to ourselves.
There are a few notable changes. Mainly we don't have `pack` and `unpack` functions anymore, instead, we are using `table.pack` and `table.unpack` to make it consistent between different target versions. Other than that there are also some new features backported from newer releases of Lua and some completely new features that are missing from every version of `Lua`, Things like type support, string interpolation, traits, pattern matching, array deconstruction, `+= -= *= /=` operators and better error handling(see `Error Handling` section) among many others.

### Differences with Lua 5.2

|Feature|Status|Notes|
|-------|:----:|:----|
|yieldable pcall/xpcall|Yes|part of the `@fuse` library|
|yieldable metamethods|Partial|part of the `@fuse` libraries|
|ephemeron tables|No|limitation of `LuaJIT` and `Lua 5.1`, but `@fuse/collections` comes with a handy `WeakMap` data type to use|
|bitwise operators|Yes|use of `bit32` in `Lua 5.2+` and `Luau`, `@fuse/bit32` for `Lua 5.1` and `LuaJIT`|
|light C functions|Partial|depends on the runtime, if your target supports it `Fuse` also supports it|
|emergency garbage collector|Future|it is a runtime-specific problem, we will support it for runtimes that have it(even `Lua5.1` can be patched for it)|
|goto|No|it complicates the control flow of the program and isn't even supported universally across the `Lua` ecosystem|
|table finalizers|No|we do not support this since many of our target runtimes don't have it(`Lua 5.1`, `LuaJIT`, `Luau`)|
|`fenv`|Partial|can only be used when targeting `Lua 5.1`, `LuaJIT`, and `Luau`(see `preprocessor #if` section)|
|tables honor the `__len` metamethod|Yes*|`Fuse` code will respect it no matter what but when using compiled `Fuse` code from `Lua 5.1` it won't get respected(use `t:len()` method or `lenOf t` function defined in the `fuse-runtime` library)|
|hex and `\z` escapes in string|Yes||
|support for hexadecimal floats|Yes||
|order metamethods are called for unrelated metatables|Yes*|`Fuse` code will respect it but it won't work when used in the `Lua 5.1` runtime|
|empty statement|Yes||
|`break` statement may appear in the middle of a block|Yes||
|no more verification of opcode consistency|Partial|it depends on the runtime and `Fuse` doesn't neither improve nor prevent it|
|hook event "tail return" replaced by "tail call"|Unknown|right now `debug` is dependent on the runtime but with the introduction of `@fuse/debug` it will get unified across all runtimes|
|arguments for function called through xpcall|Yes||
|optional base in `math.log`|Yes|`Fuse` uses it's own math module `@fuse/math`|
|optional separator in string.rep|Yes|`Fuse` uses its own string module `@fuse/string`|
|`file:write` returns file|No|as it is right now we do not support it, this is because of limitations in some of our target runtimes|
|closing a pipe returns exit status|Partial|depends on the runtime|
|`os.exit` may close state|Partial|depends on the runtime|
|new metamethods `__pairs` and `__ipairs`|Future*|in future releases of `Fuse` it will be supported inside the `Fuse` code itself, but won't work when iterated from `Lua 5.1`, `LuaJIT` and `Luau`|
|frontier patterns|Future|it will be supported in future releases of `Fuse`, TBD|
|`%g` in patterns|Future|it will be supported in future releases of `Fuse`, TBD|
|`\0` in patterns|Future|it will be supported in future releases of `Fuse`, TBD|
|`debug.getlocal` can access function varargs|Unknown|right now `debug` is dependent on the runtime but with the introduction of `@fuse/debug` it will get unified across all runtimes|
|`string.gsub` is stricter about using `%` on special characters only|Future|it will be supported in future releases of `Fuse`, TBD|
|`NaN` keys are supported for tables with `__newindex`|Future|it will be supported in future releases of `Fuse`, TBD|

\* items whose status is marked with an asterisk are supported in Fuse but don't have universal support when used from some versions of vanilla Lua

### Differences with Lua 5.3

|Feature|Status|Notes|
|-------|:----:|:----|
|`\u` escapes in strings|Yes||
|integers (64-bit by default)|No|it will break our compatibility with most of our target runtimes|
|bitwise operators|Yes|without 64-bit integers, it is the same as operators in `Lua 5.2` which is supported in `Fuse`|
|basic utf-8 support|Yes|we have full support for utf-8 strings(see `ustring` type)|
|functions for packing and unpacking values (string.pack/unpack/packsize)|Yes|support via `@fuse/string` library|
|floor division|Yes||
|`ipairs` and the `table` library respect metamethods|Yes*|`Fuse` code will respect them but it won't work when used from `Lua` runtimes before `5.3`|
|new function `table.move`|Yes||
|`collectgarbage("count")` now returns only one result|Yes||
|`coroutine.isyieldable`|Unknown|it will be determined in the future, right now we do not support it but we are working towards a universal implementation|
|stricter error checking for `table.insert`/`table.remove`|Partial|we have them depending on the target runtime but we may add it into the `Fuse` language if we improve the performance cost|
|`__eq` metamethod is called for unrelated metatables|Yes*|`Fuse` code will respect it but it won't work when used from `Lua` runtimes before `5.3`|

\* items whose status is marked with an asterisk are supported in Fuse but don't have universal support when used from some versions of vanilla Lua

### Differences with Lua 5.4

|Feature|Status|Notes|
|-------|:----:|:----|
|new generational mode for garbage collection|Partial|it depends on the target runtime, and will only work in `Lua 5.4`|
|to-be-closed variables|Unknown|we are working on a solution to support it without depending on the language features, but even if pull it off the syntax is going to be different(since we already use macros as attributes like `Rust`)|
|const variables|Yes|we offer both `const` and `let` keywords as opposed to using attributes with `local` keyword|
|new implementation for `math.random`|Partial|right now it depends on the runtime but to make randoms more consistent across runtimes we are going to replace it in the future with our own `@fuse/math` library|
|optional `init` argument to `stirng.gmatch`|Future|it doesn't exists on the current version but we are working on it|
|new functions `lua_resetthread` and `coroutine.close`|Unknown|we are not sure whether it is possible or not|
|string-to-number coercions moved to the string library|Unknown|it may break compatibility with older versions and needs more time in the oven before we can make the final verdict|
|new format `%p` in `string.format`|No|no language support before `5.4`|
|utf8 library accepts codepoints up to `2^31`|No|if we find enough use cases we will start working on it|
|function `print` calls `__tostring` instead of `tostring` to format its arguments|Yes||
|decoding functions in the utf8 library do not accept surrogates|Yes||

### Differences with Luau

|Feature|Fuse Support|Luau Support|Notes|
|-------|------------|------------|-----|
|`io`, `os`, `package`, and `debug` library|Full|Partial|`Luau` lacks this because of sandboxing; when `Fuse` targets `Luau` runtime it is confined to the environment of `Luau`|
|`loadfile`, `dofile`|Full|Partial|`Luau` lacks this because of sandboxing; when `Fuse` targets `Luau` runtime it is confined to the environment of `Luau`|
|`loadstring`, `string.dump`|Full|Partial|`Luau` lacks this because of sandboxing; when `Fuse` targets `Luau` runtime it is confined to the environment of `Luau`|
|`newproxy`|Full|Partial|`Luau` lacks this because of sandboxing; when `Fuse` targets `Luau` runtime it is confined to the environment of `Luau`|
|yieldable pcall/xpcall|Yes|Yes||
|yieldable metamethods|Partial|No||
|ephemeron tables|No|No|`Fuse` comes with a `WeakMap` data structure in its standard library which can mimic this to some extent|
|emergency garbage collector|No|No|both `Luau` and `Fuse` are lacking this feature, we may add support for it down the road when targeting `Lua 5.2+`|
|goto statement|No|No|the few use cases for `goto` dosn't worth all of the bad uses of it that may happen!|
|finalizers for tables|No|No||
|no more fenv for threads or functions|Partial|No|`fenv` still exists when targeting `Lua 5.1`, `LuaJIT`, and `Luau` but can only be used in `preprocessor #if` for one of these runtimes|
|tables honor the `__len` metamethod|Yes|Yes|`Fuse` respects this metamethod but if the table gets used from `Lua 5.1` or `LuaJIT` it will be ignored. In those cases users should use `t:len()` or `lenOf t`|
|hex and `\z` escapes in strings|Yes|Yes||
|support for hexadecimal floats|Yes|No||
|order metamethods are called for unrelated metatables|Yes|No|`Fuse` code will respect it but it won't work when used from the `Lua 5.1` code|
|empty statement|Yes|No||
|`break` statement may appear in the middle of a block|Yes|No|`Luau` have encountered dragons on this path, Fingers crossed we hope to conqueror it|
|arguments for function called through xpcall|Yes|Yes||
|optional base in `math.log`|Yes|Yes||
|optional separator in `string.rep`|Yes|No||
|new metamethods `__pairs` and `__ipairs`|Future|No|in future releases of `Fuse` it is going to be possible to define these metamethods and `Fuse` would respect them but it won't work when used from `Lua 5.1` or `Luau` code|
|frontier patterns|Future|Yes||
|`%g` in patterns|Future|Yes||
|`\0` in patterns|Future|Yes||
|`bit32` library|Yes|Yes||
|`string.gsub` is stricter about using `%` on special characters only|Future|Yes||
|light C functions|Partial|No|`Fuse` depends on the runtime to provide light C functions|
|`NaN` keys are supported for tables with `__newindex`|Future|Yes||
|`\u` escapes in strings|Yes|Yes||
|integers (64-bit by default)|No|No||
|`bit64` library|No|No|no need since neither of these 2 languages support 64-bit integers|
|basic utf-8 support|Yes|Yes||
|functions for packing and unpacking values (string.pack/unpack/packsize)|Yes|Yes||
|floor division|Yes|Yes||
|floor division|Yes|Yes||
|`ipairs` and the `table` library respect metamethods|Yes|No|`Fuse` code will respect them but it won't work when used from `Lua` runtimes before `5.3`|
|new function `table.move`|Yes|Yes||
|`collectgarbage("count")` now returns only one result|Yes|Yes||
|`coroutine.isyieldable`|Unknown|Yes|it will be determined in the future, right now `Fuse` does not support it but we are working towards a universal implementation|
|stricter error checking for `table.insert`/`table.remove`|Partial|No|`Fuse` have them depending on the target runtime but we may add it into the `Fuse` language if we manage to improve the performance cost|
|`__eq` metamethod is called for unrelated metatables|Yes|No|`Fuse` code will respect it but it won't work when used from `Lua` runtimes before `5.3`|
|new generational mode for garbage collection|Partial|In the Work|for `Fuse` it depends on the target runtime, and will only work when targeting `Lua 5.4`, `Luau` is also working on implementing a better GC|
|to-be-closed variables|Unknown|No|we are working on a solution to support it without depending on the language features, but even if pull it off the syntax is going to be different(since we already use macros as attributes like `Rust`)|
|const variables|Yes|No|`Fuse` offers both `const` and `let` keywords as opposed to using attributes with `local` keyword|
|new implementation for `math.random`|Partial|Yes|right now `Fuse` depends on the runtime but to make randoms more consistent across runtimes we are going to replace it in the future with our own `@fuse/math` library|
|optional `init` argument to `stirng.gmatch`|Future|No||
|new functions `lua_resetthread` and `coroutine.close`|Unknown|Yes||
|string-to-number coercions moved to the string library|Maybe|No||
|new format `%p` in `string.format`|No|No||
|utf8 library accepts codepoints up to `2^31`|No|No|if we find enough use cases we will start working on it|
|The use of the `__lt` metamethod to emulate `__le` has been removed|Partial|No|when targeting the `Lua 5.4` it is removed otherwise it is still there for compatibility reasons|
|When finalizing objects, `Lua` will call `__gc` metamethods that are not functions|No|No||
|function `print` calls `__tostring` instead of `tostring` to format its arguments|Yes|Yes||
|decoding functions in the utf8 library do not accept surrogates|Yes|Yes||
