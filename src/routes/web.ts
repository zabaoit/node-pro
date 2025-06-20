import express, { Express } from "express";
import { getCreateUserPage, getHomePage, postCreateUser, postDeleteUser } from "controllers/user.controller";
const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);

  router.get("/create-user", getCreateUserPage);

  router.post("/handele-create-user", postCreateUser);

  router.post("/handle-delete-user/:id", postDeleteUser);
  app.use("/", router);
};

export default webRoutes;
