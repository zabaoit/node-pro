const express = require("express");
import "dotenv/config";
import webRoutes from "./routes/web";
const app = express();
const port = process.env.PORT || 8080;

// config views engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

// config routes
webRoutes(app);

//
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
