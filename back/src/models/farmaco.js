module.exports = (sequelize, Sequelize) => {
  const Model = Sequelize.Model;
  class Farmaco extends Model {}
  Farmaco.init(
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "farmaco"
    }
  );
  return Farmaco;
};
