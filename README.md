# OPIMED Platform — Studio v1

Primera implementación funcional del concepto de **OPIMED Studio**: un page builder por bloques para administrar una web de tecnología oftalmológica sin editar HTML/CSS.

## Qué incluye esta versión

- Next.js App Router + TypeScript.
- Home pública con identidad visual OPIMED.
- `/studio` como constructor visual.
- Bloques tipados y reordenables mediante drag & drop nativo.
- Selección de bloque + panel de propiedades.
- Agregar, duplicar, ocultar y eliminar bloques.
- Undo / Redo.
- Preview.
- Draft / Publish local.
- Persistencia de contenido en `localStorage` para el prototipo.
- Hero Multimedia Engine con:
  - imagen o video por slide;
  - autoplay;
  - avance por duración para imágenes;
  - avance natural al terminar video;
  - pausa / reproducción;
  - anterior / siguiente;
  - progreso visual;
  - fallback mobile;
  - `prefers-reduced-motion`.
- Selector de archivo local para probar imágenes y videos desde Studio.
- Design tokens CSS como fuente visual única.

## Arquitectura

```text
Content model
     ↓
Page Builder
     ↓
Block registry
     ↓
Design System
     ↓
Next.js renderer
     ↓
OPIMED.com
```

El editor no genera HTML libre. Los usuarios trabajan con **bloques estructurados** y propiedades controladas por el sistema visual.

## Persistencia del prototipo

El contenido se guarda localmente en el navegador para poder probar el flujo completo sin backend.

La selección de archivos con `blob:` sirve para demostración de UX y es intencionalmente temporal. En producción se sustituirá por **Media Library + CDN + almacenamiento persistente** (por ejemplo, Sanity Assets u otro storage elegido en la fase de arquitectura backend).

## Ejecutar

Requiere Node.js y pnpm.

```bash
pnpm install
pnpm dev
```

Abrir:

- `http://localhost:3000` → Home pública.
- `http://localhost:3000/studio` → OPIMED Studio.

## Próximo sprint

1. Media Library real.
2. Persistencia de páginas en CMS.
3. Draft / Preview / Publish real.
4. Content models de Product, Manufacturer, Specialty, Service y News.
5. SEO por entidad.
6. Auth / roles para el Studio.
7. Versionado y auditoría.
8. Hero Multimedia Engine con CDN de video y `poster` automático.
