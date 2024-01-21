---
title: Tables
permalink: /docs/lang/tables/
---

The best way to understand `Table` is to think of it as 2 parts, A sorted `Array` part for indices that have the type of number, And a `HashMap` for everything else.

__Note__: Tables are the native data structures of Lua and while we offer a higher lever more verbose way of defining structures using the `struct` keyword we still need to fall back to a table from time to time. They are an integral part of interacting with the codes written in Lua as they will expect tables and might return one to the caller.


A table can be defined using curly brackets(`{}`).

```fuse
const table: Table = {
  "First Item",
  "Second Item",
  "Third Item",
  "Key1": "Value1",
  "Key2": "Value2",
  "Key3": "Value3", -- notice that we can have trailing commas in our tables
}
```

__Note__: In the example above we have used the type `Table` which is a wide type that can refer to any table or struct type, Alternativly we could specifically type our table using the [Table Type Expression](#type).

We can specify non `string` keys explicitly by surrounding them in brackets.

```fuse
const table = {
  [2] = "Second Element",
  [1] = "First Element",
  [true] = "Element for true",
  [false] = "Element for false",
}
```

### Retrieving Values

You can retrieve values from a table using the `Index` operator(`[]`).

```fuse
assert_eq(table[1], "First Item")
assert_eq(table[2], "Second Item")
assert_eq(table[3], "Third Item")
assert_eq(table["Key1"], "Value1")
assert_eq(table["Key2"], "Value2")
assert_eq(table["Key3"]: "Value3")
```

### Iterators

Tables by default don't implement the `IntoIterator` trait, It means that we can not iterate them similarly to other collections.

```fuse
for value in table do -- Compile error, the table doesn't implement IntoIterator trait
  -- ...
end
```

Similar to Lua we should use `ipairs` to iterate over numeric indices.

```fuse
for (index, value) in Table::ipairs(table) do
  print(value)
end

-- First
-- Second
-- Third
```

__Note__: As you can see items in the array part of our table have been printed in order.

The `ipairs` is a static method of the `Table` type which will return an iterator for the argument table. This iterator would walk through all numeric indices of the table with the same caveats as the `ipairs` function in the Lua interpreters.
If we want to iterate over all key values in our table, We have to use `pairs` in place of the `ipairs` method.

```fuse
for (key, value) in Table::pairs(table) do
  if typeof key == number then
    print('table[${key}] == "${value}"')
  else 
    print('table["${key}"] == "${value}"')
  end
end

-- table[1] == "First"
-- table[2] == "Second"
-- table[3] == "Third"
-- table["Key1"] == "Value1"
-- table["Key3"] == "value3"
-- table["Key2"] == "Value2"
```

__Note__: Notice that the items with indices other than number didn't keep their initial ordering.


<a name="type" />
### Table type expression

We can express the type of a table using a similar syntax to its initialization. For elements with a string key, it is as straightforward as annotating the types of each item like so.

```fuse
const t: { a: string, b: number } = { a: "Hi", b: 42 }
```

For numeric keys we have to wrap the index inside of brackets(`[]`).

```fuse
const t: { [1]: string, [2]: number } = { "Hi", 42 }
```

We can also generalize the type definition of keys with a specific type.

Here is a table that would return a `string` for all of its `number` keys and return a `boolean` for `string` keys.

```fuse
const t: { [number]: string, [string]: boolean } = { "Hi", a: true }
```

The `boolean` keys are also similar to numeric keys and can be defined by surrounding them in brackets.

```fuse
const t: { [true]: string, [false]: string } = { [true] = "TRUE", [false]: "FALSE" }
```

We can define a method in our table type using the function type expression syntax.

```fuse
const t: { sum: fn(number, number) -> number } = { sum: fn(a: number, b: number) => a + b }
```

Expressing the type of a table that contains keys that are not primitive is a little bit more complicated, Let's say we have a table that would map some `Table` types to either a `string` or `number` value, What we can do to represent such table is to map all `Table` types to either `string` or `number` type and then at runtime check for the type of the returned value and act accordingly.

```fuse
const t: { [Table]: string | number } = { [t1] = 42, [t2] = "Hi" }

const elem = t[key]
match typeof elem when
  "string" then handle_string_value(elem as string) end
  "number" then handle_string_value(elem as number) end
  else end
end
```

If in advance we know the type of our `Table` we can further narrow our type, Let's say we only return `string` for the `Table` type and would return a `number` for anything implementing `NumericVal` now we can narrow down our result types down so there is no need for runtime checks.

```fuse
const t: { [Table]: string, [impl NumericVal]: number } = { [t1] = 42, [t2] = "Hi" }

const e1: string = t[table_key]
const e2: number = t[trait_key]
```
