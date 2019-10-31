module.exports = (sequelize, Sequelize) => {
  const Model = Sequelize.Model;
  class Medicine extends Model {}
  Medicine.init(
    {
      IdMedicamento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      Nome: {
        type: Sequelize.STRING
      },
      Concentracao: {
        type: Sequelize.STRING
      },
      Unidade: {
        type: Sequelize.STRING
      },
      TipoMedicamento: {
        type: Sequelize.STRING
      },
      FormaFarmaceutica: {
        type: Sequelize.STRING
      },
      ViaAdministracao: {
        type: Sequelize.STRING
      },
      CodigoATC: {
        type: Sequelize.STRING
      },
      UsoInterno: {
        type: Sequelize.BOOLEAN
      },
      Antimicrobiano: {
        type: Sequelize.BOOLEAN
      },
      Bula: {
        type: Sequelize.STRING
      },
      Portaria344: {
        type: Sequelize.STRING
      },
      ControleEspecial: {
        type: Sequelize.BOOLEAN
      },
      TISS: {
        type: Sequelize.STRING
      },
      MIP: {
        type: Sequelize.BOOLEAN
      },
      Label: {
        type: Sequelize.TEXT
      }
    },
    {
      sequelize,
      modelName: "medicine"
    }
  );

  return Medicine;
};
