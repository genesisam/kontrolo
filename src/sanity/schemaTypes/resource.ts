import {defineField, defineType} from 'sanity'

export const resourceType = defineType({
  name: 'resource',
  title: 'Centro de Recursos',
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
      name: 'icon',
      title: 'Ícono SVG (Opcional)',
      type: 'string',
      description: 'Puede ser un componente de ícono o clase.',
    }),
    defineField({
      name: 'resourceType',
      title: 'Tipo de Recurso',
      type: 'string',
      options: {
        list: [
          {title: 'Calculadora interactiva', value: 'calculator'},
          {title: 'Herramienta de IA', value: 'ai-tool'},
          {title: 'Plantilla Descargable', value: 'template'},
          {title: 'Guía / Artículo', value: 'guide'},
          {title: 'Video / Webinar', value: 'video'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'toolId',
      title: 'ID de la Herramienta (React Component)',
      type: 'string',
      description: 'Identificador para montar el componente interactivo (Solo para Calculadoras e IA). Ej: "nomina-colombia".',
      hidden: ({document}) => !['calculator', 'ai-tool'].includes(document?.resourceType as string),
    }),
    defineField({
      name: 'fileAttachment',
      title: 'Archivo Descargable',
      type: 'file',
      options: { storeOriginalFilename: true },
      hidden: ({document}) => document?.resourceType !== 'template',
    }),
    defineField({
      name: 'videoUrl',
      title: 'URL del Video (YouTube/Vimeo)',
      type: 'url',
      hidden: ({document}) => document?.resourceType !== 'video',
    }),
    defineField({
      name: 'category',
      title: 'Categoría Principal',
      type: 'string',
      description: 'Escribe la categoría (ej: "Calculadoras Financieras", "Inteligencia Artificial", "Guías y Documentos")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Etiquetas (Tags)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'resourceTag'}]}],
    }),
    defineField({
      name: 'featured',
      title: '¿Recurso Destacado?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'richTextContent',
      title: 'Contenido / Artículo',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
    }),
    defineField({
      name: 'faqs',
      title: 'Preguntas Frecuentes (FAQs)',
      type: 'array',
      of: [{type: 'faq'}],
    }),
    defineField({
      name: 'relatedResources',
      title: 'Recursos Relacionados',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'resource'}]}],
    }),
    defineField({
      name: 'seo',
      title: 'Configuración SEO',
      type: 'seo',
    }),
  ],
})