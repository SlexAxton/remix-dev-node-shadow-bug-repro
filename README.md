# PNPM Workspace w Remix and esbuild

This repo tries to minimally reproduce a bug that causes vite dev mode to fail with remix when esbuild is used in a separate place in the workspace.

```sh
pnpm install
pnpm run -r dev
```

If you remove the `other-package` folder and run `pnpm run -r dev`, the dev server will start successfully.

