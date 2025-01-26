const { Submission } = require("../models/submission");

module.exports = async (req, res) => {
  try {
    const leaderboard = await Submission.find()
      .sort({ score: -1, timestamp: 1 }) // Sort by score descending, timestamp ascending
      .select("initials score timestamp -_id"); // Select fields to return

    res
      .status(200)
      .json({ message: "Leaderboard fetched successfully", leaderboard });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      status: false,
      message: "Error fetching leaderboard",
    });
  }
};
