const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: Buffer,
  status: { type: String, default: "active" },
  savedWords: { type: [String], ref: "Word" },
});

const User = mongoose.model("Users", UserSchema);

module.exports = { User };
