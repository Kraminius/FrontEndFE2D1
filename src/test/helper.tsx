import { ReactElement } from "react";
import { BrowserRouter as Router } from "react-router-dom";

interface RenderWithRouterOptions {
  route?: string;
}

export const renderWithRouter = (
  ui: ReactElement,
  { route = "/" }: RenderWithRouterOptions = {},
) => {
  window.history.pushState({}, "Test page", route);
  return <Router>{ui}</Router>;
};
