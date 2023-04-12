const mongoose = require("mongoose");
const UrlSchema = require("../url");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodb connected!");
  // for (let i = 0; i < 10; i++) {
  //   UrlSchema.create({origi});
  //   console.log("UrlSeeder is done!");
  // }
});
