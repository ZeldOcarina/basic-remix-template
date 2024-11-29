import { Outlet, useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { SignedIn, useAuth } from "@clerk/remix";

import Navbar from "./Navbar";

import { ModeToggle } from "~/components/ModeToggle";
import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/layout/AppSidebar";
import { Toaster } from "~/components/ui/toaster";
import { useEffect } from "react";
import { useToast } from "~/hooks/use-toast";
import { AppErrorMessage } from "~/types/types";

export default function Layout() {
  const { isLoaded } = useAuth();
  const { toast } = useToast();
  const rootLoaderData = useRouteLoaderData<{
    errorData: AppErrorMessage | null;
    authorized: boolean;
  }>("root");

  useEffect(() => {
    if (!rootLoaderData?.errorData) return;
    toast({
      title: rootLoaderData.errorData.title,
      description: rootLoaderData.errorData.message,
      variant: "destructive",
    });
  }, []);

  return (
    <SidebarProvider>
      {rootLoaderData?.authorized && isLoaded && <AppSidebar />}

      <div className="flex flex-col w-full">
        <Navbar />
        <main className="flex-grow w-full h-full flex items-center justify-center">
          <Outlet />
        </main>
        <div className="flex justify-between pb-6 px-6 items-center">
          <SidebarTrigger variant="outline" className="p-4" />
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
