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
  // insert into database
  const connection = await getConnection();

  try {
    const sql = "DELETE FROM `users` WHERE `id` = ? LIMIT 1";
    const values = [id];

    const [result, fields] = await connection.execute(sql, values);
    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
};
const getUserById = async (id: string) => {
  const connection = await getConnection();

  try {
    const sql = "SELECT * FROM `users` WHERE `id` = ?";
    const values = [id];

    const [result, fields] = await connection.execute(sql, values);

    return result[0];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const updateUserById = async (id: string, fullName: string, email: string, addDress: string) => {
  const connection = await getConnection();

  try {
    const sql = "UPDATE `users` SET `name` = ?, `email` = ?, `address` = ? WHERE `id` = ? LIMIT 1";
    const values = [fullName, email, addDress, id];

    const [result, fields] = await connection.execute(sql, values);

    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
};
export { handleCreateUser, getAllUsers, handleDeleteUser, getUserById, updateUserById };
