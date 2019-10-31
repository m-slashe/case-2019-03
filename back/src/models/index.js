const { Sequelize } = require("sequelize");
const Farmaco = require("./farmaco");
const Patient = require("./patient");
const Doctor = require("./doctor");
const Interaction = require("./interaction");
const Medicine = require("./medicine");
const History = require("./history");
const loader = require("./loader");
let db = {};
const sequelize = new Sequelize(
  process.env.DB_NAME || "vitta",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "example",
  {
    host: process.env.DB_HOST || "192.168.99.100",
    dialect: "mysql",
    pool: {
      max: 15,
      min: 0,
      idle: 10000
    },
    logging: false
  }
);

(async function() {
  console.log("inicializando database!!!");
  db.Patient = Patient(sequelize, Sequelize);
  db.Doctor = Doctor(sequelize, Sequelize);
  db.Interaction = Interaction(sequelize, Sequelize);
  db.Medicine = Medicine(sequelize, Sequelize);
  db.Farmaco = Farmaco(sequelize, Sequelize);
  db.History = History(sequelize, Sequelize);

  db.Farmaco.belongsToMany(db.Medicine, { through: "MedicineFarmaco" });
  db.Medicine.belongsToMany(db.Farmaco, { through: "MedicineFarmaco" });

  db.History.hasOne(db.Patient);
  db.History.hasOne(db.Doctor);
  db.History.hasMany(db.Medicine);

  db.Sequelize = Sequelize;
  await sequelize.sync();
  console.log("models inicializados!!!");
  await loader(db);
  console.log("dados criados!!!!");
})();

module.exports = db;
