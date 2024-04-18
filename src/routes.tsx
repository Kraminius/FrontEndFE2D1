import { RouteObject } from "react-router-dom";
import App from "./App.tsx";
import ErrorPage from "./components/error-page.tsx";
import BasketRender from "./BasketRender.tsx";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/basket",
        element: <BasketRender />,
      }
    ]
  },
  {
    path: "/Tester",
    element: <div> Hello There </div>
  },
];