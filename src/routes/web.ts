import express, { Express } from "express";
import {
  getCreateUserPage,
  postCreateUser,
  postDeleteUser,
  postUpdateUser,
  handleViewUser,
} from "controllers/user.controller";
import {
  getAdminOrderDetailPage,
  getAdminOrderPage,
  getAdminProductPage,
  getAdminUserPage,
  getDashBoardPage,
} from "controllers/admin/dashboard.controller";
import fileUploadMiddleware from "src/middleware/multer";
import {
  getAdminCreateProductPage,
  getCartPage,
  getCheckOutPage,
  getHomePage,
  getProductPage,
  getThanksPage,
  getViewProduct,
  postAddProductToCart,
  postAdminCreateProduct,
  postAdminDeleteProduct,
  postAdminUpdateProduct,
  postDeleteProductInCart,
  postHandleCartToCheckOut,
  postPlaceOrder,
} from "controllers/client/product.controller";
import {
  getLoginPage,
  getRegisterPage,
  postResgister,
  getSuccessRedirectPage,
  postLogout,
} from "controllers/client/auth.controller";
import passport from "passport";
import { isAdmin, isLogin } from "src/middleware/auth";
const router = express.Router();

const webRoutes = (app: Express) => {
  router.get("/", getHomePage);
  router.get("/success-redirect", getSuccessRedirectPage);
  router.get("/product/:id", getProductPage);
  router.get("/login", isLogin, getLoginPage);
  router.get("/register", getRegisterPage);
  router.post("/register", postResgister);
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/success-redirect",
      failureRedirect: "/login",
      failureMessage: true,
    })
  );
  router.post("/logout", postLogout);

  // client
  router.post("/add-product-to-cart/:id", postAddProductToCart);
  router.get("/cart", getCartPage);
  router.post("/delete-product-in-cart/:id", postDeleteProductInCart);
  router.post("/handle-cart-to-checkout", postHandleCartToCheckOut);
  router.get("/checkout", getCheckOutPage);
  router.post("/place-order", postPlaceOrder);
  router.get("/thanks", getThanksPage);

  // admin router
  router.get("/admin", getDashBoardPage);

  //  admin user
  router.get("/admin/user", getAdminUserPage);
  router.get("/admin/create-user", getCreateUserPage);
  router.post("/admin/handle-create-user", fileUploadMiddleware("avatar"), postCreateUser);
  router.post("/admin/delete-user/:id", postDeleteUser);
  router.post("/admin/update-user", fileUploadMiddleware("avatar"), postUpdateUser);
  router.get("/admin/view-user/:id", handleViewUser);

  // admin product
  router.get("/admin/product", getAdminProductPage);
  router.get("/admin/create-product", getAdminCreateProductPage);
  router.post("/admin/handle-create-product", fileUploadMiddleware("avatar", "images/product"), postAdminCreateProduct);
  router.post("/admin/delete-product/:id", postAdminDeleteProduct);
  router.get("/admin/view-product/:id", getViewProduct);
  router.post("/admin/update-product", fileUploadMiddleware("avatar", "images/product"), postAdminUpdateProduct);

  router.get("/admin/order", getAdminOrderPage);
  router.get("/admin/order/:id", getAdminOrderDetailPage);

  app.use("/", isAdmin, router);
};

export default webRoutes;
