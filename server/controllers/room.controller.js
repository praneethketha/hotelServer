const Hotel = require("../models/hotel");
const Room = require("../models/rooms");

const createRoom = async (req, res) => {
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();

    try {
      await Hotel.findByIdAndUpdate(req.params.hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      res.send(err);
    }

    res.status(200).send(savedRoom);
  } catch (err) {
    res.send(err);
  }
};

const updateRoom = async (req, res) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).send(updatedRoom);
  } catch (err) {
    res.send(err);
  }
};

const deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);
    res.status(200).send("Room deleted Succesfully");
  } catch (err) {
    res.send(err);
  }
};

const getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).send(room);
  } catch (err) {
    res.send(err);
  }
};

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();

    res.status(200).send(rooms);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
};
