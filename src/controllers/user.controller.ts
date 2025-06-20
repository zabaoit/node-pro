import { Response, Request } from "express";
import { getAllUsers, handleCreateUser } from "../services/user.services";
const getHomePage = async (req: Request, res: Response) => {
  //  get user
  const users = await getAllUsers();
  console.log(">>> check user: ", users);

  return res.render("home.ejs", {
    name: users,
  });
};

const getCreateUserPage = (req: Request, res: Response) => {
  return res.render("create.user.ejs");
};

const postCreateUser = (req: Request, res: Response) => {
  const { fullName, email, addDress } = req.body;

  //  handle create uses
  handleCreateUser(fullName, email, addDress);
  return res.redirect("/");
};

export { getHomePage, getCreateUserPage, postCreateUser };
