# Taller Ramírez

Sistema de órdenes de trabajo para un taller mecánico.

Construido con **Next.js 16**, **TypeScript** y **Tailwind CSS**.

> Versión 1 (HTML, CSS y JavaScript puro) disponible en el historial de Git.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abrir <http://localhost:3000>.

## Estructura

| Archivo | Qué hace |
|---|---|
| `app/page.tsx` | Pantalla principal: resumen, filtros y tabla de órdenes |
| `app/layout.tsx` | Layout raíz: fuentes, idioma y estilos base |
| `app/globals.css` | Importación de Tailwind y variables de tema |
| `lib/ordenes.ts` | Tipos (`Orden`, `Estado`) y datos de ejemplo |

## Funcionalidad

- Listado de órdenes con patente, cliente, vehículo, servicio, estado y monto.
- Tarjetas de resumen calculadas a partir de los datos.
- Filtro por estado usando la URL (`/?estado=listo`), sin JavaScript en el cliente.

## Próximos pasos

1. Guardar los datos en una base de datos real (Prisma).
2. Crear, editar y eliminar órdenes.
3. Publicarlo online (Vercel) para tener un link en el CV.
