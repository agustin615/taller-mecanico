// Formateo de valores para mostrar en pantalla.

export function formatearMonto(valor: number) {
  return "$" + valor.toLocaleString("es-CL");
}

export function formatearFecha(fecha: Date) {
  return fecha.toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "short",
  });
}
