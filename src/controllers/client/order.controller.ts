import { Response, Request } from "express";
import { getOrderHistory } from "services/client/home.service";

const getOrderHistoryPage = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) return res.redirect("/login");
  const orders = await getOrderHistory(user.id);

  return res.render("client/order/orderHistory.ejs", {
    orders,
  });
};

export { getOrderHistoryPage };
