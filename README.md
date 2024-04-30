# PNPM Workspace with remix and node builtins in independent package

This repo tries to minimally reproduce a bug that causes vite dev mode to fail with remix when esbuild comes across a shadowed node builtin in the node_modules folder.

Typically I'd just *not* use the shadowed node builtin, but since it's a deep transient dependency, there's nothing I can do about it. It also seems like it probably implies something else going wrong.

Node version: `20.12.2`
PNPM version: `9.0.6`

The `remix-app` package in this workspace was created with `npx create-remix@latest`
The `vite-app` package in this workspace was created with `pnpm create vite`

## Repro steps

```sh
pnpm install
pnpm run -r remix-app-dev
```

Will result in:

```sh
❯ pnpm run -r remix-app-dev
Scope: 2 of 3 workspace projects
packages/remix-app dev$ remix vite:dev
[23 lines collapsed]
│     at Object.buildOrContext (/Users/alex/code/vite-dev-node-shadow-repro/node_modules/.pnpm/es…
│     at /Users/alex/code/vite-dev-node-shadow-repro/node_modules/.pnpm/esbuild@0.20.2/node_modul…
│     at new Promise (<anonymous>)
│     at Object.context (/Users/alex/code/vite-dev-node-shadow-repro/node_modules/.pnpm/esbuild@0…
│     at Object.context (/Users/alex/code/vite-dev-node-shadow-repro/node_modules/.pnpm/esbuild@0…
│     at prepareEsbuildOptimizerRun (file:///Users/alex/code/vite-dev-node-shadow-repro/node_modu…
│   The plugin "vite:dep-pre-bundle" was triggered by this import
│     ../../node_modules/.pnpm/cookie-signature@1.2.1/node_modules/cookie-signature/index.js:5:21:
│       5 │ var crypto = require('crypto');
│         ╵                      ~~~~~~~~
└─ Running...
```

## To make it succeed

If you just switch the `other-package` to use the new built in crypto package, instead of the `crypto` npm package, it will succeed.

You can do this by deleting the section of the `package.json` that says:

```json
"dependencies": {
    "crypto": "1.0.1"
},
```

## Using just vite succeeds

If we run the vite only app, we don't experience the same output.

```sh
pnpm install
pnpm run -r vite-app-dev
```

# Why might this be happening?

My guess is that it's something in the remix vite configuration that's causing vite to scan the entire node_modules folder rather than just the package it's in.

But honestly no idea.
