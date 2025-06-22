const express = require("express");
import "dotenv/config";
import webRoutes from "./routes/web";
import initDataBase from "config/seed";

const app = express();
const port = process.env.PORT || 8080;

// config views engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config static files
app.use(express.static("public"));

// config routes
webRoutes(app);

initDataBase();

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});
