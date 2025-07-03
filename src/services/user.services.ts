import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constant";
import bcrypt from "bcrypt";
const saltRounds = 10;

const hashPassWord = async (myPlaintextPassword: string) => {
  return await bcrypt.hash(myPlaintextPassword, saltRounds);
};

const comparePassword = async (plantText: string, hashPassWord: string) => {
  return await bcrypt.compare(plantText, hashPassWord);
};

const handleCreateUser = async (
  fullName: string,
  username: string,
  addDress: string,
  phone: string,
  avatar: string,
  role: string
) => {
  const defaultPassWord = await hashPassWord("123456");
  await prisma.user.create({
    data: {
      fullName: fullName,
      username: username,
      address: addDress,
      password: defaultPassWord,
      accountType: ACCOUNT_TYPE.SYSTEM,
      phone: phone,
      avatar: avatar,
      roleId: +role,
    },
  });
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const getAllRoles = async () => {
  const roles = await prisma.roles.findMany();
  return roles;
};

const handleDeleteUser = async (id: string) => {
  const deleteUser = await prisma.user.delete({
    where: {
      id: +id,
    },
  });
  return deleteUser;
};
const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: +id,
    },
  });
  return user;
};

const updateUserById = async (
  id: string,
  fullName: string,
  phone: string,
  role: string,
  addDress: string,
  avatar: string
) => {
  const updateUser = await prisma.user.update({
    where: { id: +id }, // convert string => number
    data: {
      fullName: fullName,
      address: addDress,
      phone: phone,
      roleId: +role,
      ...(avatar && { avatar: avatar }),
    },
  });
  return updateUser;
};
export {
  handleCreateUser,
  getAllUsers,
  handleDeleteUser,
  getUserById,
  updateUserById,
  getAllRoles,
  hashPassWord,
  comparePassword,
};
