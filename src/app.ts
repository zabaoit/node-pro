const express = require("express");
import "dotenv/config";

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/zabaoit", (req, res) => {
  res.send("Zabaoit");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(">>> check env port: ", process.env.PORT);
});
