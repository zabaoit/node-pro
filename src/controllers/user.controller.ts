import { Response, Request } from "express";
import {
  getAllRoles,
  getAllUsers,
  getUserById,
  handleCreateUser,
  handleDeleteUser,
  updateUserById,
} from "services/user.services";
const getHomePage = async (req: Request, res: Response) => {
  //  get user
  const users = await getAllUsers();

  return res.render("home.ejs", {
    users: users,
  });
};

const getCreateUserPage = async (req: Request, res: Response) => {
  const roles = await getAllRoles();

  return res.render("admin/user/create.ejs", {
    roles: roles,
  });
};

const postCreateUser = async (req: Request, res: Response) => {
  const { fullName, username, phone, role, addDress } = req.body;

  const file = req.file;
  const avatar = file?.filename ?? "";
  await handleCreateUser(fullName, username, addDress, phone, avatar);
  return res.redirect("/admin/user");
};

const postDeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  await handleDeleteUser(id);
  return res.redirect("/");
};

const handleViewUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await getUserById(id);
  return res.render("view.user.ejs", {
    user: user,
  });
};

const postUpdateUser = async (req: Request, res: Response) => {
  const { id, fullName, email, addDress } = req.body;

  await updateUserById(id, fullName, email, addDress);

  return res.redirect("/");
};

export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, handleViewUser, postUpdateUser };
