const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: String,
  iconName: String,
  grammarsUrl: [String],
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = { Lesson };
