const express = require("express");
const router = express.Router();

const doctorController = require("../controllers/doctorController");

router.get("/", doctorController.getDoctors);
router.post("/", doctorController.addDoctor);
router.delete("/:id", doctorController.deleteDoctor);
router.put("/:id", doctorController.updateDoctor);

module.exports = router;