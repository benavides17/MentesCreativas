import type { Config } from 'tailwindcss'

// Configuración mínima de Tailwind: indicar rutas de contenido para generar utilidades
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  // Forzamos estrategia por clase para el modo oscuro
  darkMode: 'class',
} satisfies Config



