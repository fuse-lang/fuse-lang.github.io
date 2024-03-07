---
title: Generic
permalink: /docs/lang/generic/
---

While using things demonstrated until here we can describe almost anything we want using Fuse, There is still a crucial tool missing from our tool belt. At times we want to generalize our types without loss of any type data. One may implement such a thing using a `union`, compound types via type-or(`|`) operator or `unsafe` type.
All these can partially solve our problem or not having a way for generalized types but each of them comes with its own cons.
    1. An `union` needs an extra type definition which also produces redundant type data
    2. The type or operator also needs extra type definition but instead of redundant type data, it erases some information which may cause runtime panics.
    3. An `unsafe` type can be used to make a type that can accept any value, But as a result, it would erase all type information and make our code more error-prone.

A generic type can be used in place of the solutions mentioned above to overcome the limitations of all of them combined, With generics we can define `type parameters` that can be substituted with the desired type by the compiler.

```fuse
fn func<T>(e: T) -> T
  -- ...
end

let n: number = 12345
let m: number = func<number>(n)
-- or use type inference
let m = func(n)
```

__Note__: One of the greatest places to use generic data types is in the collections, All of the collection types in Fuse are implemented using `generic` types.

Fuse allows generic `functions`, `structs`, `traits`, `unions`, `implementations`, `type aliases`, and `tables`, As we have seen earlier a generic function allows the use of type parameters as both parameter type and/or return type; Next, we are going to explore the other generic types.

### Generic structs

We can have generic structs, These structs can have one or more type parameters which then can be used to define their fields.

```fuse
struct Node<T>
  value: T
  children: Node<T>[]
end
```

An `impl` block can also take a type parameter and pass it along to its target type.

```fuse
impl<T> Node<T>
  pub fn new(value: T, children: Node<T>[]) -> Self
    Self { value, children }
  end
end
```

### Generic traits

A generic trait is defined similarly to a generic struct, Type parameters defined in a generic trait can be used for its methods.

```fuse
trait NodeLike<T>
  fn children(self) -> T[]
  fn add_child(self, child: T) -> ()
end
```

Like for structs, we can also define type parameters for an `impl` block which then can be passed into our trait and/or structure.

```fuse
impl<T> NodeLike<T> for Node<T>
  fn children(self) => self.children
  fn add_child(self, child: T) => self.children.add(child)
end
```

### Generic unions

The type `Optional` is a generic union, Here is a simpler version of such type.

```fuse
union Optional<T>
  None
  Some(T)
end
```

Generic unions can be implemented using generic implementations.

```fuse
impl<T> Optional<T>
  fn unwrap(self) -> T
    match self when
      Some(value) then value end
      None then panic() end
    end
  end
end
```

### Generic type aliases and tables

While tables don't actually have a generic type and only can have generic functions it is possible to create a generic representation of table types using generic type aliases.

```fuse
type MyTable<T> = { [T]: string }

let my_table: MyTable<number> = { [1]: "One", [2]: "Two", [3]: "Tree" }
```

Generic type aliases also let us specify some type parameters while keeping others generic.

```fuse
type MyBackend<T, U> = Backend<T, U, Service>
type MySpecificBackend<T> = MyBackend<T, Database>
type MyNonGenericBackend = MySpecificBackend<Router>
```

### Generic constraints

Sometimes having the most generic types doesn't provide as much value as a more narrow type. We can add some constraints to our type parameters to make sure all allowed type parameters have some specific behavior that we would rely on.

Let's say we want a function that only accepts arguments that can be iterated over. We can do this by constraining our type parameter to have an `IntoIterator` trait. This way the compiler makes sure that we are only allowed to pass values that would satisfy such constraint and allows us to use anything implemented in an `IntoIterator` trait.

```fuse
fn loop_and_print<T: IntoIterator>(it: T) -> ()
  for i in it do
    print(i)
  end
end
```

Now we can only pass values that implement the `IntoIterator` trait.

```fuse
let arr = [1, 2, 3]
loop_and_print(arr)
loop_and_print("Hi") -- Error, it won't compile!
```

When we have more than 1 constraint for one type parameter we can use compound types using a type-or(`|`) operator. Let's say in our last example we want to have support for `Iterator` types in addition to types that implement the `IntoIterator` trait. We can implement such a function like this.

```fuse
fn loop_and_print<T: IntoIterator | Iterator>(it: T) -> ()
  for i in it do
    print(i)
  end
end
```

### Default types

A generic type parameter can have a default type, All parameters without a default type should come before the ones with a default value.

```fuse
fn func<T, U, W = number>(a: T, b: U, c: W) -> ()
  -- ...
end
```
