// Carga las órdenes de ejemplo en la base de datos.
// Se ejecuta con: npx prisma db seed

import { ordenesDeEjemplo } from "../lib/ordenes";
import { prisma } from "../lib/prisma";

async function main() {
  const cantidad = await prisma.orden.count();

  if (cantidad > 0) {
    console.log(`Ya hay ${cantidad} órdenes en la base, no se carga nada.`);
    return;
  }

  for (const orden of ordenesDeEjemplo) {
    await prisma.orden.create({ data: orden });
  }

  console.log(`Se cargaron ${ordenesDeEjemplo.length} órdenes de ejemplo.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
