import express, { Express } from "express";
import {
  getCreateUserPage,
  getHomePage,
  postCreateUser,
  postDeleteUser,
  postUpdateUser,
  handleViewUser,
} from "controllers/user.controller";
import {
  getAdminOrderPage,
  getAdminProductPage,
  getAdminUserPage,
  getDashBoardPage,
} from "controllers/admin/dashboard.controller";
import fileUploadMiddleware from "src/middleware/multer";
import { getProductPage } from "controllers/client/product.controller";
const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);
  router.get("/product/:id", getProductPage);

  // admin router
  router.get("/admin", getDashBoardPage);

  router.get("/admin/user", getAdminUserPage);

  router.get("/admin/create-user", getCreateUserPage);

  router.post("/admin/handle-create-user", fileUploadMiddleware("avatar"), postCreateUser);

  router.post("/admin/delete-user/:id", postDeleteUser);

  router.post("/admin/update-user", fileUploadMiddleware("avatar"), postUpdateUser);

  router.get("/admin/view-user/:id", handleViewUser);
  router.get("/admin/product", getAdminProductPage);
  router.get("/admin/order", getAdminOrderPage);
  app.use("/", router);
};

export default webRoutes;
