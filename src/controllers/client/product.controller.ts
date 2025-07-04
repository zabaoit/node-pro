import { Response, Request } from "express";
import { use } from "passport";
import { createProduct, getProductById, handleDeleteProduct, updateProductById } from "services/admin/product.service";
import { addProductToCart, getAllProducts } from "services/client/home.service";
import { ProductSchema, TProductSchema } from "src/validation/product.schema";

const getHomePage = async (req: Request, res: Response) => {
  const products = await getAllProducts();
  const user = req.user;
  // console.log(">>> check current user: ", user);
  return res.render("client/homepage/show.ejs", {
    products,
  });
};

const getProductPage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await getProductById(id);
  return res.render("client/product/detail.ejs", {
    product,
  });
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

const postAdminDeleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  await handleDeleteProduct(id);
  return res.redirect("/admin/product");
};

const getViewProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  const product = await getProductById(id);
  const factoryOptions = [
    { name: "Apple (MacBook)", value: "APPLE" },
    { name: "Asus", value: "ASUS" },
    { name: "Lenovo", value: "LENOVO" },
    { name: "Dell", value: "DELL" },
    { name: "LG", value: "LG" },
    { name: "Acer", value: "ACER" },
  ];

  const targetOptions = [
    { name: "Gaming", value: "GAMING" },
    { name: "Sinh viên - Văn phòng", value: "SINHVIEN-VANPHONG" },
    { name: "Thiết kế đồ họa", value: "THIET-KE-DO-HOA" },
    { name: "Mỏng nhẹ", value: "MONG-NHE" },
    { name: "Doanh nhân", value: "DOANH-NHAN" },
  ];

  // const roles = await getAllRoles();
  return res.render("admin/product/detail.ejs", {
    id,
    product,
    factoryOptions,
    targetOptions,
  });
};

const postAdminUpdateProduct = async (req: Request, res: Response) => {
  const { id, name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema;

  const image = req?.file?.filename ?? null;

  await updateProductById(id, name, +price, detailDesc, shortDesc, +quantity, factory, target, image);
  return res.redirect("/admin/product");
};

const postAddProductToCart = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;

  if (user) {
    await addProductToCart(1, +id, user);
  } else {
    return res.redirect("/login");
  }
  return res.redirect("/");
};

const getCartPage = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return res.redirect("/login");

  return res.render("client/product/cart");
};

export {
  getHomePage,
  getProductPage,
  getAdminCreateProductPage,
  postAdminCreateProduct,
  postAdminDeleteProduct,
  getViewProduct,
  postAdminUpdateProduct,
  postAddProductToCart,
  getCartPage,
};
