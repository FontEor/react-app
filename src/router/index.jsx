
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('@/views/pages/Home'));
const About = lazy(() => import('@/views/pages/About'));
const Login = lazy(() => import('@/views/login/index.jsx'));
const Info = lazy(() => import('@/views/pages/Info'));
const NotFound = lazy(() => import('@/views/404/404.jsx'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/info" element={<Info />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;