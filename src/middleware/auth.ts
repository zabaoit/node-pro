import { Response, Request, NextFunction } from "express";

const isLogin = (req: Request, res: Response, next: NextFunction) => {
  const isAuthenticated = req.isAuthenticated();
  if (isAuthenticated) {
    res.redirect("/");
  } else next();
};

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req;

  if (user.role.name !== "ADMIN") {
    return res.redirect("/");
  } else {
    next();
  }
};
export { isLogin, isAdmin };
