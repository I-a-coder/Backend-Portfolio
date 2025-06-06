const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  githubLink: { type: String },
  liveLink: { type: String },
  startDate: { type: Date },
  endDate: { type: Date }
});

module.exports = mongoose.model("Project", projectSchema);
