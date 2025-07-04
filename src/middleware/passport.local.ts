import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { handleLogin } from "services/client/auth.service";
import { getUserById } from "services/user.services";
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
    const userInDB = await getUserById(id);
    return callback(null, { ...userInDB });
  });
};

export default configPassportLocal;
