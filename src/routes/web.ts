import express, { Express } from "express";
import {
  getCreateUserPage,
  getHomePage,
  postCreateUser,
  postDeleteUser,
  postUpdateUser,
  handleViewUser,
} from "controllers/user.controller";
import { getAdminUserPage, getDashBoardPage } from "controllers/admin/dashboard.controller";
const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);

  router.get("/create-user", getCreateUserPage);

  router.post("/handle-create-user", postCreateUser);

  router.post("/handle-delete-user/:id", postDeleteUser);

  router.get("/handle-view-user/:id", handleViewUser);

  router.post("/handle-update-user", postUpdateUser);

  // admin router
  router.get("/admin", getDashBoardPage);
  router.get("/admin/user", getAdminUserPage);

  app.use("/", router);
};

export default webRoutes;
