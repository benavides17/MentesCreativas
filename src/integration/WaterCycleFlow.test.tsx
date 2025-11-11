import { render, screen, act, fireEvent } from "@testing-library/react";
import WaterCycle from "../components/WaterCycle";

describe("Integración: flujo de reproducción del Ciclo del Agua", () => {
  test("reproduce, avanza y se reinicia correctamente", () => {
    jest.useFakeTimers();
    render(<WaterCycle />);

    // Reproducir
    fireEvent.click(screen.getByRole("button", { name: /Reproducir/i }));
    expect(screen.getByText(/Pausar/i)).toBeInTheDocument();

    // Avanza tiempo simulado
    act(() => {
      jest.advanceTimersByTime(2600);
    });

    expect(screen.getAllByText(/Condensación/i).length).toBeGreaterThan(0);

    // Reiniciar
    fireEvent.click(screen.getByRole("button", { name: /Reiniciar/i }));
    expect(screen.getAllByText(/Evaporación/i).length).toBeGreaterThan(0);

    jest.useRealTimers();
  });
});
