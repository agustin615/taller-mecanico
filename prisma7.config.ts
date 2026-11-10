// Configuración del CLI de Prisma (migraciones, seed y conexión).
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // Las migraciones necesitan conexión directa a Neon.
    // La app usa DATABASE_URL (la versión con pool) para aguantar más tráfico.
    url: env("DIRECT_URL"),
  },
});
