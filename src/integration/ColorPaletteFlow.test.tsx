import { render, screen, fireEvent } from "@testing-library/react";
import ColorPalette from "../components/ColorPalette";

describe("Integración: ColorPalette actualiza hex y callbacks", () => {
  test("seleccionar color predefinido dispara onSetHex y actualiza etiqueta", () => {
    const handleSet = jest.fn();
    render(<ColorPalette currentHex="#ff0000" onSetHex={handleSet} onRandom={jest.fn()} onReset={jest.fn()} />);

    const presetBtn = screen.getAllByRole("button")[0]; // primer preset
    fireEvent.click(presetBtn);
    expect(handleSet).toHaveBeenCalledTimes(1);
  });

  test("input HEX válido dispara callback al completar 6 caracteres", () => {
    const handleSet = jest.fn();
    render(<ColorPalette currentHex="#123456" onSetHex={handleSet} onRandom={jest.fn()} onReset={jest.fn()} />);
    const hexInput = screen.getByLabelText(/Código HEX/i);
    fireEvent.change(hexInput, { target: { value: "#abcdef" } });
    expect(handleSet).toHaveBeenCalledWith(parseInt("abcdef", 16));
  });
});
