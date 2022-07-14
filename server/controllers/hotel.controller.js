const Hotel = require("../models/hotel");

const createHotel = async (req, res) => {
  const newHotel = new Hotel(req.body);

  try {
    const hotel = await newHotel.save();
    res.status(200).send(hotel);
  } catch (err) {
    console.log(err);
  }
};

const updateHotel = async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.status(200).send(updatedHotel);
  } catch (err) {
    console.log(err);
  }
};

const deleteHotel = async (req, res) => {
  try {
    await Hotel.findOneAndDelete(req.params.id);

    res.status(200).send("Hotel Deleted Successfully");
  } catch (err) {
    console.log(err);
  }
};

const getHotel = async (req, res) => {
  try {
    const getHotel = await Hotel.findById(req.params.id);
    res.status(200).send(getHotel);
  } catch (err) {
    console.log(err);
  }
};

const getAllHotel = async (req, res) => {
  try {
    const getAll = await Hotel.find();
    res.status(200).send(getAll);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotel,
};
