import { LoaderFunctionArgs } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, useLoaderData } from "@remix-run/react";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { ClerkApp, UserButton } from "@clerk/remix";
import clsx from "clsx";
import {
  PreventFlashOnWrongTheme,
  ThemeProvider,
  useTheme,
} from "remix-themes";

import Layout from "./layout/Layout";
import { themeSessionResolver } from "./routes/sessions.server";

import "~/styles/tailwind.css";
import { createCustomCookie } from "./utils/createCustomCookie.server";
import { ModeToggle } from "./components/ModeToggle";

// Additonal application code

export async function loader(args: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(args.request);

  const errorCookie = createCustomCookie("errorMessage");
  const cookieHeader = args.request.headers.get("Cookie");

  // Parse the `errorMessage` cookie
  const errorData = (await errorCookie.parse(cookieHeader)) || null;

  return rootAuthLoader(args, ({ request }) => {
    const { userId } = request.auth;

    return {
      theme: getTheme(),
      errorData: errorData,
      authorized: !!(
        !errorData ||
        (errorData &&
          errorData.title &&
          errorData.title !== "Unauthorized" &&
          userId)
      ),
    };
  });
}

function AppWithProviders() {
  const data = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  );
}

export function App() {
  const data = useLoaderData<typeof loader>();
  const [theme] = useTheme();
  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        <Outlet />
        <Scripts />
        <ModeToggle />
        <div className="absolute top-6 right-6">
          <UserButton />
        </div>
      </body>
    </html>
  );
}

export default ClerkApp(AppWithProviders);
