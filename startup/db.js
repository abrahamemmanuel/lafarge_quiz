const mongoose = require("mongoose");

async function connectToDb() {
  const MONGO_URI =
    process.env.NODE_ENV === "production"
      ? process.env.PROD_MONGO_URL
      : process.env.DEV_MONGO_URL;
  console.log("URI", MONGO_URI);
  try {
    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(`Connected to database successfully.`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectToDb;
