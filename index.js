process.on("uncaughtException", (err) => {
  console.log(err, err.name, err.message);
  console.log("Shutting Down");
  process.exit(1);
});

require("dotenv").config();
const app = require("./app");

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Server has started and is listening on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

//Respond to a sigterm signal
process.on("SIGTERM", () => {
  console.log("SIGTERM signal recieved. Shtting down...");
  server.close(() => {
    console.log("Process terminated.");
  });
});
