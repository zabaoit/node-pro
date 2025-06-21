import { Response, Request } from "express";
import { getAllUsers, handleCreateUser, handleDeleteUser, handleViewUser } from "services/user.services";
const getHomePage = async (req: Request, res: Response) => {
  //  get user
  const users = await getAllUsers();

  return res.render("home.ejs", {
    users: users,
  });
};

const getCreateUserPage = (req: Request, res: Response) => {
  return res.render("create.user.ejs");
};

const postCreateUser = async (req: Request, res: Response) => {
  const { fullName, email, addDress } = req.body;

  //  handle create uses
  await handleCreateUser(fullName, email, addDress);
  return res.redirect("/");
};

const postDeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  await handleDeleteUser(id);
  return res.redirect("/");
};

const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await handleViewUser(id);
  return res.render("view.user.ejs", {
    user: user,
  });
};

export { getHomePage, getCreateUserPage, postCreateUser, postDeleteUser, getUserById };
