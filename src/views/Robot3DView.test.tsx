import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

// Mock del componente pesado Three.js para tests en JSDOM
jest.mock("../components/Robot3D", () => () => <div data-testid="robot-mock" />);

import Robot3DView from "./Robot3DView";

describe("Robot3DView", () => {
  test("los botones de vista y movimiento emiten eventos en window", () => {
    const spy = jest.spyOn(window, "dispatchEvent");

    render(
      <MemoryRouter>
        <Robot3DView />
      </MemoryRouter>
    );

    // Botón Frontal emite robot3d-setview
    fireEvent.click(screen.getByRole("button", { name: /Frontal/i }));
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ type: "robot3d-setview" }));

    // Botones de movimiento emiten robot3d-move
    fireEvent.click(screen.getByRole("button", { name: "↑" }));
    fireEvent.click(screen.getByRole("button", { name: "←" }));
    fireEvent.click(screen.getByRole("button", { name: "↓" }));
    fireEvent.click(screen.getByRole("button", { name: "→" }));
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({ type: "robot3d-move" }));

    spy.mockRestore();
  });
});
