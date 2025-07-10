import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./router/index.jsx";
import { BrowserRouter } from "react-router-dom";

if (import.meta.env.NODE_ENV === "development") {
  import("./mocks/index").then(({ worker }) => {
    worker.start({ onUnhandledRequest: 'bypass' });
  });
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
