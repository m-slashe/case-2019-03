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
    let historys = await db.History.findAll(query);
    res.send(historys);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const history = await db.History.create(req.body);
    res.send(history);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
