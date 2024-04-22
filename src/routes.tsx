import App from "./App.tsx";
import ErrorPage from "./components/error-page.tsx";
import BasketRender from "./components/flowingContent/ContentRendition/BasketRender.tsx";
import DeliveryRender from "./components/flowingContent/ContentRendition/DeliveryRender.tsx";
import PaymentRender from "./components/flowingContent/ContentRendition/PaymentRender.tsx";
import ReceiptRender from "./components/flowingContent/ContentRendition/ReceiptRender.tsx";
import { Navigate, RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Navigate to="/basket" replace={true} />, //replace makes sure we can't go back to this page
      },
      {
        path: "/basket",
        element: <BasketRender />,
      },
      {
        path: "/delivery",
        element: <DeliveryRender />,
      },
      {
        path: "/payment",
        element: <PaymentRender />,
      },
    ],
  },
  {
    path: "/receipt",
    element: <ReceiptRender />, //Receipt is not a child of App, but its own page ;)
  },
];
