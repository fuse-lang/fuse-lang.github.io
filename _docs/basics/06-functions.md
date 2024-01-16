---
title: Functions
permalink: /docs/functions/
description: Functions
---

Functions are the most essential building block of Fuse, Since you can create anything even numbers using functions alone. As mentioned earlier in the introduction, We treat functions just like every other values; They can be assigned to variables, Passed to functions as arguments or get returned from another function.

There any many different ways to describe a function in Fuse, But wether it is a local function, a function exported from another module, a struct or trait method, even a function imported from a Lua library they are all first-class types and will follow the same rules.

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

A function can return either one or many values. Functions without a return statement will implicitl return a Unit(`()`) value. If a return type isn't provided the compiler will assume the return type to be `()`.

```fuse
fn fun()
  print("functions are fun!")
end
-- or be explicit
fn fun(): ()
  print("functions are fun!")
  return ()
end
```

__Note__: Unit is just a tuple with no values, Since any tuple without a value is equal to any other empty tuple therefore at any time there can only exist one of such tuples. This can also explain the reason behind the syntax of `Unit`.

Alternatively a function with only a single line of body can be expressed using the following syntax.

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

A function can accept zero, one or many parameters.

```fuse
fn sum(a: number, b: number): number => a + b

assert_eq(sum(10, 20), 30)
```

Function parameters can have a default value which means they are not required to be passed in. The default value must be compile time constant.

```fuse
fn lerp(v0: number, v1: number, t: number = 1): number
  return v0 + t * (v1 - v0)
end

assert_eq(lerp(0, 100), 100)
assert_eq(lerp(0, 100, 0.5), 50)
```

If a parameter with a default value proceeds a parameter with no default, The only way to use the default value is to call the function with named arguments.

```fuse
fn greeting(greet: string = "Hello", name: string)
  print("${greet}, ${name}!")
end

greeting(name: "Sam")
```


### Function Type Expression
