import { Response, Request } from "express";
import { getAllRoles, getUserById, handleCreateUser, handleDeleteUser, updateUserById } from "services/user.services";

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
  await handleCreateUser(fullName, username, addDress, phone, avatar, role);
  return res.redirect("/admin/user");
};

const postDeleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  await handleDeleteUser(id);
  return res.redirect("/admin/user");
};

const handleViewUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await getUserById(id);
  const roles = await getAllRoles();
  return res.render("admin/user/detail.ejs", {
    id,
    user: user,
    roles,
  });
};

const postUpdateUser = async (req: Request, res: Response) => {
  const { id, fullName, phone, role, addDress } = req.body;

  const file = req.file;
  const avatar = file?.filename ?? "";

  await updateUserById(id, fullName, phone, role, addDress, avatar);

  return res.redirect("/admin/user");
};

export { getCreateUserPage, postCreateUser, postDeleteUser, handleViewUser, postUpdateUser };
