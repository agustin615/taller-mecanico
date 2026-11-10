# Taller Ramírez

Pantalla de órdenes de trabajo para un taller mecánico.

Frontend en HTML, CSS y JavaScript puro. Las órdenes se guardan en el
navegador (`localStorage`), así que sobreviven al recargar la página.

## Cómo verlo

```
python servidor.py
```

Después abrir <http://localhost:8123> en el navegador.

El servidor no guarda nada en caché, así que al editar un archivo
basta con recargar la página para ver el cambio.

## Archivos

| Archivo | Qué hace |
|---|---|
| `index.html` | La estructura de la pantalla y el formulario |
| `estilos.css` | Los colores, tamaños y espaciados |
| `semilla.js` | Las 6 órdenes de ejemplo (solo la primera vez) |
| `app.js` | Dibuja la tabla, los filtros y guarda los datos |
| `servidor.py` | Servidor local para ver el proyecto |

## Cómo funciona el guardado

1. Al abrir la página, `app.js` busca las órdenes en `localStorage`.
2. Si no hay nada, usa las de `semilla.js`.
3. Cada vez que se crea una orden, se guarda en `localStorage`.

El botón "restablecer datos de ejemplo" del pie borra lo guardado.

## Próximos pasos

1. Editar y eliminar órdenes
2. Pasar el proyecto a Next.js + TypeScript
3. Guardar en una base de datos real (Supabase) en vez del navegador
4. Publicarlo online para tener un link en el CV
