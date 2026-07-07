import {defineField, defineType} from 'sanity'

export const resourceType = defineType({
  name: 'resource',
  title: 'Recursos Descargables',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Recurso',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción Corta',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagen de Portada',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fileAttachment',
      title: 'Archivo Descargable (PDF, Excel, etc.)',
      type: 'file',
      options: { storeOriginalFilename: true },
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          {title: 'Plantillas Excel', value: 'Plantillas'},
          {title: 'Guías DIAN', value: 'Guias'},
          {title: 'Ebooks', value: 'Ebooks'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
})