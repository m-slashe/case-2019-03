let express = require("express");
let db = require("../models");
let router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let query = {
      include: [
        { model: db.Patient },
        { model: db.Doctor },
        { model: db.Medicine }
      ]
    };
    if (req.query.name_like) {
      query.where = {
        name: {
          [db.Sequelize.Op.like]: `%${req.query.name_like}%`
        }
      };
    }
    let historys = await db.History.findAll(query);
    historys = historys.map(history => history.toJSON());
    for (let history of historys) {
      if (history.patient) {
        history.patientId = history.patient.id;
      }
      if (history.doctor) {
        history.doctorId = history.doctor.id;
      }

      history.medicines = history.medicines.map(med => med.IdMedicamento);
      delete history.patient;
      delete history.doctor;
      console.log(history);
    }
    res.send(historys);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let history = await db.History.create(req.body);
    const patient = await db.Patient.findOne({
      where: { id: req.body.patientId }
    });
    const doctor = await db.Doctor.findOne({
      where: { id: req.body.doctorId }
    });
    const medicines = await db.Medicine.findAll({
      where: { IdMedicamento: req.body.medicines }
    });
    await history.setPatient(patient);
    await history.setDoctor(doctor);
    console.log(medicines);
    history = await history.addMedicines(medicines);
    res.send(history);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
