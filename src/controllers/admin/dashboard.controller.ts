import { Response, Request } from "express";
import { getAllProductList } from "services/admin/product.service";
import { getAllUsers } from "services/user.services";

const getDashBoardPage = async (req: Request, res: Response) => {
  return res.render("admin/dashboard/show.ejs");
};

const getAdminUserPage = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  return res.render("admin/user/show.ejs", {
    users: users,
  });
};

const getAdminProductPage = async (req: Request, res: Response) => {
  const products = await getAllProductList();
  return res.render("admin/product/show.ejs", { products });
};

const getAdminOrderPage = async (req: Request, res: Response) => {
  return res.render("admin/order/show.ejs");
};

export { getDashBoardPage, getAdminUserPage, getAdminProductPage, getAdminOrderPage };
