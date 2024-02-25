---
title: Strings
permalink: /docs/lang/strings/
---

There are 2 types of strings in the Fuse language, [string](#string) and [ustring](#ustring); In this section, we are going to explore these two variants of the string type.

<a name="string" />
### string

The `string` type holds a sequence of `ASCII` characters and it can be created using single or double quotes.

```fuse
const str1 = "I am a string defined using double quotes."
const str2 = 'I am a string defined using single quotes.'
const str3 = 'You can prefix string delimiters such as \' with a backslash.'
const str4 = "Or you'd use the other string delimiter for it!"
```

### String Interpolation

You can put the value of an expression inside of a string using the `${expression}` syntax.

```fuse
const str1 = "hello"
const str2 = "world"

assert("${str1}, ${str2}!" == "hello, world!")
```

### Mutliline strings

To create a multi-line string use triple quotes; Both single(`'''`) and double(`"""`) variants work.

```fuse
const text1 = """I'm a multi-line string,
All new lines in this string block are kept as is.
You can even use single quotes (') and double quotes(")
without any escaping!
"""
const text2 = '''I'm a multi-line string,
All new lines in this string block are kept as is.
You can even use single quotes (') and double quotes(")
without any escaping!
'''

const text3 = '''Keep in mind that in these multi-line strings
escaping still behaves similarly to a normal string.\nAnd you can also
use ${string_interpolation} inside of them.
'''
```

### Raw strings

In addition to the multi-line strings, there is also a way to create string literals without any escaping at all!
These string literals are called `raw` strings. We can define them by prefixing the string quotes with(`r`) and an arbitrary number of hashes(`#`); How many hashes are used at the beginning of the string also marks its end, Since we do not escape anything inside of an raw string, This is the only way that we can have raw strings that contain `"#` in them.

```fuse
const unescaped1 = r#"I'm a raw string, I don't understand the meaning of escaping using a \ character.
I also don't treat "Quotes" and new lines
differently than any other characters..."#

const unescaped2 = r##"I'm another raw string,
But I can contain "# inside of me!"##

const unescaped3 = r###'Yet another raw string,
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
const hello = u"こんにちは"
-- is same as
const hello: ustring = "こんにちは"
-- is same as
const hello = "こんにちは" as ustring
-- is same as
const hello = ustring::from("こんにちは")
```

This rule is also applied to `multi-line` and `raw` strings.

```fuse
const a = u"""a multi
line string"""

const b = u'''another multi
line string'''

-- notice that u comes before r
const c = ur#"a "raw"
'string' with \unescaped \characters\"#

const c = ur#'a "raw"
'string' with \unescaped \characters\'#
```

### Concatenation

In Fuse, we can contact any 2 strings together using the addition(`+`) operator, If one of the operands is a number it will implicitly get converted to a string. When concatenating strings with other types the compiler will try to find an implementation of the `Add` trait for that type which satisfies the concatenation otherwise it will produce a syntax error. Learn more on the [Operator Traits](/docs/ops) page.

```fuse
assert_eq("hello" + ", " + "world!", "hello, world!")
assert_eq("i" + 18 + "n", "i18n")
```
