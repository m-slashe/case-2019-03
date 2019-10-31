module.exports = (sequelize, Sequelize) => {
  const Model = Sequelize.Model;
  class Interaction extends Model {}
  Interaction.init(
    {
      Farmaco1: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Farmaco2: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      Descricao: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "interaction"
    }
  );
  return Interaction;
};
