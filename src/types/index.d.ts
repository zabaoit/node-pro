import { User, Roles } from "@prisma/client";

declare global {
  namespace Express {
    interface User extends User {
      role: Roles;
    }
  }
}
