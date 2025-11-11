import { render, screen } from "@testing-library/react";
import App from "./App";

test("renderiza el título principal actualizado", async () => {
  render(<App />);
  const el = await screen.findByRole("heading", { name: /Bienvenido a Mentes Creativas/i }, { timeout: 3000 });
  expect(el).toBeInTheDocument();
});