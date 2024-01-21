---
title: Enums
permalink: /docs/lang/enums/
---

Enums are defined by a set of named constant values and they are defined like so:

```fuse
enum Season
  Spring
  Summer
  Autumn
  Winter
end
```

We access our constant enum variants with the `::` notation.

```fuse
if season == Season::Spring then
  print("Spring")
elseif season == Season::Summer then
  print("Summer")
elseif season == Season::Autumn then
  print("Autumn")
elseif season == Season::Winter then
  print("Winter")
else
  print("Uknown season!")
end
```

By default enum values are assigned `number` values starting from 1 and counting up integer numbers. We can assign the first enum value 0 and it would start counting from zero.

```fuse
enum Season
  Spring = 0
  Summer -- 1
  Autumn -- 2
  Winter -- 3
end
```

In fact we can assign the first enum variant any integer and it would count from that, We can also assign the values of an enum to any number but after the first explicit assign in the middle of enum we have to assign values to all proceding variants.

```fuse
enum Season
  Spring
  Summer
  Autumn = 2
  Winter -- Compiler error, we need to assign a value to all enum variants after Autumn
end
```

Since enum values can have any number we can also assign fractal numbers to them.

```fuse
enum Season
  Spring = 0.1
  Summer = 0.2
  Autumn = 0.3
  Winter = 0.4
end
```

Enum variants can also have string values.

```fuse
enum Season
  Spring = "spring"
  Summer = "summer"
  Autumn = "autumn"
  Winter = "winter"
end
```

It is also possible to mix enum variant types with both `string` and `number`.

```fuse
enum Season
  Spring = 1
  Summer = "summer"
  Autumn = 3
  Winter = "winter"
end
```
