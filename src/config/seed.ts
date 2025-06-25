import { hashPassWord } from "services/user.services";
import { prisma } from "./client";
import { ACCOUNT_TYPE } from "./constant";

const initDataBase = async () => {
  const countUser = await prisma.user.count();
  const countRole = await prisma.roles.count();

  if (countRole === 0) {
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
  }
  if (countUser === 0) {
    const defaultPassWord = await hashPassWord("123456");
    const adminRole = prisma.roles.findFirst({
      where: { name: "ADMIN" },
    });
    if (adminRole) {
      await prisma.user.createMany({
        data: [
          {
            fullName: "Nguyen Gia Bao",
            username: "baobao",
            password: defaultPassWord,
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId: (await adminRole).id,
          },

          {
            fullName: "ADMIN",
            username: "ngb",
            password: defaultPassWord,
            accountType: ACCOUNT_TYPE.SYSTEM,
            roleId: (await adminRole).id,
          },
        ],
      });
    }
  }
  if (countRole !== 0 && countUser !== 0) {
    console.log(">>> ALREADLY INIT USER");
  }
};

export default initDataBase;
