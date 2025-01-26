const { Submission } = require("../models/submission");

module.exports = async (req, res) => {
  const { initials, ipAddress, score } = req.body;

  // Create a new submission
  const newSubmission = new Submission({
    initials,
    ipAddress,
    score,
    timestamp: Date.now(),
  });

  try {
    await newSubmission.save();
    res.status(201).json({
      message: "Submission successful",
      submission: newSubmission,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: false,
      message: "Error saving submission",
    });
  }
};
