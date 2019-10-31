const patients = require("./patients");
const doctors = require("./doctors");
const interactions = require("./interactions");
const medicines = require("./medicines");
const historys = require("./historys");
const express = require("express");
const router = express.Router();

router.use("/patients", patients);
router.use("/doctors", doctors);
router.use("/interactions", interactions);
router.use("/medicines", medicines);
router.use("/historys", historys);

module.exports = router;
