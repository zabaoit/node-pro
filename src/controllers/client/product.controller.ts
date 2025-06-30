import { Response, Request } from "express";
import { createProduct } from "services/admin/product.service";
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

const postAdminCreateProduct = async (req: Request, res: Response) => {
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

  // success and create product
  const image = req?.file?.filename ?? null;
  await createProduct(name, +price, detailDesc, shortDesc, +quantity, factory, target, image);
  return res.redirect("/admin/product");
};

export { getProductPage, getAdminCreateProductPage, postAdminCreateProduct };
