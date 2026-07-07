import { createClient } from '@sanity/client'
import fs from 'fs'

const client = createClient({
  projectId: '41l0h6ji',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-01-01',
  token: 'skxaZ8wXcyc5JTT3P5tj73gx8fEWp6qk5c05eEfMnzIO71hGaVvNHyh7pfWTMH5uneShi9fMck8L3ruaxtZbEwBpsXsUz09oM3QWu77lAsUDvlHj79BQDx7P7sZLukEKMSJ4mSQE9WQREEs6PTR9U52qPgoCASaUCgsyWjGuoaenezGRz7vX'
})

const md = fs.readFileSync('C:/Users/Alex/.gemini/antigravity/brain/5b1b1ac4-c6ac-4668-9be1-402d4721a673/article_dian.md', 'utf8')

const blocks = [];
const lines = md.split('\n');

for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    
    // Ignore meta block
    if (line.startsWith('## Metadatos SEO') || line.startsWith('* **Keyword') || line.startsWith('* **Meta') || line.startsWith('* **URL') || line.startsWith('* **Open Graph') || line === '---' || line.startsWith('- [ ]')) {
        continue;
    }

    if (line.startsWith('# ')) {
        blocks.push({
            _type: 'block',
            style: 'h1',
            children: [{ _type: 'span', text: line.substring(2) }]
        });
    } else if (line.startsWith('## ')) {
        blocks.push({
            _type: 'block',
            style: 'h2',
            children: [{ _type: 'span', text: line.substring(3) }]
        });
    } else if (line.startsWith('### ')) {
        blocks.push({
            _type: 'block',
            style: 'h3',
            children: [{ _type: 'span', text: line.substring(4) }]
        });
    } else if (line.startsWith('* ') || line.startsWith('- ')) {
        blocks.push({
            _type: 'block',
            style: 'normal',
            listItem: 'bullet',
            level: 1,
            children: [{ _type: 'span', text: line.substring(2).replace(/\*\*/g, '') }]
        });
    } else if (line.match(/^\d+\.\s/)) {
        blocks.push({
            _type: 'block',
            style: 'normal',
            listItem: 'number',
            level: 1,
            children: [{ _type: 'span', text: line.replace(/^\d+\.\s/, '').replace(/\*\*/g, '') }]
        });
    } else if (line.startsWith('> [')) {
        continue;
    } else {
        let cleanText = line.replace(/\*\*/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1');
        blocks.push({
            _type: 'block',
            style: 'normal',
            children: [{ _type: 'span', text: cleanText }]
        });
    }
}

const doc = {
  _type: 'post',
  title: 'Guía Definitiva de Facturación Electrónica DIAN (2026)',
  slug: {
    _type: 'slug',
    current: 'guia-facturacion-electronica-dian'
  },
  seoTitle: 'Guía Definitiva de Facturación Electrónica DIAN (2026) | Kontrolo',
  seoDescription: 'Todo lo que necesitas saber sobre la facturación electrónica DIAN en Colombia. Requisitos, plazos, software certificado y cómo evitar sanciones.',
  excerpt: 'La implementación de la facturación electrónica DIAN ha dejado de ser una opción para convertirse en una obligación legal ineludible para miles de empresas, pymes y profesionales independientes en Colombia.',
  body: blocks
}

console.log("Iniciando inyección a Sanity...");
client.create(doc).then((res) => {
  console.log(`¡Éxito! El artículo fue inyectado. ID del documento: ${res._id}`)
}).catch((err) => {
  console.error('Error al inyectar el artículo:', err.message)
})
