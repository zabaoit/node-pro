import { Response, Request } from "express";

const getDashBoardPage = async (req: Request, res: Response) => {
  return res.render("admin/dashboard.ejs");
};

export { getDashBoardPage };
