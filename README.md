# tiny-typed-env docs

Documentation site for [tiny-typed-env](https://www.npmjs.com/package/tiny-typed-env) — a tiny typed environment loader for Node, Bun, Deno, and Workers.

**Live:** [https://tiny-typed-env-docs.vercel.app/docs/](https://tiny-typed-env-docs.vercel.app/docs/)

Built with [Docusaurus](https://docusaurus.io/).

## Docs map

| Page | Content |
|------|---------|
| Introduction | Why tiny-typed-env, quick example |
| Getting Started | Install, first schema |
| CLI | `check`, `example`, options |
| Nested groups | `env.server.*` / `env.public.*` |
| Schema | Full `s.*` helpers (`duration`, `bytes`, …) |
| API | `loadEnv`, `createEnv`, secret redaction |
| External schemas | Zod, Valibot, ArkType |
| Examples | App templates |

Package source: [`tiny-typed-env-npm`](../tiny-typed-env-npm) · GitHub: [muzammil328/tiny-typed-env](https://github.com/muzammil328/tiny-typed-env)

## Local development

```bash
npm install
npm run start
```

Opens a local server with live reload.

## Build

```bash
npm run build
npm run serve
```

Static output goes to `build/`.

## Deploy

This site is hosted on **Vercel**. Push to the docs repo / connected branch to deploy, or:

```bash
npm run build
# then deploy the `build` folder with your Vercel project
```

GitHub Pages (optional):

```bash
USE_SSH=true npm run deploy
# or
GIT_USER=<username> npm run deploy
```
