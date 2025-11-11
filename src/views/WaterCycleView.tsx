import WaterCycle from "../components/WaterCycle";
import { Link } from "react-router-dom";

export default function WaterCycleView() {
  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-100">Ciclo del Agua</h2>
          <p className="text-xs md:text-sm text-slate-200">Explora las etapas del ciclo del agua y sigue la guía interactiva.</p>
        </div>
        <div>
          <Link to="/" className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition">Volver al inicio</Link>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/40 dark:border-slate-800/60 bg-white/5 dark:bg-slate-900/20 shadow-sm overflow-hidden">
        <WaterCycle />
      </div>
    </div>
  );
}
