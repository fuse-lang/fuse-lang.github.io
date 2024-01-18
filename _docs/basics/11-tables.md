---
title: Tables
permalink: /docs/tables/
---

The best way to understand `Table` is to think of it as 2 parts, A sorted `Array` part for indices that have the type of number, And a `HashMap` for everything else except `nil` which isn't a valid index.

__Note__: Tables are the native data structures of Lua and while we offer a higher lever more verbose way of defining structures using the `struct` keyword we still need to fall back to a table from time to time. They are an integral part of interacting with the codes written in Lua as they will expect tables and might return one to the caller.


A table can be defined using brackets(`{}`).

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

### Iteration

Tables can be iterated in 2 ways, If we only want to iterate over the items with numeric indices we can use the `ipairs` function.

```fuse
for i, value in ipairs(table) do
  print('table[${i}] == "${value}"')
end

-- table[1] == "First"
-- table[2] == "Second"
-- table[3] == "Third"
```

__Note__: As you can see items in the array part of our table have been printed in order.

If we want to iterate over all key values in our table, We have to use `pairs` in place of the `ipairs` function.

```fuse
for key, value in pairs(table) do
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
