# OPIMED — arquitectura v1

## Capas

```text
Content model
    ↓
Page Builder
    ↓
Block registry
    ↓
Design System
    ↓
Next.js rendering
    ↓
OPIMED.com
```

## Page Builder

Una página es un array ordenado de bloques. Los bloques están tipados y no contienen HTML libre.

Ejemplo conceptual:

```ts
[
  { _type: 'heroMultimedia', ... },
  { _type: 'solutionGrid', ... },
  { _type: 'brandGrid', ... },
  { _type: 'serviceHighlight', ... },
]
```

## Reglas estrictas

- No almacenar HTML generado por el editor.
- No permitir estilos arbitrarios por bloque.
- Usar tokens del Design System.
- Cada producto/fabricante existe una sola vez como entidad de datos.
- Los bloques referencian entidades; no duplican la información.
- Draft/preview/publish deben ser estados separados.
- El media manager debe reutilizar assets existentes.

## Hero Multimedia Engine

Cada slide puede ser `image` o `video` en desktop y tener un fallback independiente para mobile.

El motor debe soportar:

- autoplay controlado
- pausa/reproducción
- anterior/siguiente
- progreso visual
- transición crossfade
- duración por slide para imágenes
- duración natural para videos
- preload solo del siguiente slide
- fallback a imagen
- `prefers-reduced-motion`

## Datos vs presentación

```text
Producto
 ├── fabricante
 ├── nombre
 ├── referencia
 ├── descripción
 ├── especialidades[]
 ├── documentos[]
 └── media[]

HeroSlide
 ├── productRef
 ├── title
 ├── description
 ├── media
 └── cta
```

## Sanity Visual Editing

La arquitectura está preparada para conectarse a Presentation Tool / Visual Editing y page building mediante arrays reordenables.

## Studio v1 local prototype

The `/apps/web` app includes a functional browser-only Page Builder prototype:

- block palette
- block selection and inspection
- drag-and-drop reorder
- add/remove blocks
- undo/redo history
- local draft persistence with `localStorage`
- preview mode
- publish-to-local-draft state
- Hero Multimedia Engine with image/video-capable model, progress, controls, reduced-motion handling and responsive media fallback

This prototype intentionally keeps persistence local until the Sanity project and authentication are connected. The block contracts are kept independent from the renderer so the local state can be replaced by Sanity without changing the visual component API.
