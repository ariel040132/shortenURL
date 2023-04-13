const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const UrlSchema = require("../models/url");
const shortFunction = require("../utils/shortFunction");

//! 首頁
router.get("/", (req, res) => {
  res.render("index");
});

//! 寫入資料庫 － 表單 action 屬性
router.post("/shorten", (req, res) => {
  if (!req.body.originalUrl) return res.redirect("/");
  //! 產生隨機網址

  const shortURL = shortFunction(5);
  // ! 在資料庫中搜尋
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
//! 導向原始網址頁面
router.get("/:shortURL", (req, res) => {
  const { shortURL } = req.params;
  UrlSchema.findOne({ shortURL })
    .then((data) => {
      if (!data) {
        return res.status(404).send("This URL does not exist.");
      }
      res.redirect(data.originalUrl);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
