---
title: Loops
permalink: /docs/loops/
---

Loops in Fuse are really similar to the ones found in the Lua with a little bit syntax sugar inorder to make them more verstile. In this page we are going over different types of loops in the Fuse language.

### For Loops

The only form of `for` loop in Fuse is what you may know as `foreach` in other languages, It means that even numeric for loops are done with foreach.
We can acheive this with the help of `ranges`, For example this code would print `Looping around` 10 times.

```fuse
for i in 1..10 do
  print("Looping around")
end
```

We can also use the same syntax for looping over any type implementing `Iterator` or `IntoIterator` traits.

```fuse
for item in collection do
  print(item)
end
```

If we want to loop through items with their indeces we should use their `enumerate` iterator which will provide the current index as well as the element.

```fuse
for (index, item) in collection.iter().enumerate() do
  print(index, item)
end
```

__Note__ Current iteration is stored in a `const` variable so we are not allowed to reassign them.

### While Loop

While loops can be used to create custom repeating blocks of code, A `while` loop will check a condition expression and if it is a truthy value it would run the `do` block of code and get backs to checking condition again.

```fuse
while i > 0 do
  i -= 1
end
```

### Repeat Loops

There are 2 variants of `repeat` loop, On it the `repeat {body} until {condition}` syntax which is similar to a `while` loop with one difference; It will first run the body and then checks the conditions so it would always run the body at least one time if the condition isn't satisfied.

```fuse
repeat
  x += 1
until x < 100
```

The other variant is a `repeat {body} end` expression which dosn't have an exit condition and would run infinitly unless developer explicitly `break` out of the loop.

```fuse
repeat
  const dt = delta_time()
  game.update(dt)
end
```

### Break Statement

Break statement is used to terminate execution of a loop. For example given the last repeating loop we can break out of it if `update` method returns false.

```fuse
repeat
  const dt = delta_time()
  if not game.update(dt) then
    break
  end
end
```

__Note__: A `break` statement will only break out of the most inner loop.
