---
title: Strings
permalink: /docs/lang/strings/
---

There are 2 types of strings in the Fuse language, [string](#string) and [ustring](#ustring); In this section, we are going to explore these two variants of the string type.

<a name="string" />
### string

The `string` type holds a sequence of `ASCII` characters and it can be created using single or double quotes.

```fuse
let str1 = "I am a string defined using double quotes."
let str2 = 'I am a string defined using single quotes.'
let str3 = 'You can prefix string delimiters such as \' with a backslash.'
let str4 = "You can prefix string delimiters such as \" with a backslash."
let str5 = "Or you'd use the other string delimiter for it!"
```

### Mutliline strings

Any string in fuse can accept new lines.

```fuse
let text1 = "Hello,
world!
"
let text2 = 'Hello,
world!
'
```

Whitespace characters leading to the next character can be escaped using a `\` character.

```fuse
let text = "Hello, \
              world!"

assert(text == "Hello, world!")
```

This approach is really useful for formatting long strings. We can also add a new line before escaping the leading whitespaces with a `\n`.

```fuse
let text = "Hello, \n\
              world!"
assert(text == "Hello, \nworld!")
```

### String Interpolation

You can put the value of an expression inside of a string using the `${expression}` syntax.

```fuse
let str1 = "hello"
let str2 = "world"

assert("${str1}, ${str2}!" == "hello, world!")
```

### Raw strings

In addition to the string literals mentioned above, There is also a way to create string literals without any escaping at all!
These string literals are called `raw` strings. We can define them by prefixing the string quotes with(`r`) and an arbitrary number of hashes(`#`); How many hashes are used at the beginning of the string also marks its end, Since we do not escape anything inside of an raw string, This is the only way that we can have raw strings that contain `"#` in them.

```fuse
let unescaped1 = r#"I'm a raw string, I don't understand the meaning of escaping using a \ character.
I also don't treat "Quotes" and new lines
differently than any other characters..."#

let unescaped2 = r##"I'm another raw string,
But I can contain "# inside of me!"##

let unescaped3 = r###'Yet another raw string,
This one can contain '## in addition to '#.'###

let unescaped4 = r###'Yet another raw string,
This one can contain '## in addition to '#.'###
```
__Note__: Raw strings do not support the string interpolation!

<a name="ustring" />
### ustring

The `ustring` type behaves identically to a normal `string` except for one key difference; `ustring` can hold any Unicode character and store it using `UTF-8` encoding. Many languages with support for Unicode have opted-in for `UTF-16` encoding(`C#` and `Java` come to mind). The reasoning behind it is that most characters in Unicode will fit in 2 bytes so we will pay less for following each character through the next byte(s). Another reason for this may be that Microsoft products use `UTF-16` as their encoding. So having a language that also works with `UTF-16` would make it easier to communicate with the Windows APIs.
But `UTF-8` is more commonly used in the world of Unix-like operating systems and would have less memory impact in embedded devices.

Unicode string literals start with an `u` but it is completely optional since there is nothing special about a Unicode string literal compared to an ASCII one; The only difference is that string literals starting with an `u` will infer their type to be `ustring`(instead of defaulting to `string` type).
The reason behind this lies in how different string encodings work. They are all just a string of bytes and that's why we call them `string`, So using `UTF-8`, `ASCII`, or any other encoding is in how we deal with these bytes and would have no effect on the literal definition itself.

```fuse
let hello = u"こんにちは"
-- is same as
let hello: ustring = "こんにちは"
-- is same as
let hello = "こんにちは" as ustring
-- is same as
let hello = ustring::from("こんにちは")
```

This rule is also applies to `raw` strings.

```fuse
-- notice that u comes before r
let c = ur#"a "raw"
'string' with \unescaped \characters\"#

let c = ur#'a "raw"
'string' with \unescaped \characters\'#
```

### Concatenation

In Fuse, we can contact any 2 strings together using the addition(`+`) operator, If one of the operands is a number it will implicitly get converted to a string. When concatenating strings with other types the compiler will try to find an implementation of the `Add` trait for that type which satisfies the concatenation otherwise it will produce a syntax error. Learn more on the [Operator Traits](/docs/ops) page.

```fuse
assert_eq("hello" + ", " + "world!", "hello, world!")
assert_eq("i" + 18 + "n", "i18n")
```
