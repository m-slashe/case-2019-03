const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router(require("./dados/index.js")());
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(process.event.PORT || 3000, () => {
  console.log("JSON Server is running");
});
