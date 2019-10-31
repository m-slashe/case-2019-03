let express = require("express");
let db = require("../models");
let router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let query = {};
    if (req.query.Farmaco1_like) {
      query = {
        where: {
          Farmaco1_like: {
            [db.Sequelize.Op.like]: `%${req.query.Farmaco1_like}%`
          }
        }
      };
    }
    if (req.query.Farmaco2_like) {
      if (query.where) {
        query.where.Farmaco2_like = {
          [db.Sequelize.Op.like]: `%${req.query.Farmaco2_like}%`
        };
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
