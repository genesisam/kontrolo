import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Título para buscadores (50-60 caracteres).',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Descripción para buscadores (150-160 caracteres).',
    }),
    defineField({
      name: 'ogImage',
      title: 'OpenGraph Image (Social Media)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'string',
      description: 'Palabras clave separadas por comas.',
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL (Opcional)',
      type: 'url',
    }),
  ],
})
