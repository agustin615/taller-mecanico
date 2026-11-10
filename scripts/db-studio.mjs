// Abre Prisma Studio con la base de datos local.
//
// ¿Por qué existe este archivo?
// Prisma 7.10.1 tiene un bug: para saber el "protocolo" de la conexión hace
// url.split("://")[0], y como la URL de SQLite es "file:./dev.db" (sin "//"),
// termina creyendo que el protocolo se llama "file:./dev.db" y falla con:
//   "Prisma Studio is not supported for the file:./dev.db protocol"
//
// La solución: pasarle la ruta absoluta en formato "file://C:/ruta/dev.db".
// Cuando Prisma corrija esto, se puede volver a "prisma studio" directo.

import { spawn } from "node:child_process";
import path from "node:path";

const archivo = path.resolve(process.cwd(), "dev.db");
const url = "file://" + archivo.replaceAll("\\", "/");

const proceso = spawn(
  `npx prisma studio --url "${url}" --port 5555`,
  { stdio: "inherit", shell: true },
);

proceso.on("exit", (codigo) => process.exit(codigo ?? 0));
