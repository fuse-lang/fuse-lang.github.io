---
title: Traits
permalink: /docs/lang/traits/
---

Traits are the way to do object-oriented programming in the Fuse programming language, They are similar to interfaces in the fact that they enforce a certain representation and set of methods on our objects. A `trait` has a key difference with an interface and that is a trait that doesn't create a type. While both are used interchangeably we should keep in mind that traits are a compile-time concept and will get copied instead of inherited.

We can define a trait this way:

```fuse
trait Pet
  fn name(self) -> string
  fn birthday(self) -> Date
  fn play(self) -> string
end
```

__Note__: All methods defined in a `trait` are implicitly marked as public.

Now we can create 2 animal types called `Dog` and `Cat`, With the trait `Pet` implemented for them.

```fuse
struct Dog
  name: string
end

struct Cat
  name: string
end

impl Pet for Dog
  fn name(self) => self.name

  fn play(self)
    '${self.name()} says "Bark"'
  end
end

impl Pet for Cat
  fn name(self) => self.name

  fn play(self)
    '${self.name()} says "Pur"'
  end
end
```

Now that we have 2 structures implementing the same trait we need a way to reference them or pass them into functions as arguments, But if you remember traits don't actually create a type, and therefore we have no knowledge of them at the runtime. However we still can use them as types to refer to a value that implements the said trait, This happens thanks to the dynamic dispatching and garbage collected nature of the language. While the use of a trait is natural for record types such as struct and table, It will force the compiler to box the primitives when they are treated like a dynamic reference type.


```fuse
fn pet(p: Pet)
  print(p.play())
end

let dog = Dog { name: "George" }
let cat = Cat { name: "Amy" }

-- we can pass both the dog and cat as their trait type
pet(dog)
pet(cat)

-- we can also reduce their type and store them as their trait
let my_pet: impl Pet = dog as Pet
```

When we assign a variable to an `impl trait` type we erase the type information about the said object. The only way to retrieve the initial type back is through a cast which doesn't provide compile-time checks.

```fuse
let pet1: impl Pet = dog as Pet
let pet2: impl Pet = cat as Pet

let mut my_dog: Dog = pet1 as Dog -- this will compile and run successfully
my_dog = pet2 as Dog -- this will also compile but will panic at runtime
```
