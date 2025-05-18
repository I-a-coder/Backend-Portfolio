const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  school: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  grade: { type: String },  
  description: { type: String },
});

module.exports = mongoose.model("Education", educationSchema);
