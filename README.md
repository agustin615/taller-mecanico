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
| `app/ordenes/nueva/page.tsx` | Formulario de nueva orden |
| `app/actions.ts` | Server action que valida y guarda la orden |
| `lib/prisma.ts` | Conexión única a la base de datos |
| `lib/ordenes.ts` | Tipos (`Orden`, `Estado`) y datos de ejemplo |
| `lib/formato.ts` | Formateo de montos y fechas |
| `prisma/schema.prisma` | Modelo de datos |
| `prisma/seed.ts` | Carga inicial de datos |
| `prisma7.config.ts` | Configuración del CLI de Prisma |

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

## Historial

| Versión | Tecnología |
|---|---|
| v1 | HTML, CSS y JavaScript puro (con `localStorage`) |
| v2 | Next.js 16 + TypeScript + Tailwind |
| v3 | Base de datos SQLite con Prisma |

## Próximos pasos

1. Editar y eliminar órdenes.
2. Tests del flujo de creación.
3. Pasar a PostgreSQL y publicarlo en Vercel.
