import { prisma } from "./client";

const initDataBase = async () => {
  const countUser = await prisma.user.count();
  const countRole = await prisma.roles.count();

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
  } else if (countRole === 0) {
    await prisma.roles.createMany({
      data: [
        {
          name: "ADMIN",
          description: "Admin thì full quyền",
        },
        {
          name: "USER",
          description: "User thông thường",
        },
      ],
    });
  } else {
    console.log(">>> ALREADLY INIT USER");
  }
};

export default initDataBase;
