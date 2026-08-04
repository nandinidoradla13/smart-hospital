const express = require("express");

const router = express.Router();

const pharmacyController = require("../controllers/pharmacyController");

router.get("/", pharmacyController.getMedicines);

router.post("/", pharmacyController.addMedicine);

router.put("/:id", pharmacyController.updateMedicine);

router.delete("/:id", pharmacyController.deleteMedicine);

module.exports = router;