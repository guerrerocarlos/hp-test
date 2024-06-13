import { default as swaggerJsDoc } from 'swagger-jsdoc';
import * as swaggerUI from 'swagger-ui-express';
import { routes } from '../routes/router';
import { generateSchemas } from './converter';
import {name, version } from '../../package.json';

export async function init() {
  const options = {
    definition: await generateSchemas(),
    apis: ['**/*.ts'],
  };

  const swaggerDocs = swaggerJsDoc(options);
  routes.get('/*', swaggerUI.serve, swaggerUI.setup(swaggerDocs,
    {
      customCss: '.topbar { display: none }',
      customSiteTitle: `${name} [${version}]`,
      customfavIcon: 'https://www.hp.com/content/dam/sites/worldwide/dems/favicons/hp-blue-favicon.png'
      // customfavIcon: "https://brandcentral.hp.com/etc.clientlibs/hp-brand-central/clientlibs/clientlib-site/resources/asset/favicon/favicon.ico", 
    }));
}
