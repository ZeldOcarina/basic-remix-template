import { Link, useRouteLoaderData } from "@remix-run/react";
import { DefaultLoaderAnswer } from "~/types/types";

export default function PageErrorPage() {
  const rootLoaderData = useRouteLoaderData<DefaultLoaderAnswer>("root");

  const errorData = rootLoaderData?.errorData;

  if (errorData)
    return (
      <div className="space-y-4 text-center">
        <h2 className="text-red-700 font-bold text-3xl">{errorData.title}</h2>
        <p className="text-2xl">{errorData.message}</p>
      </div>
    );

  return (
    <p className="text-2xl">
      This is an error page. To sign in the app visit{" "}
      <Link to="/sign-in">/sign-in</Link>
    </p>
  );
}
