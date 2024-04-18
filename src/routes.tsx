import { RouteObject } from "react-router-dom";
import App from "./App.tsx";
import ErrorPage from "./components/error-page.tsx";
import BasketRender from "./BasketRender.tsx";
import DeliveryRender from "./DeliveryRender.tsx";
import PaymentRender from "./PaymentRender.tsx";
import ReceiptRender from "./ReceiptRender.tsx";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
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
      {
        path: "/receipt",
        element: <ReceiptRender />,
      },
    ]
  },
  {
    path: "/Tester",
    element: <div> Hello There </div>
  },
];