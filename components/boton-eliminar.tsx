"use client";

import { eliminarOrden } from "@/app/actions";

// Este es el único componente de cliente del proyecto.
// Existe por una razón concreta: `window.confirm` solo se puede usar en el
// navegador. Sin esto, un clic borraría la orden sin preguntar.
//
// La acción de borrar sigue viviendo en el servidor: acá solo se confirma.

export function BotonEliminar({ id, patente }: { id: number; patente: string }) {
  return (
    <form
      action={eliminarOrden}
      onSubmit={(evento) => {
        const seguro = window.confirm(
          `¿Eliminar la orden de ${patente}? No se puede deshacer.`,
        );

        if (!seguro) {
          evento.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-[10px] border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50"
      >
        Eliminar orden
      </button>
    </form>
  );
}
