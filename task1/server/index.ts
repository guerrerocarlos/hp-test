import { App as ExpressApp } from './express/app';

const port = 3333
ExpressApp().then(server => {
  server.listen(port)
  console.log(`Express.js server started 🎸 http://localhost:${port}`);
});