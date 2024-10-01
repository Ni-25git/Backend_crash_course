const express = require("express");
const user = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const blacklistToken = require("../blacklist");
const checkAccess = require("../middleware/checkAccess");
const authMiddleware = require("../middleware/authMiddleware");
const saltRounds = 10;

user.get("/", authMiddleware, checkAccess("seller"), async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(201).json(users);
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
});

user.post("/register", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new UserModel({ email, password: hashedPassword, role });
    await user.save();
    console.log(user);
    res.status(201).json({ msg: "User signup successfully", user });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
});

user.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ msg: "Please provide email and password" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(402)
        .json({ msg: "User not found, firstly signup with this user" });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return res
        .status(403)
        .json({ msg: "Invalid password, please try again" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res
      .status(201)
      .json({ msg: `${user.email} logged in successfully`, token });
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
});

user.post("/logout", async (req, res) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ msg: "Please provide token" });
    }

    blacklistToken.push(token);
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
});

module.exports = user;
