import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import React from "react";
import App from "../App";
import initialBasketItems from "../data";

describe(App.name, () => {
  test('should display "Shopping Basket" title', () => {
    render(<App />);
    const titleElement = screen.getByText("Shopping Basket");
    expect(titleElement).toBeInTheDocument();
  });
});

describe(App.name, () => {
  test("should display 'Gulerødder'", async () => {
    render(<App />);
    const elements = await screen.getAllByText("Gulerødder");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  test("should display 'Ærter'", async () => {
    render(<App />);
    const elements = await screen.getAllByText("Ærter");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
  test("should display 'Kartofler'", async () => {
    render(<App />);
    const elements = await screen.getAllByText("Kartofler");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
  test("should display 'Hvidløg'", async () => {
    render(<App />);
    const elements = await screen.getAllByText("Hvidløg");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
  test("should display 'Ingefær'", async () => {
    render(<App />);
    const elements = await screen.getAllByText("Ingefær");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
  test("should display 'Gurkemeje'", async () => {
    render(<App />);
    const elements = await screen.getAllByText("Gurkemeje");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
  test("should display 'Karry'", async () => {
    render(<App />);
    const elements = await screen.getAllByText("Karry");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
  test("should display 'Kokosmælk'", async () => {
    render(<App />);
    const elements = await screen.getAllByText("Kokosmælk");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
  test("should display 'Ris'", async () => {
    render(<App />);
    const elements = await screen.getAllByText("Ris");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
});
