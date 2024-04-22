import React from "react";
import ReactDOM from "react-dom/client";
import { DeliveryProvider } from "./context/DeliveryContext.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { BasketProvider } from "./context/BasketContext.tsx";
import { PaymentProvider } from "./context/PaymentContext.tsx";
// import './index.css'
import { routes } from "./routes";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BasketProvider>
      <DeliveryProvider>
        <PaymentProvider>
          <RouterProvider router={router} />
        </PaymentProvider>
      </DeliveryProvider>
    </BasketProvider>
  </React.StrictMode>,
);
