import Link from "next/link";
import { crearOrden } from "@/app/actions";
import { ESTADOS } from "@/lib/ordenes";

const estiloCampo =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/15";

const estiloEtiqueta = "mb-1.5 block text-[13px] font-semibold text-slate-500";

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

      <form
        action={crearOrden}
        className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-2"
      >
        <div>
          <label htmlFor="patente" className={estiloEtiqueta}>
            Patente
          </label>
          <input
            id="patente"
            name="patente"
            maxLength={6}
            placeholder="BJDF42"
            required
            className={`${estiloCampo} font-mono uppercase`}
          />
        </div>

        <div>
          <label htmlFor="cliente" className={estiloEtiqueta}>
            Cliente
          </label>
          <input
            id="cliente"
            name="cliente"
            placeholder="Nombre del cliente"
            required
            className={estiloCampo}
          />
        </div>

        <div>
          <label htmlFor="vehiculo" className={estiloEtiqueta}>
            Vehículo
          </label>
          <input
            id="vehiculo"
            name="vehiculo"
            placeholder="Toyota Yaris 2018"
            className={estiloCampo}
          />
        </div>

        <div>
          <label htmlFor="servicio" className={estiloEtiqueta}>
            Servicio
          </label>
          <input
            id="servicio"
            name="servicio"
            placeholder="Cambio de aceite y filtro"
            className={estiloCampo}
          />
        </div>

        <div>
          <label htmlFor="estado" className={estiloEtiqueta}>
            Estado
          </label>
          <select id="estado" name="estado" defaultValue="en-espera" className={estiloCampo}>
            {Object.entries(ESTADOS).map(([valor, texto]) => (
              <option key={valor} value={valor}>
                {texto}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="monto" className={estiloEtiqueta}>
            Monto (CLP)
          </label>
          <input
            id="monto"
            name="monto"
            type="number"
            min="0"
            step="1000"
            placeholder="50000"
            className={estiloCampo}
          />
        </div>

        <div className="mt-2 flex justify-end gap-3 sm:col-span-2">
          <Link
            href="/"
            className="rounded-[10px] border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
          >
            Cancelar
          </Link>
          <button
            type="submit"
            className="rounded-[10px] bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Guardar orden
          </button>
        </div>
      </form>
    </main>
  );
}
