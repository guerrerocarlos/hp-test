import { default as express } from 'express';
import routes from './routes';
import { init } from "./openapi/swagger"


export async function App() {
  const server = express();
  server.use(express.json());
  server.use(routes);
  await init();
  return server;
}
