---
title: Structs
permalink: /docs/lang/structs/
---

A `struct` as the name suggests is the definition of a data structure, We can define a structure with the following syntax.

```fuse
struct Color
  r: number
  g: number
  b: number
  a: number
end
```

Initialization of a structure happens using the `T { values }` expression, Where `T` is the type of our structure and named values of the structure placed between curly brackets.

```fuse
const color = Color { r: 1, g: 1, b: 1, a: 1 }
```

If we are initializing the struct using a variable with the same name as it would have as its field, We can omit specifying the field name.

```fuse
const r = 1
const g = 0.32
const alpha
const color = Color { r, g, b: 0.5, alpha: alpha }
```

But now if we try to access our values `x` and `y` through the dot notion we will get an error saying we don't have access to the said variable.

```fuse
assert_eq(color.r, 1) -- this won't compile!
```

It is because in Fuse all fields inside a struct are private, It happens despite the language not having a keyword for describing being private. If we want our fields to be accessible directly from outside of the struct we can declare them using the `pub` keyword.

```fuse
struct Color
  pub r: number
  pub g: number
  pub b: number
  pub a: number
end

const color = Color { r: 1, g: 0.5, b: 0.1, a: 0.9 }

-- now these lines would compile fine.
assert_eq(color.r, 1)
assert_eq(color.g, 0.5)
assert_eq(color.b, 0.1)
assert_eq(color.a, 0.9)
```

### Implementing a struct

Having data by itself is a really powerful tool but in some situations, we need to associate some functionalities to our structure, These associated functions or `method`s can be implemented for a struct using an `impl` block.

Methods can optionally receive a `self` variable as their first parameter, This variable implicitly has the same type of structure it is being implemented for; If a method doesn't accept a self variable it is considered a `static` method.

Here is an example of implementing the `set_opacity` method for our `Color` structure.

```fuse
impl Color
  pub fn set_opacity(self, opacity: number) -> ()
      -- clamping alpha between 0 and 1
      self.a = math::min(math::max(opacity, 0), 1)
  end
end

-- ...

color.set_opacity(0.5)
```

Structures in Fuse don't have an explicit constructor and `new` keyword, Instead similar to Lua we can create a static method to our structure called `new` which can initialize and return a new instance of our struct.

```fuse
impl Color
  pub fn new(r: number, g: number, b: number, a: number) -> Self
    Self { r, g, b, a }
  end
end

-- ...

const color = Color::new(0.3, 0.3, 0.3, 1)
```

__Note__: Type `Self` is an alias for the type of our target structure.

If we want to have multiple constructors for a type we can add more static methods to do so, There is no rule on naming constructors but as a convention, we name our main constructor `new` and any constructor that will initialize our structure for a specific scenario will start with `new_` for example a constructor for that would initialize a `Color` with `Hexadecimal` values could be called `with_hex` or `with_hexadecimal`.

```fuse
impl Color
  pub fn with_hexadecimal(value: string) -> Self
    -- implementation details...
  end
end
```
