import { Response, Request } from "express";
import { registerNewUser } from "services/client/auth.service";
import { RegisterSchema, TRegister } from "src/validation/auth.schema";

const getLoginPage = (req: Request, res: Response) => {
  return res.render("client/auth/login.ejs");
};

const getRegisterPage = (req: Request, res: Response) => {
  const errors = [];
  const oldData = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  return res.render("client/auth/register.ejs", {
    errors,
    oldData,
  });
};

const postResgister = async (req: Request, res: Response) => {
  const { fullName, email, password, confirmPassword } = req.body as TRegister;
  const vatidate = await RegisterSchema.safeParseAsync(req.body);
  // error
  if (!vatidate.success) {
    const errorZod = vatidate.error.issues;
    const errors = errorZod?.map(item => `${item.message} (${item.path[0]})`);

    const oldData = {
      fullName,
      email,
      password,
      confirmPassword,
    };
    return res.render("client/auth/register.ejs", {
      errors,
      oldData,
    });
  }
  // success
  await registerNewUser(fullName, email, password);
  return res.redirect("/login");
};

export { getLoginPage, getRegisterPage, postResgister };
