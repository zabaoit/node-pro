import express, { Express } from "express";
const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", (req, res) => {
    res.render("home.ejs");
  });

  router.get("/zabaoit", (req, res) => {
    res.send("Zabaoit");
  });

  app.use("/", router);
};

export default webRoutes;
