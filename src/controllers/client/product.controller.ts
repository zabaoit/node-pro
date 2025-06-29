import { Response, Request } from "express";

const getProductPage = (req: Request, res: Response) => {
  return res.render("client/product/detail.ejs");
};

const getAdminCreateProductPage = (req: Request, res: Response) => {
  return res.render("admin/product/create.ejs");
};

const postAdminCreateProduct = (req: Request, res: Response) => {
  const { name } = req.body;
  return res.redirect("/admin/product");
};

export { getProductPage, getAdminCreateProductPage, postAdminCreateProduct };
