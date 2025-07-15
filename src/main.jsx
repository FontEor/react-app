import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./router/index.jsx";
import { BrowserRouter } from "react-router-dom";
// import { worker } from "@/mocks/browser.js";

if (import.meta.env.MODE === "development") {
  // 启动时添加错误处理
 import('./mocks/browser').then(({ worker }) => {
    console.log('MSW Worker started:', worker);
    worker.start({ onUnhandledRequest: 'warn' });
  }).catch((err) => {
    console.error('Failed to start MSW Worker:', err);
  });
}
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
