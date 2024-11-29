import { LoaderFunctionArgs, redirect } from "@remix-run/node";
import { createCustomCookie } from "./createCustomCookie.server";
import { getAuth } from "@clerk/remix/ssr.server";
import { AppErrorMessage } from "~/types/types";
import { Roles } from "~/types/globals";
import { checkRole } from "./roles";

export const checkPermissions = async (
  role: Roles,
  args: LoaderFunctionArgs
) => {
  const { userId } = await getAuth(args);
  const isAdmin = await checkRole(role, args);

  const errorCookie = createCustomCookie("errorMessage", {
    maxAge: 2,
    path: "/",
    httpOnly: true,
    secure: true,
  });

  if (!userId) {
    throw redirect("/sign-in", {
      headers: {
        "Set-Cookie": await errorCookie.serialize({
          title: "Unauthenticated",
          message: "You need to be authenticated to visit this page.",
        } satisfies AppErrorMessage),
      },
    });
  }

  if (!isAdmin) {
    throw redirect("/error", {
      headers: {
        "Set-Cookie": await errorCookie.serialize({
          title: "Unauthorized",
          message: "Only administrators are allowed to visit this page.",
        }),
      },
    });
  }

  return true;
};
