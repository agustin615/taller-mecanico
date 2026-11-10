"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { esEstado } from "@/lib/ordenes";
import { prisma } from "@/lib/prisma";

// Se ejecuta en el servidor cuando alguien envía el formulario.
// Valida los datos, guarda la orden y vuelve a la lista.

export async function crearOrden(formData: FormData) {
  const patente = String(formData.get("patente") ?? "").trim().toUpperCase();
  const cliente = String(formData.get("cliente") ?? "").trim();
  const vehiculo = String(formData.get("vehiculo") ?? "").trim() || "Sin especificar";
  const servicio = String(formData.get("servicio") ?? "").trim() || "Sin especificar";
  const estado = String(formData.get("estado") ?? "");
  const monto = Number(formData.get("monto") ?? 0);

  if (!patente || !cliente) {
    throw new Error("La patente y el cliente son obligatorios.");
  }

  if (!esEstado(estado)) {
    throw new Error("El estado no es válido.");
  }

  if (!Number.isFinite(monto) || monto < 0) {
    throw new Error("El monto no es válido.");
  }

  await prisma.orden.create({
    data: {
      patente,
      cliente,
      vehiculo,
      servicio,
      estado,
      monto,
      ingreso: new Date(),
    },
  });

  revalidatePath("/");
  redirect("/");
}
