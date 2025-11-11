import { render, screen, fireEvent, act } from "@testing-library/react";
import WaterCycle from "./WaterCycle";

describe("WaterCycle", () => {
	test("muestra etapa inicial y navega con botones", () => {
		render(<WaterCycle />);

		// Etapa inicial
		expect(screen.getByText(/Evaporación/i)).toBeInTheDocument();

		// Avanza a Condensación
		fireEvent.click(screen.getByRole("button", { name: /Siguiente/i }));
		expect(screen.getByText(/Condensación/i)).toBeInTheDocument();

		// Reinicia
		fireEvent.click(screen.getByRole("button", { name: /Reiniciar/i }));
		expect(screen.getByText(/Evaporación/i)).toBeInTheDocument();
	});

	test("selecciona etapa por botón específico", () => {
		render(<WaterCycle />);
		const btn = screen.getByRole("button", { name: /Precipitación/i });
		fireEvent.click(btn);
		expect(screen.getByText(/Precipitación/i)).toBeInTheDocument();
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

		expect(screen.getByText(/Condensación/i)).toBeInTheDocument();

		jest.useRealTimers();
	});
});

