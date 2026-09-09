---
sidebar_position: 7
title: Zod, Valibot, ArkType
sidebar_label: External schemas
---

# Zod, Valibot, and ArkType

Built-in `s` needs no extra packages. Zod, Valibot, and ArkType are **optional** — install only what you use:

```bash
npm install zod
# or
npm install valibot
# or
npm install arktype
```

All external schemas must support **synchronous** [Standard Schema](https://standardschema.dev) validation.

## Zod

Needs Zod **3.24+** or Zod **4**.

```ts
import { loadEnv } from "tiny-typed-env";
import { z } from "zod";

export const env = loadEnv(
  {
    DATABASE_URL: z.string().url(),
    PORT: z.coerce.number().default(3000),
  },
  { runtimeEnv: process.env },
);
```

## Valibot and ArkType

Same pattern — pass schemas into `loadEnv` (or `createEnv` on Node):

```ts
import * as v from "valibot";
import { type } from "arktype";
import { loadEnv } from "tiny-typed-env";

const env = loadEnv(
  {
    API_KEY: v.string(),
    PORT: type("string.numeric.parse"),
  },
  { runtimeEnv: process.env },
);
```

## Mixing with `s`

You can mix built-in and external schemas in one map:

```ts
import { createEnv, s } from "tiny-typed-env/node";
import { z } from "zod";

export const env = createEnv({
  PORT: s.port({ default: 3000 }),
  DATABASE_URL: z.string().url(),
});
```
