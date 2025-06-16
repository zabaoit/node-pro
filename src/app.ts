const express = require("express");
import "dotenv/config";

const app = express();
const port = process.env.PORT || 8080;

//  config views engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/zabaoit", (req, res) => {
  res.send("Zabaoit");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
