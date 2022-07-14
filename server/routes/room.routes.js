const express = require("express");
const {
  getRoom,
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/room.controller");

const router = express.Router();

//Create
router.post("/:hotelId", createRoom);

//Update
router.put("/:id", updateRoom);

//Delete

router.delete("/:id", deleteRoom);

// Get By Id
router.get("/:id", getRoom);

//Get All
router.get("/", getAllRooms);

module.exports = router;
