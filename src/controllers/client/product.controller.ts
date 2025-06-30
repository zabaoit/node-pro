import { Response, Request } from "express";
import { ProductSchema, TProductSchema } from "src/validation/product.schema";

const getProductPage = (req: Request, res: Response) => {
  return res.render("client/product/detail.ejs");
};

const getAdminCreateProductPage = (req: Request, res: Response) => {
  return res.render("admin/product/create.ejs");
};

const postAdminCreateProduct = (req: Request, res: Response) => {
  const { name } = req.body as TProductSchema;

  try {
    const result = ProductSchema.parse(req.body);
    console.log("run ok: ", result);
  } catch (error) {
    console.log(error);
  }
  return res.redirect("/admin/product");
};

export { getProductPage, getAdminCreateProductPage, postAdminCreateProduct };
