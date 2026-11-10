import Link from "next/link";
import { notFound } from "next/navigation";
import { actualizarOrden } from "@/app/actions";
import { BotonEliminar } from "@/components/boton-eliminar";
import { FormOrden } from "@/components/form-orden";
import { formatearFecha, formatearMonto } from "@/lib/formato";
import { esEstado, type Orden } from "@/lib/ordenes";
import { prisma } from "@/lib/prisma";

// Lee el id de la URL y la orden desde la base en cada request.
export const instant = false;

export default async function EditarOrden(props: PageProps<"/ordenes/[id]">) {
  const { id } = await props.params;

  // La URL es texto: si alguien entra a /ordenes/abc, no es un id válido.
  const numero = Number(id);

  if (!Number.isInteger(numero) || numero <= 0) {
    notFound();
  }

  const fila = await prisma.orden.findUnique({ where: { id: numero } });

  if (!fila) {
    notFound();
  }

  const orden: Orden = {
    ...fila,
    estado: esEstado(fila.estado) ? fila.estado : "en-espera",
  };

  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-10">
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-800 hover:underline">
        ← Volver a las órdenes
      </Link>

      <h1 className="mt-4 text-2xl font-bold tracking-tight">Orden #{orden.id}</h1>
      <p className="mt-1 text-sm text-slate-500">
        {orden.patente} · {orden.cliente} · ingreso {formatearFecha(orden.ingreso)} ·{" "}
        {formatearMonto(orden.monto)}
      </p>

      <FormOrden accion={actualizarOrden} orden={orden} textoBoton="Guardar cambios" />

      <section className="mt-6 rounded-xl border border-red-200 bg-red-50/40 p-6">
        <h2 className="text-sm font-semibold text-red-800">Eliminar orden</h2>
        <p className="mt-1 mb-4 text-sm text-slate-600">
          Se borra de la base de datos. Esto no se puede deshacer.
        </p>
        <BotonEliminar id={orden.id} patente={orden.patente} />
      </section>
    </main>
  );
}
