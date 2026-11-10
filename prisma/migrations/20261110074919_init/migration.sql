-- CreateTable
CREATE TABLE "Orden" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patente" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "vehiculo" TEXT NOT NULL,
    "servicio" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "monto" INTEGER NOT NULL,
    "ingreso" DATETIME NOT NULL,
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "Orden_estado_idx" ON "Orden"("estado");
