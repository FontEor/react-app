import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
   // 使用 import.meta.url 获取当前目录
  const envDir = fileURLToPath(new URL('./', import.meta.url))
   // 加载环境变量
  const env = loadEnv(mode, envDir, '')
  return {
    plugins: [react()],
    define: {
      // 如果需要，可以全局注入某些变量
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "#": path.resolve(__dirname, "./utils"),
      },
    },
  };
});
