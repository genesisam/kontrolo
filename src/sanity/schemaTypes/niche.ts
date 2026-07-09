export const niche = {
  name: 'niche',
  title: 'Landing de Nicho',
  type: 'document',
  fields: [
    { name: 'industryName', title: 'Nombre de la Industria (Nicho)', type: 'string', description: 'Ej: Hostales, Ferreterías' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'industryName', maxLength: 96 } },
    { name: 'industryType', title: 'Tipo de Producto', type: 'string', options: { list: [
      {title: 'PMS', value: 'pms'}, {title: 'POS', value: 'pos'}, {title: 'ERP', value: 'erp'}
    ]} },
    { name: 'seoTitle', title: 'SEO Title', type: 'string' },
    { name: 'seoDescription', title: 'SEO Description', type: 'text' },
    { name: 'heroHeadline', title: 'Hero Headline (H1)', type: 'string' },
    { name: 'heroSubheadline', title: 'Hero Subheadline', type: 'text' },
    { name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } },
    { name: 'clientCount', title: 'Cantidad de Clientes', type: 'string', description: 'Ej: +500 Hostales' },
    { name: 'rating', title: 'Rating Promedio', type: 'string', description: 'Ej: 4.9' },
    {
      name: 'painPoints',
      title: 'Puntos de Dolor (Pain Points)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'painPointItem',
          title: 'Punto de Dolor',
          fields: [
            { name: 'point', title: 'Punto de Dolor', type: 'string' },
            { name: 'icon', title: 'Icono Personalizado (Opcional)', type: 'image', options: { hotspot: true } }
          ]
        }
      ],
      description: 'Lista de 3 a 6 dolores del nicho.'
    },
    {
      name: 'features',
      title: 'Funcionalidades (Features)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'featureTitle', title: 'Título del Feature', type: 'string' },
            { name: 'featureDescription', title: 'Descripción', type: 'text' },
            { name: 'featureImage', title: 'Imagen', type: 'image', options: { hotspot: true } },
            { name: 'isReversed', title: 'Alternar Diseño (Imagen Izquierda)', type: 'boolean', initialValue: false }
          ]
        }
      ]
    },
    {
      name: 'testimonials',
      title: 'Testimonios Destacados',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }]
    },
    {
      name: 'faqs',
      title: 'Preguntas Frecuentes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Pregunta', type: 'string' },
            { name: 'answer', title: 'Respuesta', type: 'text' }
          ]
        }
      ]
    }
  ]
}
