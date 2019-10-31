let express = require("express");
let db = require("../models");
let router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let query = {};
    if (req.query.name_like) {
      query = {
        [db.Sequelize.Op.like]: `%${req.query.name_like}%`
      };
    }
    let patients = await db.Patient.findAll(query);
    res.send(patients);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const patient = await db.Patient.create(req.body);
    res.send(patient);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
