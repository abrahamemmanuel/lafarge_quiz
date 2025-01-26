const mongoose = require("mongoose");

const submissionSchema = mongoose.Schema({
  initials: String,
  ipAddress: String,
  score: String,
  timestamp: Date,
  createdAt: { type: String, default: Date.now },
});

const Submission = mongoose.model("Submission", submissionSchema);
exports.Submission = Submission;
