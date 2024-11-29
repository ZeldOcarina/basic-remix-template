import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunctionArgs } from "@remix-run/node";
import type { Roles } from "~/types/globals";

export const checkRole = async (role: Roles, args: LoaderFunctionArgs) => {
  const { sessionClaims } = await getAuth(args);
  return (
    sessionClaims &&
    sessionClaims.metadata &&
    sessionClaims.metadata.roles &&
    sessionClaims.metadata.roles.some((userRole) => userRole === role)
  );
};
