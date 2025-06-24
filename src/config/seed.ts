import { hashPassWord } from "services/user.services";
import { prisma } from "./client";
import { ACCOUNT_TYPE } from "./constant";

const initDataBase = async () => {
  const countUser = await prisma.user.count();
  const countRole = await prisma.roles.count();

  const defaultPassWord = await hashPassWord("123456");
  if (countUser === 0) {
    await prisma.user.createMany({
      data: [
        {
          fullName: "Nguyen Gia Bao",
          username: "baobao",
          password: defaultPassWord,
          accountType: ACCOUNT_TYPE.SYSTEM,
        },

        {
          fullName: "ADMIN",
          username: "ngb",
          password: defaultPassWord,
          accountType: ACCOUNT_TYPE.SYSTEM,
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
