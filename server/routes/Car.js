const express = require("express");
const { createCar, getCarDetails, getAllCarsDetails, deleteCar, updateCar } = require("../controllers/Car");
const { auth } = require("../middleware/auth");
const router = express.Router();

router.post("/createCar", auth, createCar);
router.post("/getCar", auth, getCarDetails);
router.put("/updateCar", auth, updateCar);
router.get("/getAllCars", auth, getAllCarsDetails);
router.delete("/deleteCar", auth, deleteCar);

module.exports = router;