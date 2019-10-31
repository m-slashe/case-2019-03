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
    let doctors = await db.Doctor.findAll(query);

    res.send(doctors);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const doctor = await db.Doctor.create(req.body);
    res.send(doctor);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
