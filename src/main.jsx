import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import App from "./App";
import "primereact/resources/themes/lara-light-cyan/theme.css"; // Importação do tema
import "primereact/resources/primereact.min.css"; // Estilos base dos componentes
import "primeicons/primeicons.css"; // Ícones

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
);
