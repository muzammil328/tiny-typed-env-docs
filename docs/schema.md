---
sidebar_position: 3
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
```

## Boolean parsing

Truthy: `true`, `1`, `yes`, `on`  
Falsy: `false`, `0`, `no`, `off`  
(case-insensitive for the word forms)

## Strings

```ts
s.string({ min: 1, max: 64, pattern: /^[a-z]+$/ });
```
