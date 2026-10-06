import { defineField, defineType } from 'sanity';

const items = defineField({
  name: 'items', title: 'Elementos', type: 'array', of: [
    { type: 'object', fields: [
      defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
      defineField({ name: 'title', title: 'Título', type: 'string' }),
      defineField({ name: 'text', title: 'Texto', type: 'text', rows: 3 }),
      defineField({ name: 'href', title: 'Enlace', type: 'url' }),
    ] },
  ],
});

export const solutionGrid = defineType({
  name: 'solutionGrid', title: 'Grid de soluciones', type: 'object', fields: [
    defineField({ name: 'title', title: 'Título', type: 'string' }),
    defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
    items,
  ],
});

export const brandGrid = defineType({
  name: 'brandGrid', title: 'Grid de marcas', type: 'object', fields: [
    defineField({ name: 'title', title: 'Título', type: 'string' }),
    defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
    defineField({ name: 'brands', title: 'Marcas', type: 'array', of: [{ type: 'reference', to: [{ type: 'manufacturer' }] }] }),
  ],
});

export const serviceHighlight = defineType({
  name: 'serviceHighlight', title: 'Servicio técnico', type: 'object', fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'title', title: 'Título', type: 'string' }),
    defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 4 }),
    defineField({ name: 'ctaLabel', title: 'CTA', type: 'string' }),
    defineField({ name: 'ctaHref', title: 'Destino', type: 'url' }),
  ],
});

export const newsGrid = defineType({
  name: 'newsGrid', title: 'Grid de novedades', type: 'object', fields: [
    defineField({ name: 'title', title: 'Título', type: 'string' }),
    defineField({ name: 'news', title: 'Novedades', type: 'array', of: [{ type: 'reference', to: [{ type: 'news' }] }] }),
  ],
});

export const cta = defineType({
  name: 'cta', title: 'Call to action', type: 'object', fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
    defineField({ name: 'title', title: 'Título', type: 'string' }),
    defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 3 }),
    defineField({ name: 'ctaLabel', title: 'CTA', type: 'string' }),
    defineField({ name: 'ctaHref', title: 'Destino', type: 'url' }),
  ],
});
