import * as swaggerUI from 'swagger-ui-express';
import { default as swaggerJsDoc } from 'swagger-jsdoc';

import { routes } from '../routes/router';
import { name, version } from '../../package.json';
import * as definition from "../../definitions/public.ts.json"

export async function swagger() {
  const options = {
    definition,
    apis: ['express/routes/*.ts', 'express/routes/*.js'],
  };

  const swaggerDocs = swaggerJsDoc(options as any);
  routes.get('/*', swaggerUI.serve, swaggerUI.setup(swaggerDocs,
    {
      customCss: '.topbar { display: none }',
      customSiteTitle: `${name} [${version}]`,
      customfavIcon: 'https://www.hp.com/content/dam/sites/worldwide/dems/favicons/hp-blue-favicon.png'
      // customfavIcon: "https://brandcentral.hp.com/etc.clientlibs/hp-brand-central/clientlibs/clientlib-site/resources/asset/favicon/favicon.ico", 
    }));
}
