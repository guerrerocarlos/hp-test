import { App } from './express/app';

const port = 3333
App().then(server => {
  server.listen(port)
  console.log(`Server started on port ${port}!`);
});