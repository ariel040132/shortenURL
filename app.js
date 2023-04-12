const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const port = 3000;
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const UrlSchema = require("./models/url");
// const shortenFunction = require("./utils/shortenFunction");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error!");
});
db.once("open", () => {
  console.log("mongodo connected!");
});

// app setting
const app = express();
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(methodOverride("_method"));

//setting routes
app.get("/", (req, res) => {
  res.render("index");
});

//! 寫入資料庫 － 表單 action 屬性
app.post("/shorten", (req, res) => {
  if (!req.body.originalUrl) return res.redirect("/");
  //! 產生隨機網址
  function generateShortUrl() {
    const ObjectId = mongoose.Types.ObjectId;
    const id = new ObjectId();
    return id.toString().substring(0, 8);
  }
  const shortURL = generateShortUrl().toString();
  //! 解構賦值
  const { originalUrl } = req.body;

  UrlSchema.findOne({ originalUrl: req.body.originalUrl })
    .then((data) => {
      if (data) {
        console.log("now is data. req.body = ", req.body);
        return Promise.resolve(data);
      } else {
        console.log("now is else. req.body = ", req.body);
        return UrlSchema.create({
          originalUrl: req.body.originalUrl,
          shortURL: shortURL,
        });
      }
    })
    .then((data) => {
      console.log("data now is = ", data);
      console.log("last and req.headers = ", req.headers.originalUrl);
      res.render("index", {
        originalUrl: req.body.originalUrl,
        shortURL: data.shortURL,
      });
    })
    .catch((err) => console.error(err));
});

app.get("/shortenProject/:shortURL", (req, res) => {
  const { shortURL } = req.params;
  UrlSchema.findOne({ shortURL })
    .then((data) => {
      if (!data) {
        return res.render("error", {
          errorMsg: "Can't found the URL",
          errorURL: req.headers.host + "/" + shortURL,
        });
      }
      res.redirect(data.originalUrl);
    })
    .catch((error) => console.log(error));
});

// ! 底部
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`);
});
