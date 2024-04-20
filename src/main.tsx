import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { RenditionProvider } from "./components/flowingContent/RenditionContext.tsx";
import { BasketProvider } from "./context/BasketContext.tsx";
import { Delivery } from "./components/flowingContent/delivery/Delivery.tsx";
import { DeliveryProvider } from "./context/DeliveryContext.tsx";
// import './index.css'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RenditionProvider>
      <BasketProvider>
        <DeliveryProvider>
          <App />
        </DeliveryProvider>
      </BasketProvider>
    </RenditionProvider>
  </React.StrictMode>
);
