let express = require("express");
let db = require("../models");
let router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let query = {};
    if (req.query.Farmaco1) {
      query = {
        where: {
          Farmaco1: req.query.Farmaco1
        }
      };
    }
    if (req.query.Farmaco2) {
      if (query.where) {
        query.where.Farmaco2 = req.query.Farmaco2;
      } else {
        query = {
          where: {
            Farmaco2_like: {
              [db.Sequelize.Op.like]: `%${req.query.Farmaco2_like}%`
            }
          }
        };
      }
    }
    let interactions = await db.Interaction.findAll(query);
    res.send(interactions);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
