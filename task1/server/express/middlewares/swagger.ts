import * as swaggerJsDoc from 'swagger-jsdoc';
import * as swaggerUI from 'swagger-ui-express';
import { routes } from '../routes/router';
import { generateSchemas } from './converter';

export async function init() {
  const options = {
    definition: await generateSchemas(),
    apis: ['**/*.ts'], // files containing annotations
  };

  const swaggerJsDocDefault = (swaggerJsDoc as any).default;
  const swaggerDocs = swaggerJsDocDefault(options);
  routes.get('/*', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
}
