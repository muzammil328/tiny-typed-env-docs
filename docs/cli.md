---
sidebar_position: 3
title: CLI
sidebar_label: CLI
---

# CLI

Validate your environment and generate `.env.example` from the same schema your app uses.

## Setup

Export a `schema` from `env.ts` or `src/env.ts`:

```ts
import { createEnv, s } from "tiny-typed-env/node";

export const schema = {
  DATABASE_URL: s.url(),
  PORT: s.port({ default: 3000 }),
  API_KEY: s.string({ min: 8 }),
};

export const env = createEnv(schema);
```

The CLI looks for `schema` (or a default export that is a schema map). Nested groups are supported.

## Commands

```bash
npx tiny-typed-env check
npx tiny-typed-env example
npx tiny-typed-env example --print
npx tiny-typed-env help
```

| Command | What it does |
|---|---|
| `check` | Load `.env` files, validate against `schema`, exit `1` on failure |
| `example` | Write `.env.example` from schema leaf keys |
| `example --print` | Print the example body to stdout instead of writing a file |

## Options

| Option | Commands | Description |
|---|---|---|
| `--schema <path>` | both | Schema module path (default: auto-discover) |
| `--env-file <path>` | `check` | Load a single `.env` file instead of the default stack |
| `--out <path>` | `example` | Output path (default: `.env.example`) |
| `--print` | `example` | Print to stdout |
| `-h`, `--help` | both | Show help |

## Schema discovery

If you omit `--schema`, the CLI tries (in order):

`env.ts`, `env.mts`, `env.mjs`, `env.js`, `env.cjs`, then the same names under `src/`.

## Notes

- `example` sets `TINY_TYPED_ENV_SKIP_VALIDATION=1` so `createEnv(schema)` in the same file does not fail when secrets are missing.
- Nested group schemas are flattened to leaf env keys in the generated example.
- TypeScript schema files need optional `jiti` (`npm i -D jiti`); `.mjs`/`.js` schemas use native import (faster).
