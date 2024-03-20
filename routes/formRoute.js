const express = require("express");
const router = express.Router();
const Form = require("../models/form");

router.post("/formsubmit", async (req, res) => {
  const { name, place, brand, cups, googlemaps } = req.body;

  try {
    const newRecord = new Form({ name, place, brand, cups, googlemaps });
    const record = await newRecord.save();
    res.send("Record Submit Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getRecords", async (req, res) => {
  try {
    const records = await Form.find();
    res.json(records);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to get Records", error: error.message });
  }
});

module.exports = router;
