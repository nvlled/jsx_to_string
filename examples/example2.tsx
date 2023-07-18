// You can use jsx pragma if you don't to use change the values in compilerOptions.

/** @jsx A */
/** @jsxFrag B */

import { h as A, Fragment as B, toString } from "../mod.ts";

console.log(
  toString(
    <>
      hello
      <em>there</em>
    </>
  )
);
