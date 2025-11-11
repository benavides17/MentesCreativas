import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("Integración: toggle de tema propaga cambios", () => {
  beforeEach(() => {
    // Simula un documentElement con classList compatible
    const classSet = new Set<string>();
    (document as any).documentElement = {
      classList: {
        add: (c: string) => classSet.add(c),
        remove: (c: string) => classSet.delete(c),
        contains: (c: string) => classSet.has(c),
      },
    } as any;
    // Resetea localStorage simulada
    window.localStorage.setItem("theme", "light");
  });

  test("al hacer clic cambia texto del botón y clase 'dark' en documentElement", async () => {
    render(<App />);

    const btn = await screen.findByRole("button", { name: /Cambiar entre modo claro y oscuro/i });
    // Estado inicial
    expect(btn).toHaveTextContent(/Claro/i);

    fireEvent.click(btn);
    expect(btn).toHaveTextContent(/Oscuro/i);
  });
});
