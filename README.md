# PNPM Workspace w Remix and esbuild

This repo tries to minimally reproduce a bug that causes vite dev mode to fail with remix when esbuild is used in a separate place in the workspace.

## Repro steps

```sh
pnpm install
pnpm run -r dev

```

Will result in:

```sh
~/code/remix-vanilla-extract-test main
❯ pnpm run -r dev
Scope: 2 of 3 workspace projects
packages/remix-basic-app dev$ remix vite:dev
[23 lines collapsed]
│     at Object.buildOrContext (/Users/alex/code/remix-vanilla-extract-test/node_modules/.pnpm/es…
│     at /Users/alex/code/remix-vanilla-extract-test/node_modules/.pnpm/esbuild@0.20.2/node_modul…
│     at new Promise (<anonymous>)
│     at Object.context (/Users/alex/code/remix-vanilla-extract-test/node_modules/.pnpm/esbuild@0…
│     at Object.context (/Users/alex/code/remix-vanilla-extract-test/node_modules/.pnpm/esbuild@0…
│     at prepareEsbuildOptimizerRun (file:///Users/alex/code/remix-vanilla-extract-test/node_modu…
│   The plugin "vite:dep-pre-bundle" was triggered by this import
│     ../../node_modules/.pnpm/cookie-signature@1.2.1/node_modules/cookie-signature/index.js:5:21:
│       5 │ var crypto = require('crypto');
│         ╵                      ~~~~~~~~
└─ Running...
```

## To make it succeed

If you remove the `other-package` folder and run `pnpm run -r dev`, the dev server will start successfully.

```sh
rm -rf packages/other-package
pnpm install
pnpm run -r dev
```



