import { default as express } from 'express';
import { routes } from './routes';
import { swagger } from "./openapi/swagger"
import cors from 'cors'

export function App() {
  const server = express();
  server.use(cors());
  server.use(express.json());
  server.use(routes);
  swagger();
  return server;
}
