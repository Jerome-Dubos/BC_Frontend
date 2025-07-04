import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./i18n.js";
import "./index.css";

// Register Service Worker
const updateSW = registerSW({
  onNeedRefresh() {
    if (
      confirm(
        "Une nouvelle version est disponible. Voulez-vous mettre à jour ?"
      )
    ) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log("L'application est prête pour une utilisation hors ligne");
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
