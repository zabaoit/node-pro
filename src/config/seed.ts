import { prisma } from "./client";

const initDataBase = async () => {
  const countUser = await prisma.user.count();

  if (countUser === 0) {
    await prisma.user.createMany({
      data: [
        {
          username: "baobao",
          password: "123456",
          accountType: "SYSTEM",
        },
        {
          username: "ngb",
          password: "123456",
          accountType: "SYSTEM",
        },
      ],
    });
  } else {
    console.log(">>> ALREADLY INIT USER");
  }
};

export default initDataBase;
