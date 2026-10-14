import type { AuthUser } from "../model/types";

export const ADMIN_ROLE_NAME = "admin";

export const isAdmin = (user?: Pick<AuthUser, "userRoles"> | null): boolean =>
  Boolean(user?.userRoles?.some((role) => role.name.toLowerCase() === ADMIN_ROLE_NAME));
