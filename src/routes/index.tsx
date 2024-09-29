import App from "@/App";
import { createBrowserRouter, Link, useRouteError } from "react-router-dom";
import { z } from "zod";

import { isRouteErrorResponse } from "react-router-dom";
import { paths } from "@/common/paths";
import { DashboardLayout } from "@/pages/dashboard-layout";
import { Login } from "@/pages/login";
import HighlightExample from "@/pages/high-light";

function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
        <p>
          Back to <Link to={paths.home}>home</Link>
        </p>
      </div>
    );
  } else {
    if (error instanceof Error) {
      return <div>{error.message}</div>;
    }
  }
  return <div>Oops</div>;
}

const formDataSchema = z.object({
  name: z.string(),
  age: z.number(),
});

export const router = createBrowserRouter(
  [
    {
      path: paths.home,
      element: <Login />,
      index: true,
    },

    {
      path: paths.dashboard,
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <App />,
        },
        {
          path: paths.highLight,
          element: <HighlightExample />,
        },
      ],
      ErrorBoundary,
      action: async ({ request }) => {
        try {
          const formData = await request.formData();
          const parsedData = formDataSchema.parse({
            name: formData.get("name") ? formData.get("name") : undefined,
            age: formData.get("age") ? Number(formData.get("age")) : undefined,
          });

          return {
            name: parsedData.name,
            age: parsedData.age,
          };
        } catch (err) {
          console.log({ err });

          throw new Response("Something went wrong", {
            status: 400,
            statusText: "Bad Request",
          });
        }
      },
      loader: () => {
        return {
          name: "John Doe",
          age: 30,
        };
      },
    },
  ],
  {
    basename: "/",
  }
);
