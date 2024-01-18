---
title: Functions
permalink: /docs/functions/
---

Functions are the most essential building block of Fuse Since you can create anything even numbers using functions alone. As mentioned earlier in the introduction, We treat functions just like every other value; They can be assigned to variables, Passed to functions as arguments, or returned from another function.

There any many different ways to describe a function in Fuse, But whether it is a local function, a function exported from another module, a struct or trait method, or even a function imported from a Lua library they are all first-class types and will follow the same rules.

### Function Declaration

In Fuse we can declare a function using either `function` or its shorter version `fn` keywords.

```fuse
function fun()
  print("functions are fun!")
end
-- or
fn fun()
  print("functions are fun!")
end
```

A function can return exactly one value. Functions without a return statement will implicitly return a Unit(`()`) value. If a return type isn't provided the compiler will try to infer the return type from the first returning branch of function otherwise will assume the return type to be `()`.

```fuse
fn fun()
  print("functions are fun!")
end
-- or be explicit
fn fun() -> ()
  print("functions are fun!")
  return ()
end

fn fun() -> string
  return "functions are fun!"
end
```

Fuse supports the concept of tuples which can be used in place of multiple return values. By doing so in addition to having a more concrete type signature for these functions we also get to keep all return values in one place instead of immediately breaking them into the individual return values.

```fuse
fn fun() -> (string, number, boolean)
  return ("value", 42, true)
end
-------------------------------------
const result = fun()
const str, num, bool = result
-- or assign them directly
const str, num, bool = fun()
```

The return statement will implicitly wrap the return values in a tuple type if needed.

```fuse
fn fun() -> (string, number, boolean)
  return "value", 42, true
end
```

__Note__: Unit(`()`) is just a tuple with no values, Since any tuple without a value is equal to any other empty tuple therefore at any time there can only exist one of such tuples. This can also explain the reason behind the syntax of `Unit`.

Tuples that are immediately expanded will optimize away in runtimes with support for multiple return values. Learn more about [Tuples](/docs/tuples).


Functions with only a single line of body can be expressed using the following syntax.

```fuse
fn fun() => print("functions are fun!")
```

### Function Usage

In Fuse functions are called using parantecies, Unlike Lua we do not allow omitting these parantecies.

```fuse
get_user()
```

A method can be accessed using a dot(`.`) notation.

```fuse
get_user().username()
```

#### Parameters

A function can accept zero, one, or many parameters.

```fuse
fn sum(a: number, b: number) -> number => a + b

assert_eq(sum(10, 20), 30)
```

Function parameters can have a default value which means they are not required to be passed in. The default value must be compile-time constant.

```fuse
fn lerp(v0: number, v1: number, t: number = 1) -> number
  return v0 + t * (v1 - v0)
end

assert_eq(lerp(0, 100), 100)
assert_eq(lerp(0, 100, 0.5), 50)
```

We can also pass arguments using their names, It can be extremely useful when we have a lot of `nil` and `boolean` arguments which can make it hard to read.

```fuse
fn configure(
  backend: Backend,
  enable: boolean,
  service: Service | nil,
  api_key: string | nil,
  policies: Policy[] | nil = nil,
  formatter: Formatter | nil = nil,
  options: AdditionalOptions | nil = nil
  development_mode: boolean = false,
  serialization_type: SerializationType = SerializationType.Binary)
  -- function magic happens here!
end

-- ...

-- calling without named parameters
configure(my_backend, true, my_service, nil, nil, nil, nil, false, SerializationType.Json)
-- calling with named parameters
configure(
  my_backend,
  enable: true,
  my_service,
  api_key: nil,
  serialization_type: SerializationType.Json)
```

__Note__: While it is not necessary to name all arguments, after omitting the first parameter with default value you have to name all subsequent arguments.

If a parameter with a default value proceeds a parameter with no default, The only way to use the default value is to call the function with named arguments.

```fuse
fn greeting(greet: string = "Hello", name: string)
  print("${greet}, ${name}!")
end

greeting(name: "Sam")
```

### Closures

In Fuse, closures are defined using the exact syntax for functions but omitting the name.

```fuse
const closure = fn(a: number, b: number): number => a + b
```

While it may look like an anonymous function in other languages it is in fact a true closure that can capture values from its scope and also be inlined directly in the call site.

```fuse
fn lcg(seed: number)
  const a = 1140671485
  const c = 128201163
  const m = 2 ^ 24

  let rand = seed
  return fn()
    rand = (a * rand + c) % m
    return rand
  end
end

const random = lcg(1)

assert_eq(random(), 10581448)
assert_eq(random(), 11595892)
assert_eq(random(), 1323120)
assert_eq(random(), 16081019)
```

### Function Type Expression

As we have read earlier, Fuse has first-class support for functions that's why we should be able to talk about the type of function in our code without any extra effort. We can annotate the type of a function with the exact syntax used for creating it.

```fuse
fn fun(a: number, b: number) -> number => a + b

const my_fun: fn(number, number) -> number = fun
```

Since now we have a way of expressing types of functions it is possible to have them as a function parameter or its return type. This notion of higher-order functions enables us to create more declarative programs.

Here's a possible implementation of the `filter` function for numbers.

```fuse
fn filter(nums: number[], predicate: fn(number) -> boolean) -> number[]
  const result: number[] = []

  for i, num in ipairs(nums) do
    if (predicate(num)) then
      result.insert(num)
    end
  end

  return result
end
```
