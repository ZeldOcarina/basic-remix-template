import { Outlet } from "@remix-run/react";
import AppLogo from "~/components/AppLogo";

export default function ErrorLayout() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full gap-4">
      <AppLogo />
      <Outlet />
    </div>
  );
}
