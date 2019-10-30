if (process.env.USE_JSON_SERVER) {
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
  const { Sequelize, Model, DataTypes } = require("sequelize");

  const sequelize = new Sequelize(
    process.env.DB_NAME || "",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "example",
    {
      host: process.env.DB_HOST || "192.168.99.100",
      dialect: "mysql"
    }
  );

  sequelize.query("CREATE DATABASE IF NOT EXISTS vitta;").then(data => {
    console.log("database criado!!!");
  });

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });
}
