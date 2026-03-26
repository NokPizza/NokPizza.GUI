import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/index/Index';
import NotFound from './pages/not-found/NotFound';

const App = () => {
  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const theme = saved ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.className = theme;
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
