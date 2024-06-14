import { default as express } from 'express';
import { routes } from './routes';
import { swagger } from "./openapi/swagger"

export async function App() {
  const server = express();
  server.use(express.json());
  server.use(routes);
  await swagger();
  return server;
}
