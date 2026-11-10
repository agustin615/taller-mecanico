// Datos de las órdenes de trabajo.
// Por ahora viven en memoria; en el próximo paso pasan a una base de datos.

export type Estado = "en-espera" | "en-reparacion" | "listo" | "entregado";

export type Orden = {
  id: number;
  patente: string;
  cliente: string;
  vehiculo: string;
  servicio: string;
  estado: Estado;
  monto: number;
  ingreso: string; // fecha en formato AAAA-MM-DD
};

export const ESTADOS: Record<Estado, string> = {
  "en-espera": "En espera",
  "en-reparacion": "En reparación",
  listo: "Listo",
  entregado: "Entregado",
};

export const ordenes: Orden[] = [
  {
    id: 1,
    patente: "BJDF42",
    cliente: "María Soto",
    vehiculo: "Toyota Yaris 2018",
    servicio: "Cambio de pastillas de freno",
    estado: "en-reparacion",
    monto: 78000,
    ingreso: "2026-11-04",
  },
  {
    id: 2,
    patente: "CPRT15",
    cliente: "Juan Pérez",
    vehiculo: "Nissan Versa 2020",
    servicio: "Cambio de aceite y filtro",
    estado: "listo",
    monto: 42000,
    ingreso: "2026-11-03",
  },
  {
    id: 3,
    patente: "LKWS88",
    cliente: "Camila Rojas",
    vehiculo: "Hyundai Accent 2016",
    servicio: "Revisión técnica y alineación",
    estado: "en-espera",
    monto: 35000,
    ingreso: "2026-11-05",
  },
  {
    id: 4,
    patente: "FGHJ23",
    cliente: "Pedro Muñoz",
    vehiculo: "Chevrolet Sail 2019",
    servicio: "Cambio de batería",
    estado: "entregado",
    monto: 95000,
    ingreso: "2026-11-01",
  },
  {
    id: 5,
    patente: "RTYU77",
    cliente: "Ana González",
    vehiculo: "Kia Rio 2021",
    servicio: "Ajuste de motor",
    estado: "en-reparacion",
    monto: 320000,
    ingreso: "2026-11-02",
  },
  {
    id: 6,
    patente: "ZXCV12",
    cliente: "Luis Herrera",
    vehiculo: "Suzuki Swift 2017",
    servicio: "Cambio de amortiguadores",
    estado: "en-espera",
    monto: 145000,
    ingreso: "2026-11-05",
  },
];
