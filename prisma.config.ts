import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Prisma 7 dropped the Rust query engine in favor of driver adapters —
// the connection URL now lives here instead of in schema.prisma.
// See: https://pris.ly/d/prisma7-client-config
//
// Unlike `next dev`/`next build`, the Prisma CLI does not load .env files
// on its own — `dotenv/config` above loads .env (not .env.local, which is
// reserved for Next's own runtime-only vars) so `env("DATABASE_URL")` can
// resolve when running `prisma generate` / `prisma migrate` directly.
//
// On Vercel, DATABASE_URL is injected directly into process.env during
// the build, so this is purely a local-dev convenience.
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
