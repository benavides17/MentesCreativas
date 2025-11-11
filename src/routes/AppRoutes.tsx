import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

// Lazy views (mejor rendimiento y evita errores en test por ESM de three/examples)
const HomePage = lazy(() => import("../views/HomePage"));
const SettingsView = lazy(() => import("../views/SettingsView"));
const ColorPicker3DView = lazy(() => import("../views/ColorPicker3DView"));
const Robot3DView = lazy(() => import("../views/Robot3DView"));
const WaterCycleView = lazy(() => import("../views/WaterCycleView"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500">Cargando…</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>                                
          <Route index element={<HomePage />} />                             
          <Route path="color3d" element={<ColorPicker3DView />} />
          <Route path="robot3d" element={<Robot3DView />} />
          <Route path="watercycle" element={<WaterCycleView />} />
          <Route path="settings" element={<SettingsView />} />
        </Route>
      </Routes>
    </Suspense>
  );
}