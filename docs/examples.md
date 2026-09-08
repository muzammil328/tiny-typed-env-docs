---
sidebar_position: 6
title: Examples
sidebar_label: Examples
---

# Examples

## App schema template

Copy into `src/env.ts`:

```ts
import { createEnv, s } from "tiny-typed-env/node";

export const env = createEnv({
  NODE_ENV: s.enum(["development", "test", "production"], {
    default: "development",
  }),
  PORT: s.port({ default: 3000 }),
  DATABASE_URL: s.url(),
  REDIS_URL: s.url({ optional: true }),
  API_KEY: s.string({ min: 1 }),
  DEBUG: s.boolean({ default: false }),
  CORS_ORIGINS: s.csv({ default: [] }),
  FEATURE_FLAGS: s.json<Record<string, boolean>>({ default: {} }),
});

export type Env = typeof env;
```

Then import elsewhere:

```ts
import { env } from "./env.js";

console.log(env.PORT);
```

## Workers / Deno (no `.env` files)

```ts
import { loadEnv, s } from "tiny-typed-env";

export const env = loadEnv(
  {
    API_TOKEN: s.string({ min: 1 }),
    LOG_LEVEL: s.enum(["debug", "info", "warn", "error"], {
      default: "info",
    }),
  },
  {
    // Cloudflare Workers: pass env bindings
    // Deno: Deno.env.toObject()
    runtimeEnv: process.env,
  },
);
```

## Skip files in tests

```ts
import { createEnv, s } from "tiny-typed-env/node";

export const env = createEnv(
  {
    DATABASE_URL: s.url(),
    PORT: s.port({ default: 3000 }),
  },
  {
    envFile: false,
    runtimeEnv: process.env,
  },
);
```
