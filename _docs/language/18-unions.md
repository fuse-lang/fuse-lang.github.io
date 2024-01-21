---
title: Unions
permalink: /docs/lang/unions/
---

A `union` type in Fuse doesn't exactly have the same meaning as its `C-like` counterparts. The `union` types are used to represent `tagged unions` or `ADT`s.

Unions can contain one of many different types, Each union variable comes with a `tag` which would be used at runtime to determine its underlining type.

```fuse
union MyUnion
  VariantA(number)
  VariantB(string)
  VariantC(boolean)
end
```

A union variant can have zero size type like `never`.

```fuse
union MyUnion
  VariantA(never)
  VariantB(number)
  VariantC(string)
  VariantD(boolean)
end
```

If we skip the perantecies for a variant the compiler will implicitly assign a `never` type to it.

```fuse
union MyUnion
  VariantA
  VariantB(number)
  VariantC(string)
  VariantD(boolean)
end
```

### Unions and pattern matching

When we are using a `union` to store a value, It always remembers its original type and that's why we can rely on the compiler to ensure we always exhaustively check all possible variations of the given `union` and act accordingly.

```fuse
match my_union when
  VariantA then end -- do nothing
  VariantB(num) then print(num) end
  VariantC(str) then print(str) end
  VariantD(bool) then print(bool) end
```
