import Link from "next/link";
import { formatearFecha, formatearMonto } from "@/lib/formato";
import { ESTADOS, esEstado, type Estado, type Orden } from "@/lib/ordenes";
import { prisma } from "@/lib/prisma";

// Esta página lee el filtro desde la URL (?estado=...) y consulta la base
// de datos en cada request, así que no se prerenderiza como página estática.
export const instant = false;

const FILTROS: { clave: "todas" | Estado; texto: string }[] = [
  { clave: "todas", texto: "Todas" },
  { clave: "en-espera", texto: "En espera" },
  { clave: "en-reparacion", texto: "En reparación" },
  { clave: "listo", texto: "Listo" },
  { clave: "entregado", texto: "Entregado" },
];

const ESTILO_ESTADO: Record<Estado, string> = {
  "en-espera": "bg-slate-100 text-slate-600",
  "en-reparacion": "bg-amber-100 text-amber-700",
  listo: "bg-emerald-100 text-emerald-700",
  entregado: "bg-blue-100 text-blue-700",
};

export default async function Page(props: PageProps<"/">) {
  const { estado } = await props.searchParams;

  const filtro: "todas" | Estado =
    typeof estado === "string" && esEstado(estado) ? estado : "todas";

  const filas = await prisma.orden.findMany({ orderBy: { id: "desc" } });

  const ordenes: Orden[] = filas.map((fila) => ({
    ...fila,
    estado: esEstado(fila.estado) ? fila.estado : "en-espera",
  }));

  const lista = filtro === "todas" ? ordenes : ordenes.filter((o) => o.estado === filtro);

  const abiertas = ordenes.filter(
    (o) => o.estado === "en-espera" || o.estado === "en-reparacion",
  ).length;
  const enReparacion = ordenes.filter((o) => o.estado === "en-reparacion").length;
  const listas = ordenes.filter((o) => o.estado === "listo").length;
  const facturado = ordenes
    .filter((o) => o.estado === "entregado")
    .reduce((suma, o) => suma + o.monto, 0);

  const resumen = [
    { etiqueta: "Órdenes abiertas", valor: String(abiertas) },
    { etiqueta: "En reparación", valor: String(enReparacion) },
    { etiqueta: "Listas para entregar", valor: String(listas) },
    { etiqueta: "Facturado este mes", valor: formatearMonto(facturado) },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Taller Ramírez</h1>
          <p className="text-sm text-slate-500">Órdenes de trabajo</p>
        </div>

        <Link
          href="/ordenes/nueva"
          className="rounded-[10px] bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-800"
        >
          + Nueva orden
        </Link>
      </header>

      <section className="mb-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {resumen.map((item) => (
          <div key={item.etiqueta} className="rounded-xl border border-slate-200 bg-white px-5 py-4">
            <p className="mb-1.5 text-[13px] text-slate-500">{item.etiqueta}</p>
            <p className="text-[26px] font-bold tracking-tight">{item.valor}</p>
          </div>
        ))}
      </section>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold">Órdenes</h2>

          <nav className="flex flex-wrap gap-2">
            {FILTROS.map((op) => {
              const activo = op.clave === filtro;
              return (
                <Link
                  key={op.clave}
                  href={op.clave === "todas" ? "/" : `/?estado=${op.clave}`}
                  className={`rounded-full border px-3 py-1 text-[13px] transition ${
                    activo
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {op.texto}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead className="bg-slate-50/70 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-5 py-2.5 text-left font-semibold">Patente</th>
                <th className="px-5 py-2.5 text-left font-semibold">Cliente</th>
                <th className="px-5 py-2.5 text-left font-semibold">Vehículo</th>
                <th className="px-5 py-2.5 text-left font-semibold">Servicio</th>
                <th className="px-5 py-2.5 text-left font-semibold">Estado</th>
                <th className="px-5 py-2.5 text-right font-semibold">Monto</th>
                <th className="px-5 py-2.5 text-right font-semibold">Ingreso</th>
              </tr>
            </thead>
            <tbody>
              {lista.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-slate-500">
                    No hay órdenes en este estado.
                  </td>
                </tr>
              )}

              {lista.map((o) => (
                <tr key={o.id} className="border-t border-slate-100 hover:bg-slate-50/60">
                  <td className="px-5 py-3.5">
                    <span className="inline-block rounded-md border border-slate-200 bg-slate-100 px-2 py-0.5 font-mono text-xs font-semibold tracking-wider">
                      {o.patente}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-medium">{o.cliente}</td>
                  <td className="px-5 py-3.5 text-slate-500">{o.vehiculo}</td>
                  <td className="px-5 py-3.5 text-slate-500">{o.servicio}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${ESTILO_ESTADO[o.estado]}`}
                    >
                      {ESTADOS[o.estado]}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right font-semibold">
                    {formatearMonto(o.monto)}
                  </td>
                  <td className="px-5 py-3.5 text-right text-[13px] text-slate-500">
                    {formatearFecha(o.ingreso)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="mt-5 text-center text-[13px] text-slate-500">
        Los datos se guardan en SQLite ({ordenes.length} órdenes registradas)
      </p>
    </main>
  );
}
