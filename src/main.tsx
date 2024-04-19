import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RenditionProvider } from "./components/flowingContent/RenditionContext.tsx";
import { routes } from "./routes";

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root")!); // Make sure the 'root' element exists in your index.html
root.render(
    <React.StrictMode>
        <RenditionProvider>
            <RouterProvider router={router}/>
        </RenditionProvider>
    </React.StrictMode>
);

