import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import { hashPassWord } from "services/user.services";

const isEmailExist = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { username: email },
  });

  if (user) return true;
  return false;
};

const registerNewUser = async (fullName: string, email: string, password: string) => {
  const userRole = await prisma.roles.findUnique({
    where: { name: "USER" },
  });

  const newPassWord = await hashPassWord(password);
  if (userRole) {
    await prisma.user.create({
      data: {
        username: email,
        password: newPassWord,
        fullName: fullName,
        accountType: ACCOUNT_TYPE.SYSTEM,
        roleId: userRole.id,
      },
    });
  } else {
    throw new Error("User Role không tồn tại.");
  }
};

export { isEmailExist, registerNewUser };
