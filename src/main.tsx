import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {BasketProvider} from "./context/BasketContext.tsx";
// import './index.css'

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BasketProvider>
            <App />
        </BasketProvider>
    </React.StrictMode>,
);
