import * as React from "react";
import { Suspense, useEffect, useState } from "react";
import { isWebGLAvailable } from "../utils/isWebGLAvailable";
// Nota: cargaremos dinámicamente los módulos de three/drei/Pizza3D
// para evitar errores de importación en tiempo de evaluación del módulo.

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any) {
    console.error("3D render error", error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="font-semibold text-lg">No se pudo cargar el modelo 3D.</p>
          <p>Intenta nuevamente.</p>
          <button
            onClick={() => location.reload()}
            className="mt-3 bg-blue-600 text-white rounded-lg px-4 py-2"
          >
            Reintentar
          </button>
        </div>
      );
    }
    return this.props.children as any;
  }
}

export default function Fractions3D() {
  const [webgl, setWebgl] = useState(true);
  const [ThreeComponents, setThreeComponents] = useState<null | {
    Canvas: any;
    OrbitControls: any;
    Environment: any;
    Html: any;
    Pizza3D: React.ComponentType<any>;
  }>(null);

  useEffect(() => {
    setWebgl(isWebGLAvailable());
  }, []);

  // Carga dinámica de los módulos pesados para evitar fallos en la
  // evaluación estática del módulo (p. ej. errores de three/drei)
  useEffect(() => {
    if (!webgl) return;
    let mounted = true;
    Promise.all([
      import("@react-three/fiber"),
      import("@react-three/drei"),
      import("../components/Pizza3D"),
    ])
      .then(([fiber, drei, pizza]) => {
        if (!mounted) return;
        setThreeComponents({
          Canvas: fiber.Canvas,
          OrbitControls: drei.OrbitControls,
          Environment: drei.Environment,
          Html: drei.Html,
          Pizza3D: pizza.default,
        });
      })
      .catch((err) => {
        console.error("Error cargando módulos 3D:", err);
        // desactivar webgl view si hay error
        setWebgl(false);
      });
    return () => {
      mounted = false;
    };
  }, [webgl]);

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b border-gray-300 bg-white">
        <h1 className="text-xl font-semibold">Fracciones 3D</h1>
        <p className="text-gray-600 text-sm">
          Explora el modelo desde diferentes perspectivas: rota con arrastre y
          acerca/aleja con rueda o gesto de pinza.
        </p>
      </header>

      <main className="flex-1 relative bg-gray-50">
        {!webgl ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <p className="mb-2 font-medium">
              Tu navegador no soporta gráficos 3D (WebGL/WebGPU)
            </p>
            <img
              src="/vite.svg"
              alt="Vista estática del modelo de fracciones"
              className="max-w-xs opacity-70"
            />
          </div>
        ) : (
          <ErrorBoundary>
            {!ThreeComponents ? (
              <div className="flex items-center justify-center h-full">Cargando módulo 3D…</div>
            ) : (
              (() => {
                const { Canvas, OrbitControls, Environment, Html, Pizza3D } = ThreeComponents;
                return (
                  <Canvas shadows dpr={[1, 2]} camera={{ position: [2.5, 2.3, 2.5], fov: 50 }}>
                    <Suspense fallback={<div className="p-4">Cargando escena…</div>}>
                      <ambientLight intensity={0.7} />
                      <directionalLight position={[5, 5, 5]} intensity={0.9} />
                      <Environment preset="city" />
                      <Pizza3D />
                      <OrbitControls enablePan={false} minDistance={1.5} maxDistance={6} maxPolarAngle={Math.PI / 1.9} />
                    </Suspense>
                  </Canvas>
                );
              })()
            )}
          </ErrorBoundary>
        )}
      </main>
    </div>
  );
}
