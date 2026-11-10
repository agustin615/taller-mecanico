import Link from "next/link";
import { crearOrden } from "@/app/actions";
import { FormOrden } from "@/components/form-orden";

export default function NuevaOrden() {
  return (
    <main className="mx-auto w-full max-w-2xl px-6 py-10">
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-800 hover:underline">
        ← Volver a las órdenes
      </Link>

      <h1 className="mt-4 text-2xl font-bold tracking-tight">Nueva orden de trabajo</h1>
      <p className="mt-1 text-sm text-slate-500">
        Los datos se guardan en la base de datos del taller.
      </p>

      <FormOrden accion={crearOrden} textoBoton="Guardar orden" />
    </main>
  );
}
