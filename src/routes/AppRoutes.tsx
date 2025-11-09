import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import React, { Suspense, lazy } from "react";

// Lazy-load views to avoid blocking the app if a view throws during module import
const HomePage = lazy(() => import("../views/HomePage"));
const ThreeDemoView = lazy(() => import("../views/ThreeDemoView"));
const LayoutsView = lazy(() => import("../views/LayoutsView"));
const SpeechDemoView = lazy(() => import("../views/SpeechDemoView"));
const GeometryExplorer = lazy(() => import("../views/GeometryExplorer"));
const SettingsView = lazy(() => import("../views/SettingsView"));
const TablasMul = lazy(() => import("../views/TablasMul"));
const ConversorUnid = lazy(() => import("../views/ConversorUnid"));
const ValidContrasena = lazy(() => import("../views/ValidContrasena"));
const ContadorClics = lazy(() => import("../views/ContadorClics"));
const ListaTareas = lazy(() => import("../views/ListaTareas"));
// Nuevo proyecto
const Fractions3D = lazy(() => import("../views/Fractions3D"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-4">Cargando...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="three" element={<ThreeDemoView />} />
          <Route path="layouts" element={<LayoutsView />} />
          <Route path="tts" element={<SpeechDemoView />} />
          <Route path="three_2" element={<GeometryExplorer />} />
          <Route path="settings" element={<SettingsView />} />
          <Route path="tablasmul" element={<TablasMul />} />
          <Route path="conversorunid" element={<ConversorUnid />} />
          <Route path="validcontrasena" element={<ValidContrasena />} />
          <Route path="contadorclics" element={<ContadorClics />} />
          <Route path="listareas" element={<ListaTareas />} />
          {/* Lo del nuevo proyecto */}
          <Route path="fracciones3d" element={<Fractions3D />} />
        </Route>
      </Routes>
    </Suspense>
  );
}