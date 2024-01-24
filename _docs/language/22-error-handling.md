---
title: Error Handling
permalink: /docs/lang/error-handling/
---

In Fuse we do not like code that may raise an unexpected error, That's why we try to push errors to the type system. To achieve such a goal we are using `Result` and `Optional` types instead of `throw` and `nil`; There is also a `try` expression which in itself is very very similar to the `try ... catch` pattern but because of special type treatment we can mark functions that can throw and enforce error handling for any function.

### Result

The `Result` union is used to return the result of an explicit error. It can either be `Ok` or `Err`.

```fuse
fn network_call(url: string) -> Result<string>
  if not validate_url(url) then
    return Err("Invalid URL")
  elseif not ping(url) then
    return Err('Failed to ping the "${url}"')
  end

  Ok(fetch(url))
end
```

__Note__: Notice that we do not need to annotate the full name of `Err` and `Ok`(eg: `Result<string>::Ok`) since they both have global aliases by default.

A `Result` then can be used to lift the value, It is possible either by an `unwrap` operation or the use of pattern matching.

```fuse
const result = network_call(url)
-- ...
if result.is_ok() then
  print(result.unwrap())
else
  print(result.err())
end
-- or
print(result.unwrap_or("default value"))
-- or
match result when
  Ok(r) then print(r) end
  Err(e) then print(e) end
end
```

There are more ways to perform a lift operation on a `Result`, Learn more about it in the reference for `Result` type.

### Optional

There are times when we want to define a function that may or may not return a value due to a runtime error, a check failure, or some other documented behavior. The `Optional` type describes this exact situation as a type. An `Optional` value is similar to a value that can either be a `nil` or a value, It is compiled to the same thing we just have extra type information for the compiler so it can reason about `nilable` values easier.

__Note__: The Optional type is also known as `Option`, `Maybe`, and `Nullable` in other programming languages.

```fuse
fn load_config() -> Optional<Config>
  if config_exists() then
    Some(read_config())
  else
    None
  end
end
```

It can get unwrapped just like a `Result` value.

```fuse
const opt = load_config()

if opt.is_some() then
  print(opt.unwrap())
else
  print("No config!")
end
-- or
print(opt.unwrap_or("No config!"))
-- or
match opt when
  Some(conf) then print(conf) end
  None then print("No config!") end
end
```

### Try expression

All of the Fuse libraries are created using the solutions mentioned above. We still allow `unsafe` functions in our code, By default all modules imported from the Lua path(`@lua`) are imported as `unsafe` unless they have a type definition(`declare`) that defines them as otherwise.

We can call these unsafe functions by putting a `try` keyword before them.

```fuse
unsafe fn unsafe_func()
  -- ...
end

fn safe_func()
  try unsafe_func() -- OK
  unsafe_func() -- Compiler Error
end
```

The `try` is an expression which means there is no `try ... catch` system, It will try to execute the expression and if it throws an error it will trap that and return the value or error as a `Result` union.

```fuse
unsafe fn unsafe_func(x: unsafe, y: number) -> number
  -- ...
end

fn safe_func()
  const result: Result<number> = try unsafe_func()
end
```

A try block can also be used to execute multiple `unsafe` operations.

```fuse
fn safe_func()
  const result: Result<number> = try do
    const a = unsafe_func1()
    const b = unsafe_func2()
    a + b
  end
end
```

__Note__: Using a try block in situations where the specific error origin isn't important is a better choice for performance.


If we don't `try` an unsafe function similar to `async-await` we have to also mark our function as `unsafe` so somewhere higher up the function chain we finally try everything together.


```fuse
unsafe fn a()
  -- ...
end

unsafe fn b()
  -- ...
end

unsafe fn c()
  a + b
end

unsafe fn d()
  const value = c()
  const a = a()
  const b = b()
  (a, b, c)
end

fn safe_func()
  const (a, b, c) = try d()
end
```
