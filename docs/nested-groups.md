---
sidebar_position: 4
title: Nested groups
sidebar_label: Nested groups
---

# Nested groups

Organize env vars into typed objects like `env.server.*` and `env.public.*`.

Group names are **only for the typed object**. Leaf keys are still normal environment variables (`process.env.DATABASE_URL`).

## Basic usage

```ts
import { createEnv, s } from "tiny-typed-env/node";

export const env = createEnv({
  server: {
    DATABASE_URL: s.url(),
    API_KEY: s.string(),
  },
  public: {
    APP_URL: s.url(),
  },
});

env.server.DATABASE_URL; // from process.env.DATABASE_URL
env.public.APP_URL;      // from process.env.APP_URL
```

Your `.env` file stays flat:

```bash
DATABASE_URL=https://db.example.com
API_KEY=secret
APP_URL=https://app.example.com
```

## Mix flat keys and groups

```ts
export const env = createEnv({
  server: {
    DATABASE_URL: s.url(),
  },
  public: {
    APP_URL: s.url(),
  },
  PORT: s.port({ default: 3000 }),
});

env.server.DATABASE_URL;
env.public.APP_URL;
env.PORT;
```

Flat schemas from v1 keep working unchanged.

## Rules

- Leaf env keys must be **unique** across groups (you cannot declare `DATABASE_URL` in both `server` and `other`).
- Errors report the **leaf** key name (`DATABASE_URL:`), not `server.DATABASE_URL`.
- `exampleEnv` and the [CLI](./cli) `example` command flatten groups to leaf keys in `.env.example`.
- Deeper nesting is allowed (`server.db.URL` still reads `process.env.URL`).

## With the CLI

```ts
export const schema = {
  server: {
    DATABASE_URL: s.url(),
    API_KEY: s.string(),
  },
  public: {
    APP_URL: s.url(),
  },
};

export const env = createEnv(schema);
```

```bash
npx tiny-typed-env check
npx tiny-typed-env example
# writes:
# DATABASE_URL=
# API_KEY=
# APP_URL=
```
