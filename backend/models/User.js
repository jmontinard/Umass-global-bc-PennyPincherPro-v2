const mongoose = require("mongoose");
const { Schema } = mongoose; // Destructuring assignment

// Create Schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
        unique: true, // Ensure email is unique
      match: [/.+\@.+\..+/, "Please fill a valid email address"], // Simple regex for email validation
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
); // Add createdAt and updatedAt fields automatically

// User model
const User = mongoose.model("User", UserSchema);

module.exports = User;
