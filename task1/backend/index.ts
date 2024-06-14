import { App } from './express/app';

const port = 3333
App().then(server => {
  server.listen(port)
  console.log(`Express.js server started 🎸 http://localhost:${port}`);
});