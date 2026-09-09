---
sidebar_position: 2
title: Getting Started
sidebar_label: Getting Started
---

# Getting Started

## Install

```bash
npm install tiny-typed-env
```

Node **18+** is required.

## Quick usage (Node / Bun)

```ts
import { createEnv, s } from "tiny-typed-env/node";

export const schema = {
  DATABASE_URL: s.url(),
  PORT: s.port({ default: 3000 }),
  NODE_ENV: s.enum(["development", "test", "production"], {
    default: "development",
  }),
  DEBUG: s.boolean({ default: false }),
  API_KEY: s.string({ min: 8 }),
};

export const env = createEnv(schema);

env.PORT; // number
env.DATABASE_URL; // string
```

`createEnv` loads `.env` files, then validates. If a variable is missing or invalid, the process **fails at boot**:

```
Invalid environment variables:

  DATABASE_URL: Expected a valid URL
  API_KEY: Must be at least 8 characters

Fix your .env file or the host environment, then restart.
```

Secret-looking keys (`API_KEY`, `TOKEN`, `*_KEY`, …) never print the raw value—only the failure reason.

## CLI

Export `schema` (as above), then:

```bash
npx tiny-typed-env check              # validate env, exit 1 on failure
npx tiny-typed-env example            # write .env.example from schema
npx tiny-typed-env example --print    # print to stdout
```

See [CLI](./cli) for options and discovery rules.

## Choose your entrypoint

| Import | Use when |
|---|---|
| `tiny-typed-env/node` | Node or Bun — loads `.env` files for you |
| `tiny-typed-env` | Deno, Workers, browsers — pass `runtimeEnv` yourself |

## Next

- [CLI](./cli) — validate and generate `.env.example`
- [Nested groups](./nested-groups) — `env.server.*` / `env.public.*`
- [Schema helpers](./schema) — every `s.*` option
- [API reference](./api) — `loadEnv`, `createEnv`, options
- [External schemas](./external-schemas) — Zod, Valibot, ArkType
