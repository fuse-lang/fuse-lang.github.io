---
title: Welcome
permalink: /docs/home/
redirect_from: /docs/index.html
---

## Getting started

As it is right now Fuse is in the proposal phase, There is a proof of concept compiler in the work, and will get published before the final compiler so people can try the language out. You can check out the [roadmap]({{ baseurl }}/docs/roadmap/) to learn more about the future of this project!

## How can I support this project

After publishing the final compiler everyone can contribute to the source code of Fuse compiler, Until then the only way for contiruting is creating an issue for your suggestions on [this repositoy](https://github.com/fuse-lang/fuse-lang.github.io) so we can discuss adding it into the proposal documentation and in result to this webpage.

## The first taste

### Hello World

##### Fuse

```rust
print("Hello World")
```

##### Lua(it's not the actual compiled code)

```lua
print "Hello World"
```

### Fibonacci

##### Fuse

```rust
fn fibonacci(n: number) -> number
    if n < 2 then 
        return n
    else 
        return fibonacci(n-1) + fibonacci(n-2)
    end
end
```

##### Lua(it's not the actual compiled code)

```lua
local function fibonacci(n)
    if n < 2 then 
        return n
    else 
        return fibonacci(n-1) + fibonacci(n-2)
    end
end
```

### Tables

##### Fuse

```rust
const t = { a: "A", b: "B", c: 3 }

print(t.a)
```

##### Lua(it's not the actual compiled code)

```lua
local t = { a = "A", b = "B", c = 3 }

print(t.a)
```

### Objects

##### Fuse

```rust
struct Person
  name: string
  age: number
end

impl Person
  fn new(name: string, age: number) -> Self
    return Self { name, age }
  end

  fn hi(self)
    print($"Hi, My name is ${self.name} and I'm ${self.age} years old!")
  end
end

const person = Person::new("Sam", 42)
person.hi()
```

##### Lua(it's not the actual compiled code)

```lua
local Person = {}

local function Person:new(name, age)
  return { name = name, age = age }
end

local function Person:hi(p)
  print("Hi, My name is " .. self.name .. " and I'm " .. self.age .. " years old!")
end

local person = Person:new("Sam", 42)
person:hi()
```
