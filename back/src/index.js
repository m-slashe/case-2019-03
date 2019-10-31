if (process.env.USE_JSON_SERVER == "true") {
  console.log("Utilizando mock!");
  const jsonServer = require("json-server");
  const server = jsonServer.create();
  const router = jsonServer.router(require("./dados/index.js")());
  const middlewares = jsonServer.defaults();

  server.use(middlewares);
  server.use(router);
  server.listen(process.env.PORT || 3000, () => {
    console.log("JSON Server is running");
  });
} else {
  console.log("Utilizando database!");
  const express = require("express");
  let app = express();
  const bodyParser = require("body-parser");
  const cors = require("cors");
  const api = require("./api");

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(api);

  require("./models");

  process.on("unhandledRejection", error => {
    console.log("unhandledRejection", error.message);
    process.exit(0);
  });

  app.listen(process.env.PORT || 3001, () => {
    console.log("Server listening...");
  });
}
