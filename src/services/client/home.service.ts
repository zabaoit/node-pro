import { prisma } from "config/client";

const getAllProducts = async () => {
  const products = await prisma.product.findMany();
  return products;
};

const getProductById = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  return product;
};

const addProductToCart = async (quantity: number, productId: number, user: Express.User) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId: user.id,
    },
  });

  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (cart) {
    // update
    // cập nhật sum

    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        // sum tự động tăng
        sum: {
          increment: quantity,
        },
      },
    });
    // tạo cartdetail
    // cùng 1 product => cập nhật quantity
    const currentCartDetail = await prisma.cartDetail.findFirst({
      where: {
        productId: productId,
        cartId: cart.id,
      },
    });
    await prisma.cartDetail.upsert({
      where: {
        id: currentCartDetail?.id ?? 0,
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
      create: {
        price: product.price,
        quantity: quantity,
        cartId: cart.id,
        productId: productId,
      },
    });
  } else {
    // create
    await prisma.cart.create({
      data: {
        sum: quantity,
        userId: user.id,
        cartDetails: {
          create: [
            {
              price: product.price,
              quantity: quantity,
              productId: productId,
            },
          ],
        },
      },
    });
  }
};

const getProductInCart = async (userId: number) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });

  if (cart) {
    const currentCartDetail = await prisma.cartDetail.findMany({
      where: {
        cartId: cart.id,
      },
      include: { product: true },
    });

    return currentCartDetail;
  }

  return [];
};

const DeleteProductInCart = async (cartDetailId: number, user: Express.User, sumCart: number) => {
  const cartDetail = await prisma.cartDetail.findUnique({
    where: { id: cartDetailId },
    select: { quantity: true },
  });

  const quantity = cartDetail.quantity;
  // console.log(">>> check quantity: ", quantity);
  // delete cartDetail
  await prisma.cartDetail.delete({
    where: {
      id: cartDetailId,
    },
  });

  // delete cart
  if (sumCart === 1) {
    await prisma.cart.delete({
      where: { userId: user.id },
    });
  } else {
    // update sum cart
    await prisma.cart.update({
      where: { userId: user.id },
      data: {
        sum: {
          decrement: quantity,
        },
      },
    });
  }
};

export { getAllProducts, getProductById, addProductToCart, getProductInCart, DeleteProductInCart };
