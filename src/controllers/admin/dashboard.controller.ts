import { Response, Request } from "express";
import { getDashBoard } from "services/admin/dashboard.service";
import { getOrderAdmin, getOrderDetailAdmin } from "services/admin/order.service";
import { getAllProductList } from "services/admin/product.service";
import { countTotalOrderPages, countTotalProductPages, countTotalUserPages, getAllUsers } from "services/user.services";

const getDashBoardPage = async (req: Request, res: Response) => {
  const info = await getDashBoard();
  return res.render("admin/dashboard/show.ejs", { info });
};

const getAdminUserPage = async (req: Request, res: Response) => {
  const { page } = req.query;

  // check page < 0
  let currentPage = page ? +page : 1;
  if (currentPage <= 0) currentPage = 1;
  const users = await getAllUsers(currentPage);
  const totalPages = await countTotalUserPages();
  console.log(">>> check totalPages: ", totalPages);
  return res.render("admin/user/show.ejs", {
    users: users,
    page: currentPage,
    totalPages,
  });
};

const getAdminProductPage = async (req: Request, res: Response) => {
  const { page } = req.query;

  // check page < 0
  let currentPage = page ? +page : 1;
  if (currentPage <= 0) currentPage = 1;

  const products = await getAllProductList(currentPage);
  const totalPages = await countTotalProductPages();

  return res.render("admin/product/show.ejs", { products, page: currentPage, totalPages });
};

const getAdminOrderPage = async (req: Request, res: Response) => {
  const { page } = req.query;

  // check page < 0
  let currentPage = page ? +page : 1;
  if (currentPage <= 0) currentPage = 1;
  const orders = await getOrderAdmin(currentPage);
  const totalPages = await countTotalOrderPages();

  return res.render("admin/order/show.ejs", {
    orders,
    page: currentPage,
    totalPages,
  });
};

const getAdminOrderDetailPage = async (req: Request, res: Response) => {
  const { id } = req.params;

  const orderDetails = await getOrderDetailAdmin(+id);

  return res.render("admin/order/detail.ejs", {
    id,
    orderDetails,
  });
};

export { getDashBoardPage, getAdminUserPage, getAdminProductPage, getAdminOrderPage, getAdminOrderDetailPage };
