---
title: Tables
permalink: /docs/tables/
---

The best way to understand `Table` is to think of it as 2 parts, A sorted `Array` part for indices that have the type of number, And a `HashMap` for everything else except `nil` which isn't a valid index.

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
