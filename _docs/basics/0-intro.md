---
title: Intro
permalink: /docs/intro/
---

This documentation is structured so that it can be read from top to bottom if you like. Each chapter builds upon what has been introduced previously. We assume the reader is familiar with the overall syntax of Lua and has some basic understanding of programming in general. Any Lua code provided in these examples is handwritten and shouldn't be assumed as the generated Lua result of Fuse code compilation. They are just there for the comparison and don't represent the generated Lua code.

### Hello World

After installing the Fuse you have 2 options to use it, either using `fuse` as your Lua interpreter or compiling your code into pure Lua code with the help of the `fusec` command.
So let's create a file called `hello.fuse`, You can also call it `hello.fu` since Fuse supports both of these file extensions, Now let's write a little hello world program.

```typescript
print("Hello, World!")
```

Now go to the directory containing your file and run the following command.

```
fusec hello.fuse --target 5.1
```

After running this command you can find a new file beside `hello.fuse` called `hello.lua` which now you can execute with any Lua 5.1 interpreter.

Alternatively, you can use this command to execute your fuse file directly.

```
fuse hello.fuse
```

Congratulations you just wrote and ran your first Fuse code!

### Variables

Fuse is a gradually typed language, Historicly languages with strong type systems impose a lot of boilerplate code on the developers. In Fuse, like most modern typed languages you usually don't need to annotate anything to get the benefits of the type system.
This happens thanks to the type inference, The Type of all these variables is determined by their initialization:

```fuse
let name = "Ada Lovelace"
let pi = 3.14
let do_major = ["do", "re", "mi", "fa", "sol", "la", "si", "do"]
let player = {
  health: 70,
  score: 248.3,
  spells: [
    "Fire Breath",
    "Ice Blast",
    "Ice Wall",
    "Master Elements(Passive)",
  ],
}
```

Read-only values can be defined as constants, these values cannot change after the initial assignment.

```fuse
const genre = "Jazz"
const pi = 3.1415
const c = 299792458
const e = 2.7182
```

### Types

Even tho we don't have to explicitly define the types in the examples above, underneath all of them are getting the correct type with type inference.
In Fuse, we annotate types after the variable's name. This style of type annotation lets us push every variable-specific part to the right and keep the left-hand side of our variable definitions cleaner.

Here are some variable definitions with explicit type annotations.

```fuse
const name: string = "Sam"
const max_health: = 100
let score: number | string = 30
score = "Max"
```

As you can see variables can have one or more types, and variables with more than one type in their definition can be used with multiple value types; But reading their value as a specific type needs runtime checks and casting to prevent undesired behaviors.

```fuse
const score: number | string = 30
const score_number: number = score -- Error, Won't compile since may result in type error!
const score_number: number = score as number -- Ok, Since we are explicitly casting to a number.
```

### Functions

Fuse keeps the original syntax of the Lua language with one exception functions like all values are defined in the local scope by default.
Here is a function that will take two `number` and will return a `number`:

```fuse
function sum(a: number, b: number): number
  return a + b
end
```

In addition to that you can also use the `fn` keyword instead of the longer version of it.

```fuse
fn sum(a: number, b: number): number
  return a + b
end
```

For functions with a single expression body, you can omit the `end` keyword and use the `=>` sign to assign the return value of the function.

```fuse
fn sum(a: number, b: number): number => a + b
```

### Conditional Expressions

```fuse
if num > 0  then
  print("Positive")
elseif num < 0 then
  print("Negative")
else
  print("Zero")
end
```

In Fuse `if` also can be used as an expression.

```fuse
const max = if a > b then a else b end
```

### For Loop

```fuse
const fruits = ["apple", "orange", "kiwi", "banana"]
for index, fruit in ipairs(fruits) do
  print(fruit)
end
```

See [For Loop](/docs/loops/)

### While Loop

```fuse
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let index = 1
while index < #numbers do
  print("Number at index ${index} is ${numbers[index]}")
  index += 1
end
```

### Repeat Loop

`repeat` works similarly to a `while` loop but it will always execute the code block before checking the condition of the loop.

```fuse
let num = 1

repeat
  print("num: ${num}")
  num += 1
until num == 10

assert(num == 10)
```

### Infinite Loop

A `repeat` block without any condition will act as an infinite loop.

```fuse
repeat do
  print("This will print forever!")
end
```
You can also achieve the same thing with a `while` loop like this:

```fuse
while true do
  print("This will print forever!")
end
```

### Match Expression

```fuse
fn handle_request(req: Request): string
  match req when
    { status: 200 } then req.body end
    { status } if status >= 400 and status < 500 then "User Error" end
    { status } if status >= 500 and status < 600 then "Server Error" end
    { status: 900 } then "Unknown Error" end
    _ then "Unknown Error" end
  end
end
```

### Comments

```fuse
-- This is a single-line comment

--- This is a documentation comment used to document variables,
--- functions, structs, traits, and libraries. Tools and text editors
--- may treat these comments differently.
```

Right now Fuse doesn't support multiline comments. we may add them back in the future but only if we see a real demand for them.

### Nilable and Nil checks

Fuse by default is a `nil` safe language, We do not let any nil values be passed around. Since `nil` has its own type it is against the type system to assign `nil` to any other types but because of our `type semantic` type system we can explicitly say that a type can also be `nil`.

This function will return `nil` if the user doesn't exist.

```fuse
fn get_user(id: number): User | nil
  -- ...
end
```

When using a value that can be `nil` we always have to check for being `nil`.

```fuse
fn post_login_hooks(data: LoginData)
  const user = get_user(data.uid)

  if user == nil then
    print("User Not Found.")
  else
    print("Hello, ${user.display_name}")
  end
end
```

Or using pattern-matching

```fuse
const message = match user when
  { display_name } then "Hello, ${display_name}" end
  nil then "User Not Found." end
end

print(message)
```

### Imports

To access exposed modules from other libraries use the `import` instruction.

```fuse
-- Importing something from fuse standard library
import io from "@fuse:io"

-- Importing libraries from the Lua path
import name from "path/to/lib"
```

### Collections

Lua comes with a really smart design for implementing both objects and arrays all with the same piece of code. By doing so they have made the interpreter insanely small and portable, For a compiled language like fuse this isn't a goal anymore; After all Fuse will compile into vanilla Lua and won't need anything other than a viable Lua interpreter to run.
Because of these differences in the workflow of Fuse and Lua, We can introduce additional data structures with `Zero Cost Abstraction`. Some of these new data structures are our `collections` module which comes with multiple useful tools in addition to the `table`, Things such as, `Array`, `List`, `Map`, and `Set` among others(see [Fuse Standard Library](/docs/@fuse/)).

```fuse
import { Array, List, Map, Set } from "@fuse:collections"

const array: Array<number> = [1, 2, 3]
const list: List<number> = [1, 2, 3]
const map: Map<string, number> = { "A": 1, "Blue", 42, "Jay": 9 }
const set: Set<string> = { "Just", "The", "Unique", "Entries" }
```

### Struct

Lua's table is the living embodiment of "when you only have a hammer everything is a nail". While this strategy is good keeping the interpreter small won't help with the code readability.

Fuse comes with an explicit syntax to define structures which will use the tables under the hood but will make the definition and implementation much more contained.

Here is a simple `struct`.

```fuse
struct Book
  name: string
  author: string
  pages: number
end

impl Book
  pub fn new(name: string, author: string, pages: number): Self
    return Self { name, author, pages }
  end
end
```

### Trait

In Fuse we value `composition` over `inheritance`, One of the most common tools for providing language-level composition support is `trait`s.
Traits are used to share code between structs. They are in concept similar to `interface`s. Structs and Tables can implement traits; Traits cannot be instantiated and therefore have no fields.

```fuse
trait Weapon
  fn fire(self)
  fn reload(self, magazine: Magazine): boolean
end

struct Riffle
  bullets: number
end

impl Riffle
  const MAX_BULLETS: number = 30

  pub fn new(): Self
    return Self { bullets: MAX_BULLETS }
  end
end

impl Weapon for Riffle
  pub fn fire(self)
    if self.bullets > 0 then
      print("bang!")
      self.bullets -= 1
    else
      print("empty!")
    end
  end

  pub fn reload(self, magazine Magazine): boolean
    print("reloading...")
    self.bullets = Self::MAX_BULLETS
    return true
  end
end
```
