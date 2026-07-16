import {defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Página de Inicio (Home)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título Interno',
      type: 'string',
      initialValue: 'Página de Inicio',
      readOnly: true,
    }),
    defineField({
      name: 'seo',
      title: 'Configuración SEO',
      type: 'seo',
    }),
    defineField({
      name: 'hero',
      title: 'Sección Hero',
      type: 'object',
      fields: [
        { name: 'headline', title: 'Titular Principal', type: 'string' },
        { name: 'subheadline', title: 'Subtítulo', type: 'text' },
        { name: 'primaryButtonText', title: 'Texto Botón Principal', type: 'string' },
        { name: 'secondaryButtonText', title: 'Texto Botón Secundario', type: 'string' },
      ]
    }),
    defineField({
      name: 'trustedBy',
      title: 'Texto Confianza (Logos)',
      type: 'string',
    }),
    defineField({
      name: 'problems',
      title: 'Sección Problemas',
      type: 'object',
      fields: [
        { name: 'title', title: 'Título de la Sección', type: 'string' },
        { name: 'description', title: 'Descripción Corta', type: 'text' },
        {
          name: 'problemCards',
          title: 'Tarjetas de Problemas',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'icon', title: 'Ícono (Emoji o SVG)', type: 'string' },
                { name: 'title', title: 'Título', type: 'string' },
                { name: 'description', title: 'Descripción', type: 'text' },
              ]
            }
          ]
        },
        { name: 'bottomText', title: 'Texto Inferior', type: 'string' }
      ]
    }),
    defineField({
      name: 'benefits',
      title: 'Sección Beneficios',
      type: 'object',
      fields: [
        { name: 'caption', title: 'Etiqueta (Caption)', type: 'string' },
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'description', title: 'Descripción', type: 'text' },
      ]
    }),
    defineField({
      name: 'cta',
      title: 'Sección Llamado a la Acción (Final)',
      type: 'object',
      fields: [
        { name: 'caption', title: 'Etiqueta (Caption)', type: 'string' },
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'description', title: 'Descripción', type: 'text' },
        { name: 'socialProof', title: 'Texto Prueba Social (Estrellas)', type: 'string' }
      ]
    })
  ]
})
