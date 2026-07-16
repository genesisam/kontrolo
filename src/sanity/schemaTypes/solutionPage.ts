import {defineField, defineType} from 'sanity'

export const solutionPage = defineType({
  name: 'solutionPage',
  title: 'Páginas de Soluciones (ERP, POS, PMS)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre Interno de la Página',
      type: 'string',
      description: 'Ej: ERP, POS, PMS',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required()
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
        { name: 'label', title: 'Etiqueta Pequeña', type: 'string' },
        { name: 'headline', title: 'Titular Principal', type: 'string' },
        { name: 'subheadline', title: 'Subtítulo', type: 'text' },
        { name: 'primaryButtonText', title: 'Texto Botón Principal', type: 'string' },
        { name: 'primaryButtonLink', title: 'Enlace Botón Principal', type: 'string' }
      ]
    }),
    defineField({
      name: 'overview',
      title: 'Resumen de Beneficios',
      type: 'object',
      fields: [
        { name: 'caption', title: 'Etiqueta (Caption)', type: 'string' },
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'description', title: 'Descripción', type: 'text' },
        {
          name: 'cards',
          title: 'Tarjetas con Imagen',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'image', title: 'Imagen', type: 'image', options: { hotspot: true } },
                { name: 'title', title: 'Título', type: 'string' },
                { name: 'description', title: 'Descripción', type: 'text' }
              ]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'features',
      title: 'Funcionalidades Destacadas',
      type: 'object',
      fields: [
        { name: 'caption', title: 'Etiqueta (Caption)', type: 'string' },
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'description', title: 'Descripción', type: 'text' },
        {
          name: 'cards',
          title: 'Tarjetas con Icono',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'icon', title: 'Ícono (Emoji o SVG)', type: 'string' },
                { name: 'title', title: 'Título', type: 'string' },
                { name: 'description', title: 'Descripción', type: 'text' }
              ]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'integrations',
      title: 'Integraciones Específicas',
      type: 'object',
      fields: [
        { name: 'caption', title: 'Etiqueta (Caption)', type: 'string' },
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'description', title: 'Descripción', type: 'text' },
        {
          name: 'cards',
          title: 'Tarjetas de Integración',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'image', title: 'Logo (SVG)', type: 'image' },
                { name: 'title', title: 'Título', type: 'string' },
                { name: 'description', title: 'Descripción', type: 'text' }
              ]
            }
          ]
        }
      ]
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonios',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }]
    }),
    defineField({
      name: 'cta',
      title: 'Llamado a la Acción (Final)',
      type: 'object',
      fields: [
        { name: 'caption', title: 'Etiqueta (Caption)', type: 'string' },
        { name: 'title', title: 'Título', type: 'string' },
        { name: 'description', title: 'Descripción', type: 'text' },
        { name: 'buttonText', title: 'Texto Botón', type: 'string' },
        { name: 'buttonLink', title: 'Enlace Botón', type: 'string' }
      ]
    })
  ]
})
