let express = require("express");
let db = require("../models");
let router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let query = {};
    if (req.query.Label_like) {
      query = {
        where: {
          Label: {
            [db.Sequelize.Op.like]: `%${req.query.Label_like}%`
          }
        }
      };
    }
    let medicines = await db.Medicine.findAll(query);
    res.send(medicines);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
