import { LoaderFunction } from "@remix-run/node";
import Layout from "~/layout/Layout";
import { checkPermissions } from "~/utils/checkPermissions.server";

export default function HomePage() {
  return <Layout />;
}

export const loader: LoaderFunction = async (args) => {
  await checkPermissions("admin", args);

  return {};
};
