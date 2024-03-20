const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }

    const newUser = new User({ email, password });
    const user = await newUser.save();
    res.send("User Registered Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      if (user.password === password) {
        const temp = {
          name: user.name,
          email: user.email,
          _id: user._id,
        };
        res.send(temp);
      } else {
        return res.status(400).json({ message: "Password incorrect" });
      }
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
