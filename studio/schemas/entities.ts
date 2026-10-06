import { defineField, defineType } from 'sanity';

export const manufacturer = defineType({
  name: 'manufacturer', title: 'Fabricante', type: 'document', fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (rule) => rule.required() }),
    defineField({ name: 'logo', title: 'Logo', type: 'image' }),
    defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 4 }),
    defineField({ name: 'website', title: 'Sitio web', type: 'url' }),
  ],
});

export const specialty = defineType({
  name: 'specialty', title: 'Especialidad', type: 'document', fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (rule) => rule.required() }),
    defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 4 }),
    defineField({ name: 'heroImage', title: 'Imagen hero', type: 'image' }),
  ],
});

export const product = defineType({
  name: 'product', title: 'Producto', type: 'document', fields: [
    defineField({ name: 'name', title: 'Nombre', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'reference', title: 'Referencia', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (rule) => rule.required() }),
    defineField({ name: 'manufacturer', title: 'Fabricante', type: 'reference', to: [{ type: 'manufacturer' }] }),
    defineField({ name: 'specialties', title: 'Especialidades', type: 'array', of: [{ type: 'reference', to: [{ type: 'specialty' }] }] }),
    defineField({ name: 'description', title: 'Descripción', type: 'text', rows: 5 }),
    defineField({ name: 'images', title: 'Imágenes', type: 'array', of: [{ type: 'image' }] }),
    defineField({ name: 'documents', title: 'Documentos', type: 'array', of: [{ type: 'file' }] }),
  ],
});

export const news = defineType({
  name: 'news', title: 'Novedad', type: 'document', fields: [
    defineField({ name: 'title', title: 'Título', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (rule) => rule.required() }),
    defineField({ name: 'type', title: 'Tipo', type: 'string', options: { list: ['Innovación', 'Evento', 'Técnico', 'Empresa'] } }),
    defineField({ name: 'excerpt', title: 'Resumen', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Imagen', type: 'image' }),
    defineField({ name: 'publishedAt', title: 'Fecha', type: 'datetime' }),
  ],
});
