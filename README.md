# Taller Ramírez

Sistema de órdenes de trabajo para un taller mecánico.

**Stack:** Next.js 16 · TypeScript · Tailwind CSS · Prisma 7 · SQLite

## Cómo correrlo

```bash
npm install

cp .env.example .env      # en Windows: copy .env.example .env

npx prisma migrate dev    # crea la base de datos
npx prisma db seed        # carga las órdenes de ejemplo
npm run dev
```

Abrir <http://localhost:3000>.

## Estructura

| Archivo | Qué hace |
|---|---|
| `app/page.tsx` | Listado de órdenes, resumen y filtros |
| `app/ordenes/nueva/page.tsx` | Página de nueva orden |
| `app/ordenes/[id]/page.tsx` | Página de edición y borrado |
| `app/not-found.tsx` | Pantalla 404 |
| `app/actions.ts` | Server actions: crear, actualizar y eliminar |
| `components/form-orden.tsx` | Formulario compartido por alta y edición |
| `components/boton-eliminar.tsx` | Botón de borrar con confirmación |
| `lib/prisma.ts` | Conexión única a la base de datos |
| `lib/ordenes.ts` | Tipos (`Orden`, `Estado`) y datos de ejemplo |
| `lib/formato.ts` | Formateo de montos y fechas |
| `prisma/schema.prisma` | Modelo de datos |
| `prisma/seed.ts` | Carga inicial de datos |
| `prisma7.config.ts` | Configuración del CLI de Prisma |
| `scripts/db-studio.mjs` | Abre Prisma Studio (esquiva un bug de Prisma 7) |

## Base de datos

SQLite, en el archivo `dev.db` (no se sube al repositorio).

Para ver y editar los datos con una interfaz gráfica:

```bash
npm run db:studio
```

Abre en <http://localhost:5555>. (Prisma 7.10.1 tiene un bug con la URL de SQLite; el script `scripts/db-studio.mjs` lo esquiva.)

Cuando cambies `prisma/schema.prisma`:

```bash
npm run db:migrate
```

## Cómo funciona el guardado

1. El formulario envía los datos a una **server action** (`app/actions.ts`).
2. La acción valida los datos y los guarda con Prisma.
3. `revalidatePath("/")` refresca el listado y `redirect("/")` vuelve a la tabla.

No hay llamadas a una API: el formulario habla directo con el servidor.

Las tres acciones usan la misma validación (`leerDatos`), así las reglas viven en un solo lugar:

| Acción | Cuándo se usa |
|---|---|
| `crearOrden` | Alta en `/ordenes/nueva` |
| `actualizarOrden` | Edición en `/ordenes/[id]` |
| `eliminarOrden` | Borrado desde `/ordenes/[id]` |

El borrado pide confirmación con `window.confirm`, por eso `components/boton-eliminar.tsx` es el único componente de cliente del proyecto.

## Historial

| Versión | Tecnología |
|---|---|
| v1 | HTML, CSS y JavaScript puro (con `localStorage`) |
| v2 | Next.js 16 + TypeScript + Tailwind |
| v3 | Base de datos SQLite con Prisma |
| v4 | Editar y eliminar órdenes (CRUD completo) |

## Próximos pasos

1. Tests del flujo de creación y edición.
2. Pasar a PostgreSQL y publicarlo en Vercel.
