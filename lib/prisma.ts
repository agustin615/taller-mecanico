// Una sola instancia de Prisma para toda la aplicación.
// En desarrollo, Next.js recarga los módulos muchas veces;
// sin este patrón se abrirían conexiones de más.

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function crearCliente() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error("Falta DATABASE_URL en el archivo .env");
  }

  const adapter = new PrismaPg({ connectionString: url });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? crearCliente();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
