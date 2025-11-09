// src/components/Navbar.tsx
import React, { useEffect } from "react";

const Navbar: React.FC = () => {
  // --- Inicializa el tema al cargar (mantiene preferencia del usuario) ---
  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme");

    // Si existe preferencia guardada
    if (saved === "dark") {
      root.classList.add("dark");
    } else if (saved === "light") {
      root.classList.remove("dark");
    } 
    // Si no hay preferencia, usa la del sistema
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, []);

  // --- Alterna entre claro / oscuro ---
  const toggleTheme = () => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");

    if (isDark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.dispatchEvent(new CustomEvent("theme:changed", { detail: { theme: "light" } }));
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.dispatchEvent(new CustomEvent("theme:changed", { detail: { theme: "dark" } }));
    }
  };

  return (
    <header
      className="h-14 sticky top-0 z-10 backdrop-blur border-b 
                 bg-white/80 dark:bg-teal-600 
                 border-slate-200 dark:border-slate-900
                 text-slate-900 dark:text-slate-900
                 transition-colors duration-500"
      role="banner"
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* --- Lado izquierdo: logo + marca --- */}
        <div
          className="flex items-center gap-2 font-semibold select-none"
          aria-label="Marca institucional"
        >
          <div
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg 
                       bg-emerald-600 text-white font-bold shadow-sm
                       dark:bg-emerald-500"
          >
            U
          </div>
          <span className="tracking-tight">UCC · Prácticas Desarrollo</span>
        </div>

        {/* --- Lado derecho: botón de tema --- */}
        <nav aria-label="Configuración de tema">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Cambiar entre modo claro y oscuro"
            className="px-4 py-2 rounded-xl font-medium transition
                       bg-slate-900 text-white 
                       hover:bg-slate-800 focus:outline-none 
                       focus:ring-4 focus:ring-slate-400/50 
                       active:scale-95
                       dark:bg-slate-100 dark:text-slate-900 
                       dark:hover:bg-slate-200 dark:focus:ring-slate-500/50
                       transition-colors duration-300"
          >
            Tema
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
