const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login"); 
const User = require("../../models/User");
const secretOrKey = process.env.SECRET_OR_KEY;


// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

  try {
    // Check if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    }

    // Create a new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    // Hash password before saving in database
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    // Save the new user
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", async (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      // User matched, create JWT Payload
      const payload = {
        id: user.id,
        name: user.name,
      };

      // Sign token
      jwt.sign(
        payload,
        secretOrKey,
        { expiresIn: 31556926 }, // 1 year in seconds
        (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        },
      );
    } else {
      return res.status(400).json({ passwordincorrect: "Password incorrect" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
