//! 載入所需工具包
const express = require("express");
const routes = require("./routes");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const port = 3000;
const methodOverride = require("method-override");
require("./config/mongoose");

// ! app setting
const app = express();
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "handlebars");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(routes);

// ! 底部
app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`);
});
