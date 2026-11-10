-- CreateTable
CREATE TABLE "Orden" (
    "id" SERIAL NOT NULL,
    "patente" TEXT NOT NULL,
    "cliente" TEXT NOT NULL,
    "vehiculo" TEXT NOT NULL,
    "servicio" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "monto" INTEGER NOT NULL,
    "ingreso" TIMESTAMP(3) NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orden_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Orden_estado_idx" ON "Orden"("estado");
