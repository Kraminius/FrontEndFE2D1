import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import React from "react";
import App from "../App";

describe(App.name, () => {
  test("should display", () => {
    render(<App />);
    const element = screen.getByText("Shopping Basket");
    expect(element).toBeInTheDocument();
  });
});
