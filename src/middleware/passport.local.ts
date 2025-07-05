import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { handleLogin } from "services/client/auth.service";
import { getUserSumCart, getUserWithRoleById } from "services/user.services";
const configPassportLocal = () => {
  passport.use(
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      function verify(req, username, password, callback) {
        const { session } = req as any;
        if (session?.messages?.length) {
          session.messages = [];
        }
        console.log(">>> check username/password: ", username, password);
        return handleLogin(username, password, callback);
      }
    )
  );

  passport.serializeUser(function (user: any, callback) {
    callback(null, { id: user.id, username: user.username });
  });

  passport.deserializeUser(async function (user: any, callback) {
    const { id, username } = user;

    // querry database
    const userInDB: any = await getUserWithRoleById(id);

    const sumCart = await getUserSumCart(id);
    console.log(">>> check sumCart: ", sumCart);
    return callback(null, { ...userInDB, sumCart: sumCart });
  });
};

export default configPassportLocal;
