---
sidebar_position: 4
title: API
sidebar_label: API
---

# API

## `tiny-typed-env` (all runtimes)

No `fs`. Pass values yourself. Use this on Cloudflare Workers, Deno Deploy, browsers.

### `loadEnv(schema, options?)`

Validates and returns a typed object. Throws `EnvError` on failure.

```ts
import { loadEnv, s } from "tiny-typed-env";

const env = loadEnv(
  { TOKEN: s.string() },
  { runtimeEnv: process.env },
);
```

### `safeLoadEnv(schema, options?)`

Same validation, but returns a result instead of throwing:

```ts
import { safeLoadEnv, s } from "tiny-typed-env";

const result = safeLoadEnv(
  { TOKEN: s.string() },
  { runtimeEnv: { TOKEN: "" } },
);

if (!result.ok) {
  // result.issues — list of problems
} else {
  // result.data
}
```

### Options

| Option | Default | Description |
|---|---|---|
| `runtimeEnv` | — | Object of string (or undefined) values to validate |
| `emptyAsUndefined` | `true` | Treat `""` as missing |
| `skipValidation` | `false` | Skip checks (Docker/CI builds without real secrets); returns runtime env cast to the typed shape |

Also exported: `s`, `EnvError`, `formatIssues`, `isSecretKey`, `redactIssueMessage`, `parseEnvFile`, `exampleEnv`.

### `exampleEnv(schemaOrKeys)`

Build a `.env.example` body from a schema object or a string list:

```ts
import { exampleEnv, s } from "tiny-typed-env";

exampleEnv({ DATABASE_URL: s.url(), PORT: s.port() });
// DATABASE_URL=
// PORT=

exampleEnv(["DATABASE_URL", "PORT"]);
```

### Secret redaction

Keys matching `API_KEY`, `SECRET`, `TOKEN`, `PASSWORD`, and similar never print the secret value in boot errors—only the failure reason.

---

## `tiny-typed-env/node` (Node + Bun)

Loads env files, then validates.

### Files loaded by default

1. `.env`
2. `.env.local`
3. `.env.[NODE_ENV]` (if `NODE_ENV` is set)
4. `.env.[NODE_ENV].local`

Real environment variables are **not** overwritten (unless `override: true`).

### `createEnv(schema, options?)`

```ts
import { createEnv, s } from "tiny-typed-env/node";

export const env = createEnv({
  DATABASE_URL: s.url(),
});
```

### `loadEnvFile(path?, options?)`

Optional — `createEnv` already loads the default files.

```ts
import { loadEnvFile } from "tiny-typed-env/node";

loadEnvFile(".env");
```

### Node options

| Option | Default | Description |
|---|---|---|
| `envFile` | auto (see above) | Path string, or `false` to skip files |
| `override` | `false` | Let `.env` overwrite existing `process.env` |
| `runtimeEnv` | `process.env` | Source object after files are applied |
| `emptyAsUndefined` | `true` | Treat `""` as missing |
| `skipValidation` | `false` | Skip validation for image builds without real env |

```ts
// Skip .env files entirely
createEnv(schema, { envFile: false });

// Single custom file
createEnv(schema, { envFile: ".env.production" });

// Docker/CI build without secrets yet
createEnv(schema, { skipValidation: process.env.CI === "true" });
```

`createEnv` also re-exports `loadEnv`, `safeLoadEnv`, and `s`.
