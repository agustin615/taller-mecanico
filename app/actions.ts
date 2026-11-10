"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { esEstado } from "@/lib/ordenes";
import { prisma } from "@/lib/prisma";

// Se ejecutan en el servidor cuando alguien envía un formulario.
// Validan los datos, tocan la base y vuelven a la lista.

// Lee y valida los campos del formulario.
// Lo usan tanto el alta como la edición: así las reglas viven en un solo lugar.
function leerDatos(formData: FormData) {
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

  return { patente, cliente, vehiculo, servicio, estado, monto };
}

// Lee el id que viene en un <input type="hidden" name="id">.
function leerId(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("La orden no es válida.");
  }

  return id;
}

export async function crearOrden(formData: FormData) {
  const datos = leerDatos(formData);

  await prisma.orden.create({
    data: {
      ...datos,
      ingreso: new Date(),
    },
  });

  revalidatePath("/");
  redirect("/");
}

export async function actualizarOrden(formData: FormData) {
  const id = leerId(formData);
  const datos = leerDatos(formData);

  await prisma.orden.update({
    where: { id },
    data: datos,
  });

  revalidatePath("/");
  revalidatePath(`/ordenes/${id}`);
  redirect("/");
}

export async function eliminarOrden(formData: FormData) {
  const id = leerId(formData);

  await prisma.orden.delete({ where: { id } });

  revalidatePath("/");
  redirect("/");
}
