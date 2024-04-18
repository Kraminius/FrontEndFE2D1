import { RouteObject } from "react-router-dom";
import App from "./App.tsx";
import ErrorPage from "./components/error-page.tsx";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Tester",
    element: <div> Hello There </div>
  },
];