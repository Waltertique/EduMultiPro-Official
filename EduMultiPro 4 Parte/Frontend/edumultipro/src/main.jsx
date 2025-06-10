import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 👈 NUEVO
import './index.css';
import App from './App.jsx';
import Usuario from './admin/Usuario.jsx'; // 👈 NUEVO

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* 👈 ENVOLVER CON BROWSERROUTER */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/usuario" element={<Usuario />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);