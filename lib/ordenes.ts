// Tipos y datos de ejemplo del taller.

export type Estado = "en-espera" | "en-reparacion" | "listo" | "entregado";

export type Orden = {
  id: number;
  patente: string;
  cliente: string;
  vehiculo: string;
  servicio: string;
  estado: Estado;
  monto: number;
  ingreso: Date;
};

export const ESTADOS: Record<Estado, string> = {
  "en-espera": "En espera",
  "en-reparacion": "En reparación",
  listo: "Listo",
  entregado: "Entregado",
};

export function esEstado(valor: string): valor is Estado {
  return valor in ESTADOS;
}

// Datos que se cargan la primera vez con `npx prisma db seed`.
// Las fechas van al mediodía UTC para que no se corran de día
// al mostrarlas en distintas zonas horarias.
export const ordenesDeEjemplo: Omit<Orden, "id">[] = [
  {
    patente: "BJDF42",
    cliente: "María Soto",
    vehiculo: "Toyota Yaris 2018",
    servicio: "Cambio de pastillas de freno",
    estado: "en-reparacion",
    monto: 78000,
    ingreso: new Date("2026-11-04T12:00:00Z"),
  },
  {
    patente: "CPRT15",
    cliente: "Juan Pérez",
    vehiculo: "Nissan Versa 2020",
    servicio: "Cambio de aceite y filtro",
    estado: "listo",
    monto: 42000,
    ingreso: new Date("2026-11-03T12:00:00Z"),
  },
  {
    patente: "LKWS88",
    cliente: "Camila Rojas",
    vehiculo: "Hyundai Accent 2016",
    servicio: "Revisión técnica y alineación",
    estado: "en-espera",
    monto: 35000,
    ingreso: new Date("2026-11-05T12:00:00Z"),
  },
  {
    patente: "FGHJ23",
    cliente: "Pedro Muñoz",
    vehiculo: "Chevrolet Sail 2019",
    servicio: "Cambio de batería",
    estado: "entregado",
    monto: 95000,
    ingreso: new Date("2026-11-01T12:00:00Z"),
  },
  {
    patente: "RTYU77",
    cliente: "Ana González",
    vehiculo: "Kia Rio 2021",
    servicio: "Ajuste de motor",
    estado: "en-reparacion",
    monto: 320000,
    ingreso: new Date("2026-11-02T12:00:00Z"),
  },
  {
    patente: "ZXCV12",
    cliente: "Luis Herrera",
    vehiculo: "Suzuki Swift 2017",
    servicio: "Cambio de amortiguadores",
    estado: "en-espera",
    monto: 145000,
    ingreso: new Date("2026-11-05T12:00:00Z"),
  },
];
