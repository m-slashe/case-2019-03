module.exports = (sequelize, Sequelize) => {
  const Model = Sequelize.Model;
  class History extends Model {}
  History.init(
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "history"
    }
  );
  return History;
};
