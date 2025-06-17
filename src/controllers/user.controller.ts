import { Response, Request } from "express";
const getHomePage = (req: Request, res: Response) => {
  return res.render("home.ejs");
};

const getCreateUserPage = (req: Request, res: Response) => {
  return res.render("create.user.ejs");
};

const postCreateUser = (req: Request, res: Response) => {
  // need config req.body
  console.log(">>> check data: ", req.body);
  return res.redirect("/");
};

export { getHomePage, getCreateUserPage, postCreateUser };
