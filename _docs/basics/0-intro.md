---
title: Intro
permalink: /docs/intro/
---

This documentation is structured so that it can be read from top to bottom if you like. Each chapter builds upon what has been introduced previously. We assume the reader is familiar with the overall syntax of Lua and has some basic understanding of programming in general. Any Lua code provided in these examples is handwritten and shouldn't be assumed as the generated Lua result of Fuse code compilation. They are just there for the comparison and don't represent the generated Lua code.

### Hello World

After installing the Fuse you have 2 options to use it, either using `fuse` as your Lua interpreter or compiling your code into pure Lua code with the help of the `fusec` command.
So let's create a file called `hello.fuse`, You can also call it `hello.fu` since Fuse supports both of these file extensions, Now let's write a little hello world program.

```typescript
print("Hello, World!")
```

Now go to the directory containing your file and run the following command.

```
fusec hello.fuse --target 5.1
```

After running this command you can find a new file beside `hello.fuse` called `hello.lua` which now you can execute with any Lua 5.1 interpreter.

Alternatively you can use this command to execute your fuse file directly.

```
fuse hello.fuse
```

Congratulations you just wrote and ran your first Fuse code!

### Variables

Fuse is a gradually typed language, Historicly languages with strong type systems imposed a lot of boiler plate code on the developers. In Fuse like most modern typed languages you usually don't need to anotate anything to get the benefits of the type system.
This happens thanks to the type inference in Fuse, Variables types are determined by their initial values:


```typescript
let name = "Ada Lovelace"
let pi = 3.14
let do_major = ["do", "re", "mi", "fa", "sol", "la", "si", "do"]
let player = {
	health: 70,
	score: 248.3,
	spells: [
		"Fire Breath",
		"Ice Blast",
		"Ice Wall",
		"Master Elements(Passive)",
		],
}
```
