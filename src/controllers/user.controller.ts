import { Response, Request } from "express";
import { handleCreateUser } from "../services/user.services";
const getHomePage = (req: Request, res: Response) => {
  return res.render("home.ejs");
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
