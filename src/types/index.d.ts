import { User as UserPrisma, Roles } from "@prisma/client";

declare global {
  namespace Express {
    interface User extends UserPrisma {
      role: Roles;
      sumCart?: number;
    }
  }
}
