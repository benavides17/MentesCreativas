import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";

// Views
import HomePage from "../views/HomePage";

import SettingsView from "../views/SettingsView";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>                                //No eliminar
        <Route index element={<HomePage />} />                             // No eliminar  

        <Route path="settings" element={<SettingsView />} />

      </Route>
    </Routes>
  );
}