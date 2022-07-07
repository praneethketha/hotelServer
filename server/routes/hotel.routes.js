const express = require("express");
const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotel,
} = require("../controllers/hotel.controller");

const router = express.Router();

//CREATE HOTEL

router.post("/", createHotel);

//UPDATE HOTEL

router.put("/:id", updateHotel);

//DELETE HOTEL

router.delete("/:id", deleteHotel);

//GET HOTEL

router.get("/:id", getHotel);

//GET ALL HOTELS

router.get("/", getAllHotel);

module.exports = router;
