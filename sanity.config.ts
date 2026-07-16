import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './src/sanity/schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Kontrolo',
  
  projectId: '41l0h6ji',
  dataset: 'production',

  basePath: '/admin',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Kontrolo CMS')
          .items([
            ...S.documentTypeListItems(),
          ]),
    }),
  ],

  schema: schema,
});
