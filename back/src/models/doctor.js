module.exports = (sequelize, Sequelize) => {
  const Model = Sequelize.Model;
  class Doctor extends Model {}
  Doctor.init(
    {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: "doctor"
    }
  );
  return Doctor;
};
