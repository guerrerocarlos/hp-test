import * as express from 'express';
import routes from './routes';
import { init } from "./middlewares/swagger"


export async function App() {
  const server = (express as any).default();
  await init();
  server.use(express.json());
  server.use(routes);
  return server;
}
