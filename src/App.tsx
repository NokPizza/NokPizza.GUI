import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from './components/Layout/Header/Header';
import { Footer } from './components/Layout/Footer/Footer';
import Index from './pages/index/Index';
import NotFound from './pages/not-found/NotFound';

const App = () => (
  <BrowserRouter>
    <Header />
    <div className="page-content">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
    <Footer />
  </BrowserRouter>
);

export default App;
