import { Response, Request } from "express";

const getDashBoardPage = async (req: Request, res: Response) => {
  return res.render("admin/dashboard/show.ejs");
};

const getAdminUserPage = async (req: Request, res: Response) => {
  return res.render("admin/user/show.ejs");
};

export { getDashBoardPage, getAdminUserPage };
