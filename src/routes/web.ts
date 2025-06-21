import express, { Express } from "express";
import {
  getCreateUserPage,
  getHomePage,
  postCreateUser,
  postDeleteUser,
  getUserById,
} from "controllers/user.controller";
const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);

  router.get("/create-user", getCreateUserPage);

  router.post("/handle-create-user", postCreateUser);

  router.post("/handle-delete-user/:id", postDeleteUser);

  router.get("/handle-view-user/:id", getUserById);
  app.use("/", router);
};

export default webRoutes;
