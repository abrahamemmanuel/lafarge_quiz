const express = require("express");

const submission = require("../controllers/userDataPoint");
const leaderboard = require("../controllers/leaderboard");

const app = express();

app.post("/submit", submission);
app.get("/leaderboard", leaderboard);

module.exports = app;
