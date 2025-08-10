import { prisma } from "config/client";
import { TOTAL_ITEM_PER_PAGE } from "config/constant";

const createProduct = async (
  name: string,
  price: number,
  detailDesc: string,
  shortDesc: string,
  quantity: number,
  factory: string,
  target: string,
  imageUpload: string
) => {
  await prisma.product.create({
    data: {
      name: name,
      price: price,
      detailDesc: detailDesc,
      shortDesc: shortDesc,
      quantity: quantity,
      factory: factory,
      target: target,
      ...(imageUpload && { image: imageUpload }),
    },
  });
};

const getAllProductList = async (page: number) => {
  const pageSize = TOTAL_ITEM_PER_PAGE;
  const skip = (page - 1) * pageSize;
  return await prisma.product.findMany({
    skip: skip,
    take: pageSize,
  });
};

const handleDeleteProduct = async (id: string) => {
  const deleteProduct = await prisma.product.delete({
    where: {
      id: +id,
    },
  });
  return deleteProduct;
};

const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: +id,
    },
  });
  return product;
};

const updateProductById = async (
  id: string,
  name: string,
  price: number,
  detailDesc: string,
  shortDesc: string,
  quantity: number,
  factory: string,
  target: string,
  imageUpload: string
) => {
  await prisma.product.update({
    where: {
      id: +id,
    },
    data: {
      name: name,
      price: price,
      detailDesc: detailDesc,
      shortDesc: shortDesc,
      quantity: quantity,
      factory: factory,
      target: target,
      ...(imageUpload && { image: imageUpload }),
    },
  });
};

export { createProduct, getAllProductList, handleDeleteProduct, getProductById, updateProductById };
