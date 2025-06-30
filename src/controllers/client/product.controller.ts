import { Response, Request } from "express";
import { ProductSchema, TProductSchema } from "src/validation/product.schema";

const getProductPage = (req: Request, res: Response) => {
  return res.render("client/product/detail.ejs");
};

const getAdminCreateProductPage = (req: Request, res: Response) => {
  const errors = [];
  const oldData = {
    name: "",
    price: "",
    detailDesc: "",
    shortDesc: "",
    quantity: "",
    factory: "",
    target: "",
  };
  return res.render("admin/product/create.ejs", {
    errors,
    oldData,
  });
};

const postAdminCreateProduct = (req: Request, res: Response) => {
  const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema;
  const validate = ProductSchema.safeParse(req.body);

  // err
  if (!validate.success) {
    const errorZod = validate.error.issues;
    const errors = errorZod.map(item => `${item.message} (${item.path[0]})`);
    const oldData = {
      name,
      price,
      detailDesc,
      shortDesc,
      quantity,
      factory,
      target,
    };
    return res.render("admin/product/create.ejs", {
      errors,
      oldData,
    });
  }
  try {
    const result = ProductSchema.safeParse(req.body);
    console.log("run ok: ", result);
  } catch (error) {
    console.log(error);
  }
  return res.redirect("/admin/product");
};

export { getProductPage, getAdminCreateProductPage, postAdminCreateProduct };
