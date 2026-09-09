---
sidebar_position: 5
title: Schema helpers
sidebar_label: Schema
---

# Schema helpers

Use built-in `s` (zero extra packages), or pass Zod / Valibot / ArkType schemas — see [External schemas](./external-schemas).

Empty strings are treated as **missing** by default.

## Helper reference

| Helper | Input examples | Output type |
|---|---|---|
| `s.string()` | `hello` | `string` |
| `s.string({ min, max, pattern })` | | `string` |
| `s.string({ optional: true })` | missing / `""` | `string \| undefined` |
| `s.string({ default: "x" })` | missing | `string` |
| `s.number()` | `"42"` | `number` |
| `s.number({ int: true, min, max })` | | `number` |
| `s.boolean()` | `true`, `1`, `yes`, `on` / `false`, `0`, `no`, `off` | `boolean` |
| `s.enum(["a", "b"])` | `a` | `"a" \| "b"` |
| `s.url()` | `https://x.com` | `string` |
| `s.email()` | `a@b.c` | `string` |
| `s.port()` | `"3000"` | `number` (1–65535) |
| `s.json()` | `'{"a":1}'` | parsed JSON |
| `s.csv()` | `a, b, c` | `string[]` |
| `s.duration()` | `"30s"`, `"5m"`, `"1h"`, `"1500"` | `number` (ms) |
| `s.bytes()` | `"10mb"`, `"1gb"`, `"512"` | `number` (bytes) |

## Common options

Most helpers accept:

- `optional: true` — allow missing / empty → `T | undefined`
- `default: value` — use when missing / empty; output stays required

```ts
import { s } from "tiny-typed-env";

s.string({ min: 8 });
s.string({ optional: true });
s.string({ default: "guest" });

s.number({ int: true, min: 1, max: 100 });
s.port({ default: 3000 });
s.url({ optional: true });
s.enum(["development", "test", "production"], { default: "development" });
s.csv({ default: [] });
s.json<Record<string, boolean>>({ default: {} });
s.duration({ default: "30s", min: 1000 });
s.bytes({ default: "10mb", max: 50 * 1024 * 1024 });
```

## Duration

Parses human units into **milliseconds**:

| Input | Result |
|---|---|
| `"30s"` | `30000` |
| `"5m"` | `300000` |
| `"1h"` | `3600000` |
| `"1d"` | `86400000` |
| `"1500"` / `1500` | `1500` (bare number = ms) |

Units: `ms`, `s`, `m`, `h`, `d`. Also accepts `min` / `max` in milliseconds.

```ts
TIMEOUT: s.duration({ default: "30s" }) // 30000
```

## Bytes

Parses size strings into **bytes** (1024-based):

| Input | Result |
|---|---|
| `"10mb"` | `10485760` |
| `"1gb"` | `1073741824` |
| `"512"` | `512` (bare number = bytes) |

Units: `b`, `kb`/`k`/`kib`, `mb`/`m`/`mib`, `gb`/`g`/`gib`, `tb`/`t`/`tib`. Also accepts `min` / `max` in bytes.

```ts
MAX_UPLOAD: s.bytes({ default: "10mb" }) // 10485760
```

## Nested groups

See the dedicated [Nested groups](./nested-groups) page.

Group names are only for the typed object. Leaf keys are still normal env vars (`process.env.DATABASE_URL`):

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
  PORT: s.port({ default: 3000 }),
});

env.server.DATABASE_URL;
env.public.APP_URL;
env.PORT;
```

Flat schemas keep working. You can mix flat keys and groups. Leaf env keys must be **unique** across groups.

## Boolean parsing

Truthy: `true`, `1`, `yes`, `on`  
Falsy: `false`, `0`, `no`, `off`  
(case-insensitive for the word forms)

## Strings

```ts
s.string({ min: 1, max: 64, pattern: /^[a-z]+$/ });
```
