import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Standard Next.js singleton pattern: reuse the client across hot reloads
// in dev, and across warm serverless invocations in production, instead
// of opening a new database connection (and adapter/pool) on every module load.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prisma 7 uses driver adapters instead of the bundled Rust query engine —
// the connection string is passed to the adapter, not the client.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
