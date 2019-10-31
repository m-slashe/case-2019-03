module.exports = function() {
  return Object.assign(
    {},
    require("./db.json"),
    { medicines: require("./medicamentos.json") },
    { interactions: require("./interacao_medicamentosa.json") }
  );
};
