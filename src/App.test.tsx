import { render, screen } from "@testing-library/react";
import App from "./App";

test("renderiza el título principal", async () => {
  render(<App />);
  const el = await screen.findByText(/Bienvenido a React/i, {}, { timeout: 3000 });
  expect(el).toBeInTheDocument();
});