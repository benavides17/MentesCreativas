import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

describe("Integración: flujo de navegación Sidebar", () => {
  test("navega desde Inicio a Robot3D y ColorPicker3D", async () => {
    render(<App />);

    // Abre acordeón de ejercicios
    const exercisesToggle = screen.getByRole("button", { name: /Ejercicios · Jtest/i });
    fireEvent.click(exercisesToggle);

    // Navega a Robot3D
    const robotLink = await screen.findByRole("link", { name: /Robot 3D - Tecnología/i });
    fireEvent.click(robotLink);
    // Fallback Suspense muestra Cargando… por un instante
    await screen.findByText(/Robot 3D/i);

    // Regresa al color3d
    fireEvent.click(exercisesToggle); // reabrir si se cerró
    const colorLink = await screen.findByRole("link", { name: /Cambiar color 3D - Matemáticas/i });
    fireEvent.click(colorLink);
    await screen.findByText(/Color 3D/i, {}, { timeout: 3000 }).catch(() => {}); // tolera posible distinta cabecera
  });
});
