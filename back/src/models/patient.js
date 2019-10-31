module.exports = (sequelize, Sequelize) => {
  const Model = Sequelize.Model;
  class Patient extends Model {}
  Patient.init(
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "patient"
    }
  );
  return Patient;
};
