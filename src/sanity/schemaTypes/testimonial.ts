export const testimonial = {
  name: 'testimonial',
  title: 'Testimonio',
  type: 'document',
  fields: [
    { name: 'authorName', title: 'Nombre del Autor', type: 'string' },
    { name: 'authorRole', title: 'Cargo', type: 'string' },
    { name: 'companyName', title: 'Empresa', type: 'string' },
    { name: 'quote', title: 'Testimonio', type: 'text' },
    { name: 'rating', title: 'Puntuación (1-5)', type: 'number', validation: Rule => Rule.min(1).max(5) },
    { name: 'avatar', title: 'Avatar', type: 'image', options: { hotspot: true } },
    { name: 'industryTags', title: 'Etiquetas de Industria', type: 'array', of: [{ type: 'string' }], description: 'Ej: Hostales, Ferreterías, Restaurantes' }
  ]
}
