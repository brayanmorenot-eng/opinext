import { defineField, defineType } from 'sanity';

export const heroMultimedia = defineType({
  name: 'heroMultimedia',
  title: 'Hero multimedia',
  type: 'object',
  fields: [
    defineField({ name: 'brand', title: 'Fabricante', type: 'string' }),
    defineField({ name: 'product', title: 'Producto', type: 'string' }),
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
    defineField({ name: 'desktopMedia', title: 'Media desktop', type: 'file', options: { accept: 'image/*,video/mp4,video/webm' } }),
    defineField({ name: 'mobileImage', title: 'Imagen móvil / fallback', type: 'image' }),
    defineField({ name: 'imageDurationMs', title: 'Duración imagen (ms)', type: 'number', initialValue: 7000 }),
    defineField({ name: 'ctaLabel', title: 'Texto CTA', type: 'string', initialValue: 'Descubrir producto' }),
    defineField({ name: 'ctaHref', title: 'Destino CTA', type: 'url' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'brand' },
  },
});
