const express = require("express");
const router = express.Router();
const Data = require("../models/data.model");

// get all
router.get("/", async (req, res) => {
  try {
    const data = await Data.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get one
router.get("/:id", getData, (req, res) => {
  res.json(req.data);
});

// post data
router.post("/", async (req, res) => {
  const data = new Data({
    name: req.body.name,
    age: req.body.age,
  });
  try {
    const newData = await data.save();
    res.status(201).json(newData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// update one
router.patch("/:id", getData, async (req, res) => {
  try {
    const updatedData = await req.data.save();
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// delete one
router.delete("/:id", getData, async (req, res) => {
  try {
    await req.data.deleteOne();
    res.json({ message: "Data Erased" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

async function getData(req, res, next) {
  let data;
  try {
    data = await Data.findById(req.params.id);
    if (data == null) {
      res.status(404).json({ message: "Data not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  req.data = data;
  next();
}

module.exports = router;
