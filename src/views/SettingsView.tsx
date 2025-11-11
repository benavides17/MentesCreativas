// src/views/SettingsView.tsx

import Card from "../components/UI/Card";

export default function SettingsView() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 dark:text-slate-100">
          Configuración
        </h1>
        <p className="text-sm text-slate-300 max-w-prose dark:text-slate-200">
          Ajusta preferencias y controles rápidos. Mejora visual sin cambiar la paleta original.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        <Card title="Tema" aria-label="Preferencias de tema">
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
            Alterna entre modo claro y oscuro usando el botón en la barra superior. Se recuerda tu elección.
          </p>
          <ul className="text-xs space-y-1 text-slate-500 dark:text-slate-400">
            <li>• Detecta preferencia del sistema al inicio.</li>
            <li>• Guarda tu selección en localStorage.</li>
            <li>• Dispara un evento personalizado <code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800">theme:changed</code>.</li>
          </ul>
        </Card>

        <Card title="Accesibilidad" aria-label="Controles de accesibilidad">
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
            Se realiza auditoría opcional en modo desarrollo si está disponible <code className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800">axe-core</code>.
          </p>
          <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
            <p>Mejoras sugeridas próximas:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Atajos de teclado.</li>
              <li>Foco visible refinado.</li>
              <li>Contraste dinámico en gráficos 3D.</li>
            </ul>
          </div>
        </Card>

        <Card title="Rendimiento" aria-label="Información de rendimiento">
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
            Próximamente: mediciones ligeras (FPS escenas 3D, tamaño bundle). Se mantendrán colores actuales.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300">
              Lazy Loading
            </span>
            <span className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300">
              Code Splitting
            </span>
            <span className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300">
              Suspense
            </span>
          </div>
        </Card>

        <Card title="Preferencias" aria-label="Preferencias generales">
          <form className="space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900" />
              <span className="text-sm text-slate-600 dark:text-slate-300">Mostrar ayudas contextuales</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900" />
              <span className="text-sm text-slate-600 dark:text-slate-300">Activar animaciones 3D suaves</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900" />
              <span className="text-sm text-slate-600 dark:text-slate-300">Reducir movimiento (preferencia)</span>
            </label>
          </form>
        </Card>

        <Card title="Estado" aria-label="Indicadores generales">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg p-3 bg-slate-50 dark:bg-slate-800/60">
              <p className="text-[11px] uppercase tracking-wide font-semibold text-slate-500 dark:text-slate-400 mb-1">Modo</p>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Auto</p>
            </div>
            <div className="rounded-lg p-3 bg-slate-50 dark:bg-slate-800/60">
              <p className="text-[11px] uppercase tracking-wide font-semibold text-slate-500 dark:text-slate-400 mb-1">Tema</p>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Dinámico</p>
            </div>
            <div className="rounded-lg p-3 bg-slate-50 dark:bg-slate-800/60">
              <p className="text-[11px] uppercase tracking-wide font-semibold text-slate-500 dark:text-slate-400 mb-1">Accesibilidad</p>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Base</p>
            </div>
            <div className="rounded-lg p-3 bg-slate-50 dark:bg-slate-800/60">
              <p className="text-[11px] uppercase tracking-wide font-semibold text-slate-500 dark:text-slate-400 mb-1">Rendimiento</p>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200">OK</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
