import { prisma } from "config/client";
import getConnection from "config/database";

const handleCreateUser = async (fullName: string, email: string, addDress: string) => {
  await prisma.user.create({
    data: {
      name: fullName,
      email: email,
      address: addDress,
    },
  });
};

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
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

const updateUserById = async (id: string, fullName: string, email: string, addDress: string) => {
  const updateUser = await prisma.user.update({
    where: { id: +id }, // convert string => number
    data: {
      name: fullName,
      email: email,
      address: addDress,
    },
  });
  return updateUser;
};
export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, updateUserById };
