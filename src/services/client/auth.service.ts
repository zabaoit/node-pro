import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import { comparePassword, hashPassWord } from "services/user.services";

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

const handleLogin = async (username: string, password: string, callback: any) => {
  // check user exist in database
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    // throw new Error(`Username: ${username} not found`);
    return callback(null, false, { message: `Username: ${username} not found` });
  }

  // compare password
  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    return callback(null, false, { message: `Invalid password` });
  }

  return callback(null, user);
};
export { isEmailExist, registerNewUser, handleLogin };
