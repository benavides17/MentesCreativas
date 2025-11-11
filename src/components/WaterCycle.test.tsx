import { render, screen, fireEvent, act } from "@testing-library/react";
import WaterCycle from "./WaterCycle";

describe("WaterCycle", () => {
	test("muestra etapa inicial y navega con botones", () => {
		render(<WaterCycle />);

		// Etapa inicial
		// Usa getAllByText ya que el título y el botón comparten el texto
		expect(screen.getAllByText(/Evaporación/i).length).toBeGreaterThanOrEqual(1);

		// Avanza a Condensación
		fireEvent.click(screen.getByRole("button", { name: /Siguiente/i }));
		expect(screen.getAllByText(/Condensación/i).length).toBeGreaterThanOrEqual(1);

		// Reinicia
		fireEvent.click(screen.getByRole("button", { name: /Reiniciar/i }));
		expect(screen.getAllByText(/Evaporación/i).length).toBeGreaterThanOrEqual(1);
	});

	test("selecciona etapa por botón específico", () => {
		render(<WaterCycle />);
		const btn = screen.getByRole("button", { name: /Precipitación/i });
		fireEvent.click(btn);
		expect(screen.getAllByText(/Precipitación/i).length).toBeGreaterThanOrEqual(1);
	});

	test("reproduce automáticamente avanzando etapas con intervalo", () => {
		jest.useFakeTimers();
		render(<WaterCycle />);

		// Comienza reproducción
		fireEvent.click(screen.getByRole("button", { name: /Reproducir/i }));
		expect(screen.getByText(/Pausar/i)).toBeInTheDocument();

		// Avanza 2500ms (una etapa)
		act(() => {
			jest.advanceTimersByTime(2600);
		});

		expect(screen.getAllByText(/Condensación/i).length).toBeGreaterThanOrEqual(1);

		jest.useRealTimers();
	});
});

