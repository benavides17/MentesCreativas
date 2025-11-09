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
  const DEFAULT_COLORS = { base: "#D2B48C", cheese: "#F7D9A6", toppings: "#C1443C" };
  const PALETTE = [
    { name: "Amarillo claro", color: "#F7D9A6" },
    { name: "Masa", color: "#D2B48C" },
    { name: "Rojo tomate", color: "#C1443C" },
    { name: "Verde pesto", color: "#6DA34D" },
    { name: "Marrón", color: "#8B5E3C" },
    { name: "Blanco", color: "#FFFFFF" },
    { name: "Negro", color: "#000000" },
  ];
  const STORAGE_KEY = "pizza3d-colors-v1";

  const [colors, setColors] = useState<Record<string, string>>(DEFAULT_COLORS);
  const [activePart, setActivePart] = useState<"base" | "cheese" | "toppings">("cheese");
  const [ThreeComponents, setThreeComponents] = useState<null | {
    Canvas: any;
    OrbitControls: any;
    Environment: any;
    Html: any;
    Pizza3D: React.ComponentType<any>;
  }>(null);
  const [resetCounter, setResetCounter] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [forceLoad, setForceLoad] = useState(false);
  const [dynamicError, setDynamicError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const force = params.get('force3d') === '1';
    const detected = isWebGLAvailable();
    // log detection result for debugging
    // eslint-disable-next-line no-console
    console.log('Fractions3D: isWebGLAvailable ->', detected, 'force override ->', force);
    setWebgl(force || detected);
  }, []);

  // load saved colors
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setColors((prev) => ({ ...prev, ...(JSON.parse(raw) || {}) }));
    } catch (e) {
      console.warn("Failed to load pizza colors", e);
    }
  }, []);

  // Cleanup any leftover DOM overlays created by previous Pizza3D implementations
  useEffect(() => {
    const leftovers = document.querySelectorAll('[data-pizza-controls]');
    leftovers.forEach((el) => el.remove());
  }, []);

  // persist colors
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(colors));
    } catch (e) {
      console.warn("Failed to persist pizza colors", e);
    }
  }, [colors]);

  // Carga dinámica de los módulos pesados para evitar fallos en la
  // evaluación estática del módulo (p. ej. errores de three/drei)
  useEffect(() => {
    // Load dynamic modules if WebGL is available or user forced load
    if (!webgl && !forceLoad) return;
    let mounted = true;
    setDynamicError(null);
    (async () => {
      try {
        const fiber = await import("@react-three/fiber");
        const pizza = await import("../components/Pizza3D");

        // Try to load drei, but tolerate failure and provide a fallback
        let drei: any = null;
        try {
          drei = await import("@react-three/drei");
        } catch (e) {
          console.warn("@react-three/drei failed to load, will use fallback OrbitControls", e);
        }

        if (!mounted) return;

        if (drei) {
          setThreeComponents({
            Canvas: fiber.Canvas,
            OrbitControls: drei.OrbitControls,
            Environment: drei.Environment,
            Html: drei.Html,
            Pizza3D: pizza.default,
          });
        } else {
          // Build a lightweight OrbitControls fallback using three's examples
          const OrbitControlsFallback = (() => {
            const { useThree, useFrame } = fiber as any;
            return function OrbitControlsFallback(props: any) {
              const ref = React.useRef<any>(null);
              const controlsRef = React.useRef<any>(null);
              const { camera, gl } = (fiber as any).useThree();
              React.useEffect(() => {
                let mountedInner = true;
                import("three/examples/jsm/controls/OrbitControls").then((mod) => {
                  if (!mountedInner) return;
                  const Controls = (mod as any).OrbitControls;
                  controlsRef.current = new Controls(camera, gl.domElement);
                  controlsRef.current.enablePan = props.enablePan === undefined ? false : props.enablePan;
                  controlsRef.current.minDistance = props.minDistance ?? 1.5;
                  controlsRef.current.maxDistance = props.maxDistance ?? 6;
                  controlsRef.current.maxPolarAngle = props.maxPolarAngle ?? Math.PI / 1.9;
                }).catch((err) => {
                  console.error("Failed to load OrbitControls example module:", err);
                });
                return () => {
                  mountedInner = false;
                  if (controlsRef.current) controlsRef.current.dispose();
                };
              }, [camera, gl, props.enablePan, props.minDistance, props.maxDistance, props.maxPolarAngle]);

              useFrame(() => {
                if (controlsRef.current) controlsRef.current.update();
              });

              return null;
            };
          })();

          setThreeComponents({
            Canvas: fiber.Canvas,
            OrbitControls: OrbitControlsFallback,
            Environment: () => null,
            Html: ({ children }: any) => children,
            Pizza3D: pizza.default,
          });
        }
      } catch (err: any) {
        console.error("Error cargando módulos 3D:", err);
        setDynamicError(String(err?.message || err));
      }
    })();
    return () => {
      mounted = false;
    };
  }, [webgl, forceLoad]);

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 border-b border-gray-300 bg-white">
        <h1 className="text-xl font-semibold">Fracciones 3D</h1>
        <p className="text-gray-600 text-sm">
          Explora el modelo desde diferentes perspectivas: rota con arrastre y
          acerca/aleja con rueda o gesto de pinza.
        </p>
      </header>

      {/* Estado de detección y control de carga (útil para depuración) */}
      <div className="p-3 border-b bg-white/50 flex items-center gap-4">
        <div className="text-sm">WebGL detectado: <strong>{String(webgl)}</strong></div>
        <div className="text-sm">Módulos 3D cargados: <strong>{ThreeComponents ? 'sí' : 'no'}</strong></div>
        <div className="text-sm">Error dinámico: <strong className="text-red-600">{dynamicError ?? '—'}</strong></div>
        <div className="ml-auto flex items-center gap-2">
          <button
            className="px-3 py-1 rounded bg-emerald-600 text-white"
            onClick={() => setForceLoad(true)}
          >
            Forzar carga 3D
          </button>
          <button
            className="px-3 py-1 rounded bg-slate-200"
            onClick={() => {
              setDynamicError(null);
              setThreeComponents(null);
              setForceLoad(false);
            }}
          >
            Reset
          </button>
        </div>
      </div>

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
                  <div className="h-full w-full relative">
                    {/* UI overlay (DOM) - always legible and accessible */}
                    <div className="absolute top-3 right-3 z-50 flex flex-col gap-2 items-end">
                      <div className="flex gap-2">
                        <button
                          aria-label="Volver al inicio"
                          className="bg-emerald-600 text-white px-3 py-1 rounded-md shadow"
                          onClick={() => setResetCounter((c) => c + 1)}
                        >
                          Volver al inicio
                        </button>
                        <button
                          aria-expanded={showInstructions}
                          aria-controls="fracciones-instructions"
                          className="bg-slate-100 text-slate-800 px-3 py-1 rounded-md shadow"
                          onClick={() => setShowInstructions((s) => !s)}
                        >
                          {showInstructions ? 'Ocultar instrucciones' : 'Mostrar instrucciones'}
                        </button>
                      </div>

                      {/* Color controls */}
                      <div className="bg-white/95 p-2 rounded shadow w-56 text-sm">
                        <div className="flex justify-between items-center">
                          <strong>Colores 3D</strong>
                          <button
                            onClick={() => setColors(DEFAULT_COLORS)}
                            className="px-2 py-1 bg-slate-100 rounded text-xs"
                            aria-label="Reiniciar colores al defecto"
                          >
                            Reiniciar
                          </button>
                        </div>

                        <div className="mt-2">
                          <div className="text-xs text-slate-600">Parte activa:</div>
                          <div className="flex gap-2 mt-1">
                            {(["base", "cheese", "toppings"] as const).map((p) => (
                              <button
                                key={p}
                                onClick={() => setActivePart(p)}
                                className={`px-2 py-1 rounded ${activePart === p ? 'border-2 border-blue-600' : 'border'} bg-white text-xs`}
                                aria-pressed={activePart === p}
                              >
                                {p}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="mt-2">
                          <div className="text-xs text-slate-600">Paleta</div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {PALETTE.map((c) => (
                              <button
                                key={c.color}
                                title={`${c.name} ${c.color}`}
                                onClick={() => setColors((s) => ({ ...s, [activePart]: c.color }))}
                                style={{ background: c.color }}
                                className="w-8 h-8 rounded border"
                                aria-label={`Aplicar color ${c.name} a ${activePart}`}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="mt-2 text-xs">
                          Activo: <strong>{activePart}</strong>
                          <div>Color: <code>{colors[activePart]}</code></div>
                        </div>

                      </div>
                    </div>

                    {showInstructions && (
                      <div id="fracciones-instructions" className="absolute top-3 left-3 z-50 max-w-xs p-3 bg-white/90 text-slate-900 rounded shadow">
                        <h3 className="font-semibold">Controles 3D</h3>
                        <ul className="text-sm mt-2">
                          <li>Rotar: arrastra con mouse o con el dedo (móvil).</li>
                          <li>Zoom: rueda del mouse o gesto pinch (móvil).</li>
                          <li>Volver al inicio: restaura la cámara a la posición inicial.</li>
                        </ul>
                      </div>
                    )}

                    <Canvas key={resetCounter} shadows dpr={[1, 2]} camera={{ position: [2.5, 2.3, 2.5], fov: 50 }}>
                      <Suspense fallback={<div className="p-4">Cargando escena…</div>}>
                        <ambientLight intensity={0.7} />
                        <directionalLight position={[5, 5, 5]} intensity={0.9} />
                        <Environment preset="city" />
                        <Pizza3D colors={colors} />
                        <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} minDistance={1.5} maxDistance={6} maxPolarAngle={Math.PI / 1.9} />
                      </Suspense>
                    </Canvas>
                  </div>
                );
              })()
            )}
          </ErrorBoundary>
        )}
      </main>
    </div>
  );
}
