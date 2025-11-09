import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

console.log('main.tsx: initializing app render');

const rootEl = document.getElementById("app");
if (!rootEl) {
  console.error('Could not find #app element — check index.html');
} else {
  ReactDOM.createRoot(rootEl).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
