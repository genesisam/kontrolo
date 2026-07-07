import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './src/sanity/schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Kontrolo',
  
  projectId: '41l0h6ji',
  dataset: 'production',

  basePath: '/admin',

  plugins: [structureTool()],

  schema: schema,
});
