---
title: Strings
permalink: /docs/strings/
---

There are 2 types of strings in the Fuse language, [string](#string) and [ustring](#ustring); In this section we are going to explore these two variants of string type.

<a name="string" />
### String

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

assert("${str1}, ${str2}!" == "hello world!")
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
escaping still behaves similar to a noraml string.\nAnd in addition to that,
You can also use ${string_interpolation} inside of them.
'''
```

### Raw strings

In addition to the multi-line strings there is also a way to create string literals without any escaping at all!
These string literals are called `raw` strings. We can define them with prefixing the string quotes with(`r`) and an arbitary number of hashes(`#`); How many hashes that are used in the begining of the string also mark its end, Since we do not escape anything inside of an raw string, This is the only way that we can have raw strings that contain `"#` in them.

```fuse
const unescaped1 = r#"I'm a raw string, I don't understand meaning of escaping using a \ character.
I also don't treat "Quotes" and new lines
different than any other characters..."#

const unescaped2 = r##"I'm another raw string,
But I can contain "# inside of me!
"##

const unescaped3 = r###"Yet another raw string,
This one can contain "## in addition to "#
"##
```
__Note__: Raw strings do not support the string interpolation!
