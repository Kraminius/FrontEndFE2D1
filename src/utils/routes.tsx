import { RouteObject } from "react-router-dom";
import App from "../App.tsx";
import Delivery from "../components/Delivery.tsx";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            // Childrens
            {
                path: "/basket",
                element: <Basket />,
            },
            {
                path: "/delivery",
                element: <Delivery />,
            },
            {
                path: "/payment",
                element: <Payment />,
            },
            {
                path: "/receipt",
                element: <Receipt />,
            },
        ]
    },

];