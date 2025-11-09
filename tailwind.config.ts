import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // 👈 importantísimo
  ],
  theme: {
    extend: {},
  },
  darkMode: "class", 
  plugins: [],
};

export default config;
