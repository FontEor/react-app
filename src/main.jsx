import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./router/index.jsx";
import { BrowserRouter } from "react-router-dom";
// import { worker } from "@/mocks/browser.js";
// if (import.meta.env.MODE === "development") {
//   // 启动时添加错误处理
//     worker.start({onUnhandledRequest: 'bypass'});
// }
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
