import { App } from "./express/app";

const port = 3333;
App().listen(port);
console.log(`Express.js server started 🎸 http://localhost:${port}`);
