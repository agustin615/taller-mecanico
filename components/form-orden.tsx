import Link from "next/link";
import { ESTADOS, type Orden } from "@/lib/ordenes";

// Formulario compartido por el alta y la edición.
// Si un campo cambia, se cambia acá y listo: no hay dos copias.

const estiloCampo =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/15";

const estiloEtiqueta = "mb-1.5 block text-[13px] font-semibold text-slate-500";

type Props = {
  accion: (formData: FormData) => Promise<void>;
  textoBoton: string;
  orden?: Orden;
};

export function FormOrden({ accion, textoBoton, orden }: Props) {
  return (
    <form
      action={accion}
      className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-2"
    >
      {/* En la edición viaja el id escondido para saber qué fila actualizar. */}
      {orden && <input type="hidden" name="id" value={orden.id} />}

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
          defaultValue={orden?.patente}
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
          defaultValue={orden?.cliente}
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
          defaultValue={orden?.vehiculo === "Sin especificar" ? "" : orden?.vehiculo}
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
          defaultValue={orden?.servicio === "Sin especificar" ? "" : orden?.servicio}
          className={estiloCampo}
        />
      </div>

      <div>
        <label htmlFor="estado" className={estiloEtiqueta}>
          Estado
        </label>
        <select
          id="estado"
          name="estado"
          defaultValue={orden?.estado ?? "en-espera"}
          className={estiloCampo}
        >
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
          placeholder="50000"
          defaultValue={orden?.monto}
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
          {textoBoton}
        </button>
      </div>
    </form>
  );
}
