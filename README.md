# jsx_to_string

A typescript library for rendering tsx or jsx into plain HTML string.
This library is intended only for things like static site generators (SSG),
it's _not_ intended things like server-side rendering (SSR) of
React components.

This is written for the deno runtime, but it should work on node
and typescript without any modification.

## Features

- lightweight, no react or vdom
- no class components, only functions
- typesafe HTML elements

## Usage

```tsx
import {
  h,
  toString as jsxToString,
} from "https://deno.land/x/jsx_to_string/mod.ts";
const html = jsxToString(
  <div style={{ backgroundColor: "blue", color: "white" }}>hello</div>
);

console.log(html);
// output: <div style="background-color:'blue'; color:'white'">hello</div>

// import Fragment to use <></>
import { Fragment } from "https://deno.land/x/jsx_to_string/mod.ts";
console.log(
  jsxToString(
    <>
      a b c <span>d</span>
    </>
  )
);
// output: a b c <span>d</span>
```

## Install

First, add these to your tsconfig.json or deno.json:

```json
 "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment"
  }
```

Then pick one of the following installation method.

### Deno

```ts
import { h, toString } from "https://deno.land/x/jsx_to_string/mod.ts";
```

### Node

TODO: create npm package

### Manual

1. Download mod.ts into your typescript project, then rename it to something
   like `jsx_to_string.ts`.
2. Import and use it

```tsx
import { h, toString } from "./jsx_to_string";
```

### Examples

See this [folder](examples/) for more usage examples.

## Credits

This library is based of these two fine libraries:

- https://github.com/preactjs/preact
- https://github.com/dyedgreen/deno-jsx

Much of the code is for the type defintions for the
jsx elements, which is taken from preact. I used deno-jsx
as the base implementation, but I've made a lot of changes
so it's not really much of a fork suitable for merging back.
