import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "@/views/layout/index.jsx";

const Home = lazy(() => import("@/views/pages/Home"));
const About = lazy(() => import("@/views/pages/About"));
const Login = lazy(() => import("@/views/login/index.jsx"));
const Info = lazy(() => import("@/views/pages/Info"));
const NotFound = lazy(() => import("@/views/404/404.jsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // 使用布局组件
    children: [
      {
        path: "/",
        element: <Home />, // 默认子路由
      },
      {
        path: "/about",
        element: <About />,
      },

      {
        path: "/info",
        element: <Info />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
