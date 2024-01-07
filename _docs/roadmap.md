---
title: Roadmap
permalink: /docs/roadmap/
---

- [ ] &nbsp;Proposal
- [ ] &nbsp;Community Feedback
- [ ] &nbsp;Experimental Compiler (Lua `5.1` support only)
- [ ] &nbsp;Community Feedback
- [ ] &nbsp;Standard Library Implementation
- [ ] &nbsp;`jit` and `ffi` support
- [ ] &nbsp;LuaJIT support
- [ ] &nbsp;Macro System
- [ ] &nbsp;Finalize Language Specs
- [ ] &nbsp;Compiler Rewrite
- [ ] &nbsp;First Stable compiler release `0.1.0`
- [ ] &nbsp;Lua `5.2` support
- [ ] &nbsp;Lua `5.3` support
- [ ] &nbsp;Lua `5.4` support
- [ ] &nbsp;Async support
- [ ] &nbsp;Iterative releases until version `1.0.0`
- [ ] &nbsp;Start of rolling releases with version `1.0.0`
- [ ] &nbsp;Start of `LTS` releases

### Community Feedback

At the beginning of the project, we are going to be dependent on community feedback more than ever to create a more suitable language before putting the final specs in cement, As a result after the release of the `Proposal` and `Experimental Compiler` we are going to wait for a while before moving along with the project so we can gather enough feedback from the community and improve the initial design of the language.

### Fuse Standard Library

The `Fuse` standard library is going to be shipped after the first compiler release itself, Because of this the initial compiler is limited to the use of `Lua 5.1` features and third-party libraries.
In the later releases, we are going to change this and introduce the `@fuse` namespace for the standard library; as a result even tho it is not included in the initial build, it is going to be reserved anyway. Right now we are not going to allow users to import any other module called `@fuse` but if we find enough demand for it we may add the ability to configure the `Fuse` to use a user-defined alias for it.

### Support for jit

For `jit` support we are going to start abstract without leaning too heavily towards `LuaJIT`, This way we can implement `jit` support in a way that we can reuse later on to support other runtimes with `jit` support. But as it is right now there is no viable option for `jitted lua` other than `LuaJIT` so we are keeping a close eye on the feature set of `LuaJIT` and may even make compromises to make it work better in the `LuaJIT` context.
