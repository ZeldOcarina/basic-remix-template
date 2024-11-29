import { useAuth } from "@clerk/remix";

import clsx from "clsx";
import { useLoaderData } from "@remix-run/react";
import { DefaultLoaderAnswer } from "~/types/types";
import AppLogo from "~/components/AppLogo";

export default function Navbar() {
  const { authorized } = useLoaderData<DefaultLoaderAnswer>();
  const { isLoaded, userId } = useAuth();
  return (
    <nav
      className={clsx(
        "px-8 py-4 flex items-center",
        userId && authorized ? "justify-between" : "justify-center"
      )}
    >
      <AppLogo />
    </nav>
  );
}
