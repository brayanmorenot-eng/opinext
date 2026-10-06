import { defineField, defineType } from 'sanity';

export const page = defineType({
  name: 'page',
  title: 'Página',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título interno', type: 'string', validation: (rule) => rule.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({
      name: 'content',
      title: 'Bloques',
      type: 'array',
      of: [
        { type: 'heroMultimedia' },
        { type: 'solutionGrid' },
        { type: 'brandGrid' },
        { type: 'serviceHighlight' },
        { type: 'newsGrid' },
        { type: 'cta' },
      ],
    }),
  ],
});
