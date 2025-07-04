const express = require("express");
import "dotenv/config";
import webRoutes from "./routes/web";
import initDataBase from "config/seed";
import passport from "passport";
import configPassportLocal from "./middleware/passport.local";
import session from "express-session";

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

// config session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// config passport
app.use(passport.initialize());
app.use(passport.authenticate("session"));
configPassportLocal();

// config routes
webRoutes(app);

initDataBase();

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`);
});
